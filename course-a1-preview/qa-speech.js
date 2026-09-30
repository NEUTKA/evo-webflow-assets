// Deterministic checks for the lesson microphone lifecycle. Run with node qa-speech.js.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const E=require('./engine.js');
const source=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
const lifecycle=source.slice(source.indexOf('function clearMicTimers()'),source.indexOf('function exercise()'));
assert(lifecycle.includes('function startRecognition()'));

let now=0,nextTimer=0;
const timers=new Map(),sessions=[],sounds=[];
function setTimer(fn,delay){const id=++nextTimer;timers.set(id,{at:now+delay,fn});return id;}
function clearTimer(id){timers.delete(id);}
function tick(ms){const end=now+ms;while(true){const next=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];if(!next||next[1].at>end)break;now=next[1].at;timers.delete(next[0]);next[1].fn();}now=end;}
class Recognition{
 constructor(){sessions.push(this);}
 start(){this.started=true;}
 stop(){this.stopped=true;}
 abort(){this.aborted=true;}
}
const context=vm.createContext({
 E,B:{lessons:[{speakingSentences:['I am Anna.']}]},state:{active:{lesson:0,speakingIndex:0}},
 window:{SpeechRecognition:Recognition,speechSynthesis:{cancel(){}}},
 audio:{pause(){}},app:{querySelectorAll(){return[];}},render(){},play(cue){sounds.push(cue);},
 setTimeout:setTimer,clearTimeout:clearTimer
});
vm.runInContext('let micRecognition=null,micState="idle",speechFeedback=null,micTimer=null,micEndGuard=null,micHardTimer=null;'+lifecycle+';globalThis.startTest=startRecognition;globalThis.inspect=()=>({micState,speechFeedback,active:!!micRecognition});',context);
const result=(transcript,isFinal=false)=>({results:[Object.assign([{transcript}],{isFinal})]});

context.startTest();
assert.equal(sessions.length,1);
assert.equal(sessions[0].interimResults,true);
sessions[0].onresult(result('I am Anna',false));
assert.equal(sessions[0].stopped,true,'a complete interim sentence stops capture');
tick(800); // Browsers sometimes never fire onend after stop().
assert.equal(context.inspect().micState,'pass');
assert.equal(context.inspect().active,false);
assert.deepEqual(sounds,['correct']);

context.startTest();
assert.equal(sessions.length,2,'the next speaking task starts a new session');
tick(2000); // Mobile browsers may take a moment to begin capturing audio.
sessions[1].onaudiostart();
tick(6999);
assert.equal(context.inspect().active,true,'the seven-second window starts when audio capture begins');
tick(1);
assert.equal(sessions[1].aborted,true,'silent capture is aborted after seven seconds');
tick(800);
assert.equal(context.inspect().micState,'timeout');
assert.equal(context.inspect().active,false);

context.startTest();
sessions[2].onresult(result('I am',false));
sessions[2].onend();
assert.equal(context.inspect().micState,'mismatch');
assert.equal(context.inspect().speechFeedback.heard,'I am');
sessions[0].onend();
assert.equal(context.inspect().micState,'mismatch','late events from older sessions do not alter the current result');
console.log('Speech QA passed: interim result, silent timeout, next task and stale event.');
