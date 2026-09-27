'use strict';

// Run after editing the A1 bank: node course-a1-preview/qa-content.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const bank = require('./bank.js');
const engine = require('./engine.js');
const i18n = require('./i18n.js');

vm.runInNewContext(fs.readFileSync(require.resolve('./i18n-extra.js'), 'utf8'), { EvoCourseI18n: i18n });
vm.runInNewContext(fs.readFileSync(require.resolve('./i18n-next.js'), 'utf8'), { EvoCourseI18n: i18n });
vm.runInNewContext(fs.readFileSync(require.resolve('./i18n-more.js'), 'utf8'), { EvoCourseI18n: i18n });

// Editorial evidence: each listening answer must be recoverable from the
// supplied transcript associated with that lesson's audio URL.
const evidence = {
  '1-l1': 'He is from Japan',
  '1-l2': 'There are eight students',
  '1-l3': 'She is from Mexico',
  '1-l4': 'he works as a waiter',
  '1-l5': 'plays the guitar',
  '1-l6': 'She is a nurse',
  '2-l1': 'I work in a supermarket',
  '2-l2': 'wake up at six thirty',
  '2-l3': 'I go to work by bike',
  '2-l4': 'drink coffee and eat a sandwich',
  '2-l5': 'travel and meet new people',
  '3-l1': 'I work in a café',
  '3-l2': 'wake up at seven o’clock',
  '3-l3': 'I go to work by bus',
  '3-l4': 'finish work at four o’clock',
  '3-l5': 'I meet my friends or stay at home',
  '4-l1': 'sitting on the sofa and studying Spanish',
  '4-l2': 'He is cooking lunch',
  '4-l3': 'She is doing her homework',
  '4-l4': 'He is washing the car',
  '4-l5': 'I am drinking tea and working on my computer',
  '5-l1': 'clean my apartment and do the laundry',
  '5-l2': 'meet my friend in a café',
  '5-l3': 'cook pasta at home',
  '5-l4': 'take a walk in the park',
  '5-l5': 'take some photos',
  '6-l1': 'make tea and listen to music',
  '6-l2': 'walking in the park and taking photos',
  '6-l3': 'On Fridays, I sometimes meet my friend in a café',
  '6-l4': 'If the weather is bad, I stay at home and cook pasta or soup',
  '6-l5': 'Free time helps me feel happy and calm.',
  '7-l1': 'I am a barista',
  '7-l2': 'I start work at eight o’clock',
  '7-l3': 'turn on the coffee machine and clean the tables',
  '7-l4': 'sandwiches and cakes',
  '7-l5': 'I like my job because the team is nice',
  '8-l1': 'We are four people',
  '8-l2': 'She works in a small shop',
  '8-l3': 'My dad is a bus driver',
  '8-l4': 'he likes football and computer games',
  '8-l5': 'we visit my grandparents or we go for a walk in the park',
  '9-l1': 'The walls are light blue',
  '9-l2': 'There is a bed next to the window',
  '9-l3': 'Near the bed, there is a small table and a lamp',
  '9-l4': 'I study English at my desk in the evening',
  '9-l5': 'my notebook, a pen, and my phone charger',
  '10-l1': 'I usually take the bus to work',
  '10-l2': 'The bus stop is near my home',
  '10-l3': 'especially at eight o’clock',
  '10-l4': 'the metro because it is faster than the bus',
  '10-l5': 'I use a taxi only when I am late or when it is raining',
  '11-l1': 'I wake up at 7:00',
  '11-l2': 'go to work by bus',
  '11-l3': 'I start work at 9:00',
  '11-l4': 'At lunchtime, I eat a sandwich or salad and talk to my coworkers',
  '11-l5': 'I go to bed at about 11:00',
  '12-l1': 'I am from Canada',
  '12-l2': 'I also study French',
  '12-l3': 'I learn French at a language school two evenings a week',
  '12-l4': 'My teacher is from France',
  '12-l5': 'she speaks Spanish'
};

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
assert.equal(bank.lessons.length, 12);
assert.equal(listeningCount, 61);
assert.equal(seen.size, 180);
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
for (const { code } of i18n.languages) assert.ok(/12|১২/.test(i18n.ui[code].pilot), `Old pilot count: ${code}`);
assert.equal(engine.compareSpeech('My name is Anna.','my name is anna').pass,true);
assert.equal(engine.compareSpeech("I'm Anna.",'I am Anna').pass,true);
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
  if(index===8){const previous=engine.restore({...state,version:5});assert.equal(previous.version,6);assert.ok(engine.unlocked(previous,9),'Lesson 10 must unlock for existing learners');}
}
assert.equal(Object.keys(state.completed).length,12);
assert.equal(state.xp,240);

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
for(let index=9;index<12;index++){
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
assert.equal(flowState.xp,240);

console.log(`Content QA passed: ${bank.lessons.length} lessons, ${seen.size} unique questions, ${listeningCount} transcript-backed listening answers, 20 rule translations.`);
