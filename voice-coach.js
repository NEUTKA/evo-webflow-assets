
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import {createClient} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL="https://mwcvjqelccqgmvvydixi.supabase.co";
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y3ZqcWVsY2NxZ212dnlkaXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTE3MjgsImV4cCI6MjA2ODI2NzcyOH0.BmvFQnifp7scTPBcdQx7rOJgyijIE4EaWXMqloAiIoU";
const sb=createClient(SUPABASE_URL,SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});

const coach=document.getElementById("evo-voice-coach");
const section=coach.closest(".section_header54")||document.querySelector(".section_header54");
if(section&&coach.parentElement!==section)section.prepend(coach);

const $=id=>document.getElementById(id);
const orb=$("evo-ai-orb"),status=$("evc-status"),statusText=$("evc-status-text");
const startBtn=$("evc-start"),stopBtn=$("evc-stop"),voiceSel=$("evc-voice"),levelSel=$("evc-level");
const usage=$("evc-usage"),guestModal=$("evc-guest-modal"),dailyModal=$("evc-daily-modal"),dailyClose=$("evc-daily-close"),audio=$("evc-audio");

const GUEST_KEY="evo_voice_guest_id_v2";
let guestId=localStorage.getItem(GUEST_KEY);
if(!guestId){
  const uuid=()=>crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+"-"+Math.random().toString(36).slice(2);
  guestId=uuid()+"-"+uuid();localStorage.setItem(GUEST_KEY,guestId);
}

let isRegistered=false,timeUnlimited=false,accessDenied=false,questionsUsed=0,questionsLeft=10,voiceSecondsLeft=0,voiceSecondsLimit=0;
const GREETING_KEY="evo_voice_greeted_v1";let greeted=false,shouldGreet=false,introSent=false,replyPendingSince=null;
try{greeted=sessionStorage.getItem(GREETING_KEY)==="1"}catch{}
let voiceSessionId=null,pc=null,dc=null,micStream=null,sessionActive=false,connectionStarting=false;
let heartbeatTimer=null,idleTimer=null,hardStopTimer=null,heartbeatBusy=false,lastActivityAt=Date.now();
let userCtx=null,userAnalyser=null,userData=null,userSource=null,aiCtx=null,aiAnalyser=null,aiData=null,aiSource=null;
let smoothUser=0,smoothAi=0,userTurn=false,userTurnStart=0,lastUserVoiceAt=0,voicedFrames=0,consumeBusy=false;
let limitAfterResponse=false,limitResponseStarted=false,lastAiVoiceAt=0,limitDeadline=0,lastState="";

const HEARTBEAT_MS=15000,IDLE_MS=10000,REPLY_WAIT_MS=30000;

function setStatus(state,label){
  if(lastState===state&&statusText.textContent===label)return;
  lastState=state;status.dataset.state=state;statusText.textContent=label;
}
function formatTime(sec){sec=Math.max(0,Math.floor(Number(sec)||0));return Math.floor(sec/60)+":"+String(sec%60).padStart(2,"0")}
function updateUsage(){
  if(accessDenied)return;
  if(isRegistered&&timeUnlimited){usage.textContent="Unlimited voice practice";return}
  if(isRegistered){
    usage.textContent=voiceSecondsLeft<=0?"Daily 30-minute voice limit reached":formatTime(voiceSecondsLeft)+" voice time left today";
  }else{
    if(questionsLeft<=0||voiceSecondsLeft<=0){usage.textContent="Free Voice Coach limit reached";return}
    const q=questionsLeft===1?"1 free question left":questionsLeft+" free questions left";
    usage.textContent=q+" · "+formatTime(voiceSecondsLeft)+" trial time left";
  }
}
async function invokeVoice(body){
  const {data,error}=await sb.functions.invoke("assistant_voice",{body});
  if(!error)return data;
  let payload=null;
  try{if(error.context)payload=await error.context.clone().json()}catch{}
  const e=new Error(payload?.error||error.message||"Voice request failed");e.payload=payload;throw e;
}
function limitCode(error){return error?.payload?.code||""}
function isGuestLimit(code){return["GUEST_LIMIT_REACHED","GUEST_QUESTION_LIMIT_REACHED","GUEST_TIME_LIMIT_REACHED"].includes(code)}
function lockGuest(show=true){
  startBtn.disabled=true;voiceSel.disabled=true;levelSel.disabled=true;updateUsage();
  setStatus("ready","Free limit completed");if(show)guestModal.hidden=false;
}
function lockDaily(show=true){
  voiceSecondsLeft=0;startBtn.disabled=true;voiceSel.disabled=true;levelSel.disabled=true;updateUsage();
  setStatus("ready","Daily voice limit completed");if(show)dailyModal.hidden=false;
}
dailyClose.addEventListener("click",()=>dailyModal.hidden=true);

function applyUsage(d){
  if(d.registered!=null)isRegistered=!!d.registered;
  if(d.time_unlimited!=null||!isRegistered)timeUnlimited=isRegistered&&d.time_unlimited===true;
  if(timeUnlimited){voiceSecondsLeft=Infinity;voiceSecondsLimit=Infinity}
  else{voiceSecondsLeft=Number(d.seconds_left??voiceSecondsLeft);voiceSecondsLimit=Number(d.seconds_limit??voiceSecondsLimit)}
  if(!isRegistered){questionsUsed=Number(d.questions_used??questionsUsed);questionsLeft=Number(d.questions_left??questionsLeft)}
  updateUsage();
}
function requireSubscription(){
  accessDenied=true;stopVoice({keepLocked:true,reason:"subscription"});startBtn.disabled=true;voiceSel.disabled=true;levelSel.disabled=true;
  const link=document.createElement("a");link.href="/billing";link.textContent="Choose a subscription";usage.replaceChildren(link);setStatus("ready","Subscription required");
}
async function loadStatus(){
  try{
    const d=await invokeVoice({action:"status",guest_id:guestId});applyUsage(d);
    if(!isRegistered&&(questionsLeft<=0||voiceSecondsLeft<=0)){lockGuest(false);return false}
    if(isRegistered&&!timeUnlimited&&voiceSecondsLeft<=0){lockDaily(false);return false}
    return true;
  }catch(e){if(limitCode(e)==="SUBSCRIPTION_REQUIRED")requireSubscription();else{usage.textContent="Voice access could not be checked. Please try again.";setStatus("ready","Could not check access")}return false}
}

function makeAnalyser(kind,stream){
  if(!stream)return;
  const user=kind==="user";
  let ctx=user?userCtx:aiCtx,old=user?userSource:aiSource;
  if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();
  if(ctx.state==="suspended")ctx.resume().catch(()=>{});
  try{old?.disconnect()}catch{}
  const an=ctx.createAnalyser();an.fftSize=512;an.smoothingTimeConstant=.62;
  const data=new Uint8Array(an.fftSize),src=ctx.createMediaStreamSource(stream);src.connect(an);
  if(user){userCtx=ctx;userAnalyser=an;userData=data;userSource=src}else{aiCtx=ctx;aiAnalyser=an;aiData=data;aiSource=src}
}
function level(an,data){
  if(!an||!data)return 0;an.getByteTimeDomainData(data);let s=0;
  for(let i=0;i<data.length;i++){const v=(data[i]-128)/128;s+=v*v}
  return THREE.MathUtils.clamp((Math.sqrt(s/data.length)-.016)/.105,0,1);
}

async function consumeQuestion(){
  if(isRegistered||consumeBusy)return;
  consumeBusy=true;
  try{
    const d=await invokeVoice({action:"consume",guest_id:guestId});
    questionsUsed=Number(d.questions_used||0);questionsLeft=Number(d.questions_left??0);updateUsage();
    if(questionsLeft<=0){
      limitAfterResponse=true;limitResponseStarted=false;limitDeadline=performance.now()+18000;
    }
  }catch(e){
    console.error("Question limit error:",e);
    if(isGuestLimit(limitCode(e)))finishGuestLimit();
  }finally{consumeBusy=false}
}

function stopTimers(){
  if(heartbeatTimer)clearInterval(heartbeatTimer);
  if(idleTimer)clearInterval(idleTimer);
  if(hardStopTimer)clearTimeout(hardStopTimer);
  heartbeatTimer=idleTimer=hardStopTimer=null;
}
async function heartbeat(){
  if(!voiceSessionId||heartbeatBusy)return;
  heartbeatBusy=true;
  try{
    const d=await invokeVoice({action:"heartbeat",guest_id:guestId,voice_session_id:voiceSessionId});
    if(d.code==="SUBSCRIPTION_REQUIRED"){requireSubscription();return}
    applyUsage(d);
    if(d.allowed===false||(!timeUnlimited&&voiceSecondsLeft<=0))handleTimeLimit();
  }catch(e){console.error("Voice heartbeat error:",e)}
  finally{heartbeatBusy=false}
}
function startTimers(){
  stopTimers();lastActivityAt=Date.now();
  heartbeatTimer=setInterval(heartbeat,HEARTBEAT_MS);
  if(!timeUnlimited&&voiceSecondsLeft>0)hardStopTimer=setTimeout(handleTimeLimit,(voiceSecondsLeft+1)*1000);
  idleTimer=setInterval(()=>{
    if(!sessionActive||connectionStarting)return;
    if(replyPendingSince!=null&&Date.now()-replyPendingSince<REPLY_WAIT_MS)return;
    if(Date.now()-lastActivityAt>=IDLE_MS&&smoothAi<.04){
      stopVoice({reason:"idle"});
      setStatus("ready","Session ended after 10 seconds of inactivity");
    }
  },1000);
}
function handleTimeLimit(){isRegistered?finishDailyLimit():finishGuestLimit()}
function finishGuestLimit(){stopVoice({keepLocked:true,reason:"guest-limit"});lockGuest(true)}
function finishDailyLimit(){stopVoice({keepLocked:true,reason:"daily-limit"});lockDaily(true)}

function waitIce(peer){
  if(peer.iceGatheringState==="complete")return Promise.resolve();
  return new Promise(resolve=>{
    let done=false;const finish=()=>{if(done)return;done=true;peer.removeEventListener("icegatheringstatechange",check);resolve()};
    const check=()=>{if(peer.iceGatheringState==="complete")finish()};
    peer.addEventListener("icegatheringstatechange",check);setTimeout(finish,2500);
  });
}

async function startVoice(){
  if(sessionActive||connectionStarting)return;
  if(!isRegistered&&(questionsLeft<=0||voiceSecondsLeft<=0)){lockGuest(true);return}
  if(accessDenied)return;
  if(isRegistered&&!timeUnlimited&&voiceSecondsLeft<=0){lockDaily(true);return}
  connectionStarting=true;startBtn.disabled=true;voiceSel.disabled=true;levelSel.disabled=true;setStatus("thinking","Connecting…");

  try{
    if(!await loadStatus()){stopVoice({keepLocked:true});return}
    shouldGreet=!greeted;introSent=false;replyPendingSince=null;
    micStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
    makeAnalyser("user",micStream);

    pc=new RTCPeerConnection();
    pc.ontrack=async e=>{
      const stream=e.streams?.[0]||new MediaStream([e.track]);
      audio.srcObject=stream;audio.autoplay=true;audio.playsInline=true;audio.muted=false;audio.volume=1;
      makeAnalyser("ai",stream);try{await audio.play()}catch{}
    };

    dc=pc.createDataChannel("oai-events");
    dc.onmessage=e=>{
      try{
        const m=JSON.parse(e.data);
        if(m.type==="session.started"||m.type==="session.created"){
          sessionActive=true;connectionStarting=false;stopBtn.hidden=false;setStatus("ready","Ready — start speaking");
          lastActivityAt=Date.now();
          if(!introSent){introSent=true;if(shouldGreet){replyPendingSince=Date.now();dc.send(JSON.stringify({type:"session.commentary.append",event_id:"greeting_"+Date.now(),delegation_id:null,content:"Greet the learner briefly in English, then pause. They can ask in any language."}))}else replyPendingSince=null}
        }
        if((m.type==="session.input_transcript.delta"||m.type==="session.output_transcript.delta")&&m.delta?.trim()){lastActivityAt=Date.now();replyPendingSince=m.type==="session.input_transcript.delta"?Date.now():null;if(m.type==="session.output_transcript.delta"&&shouldGreet){greeted=true;shouldGreet=false;try{sessionStorage.setItem(GREETING_KEY,"1")}catch{}}}
        if(m.type==="error")console.error("OpenAI Live error:",m);
      }catch{}
    };

    pc.onconnectionstatechange=()=>{
      if(pc?.connectionState==="connected"){
        sessionActive=true;connectionStarting=false;stopBtn.hidden=false;
        setStatus("ready","Ready — start speaking");
      }
      if(["failed","disconnected"].includes(pc?.connectionState)){
        stopVoice();setStatus("ready","Connection ended");
      }
    };

    micStream.getTracks().forEach(t=>pc.addTrack(t,micStream));
    const offer=await pc.createOffer();await pc.setLocalDescription(offer);await waitIce(pc);

    const d=await invokeVoice({
      action:"session",guest_id:guestId,voice:voiceSel.value,level:levelSel.value,greet:shouldGreet,
      sdp:pc.localDescription?.sdp
    });

    if(!d?.transport?.sdp)throw new Error("OpenAI SDP answer missing");

    isRegistered=!!d.registered;
    voiceSessionId=d.voice_session_id||null;
    if(!voiceSessionId)throw new Error("Voice usage session ID missing");

    applyUsage(d);
    await pc.setRemoteDescription({type:"answer",sdp:d.transport.sdp});
    startTimers();
  }catch(e){
    console.error("Voice start error:",e);const c=limitCode(e);
    if(isGuestLimit(c)){finishGuestLimit();return}
    if(c==="SUBSCRIPTION_REQUIRED"){requireSubscription();return}
    if(c==="REGISTERED_DAILY_TIME_LIMIT_REACHED"){finishDailyLimit();return}
    stopVoice();setStatus("ready","Could not connect");
  }
}

function stopVoice(opts={}){
  const keepLocked=!!opts.keepLocked,sessionToEnd=voiceSessionId;
  voiceSessionId=null;stopTimers();sessionActive=false;connectionStarting=false;userTurn=false;voicedFrames=0;
  limitAfterResponse=false;limitResponseStarted=false;

  try{dc?.close()}catch{} dc=null;
  if(micStream){micStream.getTracks().forEach(t=>t.stop());micStream=null}
  try{pc?.close()}catch{} pc=null;
  try{audio.pause()}catch{} audio.srcObject=null;stopBtn.hidden=true;

  if(sessionToEnd){
    invokeVoice({action:"end",guest_id:guestId,voice_session_id:sessionToEnd})
      .then(d=>{if(d)applyUsage(d)})
      .catch(e=>console.warn("Voice session close meter:",e));
  }

  if(!keepLocked){
    startBtn.disabled=false;voiceSel.disabled=false;levelSel.disabled=false;
    if(opts.reason!=="idle")setStatus("ready","Ready to talk");
  }
}

startBtn.addEventListener("click",startVoice);
stopBtn.addEventListener("click",()=>stopVoice());

/* ---------- Three.js hologram ---------- */
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,100);
camera.position.set(0,0,7.3);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setClearColor(0x000000,0);renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(1,1,false);orb.appendChild(renderer.domElement);
const root=new THREE.Group();root.position.y=.15;scene.add(root);
const mobile=innerWidth<768,CORE=mobile?2600:4800,SHELL=mobile?800:1500;
const cb=new Float32Array(CORE*3),cp=new Float32Array(CORE*3),cn=new Float32Array(CORE);
for(let i=0;i<CORE;i++){const i3=i*3,u=Math.random(),v=Math.random(),th=Math.acos(2*u-1),ph=2*Math.PI*v,r=Math.cbrt(Math.random())*.92,x=Math.sin(th)*Math.cos(ph)*r,y=Math.cos(th)*r,z=Math.sin(th)*Math.sin(ph)*r;cb.set([x,y,z],i3);cp.set([x,y,z],i3);cn[i]=Math.random()*Math.PI*2}
const cg=new THREE.BufferGeometry();cg.setAttribute("position",new THREE.BufferAttribute(cp,3));
const cm=new THREE.PointsMaterial({color:0x91f1ff,size:mobile?.035:.027,transparent:true,opacity:.89,sizeAttenuation:true,depthWrite:false,blending:THREE.AdditiveBlending});
const gm=new THREE.PointsMaterial({color:0x55deff,size:mobile?.085:.066,transparent:true,opacity:.06,sizeAttenuation:true,depthWrite:false,blending:THREE.AdditiveBlending});
root.add(new THREE.Points(cg,cm),new THREE.Points(cg,gm));

const sb0=new Float32Array(SHELL*3),sp=new Float32Array(SHELL*3),sn=new Float32Array(SHELL);
for(let i=0;i<SHELL;i++){const i3=i*3,u=Math.random(),v=Math.random(),th=Math.acos(2*u-1),ph=2*Math.PI*v,r=1.33+Math.random()*.19,x=Math.sin(th)*Math.cos(ph)*r,y=Math.cos(th)*r,z=Math.sin(th)*Math.sin(ph)*r;sb0.set([x,y,z],i3);sp.set([x,y,z],i3);sn[i]=Math.random()*Math.PI*2}
const sg=new THREE.BufferGeometry();sg.setAttribute("position",new THREE.BufferAttribute(sp,3));
const sm=new THREE.PointsMaterial({color:0x6ee7ff,size:mobile?.021:.016,transparent:true,opacity:.25,sizeAttenuation:true,depthWrite:false,blending:THREE.AdditiveBlending});
root.add(new THREE.Points(sg,sm));

function ring(radius,rx,rz,count){
  const p=new Float32Array(count*3),b=new Float32Array(count*3),o=new Float32Array(count);
  for(let i=0;i<count;i++){const a=i/count*Math.PI*2,i3=i*3,x=Math.cos(a)*radius,z=Math.sin(a)*radius;p.set([x,0,z],i3);b.set([x,0,z],i3);o[i]=Math.random()*Math.PI*2}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(p,3));
  const m=new THREE.PointsMaterial({color:0x8dedff,size:mobile?.018:.014,transparent:true,opacity:.28,sizeAttenuation:true,depthWrite:false,blending:THREE.AdditiveBlending});
  const q=new THREE.Points(g,m);q.rotation.x=rx;q.rotation.z=rz;q.userData={b,o,m};return q
}
const rings=[ring(1.72,.18,0,240),ring(2.05,-.56,.32,280),ring(2.34,1.06,-.23,310)];root.add(...rings);

const clock=new THREE.Clock();let mode="idle";
function animate(){
  requestAnimationFrame(animate);const t=clock.getElapsedTime(),now=performance.now();
  const ru=level(userAnalyser,userData),ra=level(aiAnalyser,aiData);
  smoothUser=THREE.MathUtils.lerp(smoothUser,ru,ru>smoothUser?.42:.16);
  smoothAi=THREE.MathUtils.lerp(smoothAi,ra,ra>smoothAi?.48:.18);

  if(sessionActive&&!connectionStarting){
    const threshold=smoothAi>.07?.14:.065;
    if(smoothUser>threshold){
      lastActivityAt=Date.now();
      if(!userTurn){userTurn=true;userTurnStart=now;voicedFrames=0}
      lastUserVoiceAt=now;voicedFrames++;
    }
    if(smoothAi>.045){lastActivityAt=Date.now();replyPendingSince=null;if(shouldGreet){greeted=true;shouldGreet=false;try{sessionStorage.setItem(GREETING_KEY,"1")}catch{}}}

    if(userTurn&&now-lastUserVoiceAt>1050){
      const valid=now-userTurnStart>500&&voicedFrames>8;
      userTurn=false;voicedFrames=0;if(valid){replyPendingSince=Date.now();if(!isRegistered)consumeQuestion();}
    }
  }

  if(limitAfterResponse){
    if(smoothAi>.055){limitResponseStarted=true;lastAiVoiceAt=now}
    if(limitResponseStarted&&smoothAi<.022&&now-lastAiVoiceAt>1350)finishGuestLimit();
    if(now>limitDeadline)finishGuestLimit();
  }

  if(connectionStarting)mode="thinking";
  else if(!sessionActive)mode="idle";
  else if(smoothAi>.045)mode="speaking";
  else if(smoothUser>.055)mode="listening";
  else if(userTurn||now-lastUserVoiceAt<1900)mode="thinking";
  else mode="idle";

  if(sessionActive&&!connectionStarting){
    if(mode==="listening")setStatus("listening","Listening…");
    else if(mode==="thinking")setStatus("thinking","Thinking…");
    else if(mode==="speaking")setStatus("speaking","Speaking…");
    else setStatus("ready","Ready — keep talking");
  }

  let cs=1,ss=1,speed=.15;
  if(mode==="idle"){cs=1+Math.sin(t*1.1)*.018;ss=1+Math.sin(t*.8)*.014}
  if(mode==="listening"){cs=.97-smoothUser*.07;ss=.98-smoothUser*.035;speed=.21}
  if(mode==="thinking"){cs=1.01+Math.sin(t*3)*.02;ss=1.025;speed=.48}
  if(mode==="speaking"){cs=1.01+smoothAi*.17;ss=1.02+smoothAi*.09;speed=.26+smoothAi*.16}

  const ca=cg.attributes.position.array;
  for(let i=0;i<CORE;i++){const i3=i*3,s=cs+Math.sin(t*1.9+cn[i])*.013;ca[i3]=cb[i3]*s;ca[i3+1]=cb[i3+1]*s;ca[i3+2]=cb[i3+2]*s}
  cg.attributes.position.needsUpdate=true;

  const sa=sg.attributes.position.array;
  for(let i=0;i<SHELL;i++){const i3=i*3,s=ss+Math.sin(t*1.35+sn[i])*.012;sa[i3]=sb0[i3]*s;sa[i3+1]=sb0[i3+1]*s;sa[i3+2]=sb0[i3+2]*s}
  sg.attributes.position.needsUpdate=true;

  rings.forEach((q,k)=>{
    const a=q.geometry.attributes.position.array,{b,o,m}=q.userData;
    const e=mode==="speaking"?.11+smoothAi*.16:mode==="listening"?.06+smoothUser*.09:mode==="thinking"?.08:.025;
    for(let i=0;i<o.length;i++){const i3=i*3,r=1+Math.sin(t*(1.5+k*.3)+o[i])*e*.13;a[i3]=b[i3]*r;a[i3+1]=Math.sin(t*2.1+o[i])*e*.1;a[i3+2]=b[i3+2]*r}
    q.geometry.attributes.position.needsUpdate=true;q.rotation.y+=.0013+speed*.002;
    m.opacity=mode==="speaking"?.4+smoothAi*.24:mode==="thinking"?.36:mode==="listening"?.31+smoothUser*.1:.23;
  });

  root.rotation.y+=speed*.0025;root.rotation.x=Math.sin(t*.21)*.055;root.position.y=.15+Math.sin(t*.7)*.025;
  cm.opacity=mode==="speaking"?.85+smoothAi*.13:.82;
  gm.opacity=mode==="speaking"?.075+smoothAi*.1:mode==="thinking"?.075:.05;
  sm.opacity=mode==="speaking"?.28+smoothAi*.2:mode==="thinking"?.31:.22;
  renderer.render(scene,camera);
}
animate();

function resize(){
  const r=(section||coach).getBoundingClientRect(),w=Math.max(1,Math.round(r.width)),h=Math.max(1,Math.round(r.height));
  camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(w,h,false);
}
new ResizeObserver(resize).observe(section||coach);addEventListener("resize",resize);requestAnimationFrame(()=>requestAnimationFrame(resize));
document.addEventListener("pointerdown",()=>{userCtx?.resume?.().catch(()=>{});aiCtx?.resume?.().catch(()=>{})});

setStatus("ready","Ready to talk");
loadStatus();
