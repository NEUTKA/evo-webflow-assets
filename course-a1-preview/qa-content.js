'use strict';

// Run after editing the A1 bank: node course-a1-preview/qa-content.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const bank = require('./bank.js');
const engine = require('./engine.js');
const i18n = require('./i18n.js');

vm.runInNewContext(fs.readFileSync(require.resolve('./i18n-extra.js'), 'utf8'), { EvoCourseI18n: i18n });

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
  '6-l5': 'Free time helps me feel happy and calm.'
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
assert.equal(bank.lessons.length, 6);
assert.equal(bank.lessons[5].transcript.length, 14);
assert.ok(!JSON.stringify(bank.lessons[5]).includes('David'));
assert.ok(bank.lessons[3].items.find(q => q.id === '4-2').prompt.includes('sit'));
assert.ok(bank.lessons[3].items.find(q => q.id === '4-9').prompt.includes('wash'));
assert.ok(!engine.correct(bank.lessons[3].items.find(q => q.id === '4-2'), 'is lying'));
assert.ok(!engine.correct(bank.lessons[3].items.find(q => q.id === '4-9'), 'in'));
assert.equal(i18n.languages.length, 20);
for (const { code } of i18n.languages) assert.ok(i18n.ui[code].continuousSpelling, `Missing rule translation: ${code}`);

console.log(`Content QA passed: ${bank.lessons.length} lessons, ${seen.size} unique questions, ${listeningCount} transcript-backed listening answers, 20 rule translations.`);
