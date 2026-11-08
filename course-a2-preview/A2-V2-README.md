# A2 Everyday English v2

Prepared 2026-11-08. Production entry point: `a2-everyday-v2.html`.

## Learning design

30 existing lesson identities, six blocks of five lessons, six checkpoints and a separate final skills assessment. The course keeps the Evo-English palette, cards, sounds, word-review interface and translation bridge.

Each lesson follows theory → grammar practice → supplied audio/listening questions → a short reading → vocabulary → optional model-sentence repetition → short writing → three everyday dialogue replies → result.

- 30 original short reading messages/notices, 55–72 words, with 120 questions: three choices and one short answer per lesson. Relevant evidence is shown after checking, including corrections.
- 30 writing tasks with models, content criteria and sentence support. Models are 44–52 words; suggested answer ranges guide learners and do not impose a minimum word-count gate.
- 90 own dialogue replies across the lessons. Learners can type a reply or optionally record, listen and choose Transcribe. Recording has a 60-second limit. AI evaluates transcript language and task completion, not acoustic pronunciation.
- The final adds its own writing task and four dialogue replies.
- The existing 180 grammar and 150 listening questions remain as the core question counts. Grammar in lessons 25, 27, 28 and 30 is revised to simpler A2 production. Their original audio remains intact; an English note explains that learners need not use every form they hear.

The 30 original recordings, transcripts, 150 vocabulary entries, saved-word integration and model-sentence practice are retained. Existing listening transcript disclosures expand alongside the same audio element.

Task design follows familiar routine situations and simple direct exchange of information, consistent with the [Council of Europe A2 global description](https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale). Word ranges and course pass thresholds are design choices, not official CEFR requirements or certification.

## Checks and completion

Each checkpoint samples 15 questions from its five lessons: five grammar, five listening and five reading. The final samples one question from each lesson, balanced at ten per skill. These are mixed course-review checks drawn from the lesson bank, not unseen exam forms. A fresh seed changes the sample/order on a retake where the bank permits it.

First submitted answers are locked; no hints or answer feedback appear before the results. Result snapshots retain their own source, audio and keys. Retakes keep up to ten immutable prior results per check. A later failed practice attempt does not remove an earned pass or course milestone. Passing requires at least 80% in each objective skill; the final also requires the productive tasks.

The progress denominator is 37 milestones: 30 full lessons, six passed checkpoints and the passed final. Thirty lessons alone are 81%, lessons plus checkpoints are 97%, and the final enables 100%. This percentage describes course practice, not an independently verified qualification.

Own writing and each dialogue answer require relevant current feedback to complete. Editing the text invalidates old feedback; changing an earlier dialogue reply invalidates later reviews. Incorrect objective retries remain in correction practice. Merely viewing a productive task cannot complete a lesson.

## Existing site services and storage

AI reuses the parent page's existing Supabase client and `assistant_rest` actions `writing_feedback` and `stt`. Requests explicitly use level A2, short-task mode, selected feedback language and the current lesson/turn. No new backend, login client, credentials, tables or account-sync API are introduced.

This A2 release retains the existing browser storage model. It does **not** add cross-device cloud progress sync. The key remains `evo.course.a2.preview.v1`; state version is 11. Existing card-review keys and the shared UI-language/sound preferences remain in use.

Legacy versions 1–10 migrate without losing lesson IDs, XP, study days, completed core records or in-progress drafts. On first load the original legacy JSON is also retained under `evo.course.a2.preview.v1.pre-v2` if that backup does not yet exist. Old completions are labelled core tasks, without claiming the new reading/writing/dialogue is done. For legacy completed lessons without unresolved errors, unchanged core grammar/listening is credited and the new flow can begin with reading. Revised core lessons require their new grammar practice.

Export/Restore supports the complete v2 state and vocabulary review. AI is available after login and subject to the site's existing access rules. Offline or guest text remains local; no synthetic AI pass is created. Recording is optional; typing supports devices without microphone access.

The 20 existing interface languages and the existing skill-component translations are retained. New learning texts/prompts remain English. Grammar/theory revisions have EN/RU copy; other locales retain the existing English fallback. A native editorial review of all translated UI strings was not performed.

## Sources and reproducible build

Canonical local authoring additions: `v2-content.cjs`, `v2-content-11-20.cjs`, `v2-content-21-30.cjs`; build logic: `build-v2.cjs`, `v2-runtime.cjs`, `v2-navigation.inc.js`, `v2-styles.css`. The historical `build.js` remains untouched and produces the older course; use `build-v2.cjs` for this edition.

Local build: `node build-v2.cjs`, then `node qa-v2.cjs`. The build adapts the existing skills components and writes the isolated `v2/` runtime. Original A2 source/runtime/standalone files are not overwritten.

The release source snapshot `a2-v2-sources.json` contains every assembled frontend file and its SHA-256. `rebuild-a2-v2.cjs` extracts this snapshot into a separate directory, verifies paths and hashes, and rebuilds an identical standalone HTML without depending on the current A1 directory. Original audio and feedback sounds remain remote; feedback sounds are pinned to the earlier A2 asset commit.

## Verification and release boundary

- 4,206 content/engine checks passed: every answer key, source preservation, all 30 lesson paths, correction loops, legacy states, changed-review invalidation, checkpoint/final scoring, history preservation and locale loading.
- Browser checks on 1440×900 and 320×568: reading, selection/feedback, mobile inner scrolling with accessible actions, own writing, the full three-reply flow and lesson result, guest AI rejection with text retained, all 15 checkpoint submissions and its result.
- The self-contained production HTML loaded in Chrome without JavaScript errors. Browser AI responses were isolated local fixtures; no real provider review or microphone recording was represented as tested.
- Authenticated AI/STT on the newly published Webflow page, physical iPhone/Android microphone behaviour, playback of all 30 original recordings and native translation editing remain acceptance checks. Original recording/transcript alignment has not been newly certified.

Use the new pinned Webflow Embed to replace the **existing A2 Embed**, then Save & Close → Publish. CDN availability alone does not change the existing Webflow page. Keep the old Embed for rollback; do not delete the legacy browser backup.
