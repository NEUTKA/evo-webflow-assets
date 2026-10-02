// Regression check: two lesson sentences use separate recognizers.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const E=require('./engine.js');
const source=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
assert(!source.includes('data-action="card-mic"'));
assert(!source.includes('function listenCard()'));
const lifecycle=source.slice(source.indexOf('function clearMicTimers()'),source.indexOf('function exercise()'));
assert(!lifecycle.includes('audio.pause()'),'starting lesson recognition must not touch HTML audio');
assert(!lifecycle.includes("play('correct')"),'speech feedback must not play an HTML audio element');
assert(!lifecycle.includes('prepareSpeechSuccess()'),'microphone tap must not prepare playback audio');
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
const state={active:{lesson:0,speakingIndex:0}};
const context=vm.createContext({
 E,B:{lessons:[{speakingSentences:['I am Anna.','I am a student.']}]},state,
 window:{SpeechRecognition:Recognition,speechSynthesis:{cancel(){}}},
 audio:{pause(){throw Error('HTML audio pause during recognition');}},app:{querySelectorAll(){return[];}},render(){},
 prepareSpeechSuccess(){},playSpeechSuccess(){sounds.push('correct');},
 setTimeout:setTimer,clearTimeout:clearTimer
});
vm.runInContext('let micRecognition=null,micState="idle",speechFeedback=null,micTimer=null,micEndGuard=null;'+lifecycle+';globalThis.startTest=startRecognition;globalThis.resetTest=resetSpeech;globalThis.inspect=()=>({micState,speechFeedback,active:!!micRecognition});',context);
const result=transcript=>({results:[[{transcript}]]});
context.startTest();
assert.equal(sessions.length,1);
assert.equal(sessions[0].interimResults,false);
sessions[0].onresult(result('I am Anna'));
assert.equal(sessions[0].stopped,true);
sessions[0].onerror({error:'aborted'});
assert.equal(sessions[0].aborted,undefined,'a late error must not abort a recognized phrase');
sessions[0].onend();
assert.equal(context.inspect().micState,'pass');
assert.equal(context.inspect().active,false);
context.resetTest();
state.active.speakingIndex=1;
context.startTest();
assert.equal(sessions.length,2,'the second sentence gets a fresh recognizer');
assert.equal(sessions[1].started,true);
sessions[1].onresult(result('I am a student'));
sessions[1].onend();
assert.equal(context.inspect().micState,'pass','the second sentence is recognized');
assert.deepEqual(sounds,['correct','correct']);
tick(1500);
assert.equal(sessions[0].aborted,undefined,'success guard must be cleared after onend');
assert.equal(sessions[1].aborted,undefined,'second success guard must be cleared after onend');
sessions[0].onend();
assert.equal(context.inspect().micState,'pass','a late event from the first sentence has no effect');
context.resetTest();
context.startTest();
tick(7000);
assert.equal(sessions[2].aborted,true,'seven seconds of silence aborts recognition');
tick(800);
assert.equal(context.inspect().micState,'timeout');
assert.equal(context.inspect().active,false);
console.log('Speech QA passed: two consecutive lesson sentences, stale events and silence timeout.');
