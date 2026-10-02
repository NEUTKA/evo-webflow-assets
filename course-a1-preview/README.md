# Evo-English · A1 guided-course pilot

The guided course pilot is available on the Webflow staging page at `https://evoenglish.webflow.io/a1-course-preview`. Open `index.html` through a local HTTP preview. The production site and Supabase are unchanged by this repository change.

## Lesson flow

The fifteen pilot lessons unlock in order. Every lesson follows the same path:

1. Grammar theory.
2. One-at-a-time grammar practice questions with a short retry for mistakes. Former open-ended writing items are now guided gap-fills with explicit accepted answers, so arbitrary free text cannot pass.
3. The supplied listening audio and optional transcript.
4. Five or six one-at-a-time listening questions based on that audio. The audio player appears on every question so learners can replay the recording at any time. Choice answers are shuffled once per attempt and keep their order while the learner answers.
5. English-only vocabulary with a reminder to use the site translator and Save to cards.
6. Two short English sentences to say aloud. The browser plays a spoken example and requests microphone access only when the learner starts recognition. It compares recognized words with the sentence and highlights missing words. If nothing is recognized within seven seconds, listening stops and the learner can retry or continue without a microphone. The next sentence waits until the previous recognition session has ended.
7. An open-ended speaking prompt and a link to AI Assistant.

There is no homework step. The lesson ends after speaking. Grammar practice and listening questions are separate, and every question occupies its own screen. Guided lesson mode uses the available phone viewport, hides the page footer, and prevents page scrolling; the optional transcript has its own bounded scroll area.

Feedback shows the correct answer for the current question alongside a short explanation; listening feedback also shows the supporting transcript line. Incorrect answers return once in a review phase. Hints are available, but a first answer after a hint is not counted as independent. The next lesson stays locked until the current lesson is complete. Repeat attempts do not add XP. The fifteen-lesson pilot awards 20 XP per first completion and tracks active-day streaks. Speech recognition does not contribute to XP or the first-try question score. Version 5 and 6 progress carries forward to the added lessons.

The map also offers a daily goal: finish one lesson or recall five distinct words. Review uses the unlocked lesson vocabulary (79 unique words across all fifteen lessons) and, when embedded on the same origin in an authenticated Webflow page, the learner's existing `cards` rows. A saved card keeps its own translation as the clue; a lesson-only card uses a short English definition. Learners can flip a card and self-rate it, or type the English word for automatic checking. Cards can play the word aloud but do not request microphone access. Missed words return once in the session and are scheduled for later review. Review state is stored in this browser, separate for guests and authenticated user IDs; it is not synced to the server. The Webflow card bridge was checked against a local same-origin mock, not a real authenticated account.

The source lessons are represented through adapted tasks and source labels in `bank.js`; selection and editorial decisions are documented in `../evo-study-path/a1-introductions-selection.md`.

## Sound feedback

The user-supplied `sounds/success.mp3` plays after a correct answer or recognized spoken sentence; `error.wav` after an incorrect grammar/listening answer; `lesson.wav` after an individual lesson; `module.wav` after the twelfth lesson; and `course.wav` is reserved for future A1–C1 completion. Sound toggle and preview controls are in the header/footer. Study audio is separate from these feedback cues.

Lessons 4–6 cover Present Continuous with Tom’s family-at-home recording, be going to with Anna’s weekend plans, and verbs followed by -ing with Anna’s free-time recording. The free-time recording contains Anna’s part; David’s supplied text is excluded until a matching recording is available. Lessons 7–9 cover jobs and a/an with Emma’s recording, family possessives with Anna’s family recording, and there is/are with Sofia’s bedroom recording. Lessons 10–12 use Anna’s city transport and daily routine recordings for place and time prepositions, then Emma’s countries-and-languages recording for questions with be and do. Lessons 13–15 cover adjectives with Anna’s description of Alex, articles with Anna’s apartment recording, and there versus it with Isabella’s village recording. Each new listening answer is supported by a phrase in the corresponding supplied transcript. The remainder of A1 is still being developed.

## Languages and integration

The interface uses the existing 20-language set, with English as the default and Arabic and Urdu RTL. English task text and answers stay unchanged. The prototype stores the selected language in `evo_lesson_language` on this browser. Vocabulary stays in English; users can select words and use the site translator and card-saving flow when connected to the production Webflow page.

Lesson speech recognition uses the browser Web Speech API. Support varies by browser; the service may send audio to an online provider. The lesson recognizer waits for a final result, ends each attempt before the next sentence, and stops after seven seconds without a result. While speaking practice is active, the course avoids HTML audio play/pause between attempts because that can stall subsequent recognition on iOS WebKit. It plays the existing success sound through Web Audio instead. Recognized words provide useful speaking practice but do not measure phoneme-level pronunciation. A browser that lacks recognition may still play the example and allow the learner to continue. When embedding the course in Webflow, the iframe must allow microphone access. No audio recording or transcript is stored by the course. Run `node qa-speech.js` to check two consecutive sentences with a simulated recognizer; real voice and microphone-permission testing still needs a device.

Production integration, authenticated lesson progress, AI Assistant embedding and the remaining A1 audio lessons are not part of this pilot. Automated content checks are in `qa-content.js`. The review card and controls were checked at 320×568 without page scrolling; a wrong first-lesson answer was checked for answer-specific feedback. Real spoken-input and microphone-permission checks still require manual testing on the published staging page.
