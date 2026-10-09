(function(){
 const root=document.querySelector('.evp[data-evo-page="pricing"]');if(!root||root.__paymentsReady)return;root.__paymentsReady=true;
 let busy=false,access=null,pending=null;const q=new URLSearchParams(location.search);
 const copy={
 en:{consent:'I authorise VTB Armenia to save a recurring binding for my MIR card and charge {{amount}} AMD today, then {{amount}} AMD automatically every month. I can turn off automatic renewal in my account. If I pay during my trial, the paid month starts after the trial and the next charge follows that paid month.',
 subscribe:'Subscribe with MIR',login:'Please sign in to continue.',unconfirmed:'Please confirm your email before paying.',consentRequired:'Please read and accept the MIR monthly payment terms.',checking:'Checking your payment…',opening:'Opening the secure bank payment page…',pending:'The bank has not confirmed the payment yet. Please check again before making another payment.',retry:'Check payment status',failed:'The payment could not be completed. Please try again or contact support.',received:'Your payment was received. We are restoring your access. Please do not pay again.',success:'Payment confirmed. Your access is active.',free:'Your access is included through your teacher. No payment is required while the connection is active.',expired:'Your free or paid access period has ended. Choose a plan to continue.',role:'Please choose a plan for your account type.',active:'Your subscription already renews automatically. Manage it in your account.'},
 ru:{consent:'Я разрешаю ВТБ Армения сохранить привязку карты МИР и списать {{amount}} AMD сегодня, затем {{amount}} AMD автоматически каждый месяц. Автопродление можно отключить в личном кабинете. При оплате во время пробного периода оплаченный месяц начинается после него, а следующее списание — после оплаченного месяца.',
 subscribe:'Подписка с картой МИР',login:'Войдите в аккаунт для продолжения.',unconfirmed:'Перед оплатой подтвердите почту.',consentRequired:'Прочитайте и примите условия ежемесячной оплаты МИР.',checking:'Проверяем платёж…',opening:'Открываем защищённую страницу банка…',pending:'Банк пока не подтвердил платёж. Проверьте статус перед повторной оплатой.',retry:'Проверить статус платежа',failed:'Не удалось завершить оплату. Повторите попытку или обратитесь в поддержку.',received:'Платёж получен. Восстанавливаем доступ. Не оплачивайте повторно.',success:'Оплата подтверждена. Доступ активирован.',free:'Ваш доступ бесплатный благодаря преподавателю, пока связь активна.',expired:'Пробный или оплаченный период закончился. Выберите тариф для продолжения.',role:'Выберите тариф для своего типа аккаунта.',active:'Ваша подписка уже продлевается автоматически. Управляйте ею в личном кабинете.'},
 hy:{consent:'Ես թույլատրում եմ VTB Armenia-ին պահպանել իմ MIR քարտի կապակցումը և այսօր գանձել {{amount}} AMD, ապա՝ ամեն ամիս ավտոմատ {{amount}} AMD։ Ավտոմատ երկարացումը կարող եմ անջատել իմ անձնական հաշվում։ Փորձնական շրջանում վճարելու դեպքում վճարովի ամիսը սկսվում է փորձնական շրջանից հետո, իսկ հաջորդ գանձումը՝ վճարովի ամսից հետո։',
 subscribe:'Բաժանորդագրվել MIR քարտով',login:'Շարունակելու համար մուտք գործեք։',unconfirmed:'Վճարումից առաջ հաստատեք էլ. փոստը։',consentRequired:'Կարդացեք և ընդունեք MIR ամսական վճարման պայմանները։',checking:'Ստուգվում է վճարումը…',opening:'Բացվում է բանկի անվտանգ էջը…',pending:'Բանկը դեռ չի հաստատել վճարումը։ Նախ ստուգեք կարգավիճակը։',retry:'Ստուգել վճարումը',failed:'Վճարումը չի ավարտվել։ Փորձեք կրկին կամ գրեք աջակցությանը։',received:'Վճարումը ստացվել է։ Հասանելիությունը վերականգնվում է։ Մի վճարեք կրկին։',success:'Վճարումը հաստատված է։ Հասանելիությունն ակտիվ է։',free:'Ձեր հասանելիությունն անվճար է ուսուցչի հետ ակտիվ կապի շնորհիվ։',expired:'Անվճար կամ վճարովի շրջանն ավարտվել է։ Ընտրեք սակագին։',role:'Ընտրեք ձեր հաշվի համար համապատասխան սակագինը։',active:'Ձեր բաժանորդագրությունն արդեն ավտոմատ երկարացվում է։ Կառավարեք այն անձնական հաշվում։'}
 };
 const price={self_study_monthly:3900,teacher_starter:13900,teacher_pro:19900};
 const t=k=>(copy[root.getAttribute('lang')]||copy.en)[k]||copy.en[k];
 const home=r=>r==='teacher'?'/teacher-dashboard':r==='student'?'/student-dashboard':'/personal-account';
 function client(){const c=window.supabaseClient||window.supabase;return c?.auth&&c?.rpc&&c?.functions?c:null;}
 async function wait(){for(let n=0;n<100;n++){const c=client();if(c)return c;await new Promise(r=>setTimeout(r,100));}throw new Error('client_unavailable');}
 function message(kind,text){root.querySelectorAll('[data-pay-message]').forEach(el=>{el.className='evp__msg '+kind;el.textContent=text;});}
 function blocked(plan){return access&&(access.has_active_teacher||(access.role==='teacher'?plan==='self_study_monthly':plan.startsWith('teacher_')));}
 function setBusy(on){busy=on;root.querySelectorAll('[data-evo-pay]').forEach(b=>{b.disabled=on||!!pending||!!blocked(b.dataset.planKey);});}
 root.querySelectorAll('[data-evo-pay="vtb"]').forEach(btn=>{
  const label=document.createElement('label');label.className='evp__check evp__small';label.style.marginTop='14px';
  const input=document.createElement('input');input.type='checkbox';input.dataset.mirConsent='';input.autocomplete='off';
  input.style.cssText='appearance:auto!important;-webkit-appearance:checkbox!important;flex:0 0 20px!important;width:20px!important;min-width:20px!important;height:20px!important;opacity:1!important;accent-color:#2557f6;cursor:pointer;margin-top:3px';
  const text=document.createElement('span');text.dataset.mirTerms='';text.dataset.planKey=btn.dataset.planKey;
  label.append(input,text);btn.closest('.evp__card').append(label);
 });
 function refreshTerms(){root.querySelectorAll('[data-mir-terms]').forEach(el=>{el.textContent=t('consent').replaceAll('{{amount}}',new Intl.NumberFormat('en-GB').format(price[el.dataset.planKey]));});
  root.querySelectorAll('[data-evo-pay="vtb"]').forEach(b=>b.textContent=t('subscribe'));root.querySelectorAll('[data-check-payment]').forEach(b=>b.textContent=t('retry'));}
 refreshTerms();root.addEventListener('evo:language',refreshTerms);
 function retryButtons(){root.querySelectorAll('[data-pay-message]').forEach(el=>{if(el.parentNode.querySelector('[data-check-payment]'))return;
  const b=document.createElement('button');b.className='evp__btn';b.type='button';b.dataset.checkPayment='';b.textContent=t('retry');b.style.marginTop='10px';
  b.onclick=()=>pending&&wait().then(c=>verify(c,pending,0));el.after(b);});}
 async function loadAccess(c){
  const {data,error}=await c.rpc('evo_get_access_status');if(error||!data)throw new Error('access_unavailable');
  if(!data.ok)throw new Error(data.reason||'account_not_ready');
  access=data;setBusy(busy);if(access.has_active_teacher)message('ok',t('free'));
  else if(access.payment_required)message('bad',t('expired'));return data;
 }
 async function signedUser(c){
  const {data,error}=await c.auth.getUser();if(error||!data?.user){
   message('bad',t('login'));location.href='/login?tab=login&next='+encodeURIComponent(location.pathname+location.search);return null;}
  if(!data.user.email_confirmed_at)throw new Error('email_unconfirmed');return data.user;
 }
 async function verify(c,p,attempt){
  pending=p;setBusy(true);retryButtons();message('ok',t('checking'));
  try{
   if(!await signedUser(c))return;
   const {data,error}=await c.functions.invoke(p.mode==='mir'?'evo-vtb-subscription-status':'evo-one-time-payment-status',{body:{payment_id:p.id}});
   if(error)throw error;
   if(data?.paid){
    if(!data.processed||!data.access?.has_access){message('bad',t('received'));return;}
    message('ok',t('success'));sessionStorage.removeItem('evo.pending-payment.v1');pending=null;
    history.replaceState({},'',location.pathname);location.replace(home(data.access.role));return;
   }
   if(data?.status==='failed'||data?.status==='canceled'){pending=null;sessionStorage.removeItem('evo.pending-payment.v1');message('bad',t('failed'));return;}
   if(attempt<2){setTimeout(()=>verify(c,p,attempt+1),1800*(attempt+1));return;}
   message('bad',t('pending'));
  }catch{message('bad',t('pending'));}
  finally{setBusy(false);}
 }
 function errorText(code){return code==='email_unconfirmed'?t('unconfirmed'):code==='teacher_link_free_access'?t('free'):code==='subscription_already_renews'?t('active'):t('failed');}
 root.querySelectorAll('[data-evo-pay]').forEach(btn=>btn.addEventListener('click',async()=>{
  if(busy||pending)return;setBusy(true);
  try{
   const c=await wait();if(!await signedUser(c))return;await loadAccess(c);
   const plan=btn.dataset.planKey,mir=btn.dataset.evoPay==='vtb';
   if(blocked(plan)){message('bad',access.has_active_teacher?t('free'):t('role'));return;}
   if(mir&&!btn.closest('.evp__card').querySelector('[data-mir-consent]').checked){message('bad',t('consentRequired'));return;}
   message('ok',t('opening'));
   const {data,error}=await c.functions.invoke(mir?'evo-vtb-subscription-create':'evo-create-one-time-checkout',{
    body:mir?{plan_key:plan,recurring_consent:true,terms_version:'mir_monthly_amd_v1'}:{provider:'fastbank',plan_key:plan}});
   if(error){
    let payload;try{payload=await error.context.clone().json();}catch{}
    if(payload?.payment_id){pending={id:payload.payment_id,mode:mir?'mir':'one-time'};sessionStorage.setItem('evo.pending-payment.v1',JSON.stringify(pending));retryButtons();message('bad',t('pending'));return;}
    throw new Error(payload?.error||'payment_failed');
   }
   if(!data?.checkout_url||!data.payment_id)throw new Error('checkout_missing');
   const u=new URL(data.checkout_url);if(u.protocol!=='https:'||!['payment.vtb.am','gatepaysecure.com','epg.arca.am'].includes(u.hostname)||u.username||u.password||u.port)throw new Error('unsafe_checkout');
   pending={id:data.payment_id,mode:mir?'mir':'one-time'};sessionStorage.setItem('evo.pending-payment.v1',JSON.stringify(pending));location.assign(u.href);
  }catch(e){message('bad',errorText(e.message));}finally{setBusy(false);}
 }));
 const id=q.get('payment_id'),state=q.get('payment');
 if(id&&/^[0-9a-f-]{36}$/i.test(id)&&['success','failed','mir-return','mir-failed'].includes(state)){
  pending={id,mode:state.startsWith('mir-')?'mir':'one-time'};
 }else{try{pending=JSON.parse(sessionStorage.getItem('evo.pending-payment.v1')||'null');}catch{}}
 if(pending){setBusy(false);wait().then(c=>verify(c,pending,0)).catch(()=>message('bad',t('pending')));}
 else wait().then(async c=>{const {data}=await c.auth.getUser();if(data?.user)await loadAccess(c);}).catch(()=>message('bad',t('failed')));
})();
