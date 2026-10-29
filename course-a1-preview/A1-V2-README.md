# A1 Foundations — skills expansion, 2026-10-29

The production entry point is **a1-foundations.html**, a self-contained build for a same-origin Webflow `srcdoc` iframe. Install the pinned Webflow Embed supplied with this release. Do not use an older inline Embed or the historical modular `index.html` from an earlier commit.

The release adds 30 writing tasks, 30 real-life reading texts with 90 questions, 70 dialogue replies across 30 lessons, six mixed checkpoints, a separate final skills assessment and spaced review of mistakes. Existing grammar, listening, model-sentence repetition, sounds, word cards and site translation bridges are retained.

## Learning flow

Theory → grammar → listening → reading → vocabulary → model-sentence speaking → short writing → 2–4 spoken replies → lesson result.

Writing uses example → own answer → AI review → revision. There is no minimum word count. Important corrections must be resolved before the productive task is complete. A changed answer invalidates its old review. English learning texts remain in English; new interface copy is available in all 20 site languages. AI explanations use the selected language, while corrected English remains English. Non-EN/RU grammar hints reuse the translated rule with a contextual focus; listening hints identify the relevant transcript section when an exact match is available. These are localised guidance, not a claim that every sentence of the EN/RU hint bank was literally translated or reviewed by a native editor.

Each checkpoint has 15 questions: grammar, listening and reading from its preceding five lessons. The final has 30 objective questions, one from every lesson, plus its own writing task and four dialogue replies. Passing a check requires at least 80% in each objective skill; the final also requires successful productive tasks. This is a course practice threshold, not a validated CEFR certification.

The course percentage includes 37 milestones: 30 full lessons, six checkpoints and the final assessment. Completing lesson 30 alone does not complete the course. Legacy XP and lesson access are retained; old completion records are labelled as core tasks rather than newly completed productive skills.

## Existing site services

- Parent Webflow Supabase client aliases are reused; no parallel login or billing client is created.
- AI uses existing `assistant_rest` actions `writing_feedback` and `stt`. API/model credentials remain server-side.
- `assistant_rest` v96 adds an allowlisted feedback language and short-task mode. JWT and entitlement enforcement remain enabled.
- Detailed state uses `user_course_state`, owned by `auth.uid()`. Direct writes are revoked; the bounded `evo_save_a1_course_state` RPC uses revision checks and validates the account assertion against `auth.uid()`.
- Existing `user_lesson_progress` receives one `a1-foundations-course` summary. Progress is learner-reported, not an independently verified qualification.
- Guest work is not silently attached to an account. Account-specific local caches survive offline failures. Conflicting versions require an explicit choice. Exported backups retain owner information; a different account’s backup is rejected.

Microphone recording is optional: the learner can type a spoken reply. Recording is sent only after choosing Transcribe. The AI assesses transcript language, not acoustic pronunciation. Streams are stopped on exit and recording has a 60-second limit per reply.

## Sources and rebuild

`a1-foundations-sources-v2.json` contains the complete frontend source snapshot, with a SHA-256 for each file. It is a source package; it is not loaded by the student page. This keeps the exact build reproducible even if historical modular files in the branch are older.

Extract `files[].content` to `files[].path` inside a new working folder after checking that every resolved path remains inside that folder. Run `node build-full-course.cjs` there. The build uses `template-full.html` for the production header/account/translation bridge. Audio and sound resources remain pinned to commit `ae61e20388e3727583e2a39cdb7e2fab0210bf1a`.

Backend source backups, three SQL migrations and the database QA script are preserved in the local release folder `outputs/a1-expansion-20261029/`. They are not part of the frontend source package.

## Verification boundaries

Content checks cover all 540 objective lesson questions and all 20 locale dictionaries. Engine checks cover all 30 full paths, review invalidation, assessment scoring and spaced review. Browser checks use an isolated mocked AI/account provider: 5,070 new-screen states on 320×568, 390×844 and 1440×900, plus real control clicks, account switching, a full checkpoint and simulated recording/transcription. Existing speech-recognition lifecycle checks pass.

Database tests exercise RLS, two-account isolation, revision conflicts, account-change rejection and 37-milestone progress; test writes are rolled back. Public AI CORS and unauthenticated rejection are tested. A successful authenticated real AI/STT request from the newly published course, real Android Chrome/iPhone Safari microphone behaviour and native editorial review of all translations still require live acceptance checks after the owner publishes Webflow.
