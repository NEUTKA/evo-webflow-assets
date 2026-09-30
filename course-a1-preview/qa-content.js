'use strict';

// Run after editing the A1 bank: node course-a1-preview/qa-content.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const bank = require('./bank.js');
const engine = require('./engine.js');
const review = require('./review.js');
const reviewI18n = require('./review-i18n.js');
const i18n = require('./i18n.js');

vm.runInNewContext(fs.readFileSync(require.resolve('./i18n-extra.js'), 'utf8'), { EvoCourseI18n: i18n });
vm.runInNewContext(fs.readFileSync(require.resolve('./i18n-next.js'), 'utf8'), { EvoCourseI18n: i18n });
vm.runInNewContext(fs.readFileSync(require.resolve('./i18n-more.js'), 'utf8'), { EvoCourseI18n: i18n });

// Editorial evidence: each listening answer must be recoverable from the
// supplied transcript associated with that lesson's audio URL.
const evidence = require("./listening-evidence.js");

function canBuildOrder(question, picked = [], remaining = question.tokens.map((_, index) => index)) {
  if (!remaining.length) return engine.correct(question, picked);
  return remaining.some((index, position) => canBuildOrder(
    question,
    [...picked, index],
    remaining.filter((_, candidate) => candidate !== position)
  ));
}

const seen = new Set();
let listeningCount = 0;
for (const lesson of bank.lessons) {
  assert.ok(lesson.audio.startsWith('https://cdn.prod.website-files.com/'), lesson.id);
  assert.equal(lesson.items.length, lesson.id==='introduce'?9:10, `${lesson.id}: grammar item count`);
  assert.equal(lesson.listeningItems.length, lesson.id==='introduce'?6:5, `${lesson.id}: listening item count`);
  assert.equal(lesson.speakingSentences.length, 2, `${lesson.id}: speaking item count`);
  for (const sentence of lesson.speakingSentences) assert.ok(engine.speechWords(sentence).length >= 4, `${lesson.id}: short speaking sentence`);
  const transcript = engine.normalize(lesson.transcript.join(' '));
  for (const question of [...lesson.items, ...lesson.listeningItems]) {
    assert.ok(!seen.has(question.id), `Duplicate question ID: ${question.id}`);
    seen.add(question.id);
    if (question.type === 'choice') {
      assert.ok(question.options.includes(question.answer), `Answer absent from choices: ${question.id}`);
      assert.equal(new Set(question.options.map(engine.normalize)).size, question.options.length, `Duplicate choice: ${question.id}`);
    }
    if (question.type === 'order') {
      assert.ok(canBuildOrder(question), `Order cannot be solved: ${question.id}`);
      const banks=Array.from({length:12},(_,seed)=>engine.orderBank(question,seed+1));
      for(const bankOrder of banks){
        assert.equal(new Set(bankOrder).size,question.tokens.length,`Word bank lost a token: ${question.id}`);
        assert.ok(!engine.correct(question,bankOrder),`Word bank starts solved: ${question.id}`);
      }
      assert.ok(new Set(banks.map(order=>order.join(','))).size>1,`Word bank never changes: ${question.id}`);
    }
    if (question.type === 'input') {
      for (const answer of question.answers) assert.ok(engine.correct(question, answer), `Input answer rejected: ${question.id}`);
    }
  }
  for (const question of lesson.listeningItems) {
    listeningCount++;
    assert.ok(evidence[question.id], `Listening item lacks editorial evidence: ${question.id}`);
    assert.ok(transcript.includes(engine.normalize(evidence[question.id])), `Audio transcript does not support ${question.id}`);
  }
}
assert.equal(Object.keys(evidence).length, listeningCount);
assert.equal(bank.lessons.length, 15);
assert.equal(listeningCount, 76);
assert.equal(seen.size, 225);
assert.equal(bank.lessons[5].transcript.length, 14);
assert.ok(!JSON.stringify(bank.lessons[5]).includes('David'));
assert.ok(bank.lessons[3].items.find(q => q.id === '4-2').prompt.includes('sit'));
assert.ok(bank.lessons[3].items.find(q => q.id === '4-9').prompt.includes('wash'));
assert.ok(!engine.correct(bank.lessons[3].items.find(q => q.id === '4-2'), 'is lying'));
assert.ok(!engine.correct(bank.lessons[3].items.find(q => q.id === '4-9'), 'in'));
assert.equal(i18n.languages.length, 20);
for (const { code } of i18n.languages) assert.ok(i18n.ui[code].continuousSpelling, `Missing rule translation: ${code}`);
for (const { code } of i18n.languages) for (const key of ['l7','g7','l8','g8','l9','g9','aAn','pluralNouns','possessiveAdjectives','thereIsAre','placeWords','micPrompt','playModel','startMic','micListening','heardWords','micPassed','micRetry','micTimeout','micUnavailable','speechNotice','skipSpeech']) assert.ok(i18n.ui[code][key], `Missing ${key} translation: ${code}`);
for (const { code } of i18n.languages) for (const key of ['l10','g10','l11','g11','l12','g12','transportPoint','transportVehicle','timeAtInOn','timeNoPreposition','questionsWithBe','questionsWithDo','pilot','speakingText','transcriptLabel','replayAudio']) assert.ok(i18n.ui[code][key], `Missing ${key} translation: ${code}`);
for (const { code } of i18n.languages) for (const key of ['l13','g13','l14','g14','l15','g15','adjectiveBefore','adjectiveAfter','adjectiveNoPlural','articleFirst','articleSpecific','articleZero','thereExists','itRefers','itWeatherTime']) assert.ok(i18n.ui[code][key], `Missing ${key} translation: ${code}`);
for (const { code } of i18n.languages) assert.ok(/15|\u09e7\u09eb|\u06f1\u06f5/.test(i18n.ui[code].pilot), `Old pilot count: ${code}`);
assert.equal(engine.compareSpeech('My name is Anna.','my name is anna').pass,true);
assert.equal(engine.compareSpeech("I'm Anna.",'I am Anna').pass,true);
assert.equal(engine.compareSpeech('I wake up at seven.','I wake up at 7:00').pass,true);
assert.equal(engine.compareSpeech('I wake up at seven.','I wake up at 7').pass,true);
assert.equal(engine.compareSpeech('I wake up at seven.','I wake up at seven o’clock').pass,true);
assert.equal(engine.compareSpeech('I wake up at seven.','I wake up at 7:30').pass,false);
assert.equal(engine.compareSpeech('There are two pillows on the bed.','There are 2 pillows on the bed').pass,true);
assert.equal(engine.compareSpeech('I am a student.','I am a cat').pass,false);
assert.deepEqual(engine.compareSpeech('I am a student.','I am a cat').missingIndexes,[3]);
const oldState=engine.start(engine.initial(),0);
oldState.version=4;
oldState.active.phase='speaking';
assert.equal(engine.restore(oldState).active.phase,'speaking-practice');
let state=engine.initial();
for(let index=0;index<bank.lessons.length;index++){
  state=engine.start(state,index);
  state=engine.enterSpeaking(state);
  assert.equal(state.active.phase,'speaking-practice');
  const resumed=engine.restore(JSON.stringify(state));
  assert.equal(resumed.active.speakingIndex,0);
  state=engine.nextSpeaking(state);
  assert.equal(state.active.speakingIndex,1);
  state=engine.nextSpeaking(state);
  assert.equal(state.active.phase,'speaking');
  state=engine.finish(state,'2026-09-27').state;
  if(index===8){const previous=engine.restore({...state,version:5});assert.equal(previous.version,7);assert.ok(engine.unlocked(previous,9),'Lesson 10 must unlock for existing learners');}
  if(index===11){const previous=engine.restore({...state,version:6});assert.equal(previous.version,7);assert.ok(engine.unlocked(previous,12),'Lesson 13 must unlock for existing learners');}
}
assert.equal(Object.keys(state.completed).length,15);
assert.equal(state.xp,300);

// Complete the real grammar → listening → vocabulary → speaking path for the new lessons.
function correctDraft(question){
  if(question.type==='choice')return question.answer;
  if(question.type==='input')return question.answers[0];
  if(question.type==='order')return question.answer.split(' ').map(token=>question.tokens.indexOf(token));
  throw Error(`Unsupported new question type: ${question.id}`);
}
let flowState=engine.initial();
flowState.completed=Object.fromEntries(bank.lessons.slice(0,9).map(lesson=>[lesson.id,{lesson:0,firstCorrect:15,total:15,xp:20}]));
flowState.xp=180;
for(let index=9;index<15;index++){
  flowState=engine.start(flowState,index);
  for(const phase of ['grammar','listening']){
    if(phase==='listening')flowState=engine.startListening(flowState);
    const items=phase==='grammar'?bank.lessons[index].items:bank.lessons[index].listeningItems;
    for(const question of items){
      assert.equal(engine.current(flowState).id,question.id);
      const answer=correctDraft(question);
      assert.ok(!Array.isArray(answer)||answer.every(position=>position>=0),`Cannot build ${question.id}`);
      flowState=engine.draft(flowState,answer);
      const submitted=engine.submit(flowState);
      assert.equal(submitted.event,'correct',question.id);
      flowState=engine.next(submitted.state,'2026-09-27').state;
    }
    assert.equal(flowState.active.phase,phase==='grammar'?'listening-intro':'vocabulary');
  }
  flowState=engine.enterSpeaking(flowState);
  flowState=engine.nextSpeaking(flowState);
  flowState=engine.nextSpeaking(flowState);
  assert.equal(flowState.active.phase,'speaking');
  flowState=engine.finish(flowState,'2026-09-27').state;
  assert.equal(Object.keys(flowState.completed).length,index+1);
}
assert.equal(flowState.xp,300);

const catalogue=review.catalogue();
assert.equal(catalogue.length,79);
assert.ok(catalogue.every(card=>card.clue&&card.word&&card.id),'Every lesson word needs an English recall clue');
const merged=review.merge(catalogue,[{word:'COZY',translation:'уютный'},{word:'journey',translation:'путешествие'}]);
assert.equal(merged.length,80);
assert.equal(merged.find(card=>card.id==='cozy').source,'course+saved');
assert.equal(merged.find(card=>card.id==='journey').source,'saved');
assert.ok(review.answer(merged.find(card=>card.id==='cozy'),'Cozy!'));
let progress=review.initial();
assert.ok(review.due(merged,progress,'2026-09-30').length===5);
progress=review.grade(progress,'cozy',true,'2026-09-30');
assert.equal(progress.words.cozy.due,'2026-10-01');
assert.deepEqual(progress.days['2026-09-30'],['cozy']);
progress=review.grade(progress,'cozy',true,'2026-10-01');
assert.equal(progress.words.cozy.due,'2026-10-04');
assert.equal(review.due([merged.find(card=>card.id==='cozy')],progress,'2026-10-03').length,0);
assert.equal(review.due([merged.find(card=>card.id==='cozy')],progress,'2026-10-04').length,1);
assert.equal(review.restore(JSON.stringify(progress)).words.cozy.stage,2);
assert.equal(review.restore('bad JSON').version,1);
for(const {code} of i18n.languages)for(const key of ['reviewWords','dailyCards','sessionDone','flipTitle','recallTitle','flipMode','recallMode','flipCard','again','knowIt','typeWord','showAnswer','todayGoal','goalDone','goalPrompt','practiceThese','correctAnswer'])assert.ok(reviewI18n[code]?.[key]&&reviewI18n[code][key]!==key,`Missing card UI: ${code}/${key}`);

console.log(`Content QA passed: ${bank.lessons.length} lessons, ${seen.size} unique questions, ${listeningCount} transcript-backed listening answers, ${catalogue.length} review words, 20 interface languages.`);
