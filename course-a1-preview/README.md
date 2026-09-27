# Evo-English · A1 guided-course pilot

The guided course pilot is also available on the Webflow staging page at `https://evoenglish.webflow.io/a1-course-preview`. Open `index.html` through the local preview at `http://127.0.0.1:8767/index.html`. The production site and Supabase are unchanged.

## Lesson flow

The six pilot lessons unlock in order. Every lesson follows the same path:

1. Grammar theory.
2. One-at-a-time grammar practice questions with a short retry for mistakes. Former open-ended writing items are now guided gap-fills with explicit accepted answers, so arbitrary free text cannot pass.
3. The supplied listening audio and optional transcript.
4. Five or six one-at-a-time listening questions based on that audio. The audio player appears on every question so learners can replay the recording at any time. Choice answers are shuffled once per attempt and keep their order while the learner answers.
5. English-only vocabulary with a reminder to use the site translator and Save to cards.
6. A speaking prompt and a link to AI Assistant.

There is no homework step. The lesson ends after speaking. Grammar practice and listening questions are separate, and every question occupies its own screen. Guided lesson mode uses the available phone viewport, hides the page footer, and prevents page scrolling; the optional transcript has its own bounded scroll area.

Feedback explains the grammar point and incorrect answers return once in a review phase. Hints are available, but a first answer after a hint is not counted as independent. The next lesson stays locked until the current lesson is complete. Repeat attempts do not add XP. The six-lesson pilot awards 20 XP per first completion and tracks active-day streaks.

The source lessons are represented through adapted tasks and source labels in `bank.js`; selection and editorial decisions are documented in `../evo-study-path/a1-introductions-selection.md`.

## Sound feedback

The user-supplied `sounds/success.mp3` plays after a correct answer; `error.wav` after an incorrect answer; `lesson.wav` after an individual lesson; `module.wav` after the sixth lesson; and `course.wav` is reserved for future A1–C1 completion. Sound toggle and preview controls are in the header/footer. Study audio is separate from these feedback cues.

Lessons 4–6 extend the sequence with Present Continuous and the supplied family-at-home recording, be going to and Anna’s weekend plans, then verbs followed by -ing with Anna’s free-time recording. The free-time recording contains Anna’s part; David’s supplied text is excluded from the listening questions and on-screen transcript until a matching recording is available. The remainder of A1 is still being developed.

## Languages and integration

The interface uses the existing 20-language set, with English as the default and Arabic and Urdu RTL. English task text and answers stay unchanged. The prototype stores the selected language in `evo_lesson_language` on this browser. Vocabulary stays in English; users can select words and use the site translator and card-saving flow when connected to the production Webflow page.

Production integration, authenticated progress, AI Assistant embedding, independent native-language review and the remaining A1 audio lessons are not part of this pilot. No browser visual check was completed for this revision because the browser tool blocked the local `file:` preview URL.
