/* Replaces the existing Talk to AI dialog. Uses the site's client and assistant_voice. */
(function (global) {
  'use strict';
  const VERSION = 'lesson-voice-3';
  const IDLE_TIMEOUT_MS = 10000;
  const REPLY_WAIT_TIMEOUT_MS = 30000;
  function install({client, track = () => {}, autoStart = true}) {
    if (global.__evoLessonVoice) return global.__evoLessonVoice;
    if (document.getElementById('evo-voice-coach')) {
      const old = document.getElementById('ee-fab');old?.remove();
      global.openAssistant = () => {document.getElementById('evc-start')?.focus();document.getElementById('evo-voice-coach')?.scrollIntoView({block:'center'});};
      return {open:global.openAssistant};
    }
    const contextAPI = global.EvoLessonContext;
    let current = null, focused = null, selection = '', sequence = 0, lastContext = '', updateTimer = null;
    let state = {mode:'idle',user:0,ai:0}, orb = null, orbPending = null, destroyed = false;
    let registered = false, secondsLeft = 0, questionsLeft = 0, locked = false, accessDenied = false;
    const guestKey = 'evo_voice_guest_id_v2';
    let guestId;
    try { guestId = localStorage.getItem(guestKey); } catch {}
    if (!guestId) {
      const uuid=()=>crypto.randomUUID?.() || Date.now().toString(36)+Math.random().toString(36).slice(2);
      guestId=uuid()+'-'+uuid();try{localStorage.setItem(guestKey,guestId);}catch{}
    }
    const style = document.createElement('style');style.id='evo-lesson-voice-css';
    style.textContent = `
      #ee-fab{position:fixed;right:18px;bottom:22px;z-index:99998;display:flex;align-items:center;gap:7px;padding:4px 14px 4px 4px;border:1px solid #397087;border-radius:40px;background:#03151d;color:#e8fbff;font:600 13px system-ui;box-shadow:0 8px 25px #00273330;cursor:pointer;min-height:54px}
      #ee-fab .ee-mini-orb{display:block;width:44px;height:44px;position:relative;border-radius:50%;background:radial-gradient(circle at 35% 32%,#d4ffff,#48bcd0 15%,#126c87 32%,#082d40 52%,#03121c 71%);box-shadow:inset 0 0 14px #90edff55,0 0 12px #5be3ff35;animation:ee-orb-breathe 4s ease-in-out infinite}
      #ee-fab .ee-mini-orb:after{content:'';position:absolute;inset:8px -1px;border:1px solid #95edff99;border-radius:50%;transform:rotate(-32deg)}
      @keyframes ee-orb-breathe{50%{transform:scale(.92);filter:brightness(1.25)}}
      #evo-lesson-voice{position:fixed;right:18px;bottom:88px;z-index:99999;width:min(342px,calc(100vw - 24px));max-height:calc(100dvh - 112px);overflow:auto;box-sizing:border-box;padding:17px 18px 15px;border:1px solid #2e596c;border-radius:24px;background:radial-gradient(ellipse at 50% 32%,#0a3543 0,#051922 42%,#020b10 78%);color:#edfbff;box-shadow:0 20px 70px #00172055;font:13px/1.45 system-ui;text-align:left;isolation:isolate}
      #evo-lesson-voice[hidden]{display:none!important}#evo-lesson-voice *{box-sizing:border-box}#evo-lesson-voice button,#evo-lesson-voice select{font:inherit}
      #evo-lesson-voice .ee-v-head{display:flex;align-items:center;justify-content:space-between;gap:10px}#evo-lesson-voice h2{font-size:13px;letter-spacing:.07em;margin:0;color:#9beaff}#evo-lesson-voice .ee-v-close{border:0;background:transparent;color:#c8e7ee;padding:4px 7px;font-size:21px;cursor:pointer}
      #evo-lesson-voice .ee-v-lesson{margin:8px 0 0;color:#b9d2dc;font-size:12px;line-height:1.4;overflow-wrap:anywhere}
      #evo-lesson-voice .ee-v-orb{position:relative;width:180px;height:166px;margin:0 auto;pointer-events:none}#evo-lesson-voice .ee-v-orb canvas{position:absolute;inset:0;width:100%;height:100%}
      #evo-lesson-voice .ee-v-fallback{position:absolute;inset:31px 39px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#c5ffffcc,#61d7eb88 18%,#16759166 43%,#0a304844 63%,transparent 70%);box-shadow:0 0 30px #62eaff20;animation:ee-orb-breathe 4s ease-in-out infinite}
      #evo-lesson-voice .ee-v-fallback:before,#evo-lesson-voice .ee-v-fallback:after{content:'';position:absolute;inset:18px -28px;border:1px dotted #8ee9ff99;border-radius:50%;transform:rotate(-29deg)}#evo-lesson-voice .ee-v-fallback:after{inset:-17px 16px;transform:rotate(30deg)}#evo-lesson-voice [data-rendered] .ee-v-fallback{display:none}
      #evo-lesson-voice .ee-v-status{text-align:center;min-height:20px;font-weight:600;color:#b4f1ff;margin:-2px 0 12px}#evo-lesson-voice .ee-v-status[data-state=listening]{color:#b3ffdc}#evo-lesson-voice .ee-v-status[data-state=thinking]{color:#d8c4ff}
      #evo-lesson-voice label{display:block;font-size:10px;color:#a2bfc9;letter-spacing:.08em;text-transform:uppercase;margin-bottom:5px}#evo-lesson-voice select{width:100%;height:36px;padding:5px 9px;border:1px solid #33505e;border-radius:10px;background:#0b232d;color:#ecfaff;font-size:12px}#evo-lesson-voice option{background:#0b232d;color:white}
      #evo-lesson-voice .ee-v-actions{display:flex;gap:7px;margin-top:12px}#evo-lesson-voice .ee-v-action{flex:1;min-height:39px;border:1px solid #355967;border-radius:12px;background:#112d38;color:#e1f7ff;cursor:pointer}#evo-lesson-voice .ee-v-main{background:#8ee8fa;border-color:#8ee8fa;color:#08222c;font-weight:700}
      #evo-lesson-voice .ee-v-usage{text-align:center;font-size:11px;color:#91b4c2;margin:10px 0 0}#evo-lesson-voice .ee-v-note{font-size:10px;color:#90acb8;margin:10px 0 0;line-height:1.45}#evo-lesson-voice .ee-v-error{font-size:12px;color:#ffd1ba;margin:10px 0;white-space:pre-wrap}#evo-lesson-voice .ee-v-caption{font-size:12px;color:#d2e9f1;max-height:90px;overflow:auto;margin:8px 0;white-space:pre-wrap;overflow-wrap:anywhere}
      #evo-lesson-voice .ee-v-link{color:#9beaff;text-decoration:underline;font-size:12px}#evo-lesson-voice [hidden]{display:none!important}#evo-lesson-voice button:disabled,#evo-lesson-voice select:disabled{opacity:.5;cursor:default}#ee-fab:focus-visible,#evo-lesson-voice button:focus-visible,#evo-lesson-voice select:focus-visible{outline:3px solid #b5f6ff;outline-offset:3px}
      @media(max-width:480px){#ee-fab{right:12px;bottom:16px}#evo-lesson-voice{right:12px;bottom:80px;max-height:calc(100dvh - 98px)}}@media(prefers-reduced-motion:reduce){#ee-fab .ee-mini-orb,#evo-lesson-voice .ee-v-fallback{animation:none}}
    `;
    document.head.append(style);
    const fab=document.getElementById('ee-fab') || document.body.appendChild(document.createElement('button'));
    fab.id='ee-fab';fab.type='button';fab.className='ee-fab';fab.innerHTML='<span class="ee-mini-orb" aria-hidden="true"></span><span>Talk to AI</span>';
    fab.setAttribute('aria-controls','evo-lesson-voice');fab.setAttribute('aria-expanded','false');
    const panel=document.createElement('section');panel.id='evo-lesson-voice';panel.hidden=true;
    panel.setAttribute('role','region');panel.setAttribute('aria-label','Lesson AI voice assistant');
    panel.innerHTML=`<div class="ee-v-head"><h2>EVO · AI ASSISTANT</h2><button class="ee-v-close" type="button" aria-label="Close and end conversation">×</button></div>
      <p class="ee-v-lesson"></p><div class="ee-v-orb" aria-hidden="true"><div class="ee-v-fallback"></div></div>
      <p class="ee-v-status" role="status" aria-live="polite">Ready to talk</p>
      <label for="ee-v-voice">Voice</label><select id="ee-v-voice"><option value="marin">Emma — warm & natural</option><option value="coral">Olivia — friendly & bright</option><option value="cedar">Daniel — calm & clear</option><option value="sage">Alex — balanced</option><option value="shimmer">Sophie — soft & expressive</option></select>
      <p class="ee-v-error" role="alert" hidden></p><p class="ee-v-caption" hidden></p>
      <button class="ee-v-action ee-v-play" type="button" hidden>Enable audio</button>
      <div class="ee-v-actions"><button class="ee-v-action ee-v-mute" type="button" disabled>Mute mic</button><button class="ee-v-action ee-v-main" type="button">Start conversation</button></div>
      <p class="ee-v-usage"></p><p class="ee-v-limit" hidden><a class="ee-v-link" href="/login?tab=signup">Create a free account</a> · <a class="ee-v-link" href="/login">Log in</a></p>
      <p class="ee-v-note">Ask in your language. English examples stay in English. The conversation stops after 10 seconds without speech while waiting for you. Voice and lesson context are sent to Evo-English’s AI service while this conversation is active.</p><audio autoplay playsinline></audio>`;
    document.body.append(panel);
    const $=s=>panel.querySelector(s), voice=$('#ee-v-voice'), mainButton=$('.ee-v-main'), mute=$('.ee-v-mute'), audio=$('audio');
    function setStatus(mode,label){state.mode=mode;$('.ee-v-status').dataset.state=mode;$('.ee-v-status').textContent=label;}
    function error(text){$('.ee-v-error').textContent=text;$('.ee-v-error').hidden=!text;}
    function context(){return contextAPI.collect(document,focused,selection);}
    function format(sec){sec=Math.max(0,Math.floor(sec));return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');}
    function usage(){
      if(accessDenied){$('.ee-v-usage').textContent='Your free or paid access period has ended.';return;}
      const remaining=current?.deadline ? Math.max(0,(current.deadline-Date.now())/1000) : secondsLeft;
      $('.ee-v-usage').textContent=locked ? (registered?'Today’s voice limit is complete.':'Free voice practice is complete.') : registered?`${format(remaining)} left today`:`${questionsLeft} free questions · ${format(remaining)} left`;
    }
    function controls(){const running=!!current;voice.disabled=running;mainButton.textContent=running?'End conversation':'Start conversation';mainButton.disabled=locked;mute.disabled=!current?.active;}
    async function invoke(action,body={},signal){
      const {data,error:failure}=await client.functions.invoke('assistant_voice',{body:{action,guest_id:guestId,...body},...(signal?{signal}: {})});
      if(failure || data?.error){
        let info=data;
        try{if(failure?.context)info=await failure.context.clone().json();}catch{}
        const issue=new Error(info?.error || 'The voice service could not connect. Please try again.');issue.code=info?.code;issue.info=info;throw issue;
      }
      return data;
    }
    function requireSubscription(info={}){
      stop('access');accessDenied=true;registered=true;locked=true;
      setStatus('idle','Subscription required');error(info.error || info.message || 'Choose a subscription to continue using AI.');
      const link=document.createElement('a');link.className='ee-v-link';link.href='/billing';link.textContent='Choose a subscription';
      $('.ee-v-limit').replaceChildren(link);$('.ee-v-limit').hidden=false;usage();controls();
    }
    function applyUsage(d,r){
      if(accessDenied){usage();controls();return;}
      if(d.registered!=null)registered=!!d.registered;
      if(d.seconds_left!=null)secondsLeft=Number(d.seconds_left || 0);
      if(d.questions_left!=null)questionsLeft=Number(d.questions_left || 0);
      locked=secondsLeft<=0 || (!registered && questionsLeft<=0);$('.ee-v-limit').hidden=registered || !locked;
      if(r)r.deadline=Date.now()+secondsLeft*1000;usage();controls();
    }
    function isCurrent(r){return current===r && !r.cancelled;}
    async function endMeter(r){
      if(!r.sid || r.meterEnded)return;r.meterEnded=true;
      try{const d=await invoke('end',{voice_session_id:r.sid});if(!current && !destroyed)applyUsage(d);}catch{}
    }
    function disposeTransport(r){
      if(r.disposed)return;r.disposed=true;clearTimeout(r.closeTimer);
      try{r.dc?.close();}catch{}try{r.pc?.close();}catch{}
    }
    function stop(reason='user'){
      const r=current;if(!r)return;
      current=null;r.cancelled=true;
      r.timers.forEach(t=>{clearTimeout(t);clearInterval(t);});
      r.stream?.getTracks().forEach(t=>t.stop());
      r.analysers.forEach(a=>{try{a.source.disconnect();void a.ctx.close();}catch{}});
      audio.pause();audio.srcObject=null;$('.ee-v-play').hidden=true;
      state={mode:'idle',user:0,ai:0};
      try{
        if(r.dc?.readyState==='open'){
          r.dc.send(JSON.stringify({type:'session.close',event_id:'close_'+r.id}));
          r.closeTimer=setTimeout(()=>disposeTransport(r),1200);
        }else disposeTransport(r);
      }catch{disposeTransport(r);}
      void endMeter(r);controls();usage();mute.textContent='Mute mic';
      setStatus('idle',reason==='idle'?'Stopped after 10 seconds of silence':reason==='hidden'?'Conversation ended while page was hidden':'Ready to talk');
      track('ai_voice_session_ended',{source:'lesson_assistant',reason});
    }
    function limit(r){
      if(r && !isCurrent(r))return;
      stop('limit');locked=true;secondsLeft=0;$('.ee-v-limit').hidden=registered;
      setStatus('idle',registered?'Daily voice limit reached':'Free voice limit reached');usage();controls();
    }
    function analyser(r,stream,kind){
      try{
        const ctx=new(global.AudioContext||global.webkitAudioContext)();
        const node=ctx.createAnalyser();node.fftSize=512;
        const source=ctx.createMediaStreamSource(stream);source.connect(node);
        const entry={ctx,node,source,data:new Uint8Array(512),kind};r.analysers.push(entry);void ctx.resume().catch(()=>{});
      }catch{}
    }
    function level(entry){
      entry.node.getByteTimeDomainData(entry.data);let n=0;
      for(const sample of entry.data){const v=(sample-128)/128;n+=v*v;}
      return Math.max(0,Math.min(1,(Math.sqrt(n/entry.data.length)-.016)/.105));
    }
    async function consume(r){
      if(registered || r.consuming || !isCurrent(r))return;r.consuming=true;
      try{const d=await invoke('consume');if(!isCurrent(r))return;
        questionsLeft=Number(d.questions_left || 0);usage();
        if(questionsLeft<=0){r.finishAfterReply=true;r.finishDeadline=Date.now()+18000;}
      }catch(e){if(isCurrent(r)){if(/LIMIT/.test(e.code||''))limit(r);else{error('Usage check failed. Please start again.');stop('usage-error');}}}
      finally{r.consuming=false;}
    }
    function monitor(r){
      if(!isCurrent(r))return;const now=Date.now();let user=0,ai=0;
      for(const entry of r.analysers){const v=level(entry);if(entry.kind==='user')user=v;else ai=v;}
      state.user=state.user*.65+user*.35;state.ai=state.ai*.6+ai*.4;
      if(state.user>(state.ai>.07?.14:.065)){
        r.lastActivity=now;r.lastUser=now;
        if(!r.userTurn){r.userTurn=true;r.turnStart=now;r.voiced=0;}r.voiced++;
      }
      if(state.ai>.045){r.lastActivity=now;r.lastAi=now;r.replyPendingSince=null;if(r.finishAfterReply)r.finishStarted=true;}
      if(r.userTurn && now-r.lastUser>1050){const valid=now-r.turnStart>500 && r.voiced>4;r.userTurn=false;if(valid){r.replyPendingSince=now;void consume(r);}}
      if(r.finishAfterReply && ((r.finishStarted && now-r.lastAi>1400 && state.ai<.025) || now>r.finishDeadline)){limit(r);return;}
      if(now>=r.deadline){limit(r);return;}
      // Live has no completed-turn event. Protect the greeting and delayed replies,
      // then measure silence using actual audio levels and transcript activity.
      if(r.active && r.replyPendingSince!=null && now-r.replyPendingSince>=REPLY_WAIT_TIMEOUT_MS && state.user<.055 && state.ai<.04){stop('reply-timeout');error('The AI did not reply. Start again to continue.');return;}
      if(r.active && r.replyPendingSince==null && now-r.lastActivity>=IDLE_TIMEOUT_MS && state.ai<.04){stop('idle');return;}
      if(r.active){if(state.ai>.045)setStatus('speaking','Speaking…');else if(state.user>.055)setStatus('listening','Listening…');else if(r.userTurn || now-r.lastUser<1900)setStatus('thinking','Thinking…');else setStatus('idle','Ready — speak in your language');}
    }
    async function heartbeat(r){
      if(!isCurrent(r) || r.heartbeatBusy)return;r.heartbeatBusy=true;
      try{const d=await invoke('heartbeat',{voice_session_id:r.sid});if(!isCurrent(r))return;if(d.code==='SUBSCRIPTION_REQUIRED'){requireSubscription(d);return;}applyUsage(d,r);r.failures=0;if(d.allowed===false || secondsLeft<=0)limit(r);}
      catch{if(isCurrent(r) && ++r.failures>=2){error('Connection to the voice meter was lost. Start again to continue.');stop('meter-error');}}
      finally{r.heartbeatBusy=false;}
    }
    function waitIce(peer){
      if(peer.iceGatheringState==='complete')return Promise.resolve();
      return new Promise(resolve=>{let timer;const done=()=>{clearTimeout(timer);peer.removeEventListener('icegatheringstatechange',change);resolve();};const change=()=>{if(peer.iceGatheringState==='complete')done();};peer.addEventListener('icegatheringstatechange',change);timer=setTimeout(done,2500);});
    }
    function captions(r,message){
      const kind=message.type==='session.input_transcript.delta'?'user':message.type==='session.output_transcript.delta'?'assistant':null;
      if(!kind || typeof message.delta!=='string')return;
      if(message.delta.trim()){
        r.lastActivity=Date.now();
        r.replyPendingSince=kind==='user'?r.lastActivity:null;
      }
      r.captions[kind]=(r.captions[kind]+message.delta).slice(-1200);
      const el=$('.ee-v-caption');el.hidden=false;el.textContent=(kind==='user'?'You: ':'Evo: ')+r.captions[kind];el.scrollTop=el.scrollHeight;
    }
    async function start(){
      if(current || locked || destroyed)return;
      const r={id:++sequence,cancelled:false,active:false,timers:[],analysers:[],lastActivity:Date.now(),lastUser:0,lastAi:0,replyPendingSince:null,voiced:0,failures:0,captions:{user:'',assistant:''}};
      current=r;error('');$('.ee-v-caption').hidden=true;controls();setStatus('thinking','Connecting…');
      r.timers.push(setTimeout(()=>{if(isCurrent(r) && !r.active){stop('timeout');error('The voice connection timed out. Please try again.');}},45000));
      const ctx=context();lastContext=contextAPI.updateText(ctx);
      $('.ee-v-lesson').textContent=ctx?`${(ctx.level||'').replace('plus','+').toUpperCase()} · ${ctx.title}`:'Your English Voice Coach';
      try{
        if(!navigator.mediaDevices?.getUserMedia || !global.RTCPeerConnection)throw new Error('Voice is unavailable in this browser. Please use a current Chrome, Edge or Safari browser.');
        const access=await invoke('status');if(!isCurrent(r))return;applyUsage(access,r);if(locked){limit(r);return;}
        if(ctx && access.lesson_context_supported!==true)throw new Error('The lesson assistant update is not ready yet. Please try again after the site update.');
        r.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true},video:false});
        if(!isCurrent(r)){r.stream.getTracks().forEach(t=>t.stop());return;}
        analyser(r,r.stream,'user');r.pc=new RTCPeerConnection();r.dc=r.pc.createDataChannel('oai-events');
        r.pc.ontrack=async e=>{
          if(!isCurrent(r))return;const stream=e.streams?.[0] || new MediaStream([e.track]);
          audio.srcObject=stream;audio.muted=false;audio.volume=1;analyser(r,stream,'ai');
          try{await audio.play();}catch{if(isCurrent(r))$('.ee-v-play').hidden=false;}
        };
        r.dc.onmessage=e=>{
          let message;try{message=JSON.parse(e.data);}catch{return;}
          if(message.type==='session.closed'){disposeTransport(r);if(isCurrent(r))stop('remote');return;}
          if(!isCurrent(r))return;
          if(message.type==='session.started'){
            r.active=true;r.lastActivity=Date.now();r.replyPendingSince=r.lastActivity;clearTimeout(r.startTimer);controls();setStatus('idle','Ready — speak in your language');
            r.dc.send(JSON.stringify({type:'session.commentary.append',event_id:'greeting_'+r.id,delegation_id:null,content:'Greet the learner briefly now, in the lesson explanation language if supplied, otherwise English. Say that they can ask in any language. Offer help with the current lesson, then pause and listen.'}));
          }
          if(message.type==='error'){error('The AI could not process part of the conversation. You can end the session and try again.');}
          captions(r,message);
        };
        r.pc.onconnectionstatechange=()=>{if(isCurrent(r) && ['failed','disconnected','closed'].includes(r.pc.connectionState)){stop('connection');error('Connection ended. Start again to continue.');}};
        r.stream.getTracks().forEach(t=>r.pc.addTrack(t,r.stream));
        const offer=await r.pc.createOffer();if(!isCurrent(r))return;await r.pc.setLocalDescription(offer);await waitIce(r.pc);if(!isCurrent(r))return;
        const d=await invoke('session',{voice:voice.value,level:ctx?.level || 'b1',sdp:r.pc.localDescription?.sdp,...(ctx?{lesson_context:ctx}:{})});
        r.sid=d?.voice_session_id;
        if(!isCurrent(r)){void endMeter(r);return;}
        if(!d?.transport?.sdp || !r.sid)throw new Error('The voice service returned an incomplete connection. Please try again.');
        applyUsage(d,r);await r.pc.setRemoteDescription({type:'answer',sdp:d.transport.sdp});if(!isCurrent(r))return;
        r.lastActivity=Date.now();r.timers.push(setInterval(()=>monitor(r),120),setInterval(()=>void heartbeat(r),15000),setInterval(usage,1000));
        r.startTimer=setTimeout(()=>{if(isCurrent(r) && !r.active){stop('timeout');error('The voice connection timed out. Please try again.');}},20000);r.timers.push(r.startTimer);
        track('ai_voice_session_started',{source:'lesson_assistant',has_lesson_context:!!ctx,level:ctx?.level || 'b1'});
      }catch(e){
        if(!isCurrent(r))return;stop('error');
        if(e.code==='SUBSCRIPTION_REQUIRED'){requireSubscription(e.info);return;}
        if(/LIMIT/.test(e.code||'')){limit();return;}
        error(e.name==='NotAllowedError'?'Microphone access was not granted. Allow the microphone when you are ready.':e.message);
      }
    }
    function updateContext(){
      clearTimeout(updateTimer);updateTimer=setTimeout(()=>{
        const ctx=context();const next=contextAPI.updateText(ctx);
        if(ctx)$('.ee-v-lesson').textContent=`${(ctx.level||'').replace('plus','+').toUpperCase()} · ${ctx.title}`;
        if(!next || next===lastContext || !current?.active || current.dc?.readyState!=='open')return;
        lastContext=next;try{current.dc.send(JSON.stringify({type:'session.thinking.append',event_id:'lesson_ui_'+(++sequence),delegation_id:null,content:next}));}catch{}
      },500);
    }
    function open(prefill=''){
      if(destroyed)return;
      selection=String(prefill||'').trim().slice(0,320);panel.hidden=false;fab.setAttribute('aria-expanded','true');
      if(!orb && !orbPending)orbPending=global.EvoLessonOrb($('.ee-v-orb'),()=>state).then(value=>{orbPending=null;if(destroyed || panel.hidden)value.dispose();else orb=value;}).catch(()=>{orbPending=null;});
      track('ai_assistant_opened',{source:selection?'translator_popup':'floating_button',has_prefill:!!selection});
      if(current)updateContext();else if(autoStart)void start();
    }
    function close(){stop('close');panel.hidden=true;fab.setAttribute('aria-expanded','false');orb?.dispose();orb=null;selection='';fab.focus();}
    function focusTask(e){if(panel.contains(e.target))return;const found=e.target?.closest?.(contextAPI.taskSelector);if(found){focused=found;updateContext();}}
    function onChange(e){if(!panel.contains(e.target))updateContext();}
    function onClick(e){if(e.target?.closest?.('main,.main-wrapper,[data-evo-theory],.w-tab-link,[role="tab"]'))updateContext();}
    function onHidden(){if(document.hidden)stop('hidden');}
    function onPageHide(){stop('navigation');orb?.dispose();orb=null;panel.hidden=true;fab.setAttribute('aria-expanded','false');}
    function adjustFab(){const pop=document.getElementById('translate-popup');fab.style.bottom=pop?(innerHeight-pop.getBoundingClientRect().top+16)+'px':'';}
    const observer=new MutationObserver(adjustFab);observer.observe(document.body,{childList:true,subtree:true});
    fab.onclick=()=>panel.hidden?open():close();$('.ee-v-close').onclick=close;
    mainButton.onclick=()=>current?stop():void start();
    mute.onclick=()=>{const r=current;if(!r?.stream)return;r.muted=!r.muted;r.stream.getAudioTracks().forEach(t=>t.enabled=!r.muted);mute.textContent=r.muted?'Unmute mic':'Mute mic';};
    $('.ee-v-play').onclick=()=>{void audio.play().then(()=>$('.ee-v-play').hidden=true).catch(()=>error('Your browser blocked audio. Check this tab’s sound settings.'));};
    panel.onkeydown=e=>{if(e.key==='Escape'){e.preventDefault();close();}};
    document.addEventListener('focusin',focusTask);document.addEventListener('change',onChange);document.addEventListener('click',onClick);document.addEventListener('visibilitychange',onHidden);global.addEventListener('resize',adjustFab);
    function destroy(){destroyed=true;stop('navigation');orb?.dispose();observer.disconnect();clearTimeout(updateTimer);panel.remove();fab.remove();style.remove();document.removeEventListener('focusin',focusTask);document.removeEventListener('change',onChange);document.removeEventListener('click',onClick);document.removeEventListener('visibilitychange',onHidden);global.removeEventListener('resize',adjustFab);global.removeEventListener('pagehide',onPageHide);}
    global.addEventListener('pagehide',onPageHide);global.openAssistant=open;
    const api={open,close,destroy,version:VERSION};global.__evoLessonVoice=api;return api;
  }
  global.EvoLessonVoice={install,version:VERSION};
})(window);
