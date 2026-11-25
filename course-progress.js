(function(root){
'use strict';

// PostgreSQL JSON objects can come back with a different key order.
function canonical(value){
  return JSON.stringify(value,(_,item)=>{
    if(!item||typeof item!=='object'||Array.isArray(item))return item;
    return Object.fromEntries(Object.keys(item).sort().map(key=>[key,item[key]]));
  });
}

function create({courseId:COURSE,legacy:LEGACY,get,set:setState,changed,engine,reviewEngine,keepEarned,hasProgress,canRefresh=()=>true}){
  const BASE='evo.course.account.v1.'+COURSE+'.';
  let lastContent=null;
  let sb=null,owner='guest',ready=false,started=false,epoch=0,revision=0;
  let timer=null,dirty=0,savingEpoch=null,status='loadingSync',localOK=true;
  let remote=null,uncertainWrite=null,identityRequest=null,pullRequest=null;
  let lastFocusCheck=0,tabCacheRaw=null,refreshAfterSave=false;
  const key=()=>BASE+owner;
  const snapshot=()=>({...get(),courseId:COURSE,accountId:owner});
  const content=p=>canonical({course:p.course,review:p.review});
  const set=p=>{setState(p);lastContent=content(get());};

  function valid(p){
    if(!p||p.courseId!==COURSE)throw Error('invalidBackup');
    return {courseId:COURSE,course:engine.restore(p.course),review:reviewEngine?.restore(p.review)};
  }
  function blank(){return {courseId:COURSE,course:engine.initial(),review:reviewEngine?.initial()};}
  function legacy(){
    try{
      const raw=localStorage.getItem(LEGACY);
      if(!raw)return null;
      const review=reviewEngine?.restore(localStorage.getItem('evo.course.a2.review.v1.guest'));
      return {courseId:COURSE,course:engine.restore(raw),review};
    }catch(_){return null;}
  }
  function local(id){
    try{return JSON.parse(localStorage.getItem(BASE+id));}
    catch(_){status='saveError';return null;}
  }
  function loadCache(){
    tabCacheRaw=null;
    if(owner!=='guest'){
      try{
        const raw=root.sessionStorage?.getItem(key());
        const pending=raw&&JSON.parse(raw);
        if(pending?.dirty&&pending.owner===owner){
          tabCacheRaw=raw;
          return pending;
        }
      }catch(_){}
    }
    const cached=local(owner);
    if(cached?.dirty)tabCacheRaw=JSON.stringify(cached);
    return cached;
  }
  function put(){
    const raw=JSON.stringify({...get(),courseId:COURSE,owner,revision,dirty:!!dirty});
    // A reload in this tab can recover its draft even if another tab has
    // written to the shared account cache.
    const previousTabCache=tabCacheRaw;
    let savedPending=false;
    if(owner!=='guest'){
      try{
        if(dirty&&root.sessionStorage){
          root.sessionStorage.setItem(key(),raw);
          tabCacheRaw=raw;
          savedPending=true;
        }else if(!dirty){
          root.sessionStorage?.removeItem(key());
          tabCacheRaw=null;
        }
      }catch(_){}
    }
    try{
      const sharedRaw=localStorage.getItem(key());
      const shared=JSON.parse(sharedRaw);
      // Leave another tab's unsent work recoverable in the shared cache.
      const otherDraft=owner!=='guest'&&shared?.dirty&&sharedRaw!==previousTabCache
        &&sharedRaw!==raw&&(!dirty||savedPending);
      const alreadySaved=!dirty&&otherDraft&&content(shared)===content(get());
      if((!otherDraft||alreadySaved)&&(owner==='guest'||!(shared?.revision>revision))){
        localStorage.setItem(key(),raw);
        if(dirty)tabCacheRaw=raw;
        localOK=true;
      }else{
        localOK=!dirty||savedPending||sharedRaw===raw;
      }
    }catch(_){localOK=savedPending;}
    changed();
  }
  function updateStatus(next){
    if(status===next)return;
    status=next;
    changed();
  }
  function schedule(){
    clearTimeout(timer);
    if(!ready||owner==='guest'||remote||!dirty)return;
    timer=setTimeout(flush,800);
  }

  function reconcile(row,{fromWrite=false,applyOnMap=true}={}){
    if(!row||!Number.isInteger(row.revision)||row.revision<0)throw Error('syncOffline');
    if(!fromWrite&&row.revision<revision)return;
    if(row.revision===revision&&row.payload&&status!=='syncConflict'&&!remote){
      updateStatus(dirty?'savingSync':'synced');
      return;
    }
    const progress=row.payload?valid(row.payload):blank();
    const incoming=content(progress);
    const identical=incoming===content(get());
    const acknowledged=uncertainWrite&&row.revision===uncertainWrite.revision+1
      &&incoming===uncertainWrite.content;
    if(identical||acknowledged){
      revision=row.revision;
      remote=null;
      uncertainWrite=null;
      if(identical)dirty=0;
      status=dirty?'savingSync':'synced';
      put();
      return;
    }
    if(!dirty&&applyOnMap&&canRefresh()){
      revision=row.revision;
      remote=null;
      uncertainWrite=null;
      set(progress);
      status='synced';
      put();
      return;
    }
    remote={revision:row.revision,progress};
    updateStatus(dirty?'syncConflict':'syncUpdate');
  }

  function identify(background=false){
    if(identityRequest)return identityRequest;
    const pending=identifyOnce(background);
    identityRequest=pending;
    pending.finally(()=>{if(identityRequest===pending)identityRequest=null;}).catch(()=>{});
    return pending;
  }
  async function identifyOnce(background){
    let mine=background?epoch:++epoch;
    if(!background){ready=false;changed();}
    let result;
    try{result=await sb.auth.getUser();}
    catch(_){if(mine===epoch)updateStatus('syncOffline');return;}
    if(mine!==epoch)return;
    const {data,error}=result;
    if(error&&background){updateStatus('syncOffline');return;}
    const id=error||!data?.user||data.user.is_anonymous?'guest':data.user.id;
    if(id===owner&&started){
      ready=true;
      if(owner!=='guest'&&canRefresh())await pull(mine);
      if(!background)changed();
      return;
    }
    if(background){mine=++epoch;pullRequest=null;}
    ready=false;
    changed();
    started=true;
    owner=id;
    dirty=0;
    revision=0;
    remote=null;
    uncertainWrite=null;
    refreshAfterSave=false;
    let cached=loadCache();
    if(!cached&&owner==='guest')cached=legacy();
    try{set(cached?valid(cached):blank());}
    catch(_){cached=null;set(blank());}
    revision=cached?.revision||0;
    dirty=cached?.dirty?1:0;
    status=id==='guest'?'localOnly':'loadingSync';
    ready=true;
    changed();
    if(id!=='guest')await pull(mine);
  }
  function pull(mine=epoch){
    if(pullRequest)return pullRequest;
    if(!ready||owner==='guest')return Promise.resolve();
    if(savingEpoch===mine){
      refreshAfterSave=true;
      return Promise.resolve();
    }
    const pending=pullOnce(mine);
    pullRequest=pending;
    pending.finally(()=>{
      if(pullRequest!==pending)return;
      pullRequest=null;
      if(mine===epoch&&status!=='syncOffline')schedule();
    }).catch(()=>{});
    return pending;
  }
  async function pullOnce(mine){
    const user=owner;
    const stateAtRequest=get().course;
    const hadOpenTask=!!(stateAtRequest.active||stateAtRequest.assessment);
    try{
      const out=await sb.from('user_course_state').select('revision,payload').eq('course_id',COURSE).eq('user_id',user).maybeSingle();
      if(mine!==epoch||user!==owner)return;
      if(out.error)throw out.error;
      const current=get().course;
      const openedDuringRequest=!hadOpenTask&&!!(current.active||current.assessment);
      if(out.data)reconcile(out.data,{applyOnMap:!openedDuringRequest});
      else if(!dirty){revision=0;updateStatus('synced');}
      else updateStatus(remote?'syncConflict':'savingSync');
    }catch(_){if(mine===epoch&&!remote)updateStatus('syncOffline');}
  }
  function save(){
    if(!ready||status==='loadingSync')return;
    const current=content(get());
    if(current===lastContent)return;
    lastContent=current;
    dirty++;

    if(remote){
      // Re-evaluate a deferred update against the text the learner just entered.
      if(content(remote.progress)===content(get())){
        revision=remote.revision;
        remote=null;
        uncertainWrite=null;
        dirty=0;
        status='synced';
      }else status='syncConflict';
    }else status=owner==='guest'?'localOnly':'savingSync';
    put();
    schedule();
  }
  async function flush(){
    if(!ready||savingEpoch===epoch||owner==='guest'||remote||!dirty)return;
    if(pullRequest){
      await pullRequest;
      return flush();
    }
    const mine=epoch,id=owner,seq=dirty,expected=revision;
    const payload=JSON.parse(JSON.stringify(snapshot()));
    const attempt={revision:expected,content:content(payload)};
    let attemptedWrite=false;
    savingEpoch=mine;
    try{
      const who=await sb.auth.getUser();
      if(who.error||who.data?.user?.id!==id||mine!==epoch)throw Error('accountChanged');
      attemptedWrite=true;
      const result=await sb.rpc('evo_save_integrated_course_state',{p_expected_revision:expected,p_payload:payload});
      if(mine!==epoch||id!==owner)return;
      if(result.error)throw result.error;
      if(result.data?.conflict){
        reconcile(result.data,{fromWrite:true});
      }else{
        if(!Number.isInteger(result.data?.revision)||result.data.revision<1)throw Error('syncOffline');
        revision=result.data.revision;
        uncertainWrite=null;
        if(seq===dirty)dirty=0;
        status=dirty?'savingSync':'synced';
        put();
      }
    }catch(_){
      if(mine===epoch){
        if(attemptedWrite&&!uncertainWrite)uncertainWrite=attempt;
        updateStatus('syncOffline');
      }
    }finally{
      if(savingEpoch===mine)savingEpoch=null;
      if(mine===epoch&&refreshAfterSave){
        refreshAfterSave=false;
        pull();
      }else if(mine===epoch&&status!=='syncOffline')schedule();
    }
  }
  function resolve(useLocal){
    if(!remote||!dirty)return;
    revision=remote.revision;
    const progress=remote.progress;
    remote=null;
    uncertainWrite=null;
    const current=get();
    const preferred=useLocal?current:progress;
    const other=useLocal?progress:current;
    const retained={...preferred,course:keepEarned(preferred.course,other.course)};
    set(retained);
    dirty=content(retained)===content(progress)?0:1;
    status=dirty?'savingSync':'synced';
    put();
    schedule();
  }
  function refreshOnMap(){
    if(!ready||dirty||!remote||!canRefresh())return;
    const pending=remote;
    Promise.resolve().then(()=>{
      if(!ready||dirty||remote!==pending||!canRefresh())return;
      revision=pending.revision;
      remote=null;
      uncertainWrite=null;
      set(pending.progress);
      status='synced';
      put();
      pull();
    });
  }
  function guestAvailable(){
    try{
      if(owner==='guest'||status==='loadingSync')return false;
      const guest=local('guest')||legacy();
      return !!guest&&hasProgress(guest.course)&&guest.courseId===COURSE
        &&isNewGuestProgress(guest);
    }
    catch(_){return false;}
  }
  function isNewGuestProgress(guest){
    const current=get().course;
    if(!hasProgress(current))return true;
    return canonical(keepEarned(current,guest.course))!==canonical(current);
  }
  function importGuest(){
    if(owner==='guest')return;
    const candidate=local('guest')||legacy();
    if(!candidate||!guestAvailable())return;
    const guest=valid(candidate),current=get();
    const imported=hasProgress(current.course)
      ?{...current,course:keepEarned(current.course,guest.course)}:guest;
    setState(imported);
    save();
  }
  async function init(){
    if(started)return;
    for(let i=0;i<30&&!sb;i++){
      try{
        const host=root.parent;
        sb=[host?.supabaseClient,host?.evoSupabase,host?.supabase,host?.sb]
          .find(c=>c?.auth?.getUser&&c?.from&&c?.rpc)||null;
      }catch(_){}
      if(root.parent===root&&!sb)break;
      if(!sb)await new Promise(r=>setTimeout(r,300));
    }
    if(!sb){
      owner='guest';
      const cached=local(owner);
      if(cached)set(valid(cached));
      else set(legacy()||blank());
      ready=true;
      started=true;
      status='localOnly';
      changed();
      return;
    }
    sb.auth.onAuthStateChange((event,session)=>{
      const id=session?.user?(session.user.is_anonymous?'guest':session.user.id):null;
      if(started&&ready&&id===owner&&['INITIAL_SESSION','SIGNED_IN','TOKEN_REFRESHED','USER_UPDATED'].includes(event))return;
      ready=false;
      epoch++;
      identityRequest=null;
      pullRequest=null;
      clearTimeout(timer);
      changed();
      setTimeout(()=>identify(),0);
    });
    await identify();
  }
  root.addEventListener('online',()=>{
    if(!sb||owner==='guest')return;
    if(remote||uncertainWrite||!dirty)pull();
    else flush();
  });
  root.addEventListener('focus',()=>{
    if(!sb||!ready||dirty||savingEpoch===epoch||!canRefresh()||Date.now()-lastFocusCheck<30000)return;
    lastFocusCheck=Date.now();
    identify(true);
  });
  root.addEventListener('storage',event=>{
    if(event.key!==key()||owner==='guest'||!ready)return;
    const saved=local(owner);
    if(!saved||saved.dirty||saved.revision<=revision)return;
    // A shared-cache write is a signal. Only the server can confirm its contents.
    pull();
  });
  return {
    init,save,flush,resolve,refreshOnMap,importGuest,guestAvailable,pull,
    info:()=>({owner,ready:ready&&status!=='loadingSync',status:localOK?status:'saveError',conflict:!!remote&&!!dirty,revision}),
    export:()=>({...snapshot(),owner}),
    exportAccount:()=>remote?{...remote.progress,accountId:owner,owner}:null,
    import:p=>{
      if(p.owner&&p.owner!==owner&&p.owner!=='guest')throw Error('wrongOwner');
      const incoming=valid(p);
      setState({...incoming,course:keepEarned(incoming.course,get().course)});
      save();
    },
    identity:()=>owner
  };
}
root.EvoIntegratedCourseSync={create};
})(globalThis);

(function(root){
  'use strict';

  const messages={
    en:{loadingSync:'Loading account progress…',localOnly:'Progress saved on this device. Log in to sync.',synced:'Progress synced with your account.',savingSync:'Saving progress…',syncOffline:'Account sync is unavailable. This device keeps your changes.',saveError:'Storage is unavailable. Download a backup of your progress.',syncConflict:'Two versions of your progress exist. Choose which answers and drafts to keep.',syncUpdate:'New account progress is available. Open the course map to load it.',cloud:'Use account version',local:'Use this device’s version',backup:'Download both versions',importGuest:'Import progress from this browser',owed:'Completed lessons are kept from both versions.',restore:'Restore progress',invalid:'This progress file cannot be restored.'},
    ru:{loadingSync:'Загружаем прогресс аккаунта…',localOnly:'Прогресс сохранён на этом устройстве. Войдите, чтобы синхронизировать его.',synced:'Прогресс синхронизирован с аккаунтом.',savingSync:'Сохраняем прогресс…',syncOffline:'Синхронизация недоступна. Изменения сохранены на этом устройстве.',saveError:'Не удалось сохранить данные на устройстве. Скачайте резервную копию прогресса.',syncConflict:'Есть две версии прогресса. Выберите, какие ответы и черновики сохранить.',syncUpdate:'В аккаунте появился новый прогресс. Откройте карту курса, чтобы загрузить его.',cloud:'Использовать версию аккаунта',local:'Использовать версию устройства',backup:'Скачать обе версии',importGuest:'Перенести прогресс из этого браузера',owed:'Пройденные уроки сохраняются из обеих версий.',restore:'Восстановить прогресс',invalid:'Не удалось восстановить прогресс из этого файла.'}
  };

  function bind(options){
    let reset=true;
    let repaintPending=false;
    let signature='';
    const text=key=>(messages[options.locale?.()]||messages.en)[key];
    const sync=root.EvoIntegratedCourseSync.create({...options,
      set(value){options.set(value);reset=true;},
      changed(){
        if(repaintPending)return;
        repaintPending=true;
        queueMicrotask(()=>{
          repaintPending=false;
          const {ready}=sync.info();
          const next=String(ready);
          if(reset||next!==signature){reset=false;signature=next;options.render(false);}
          paint();
        });
      }
    });
    function download(data,suffix){
      const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
      const anchor=document.createElement('a');
      anchor.href=url;
      anchor.download=`evo-${options.courseId}-${suffix}.json`;
      anchor.click();
      setTimeout(()=>URL.revokeObjectURL(url),10000);
    }
    function paint(){
      const {status,conflict}=sync.info();
      document.getElementById('course-account-notice')?.remove();
      const panel=options.element.querySelector('.map-head');
      if(!panel){
        if(!['syncConflict','syncUpdate','saveError'].includes(status))return;
        const notice=document.createElement('p');
        notice.id='course-account-notice';
        notice.className='notice';
        notice.role='status';
        notice.textContent=text(status);
        options.element.before(notice);
        return;
      }
      let box=panel.querySelector('[data-course-sync-status]');
      if(!box){
        box=document.createElement('div');
        box.dataset.courseSyncStatus='';
        box.className='notice';
        panel.append(box);
      }
      const guest=sync.guestAvailable();
      const contents=JSON.stringify([status,conflict,guest,options.locale?.()]);
      if(box.dataset.contents===contents)return;
      box.dataset.contents=contents;
      box.replaceChildren();
      const line=document.createElement('p');
      line.role='status';
      line.textContent=text(status);
      box.append(line);
      function add(key,action){
        const button=document.createElement('button');
        button.type='button';
        button.textContent=text(key);
        button.className='btn secondary';
        button.onclick=action;
        box.append(button);
      }
      if(conflict){
        const explanation=document.createElement('p');
        explanation.textContent=text('owed');
        box.append(explanation);
        add('cloud',()=>sync.resolve(false));
        add('local',()=>sync.resolve(true));
        add('backup',()=>{download(sync.export(),'device');download(sync.exportAccount(),'account');});
      }else if(guest){
        add('importGuest',()=>sync.importGuest());
      }
      if(options.restore&&!conflict)add('restore',()=>{
        const input=document.createElement('input');
        input.type='file';
        input.accept='.json,application/json';
        input.onchange=async()=>{
          try{
            const file=input.files[0];
            if(!file||file.size>1500000)throw Error('invalidBackup');
            const data=JSON.parse(await file.text());
            sync.import(data.courseId?data:{courseId:options.courseId,course:data});
          }catch(_){line.textContent=text('invalid');}
        };
        input.click();
      });
    }
    root.addEventListener('pagehide',()=>sync.flush());
    return Object.assign(sync,{paint,download,text});
  }

  root.EvoCourseProgressUI={bind};
})(globalThis);
