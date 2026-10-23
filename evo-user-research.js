/* Evo-English voluntary learner research, version 1. */
import { createElement, X, MessageSquare } from 'https://cdn.jsdelivr.net/npm/lucide@0.468.0/+esm';

if (!window.__evoUserResearchV1) {
  window.__evoUserResearchV1 = true;
  const COPY = {
    en: {
      feedback: 'Feedback', invite: 'Help make Evo-English more useful', start: 'Share your experience', later: 'Not now', close: 'Close', back: 'Back', next: 'Next', send: 'Send feedback', sending: 'Sending…', optional: 'Optional',
      privacy: 'Your response is linked to your account. It is not published. Please do not include passwords, card details or other sensitive information.',
      goal: 'In which situation do you need English most right now?', goals: ['Work', 'Everyday conversations', 'Travel or moving abroad', 'An exam', 'Studies', 'Other'],
      example: 'Think of the last time your English was not enough. What were you trying to do?',
      visit: 'During your last visit to Evo-English, did you manage to do what you came for?', results: ['Yes', 'Partly', 'No', 'I was just exploring'], helped: 'What helped?', blocked: 'What got in the way?', exploring: 'What were you looking for?',
      lesson: 'Did this activity help you understand the topic?', helpful: ['Yes', 'Partly', 'No'], unclear: 'What is still unclear?',
      billing: 'What is stopping you from subscribing?', reasons: ['The benefit is unclear', 'The price', 'The payment method', 'A technical problem', 'I am not ready yet', 'Other'], detail: 'Tell us a little more',
      general: 'What helped, what did not, or what would you like to do?', thanks: 'Thank you for sharing your experience.', error: 'Your response could not be saved. Please try again.', required: 'Please select one answer.', textRequired: 'Please add a short comment.', unavailable: 'This survey is not available for this account or activity.', done: 'You have already shared feedback here. Thank you.', retry: 'Try again',
    },
  };
  const GOALS = ['work', 'daily', 'travel', 'exam', 'studies', 'other'];
  const RESULTS = ['yes', 'partly', 'no', 'browsing'];
  const REASONS = ['unclear_value', 'price', 'payment_method', 'technical_issue', 'not_ready', 'other'];
  let client, userId = null, generation = 0, dialog, form, floating, invitation, inviteTimer, previousFocus;
  let active = null, latestLesson = null, openedKind = null, entryNotice;
  const path = () => location.pathname.slice(0, 180);
  const isAccount = () => /^\/personal-account\/?$/.test(location.pathname);
  const isBilling = () => /^\/billing\/?$/.test(location.pathname);
  const uuid = () => crypto.randomUUID();
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (className?.split(/\s+/).includes('eur')) {
      node.lang = 'en';
      node.translate = false;
      node.classList.add('notranslate');
      node.setAttribute('data-evo-keep-english', '');
    }
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const copy = () => COPY.en;
  function button(label, handler, className = '') {
    const node = el('button', `eur-button ${className}`, label);
    node.type = 'button';
    node.addEventListener('click', handler);
    return node;
  }
  function closeButton(handler) {
    const node = button('', handler, 'eur-icon');
    node.title = copy().close;
    node.setAttribute('aria-label', copy().close);
    node.append(createElement(X, { width: 20, height: 20, 'aria-hidden': 'true' }));
    return node;
  }
  async function rpc(name, args, expected = generation) {
    if (!userId || expected !== generation) throw new Error('research_session_changed');
    let timer;
    const request = client.rpc(name, args);
    const pending = typeof request.abortSignal === 'function' ? request.abortSignal(AbortSignal.timeout(15000)) : request;
    let result;
    try {
      result = await Promise.race([pending, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('research_timeout')), 16000); })]);
    } finally { clearTimeout(timer); }
    const { data, error } = result;
    if (expected !== generation) throw new Error('research_session_changed');
    if (error) throw error;
    return data;
  }
  function action(kind, event, options = {}) {
    return rpc('evo_research_action', {
      p_kind: kind, p_action: event, p_request_id: options.requestId || uuid(),
      p_answers: options.answers || {}, p_tracking_slug: options.slug || null,
      p_language: 'en', p_context_path: path(),
    }, options.generation ?? generation);
  }
  function removeInvitation() {
    invitation?.remove();
    invitation = null;
  }
  function dismissInvitation(kind, slug) {
    removeInvitation();
    void action(kind, 'dismissed', { slug }).catch(() => {});
  }
  async function offer(kind, slug = null) {
    const scope = generation;
    if (!userId || active || invitation || document.visibilityState === 'hidden') return;
    try {
      const state = await rpc('evo_research_state', { p_kind: kind, p_tracking_slug: slug }, scope);
      if (!state?.eligible || active || invitation) return;
      const claim = await action(kind, 'shown', { slug, generation: scope });
      if (!claim?.claimed || scope !== generation || active || invitation) return;
      const text = copy();
      invitation = el('aside', `eur eur-invite ${kind === 'lesson' ? 'eur-invite-lesson' : ''}`);
      invitation.dataset.kind = kind;
      invitation.setAttribute('aria-label', kind === 'lesson' ? text.lesson : text.invite);
      const title = el('p', 'eur-invite-title', kind === 'lesson' ? text.lesson : text.invite);
      const controls = el('div', 'eur-actions');
      controls.append(button(text.start, () => void open(kind, slug), 'eur-primary'), button(text.later, () => dismissInvitation(kind, slug)));
      invitation.append(title, controls, closeButton(() => dismissInvitation(kind, slug)));
      const accountContent = document.querySelector('[data-evo-progress]') || document.querySelector('[data-evo-change-password]');
      const anchor = isAccount() && kind === 'goals' && (accountContent?.closest('.w-tabs') || accountContent);
      if (anchor) anchor.before(invitation);
      else { invitation.classList.add('eur-invite-floating'); document.body.append(invitation); }
    } catch (_) { /* Feedback must never interrupt learning or checkout. */ }
  }
  function ensureDialog() {
    if (dialog) return;
    dialog = el('dialog', 'eur eur-dialog');
    dialog.id = 'evo-research-dialog';
    dialog.setAttribute('aria-labelledby', 'eur-title');
    dialog.setAttribute('aria-describedby', 'eur-privacy');
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      close();
    });
    dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
    document.body.append(dialog);
  }
  function close(record = true) {
    if (!active) return;
    const current = active;
    active = null;
    dialog?.close();
    dialog?.replaceChildren();
    if (record && !current.saved && !current.busy) void action(current.kind, 'dismissed', { slug: current.slug }).catch(() => {});
    if (previousFocus?.isConnected) previousFocus.focus();
    previousFocus = null;
  }
  function message(text, kind = 'error') {
    if (!form) return;
    let node = form.querySelector('.eur-status');
    if (!node) { node = el('p', 'eur-status'); node.setAttribute('role', 'status'); form.append(node); }
    node.dataset.state = kind;
    node.textContent = text;
  }
  function entryError(text) {
    entryNotice?.remove();
    entryNotice = el('p', 'eur eur-entry-error', text);
    entryNotice.setAttribute('role', 'alert');
    document.body.append(entryNotice);
    const notice = entryNotice;
    setTimeout(() => notice.remove(), 8000);
  }
  function choices(key, title, values, labels, hideLegend = false) {
    const fieldset = el('fieldset', 'eur-fieldset');
    fieldset.append(el('legend', hideLegend ? 'eur-sr' : '', title));
    const list = el('div', 'eur-options');
    values.forEach((value, index) => {
      const label = el('label', 'eur-option');
      const input = el('input');
      input.type = 'radio'; input.name = key; input.value = value;
      input.checked = active.draft[key] === value;
      input.addEventListener('change', () => {
        active.draft[key] = value;
        if (key === 'visit_result') updateDetailLabel();
      });
      label.append(input, el('span', '', labels[index]));
      list.append(label);
    });
    fieldset.append(list);
    return fieldset;
  }
  function textarea(key, title, optional = true) {
    const block = el('div', 'eur-field');
    const label = el('label', '', title);
    label.htmlFor = `eur-${key}`;
    if (optional) label.append(el('span', 'eur-optional', copy().optional));
    const input = el('textarea');
    input.id = `eur-${key}`; input.name = key; input.maxLength = 1200;
    input.rows = 4; input.value = active.draft[key] || '';
    input.addEventListener('input', () => { active.draft[key] = input.value; });
    block.append(label, input);
    return block;
  }
  function updateDetailLabel() {
    const node = form?.querySelector('[for="eur-detail"]');
    if (!node || active.kind !== 'goals') return;
    const t = copy();
    node.replaceChildren(document.createTextNode(active.draft.visit_result === 'yes' ? t.helped : active.draft.visit_result === 'browsing' ? t.exploring : t.blocked), el('span', 'eur-optional', t.optional));
  }
  function render() {
    if (!active) return;
    const t = copy();
    dialog.replaceChildren();
    const top = el('div', 'eur-top');
    const title = el('h2', '', active.kind === 'goals' ? t.invite : active.kind === 'lesson' ? t.lesson : active.kind === 'billing' ? t.billing : t.feedback);
    title.id = 'eur-title';
    top.append(title, closeButton(() => close()));
    if (active.saved) {
      dialog.removeAttribute('aria-describedby');
      dialog.append(top, el('p', 'eur-success', t.thanks), button(t.close, () => close(false), 'eur-primary'));
      dialog.querySelector('button')?.focus();
      return;
    }
    form = el('form', 'eur-form');
    dialog.setAttribute('aria-describedby', 'eur-privacy');
    form.noValidate = true;
    if (active.kind === 'goals') {
      form.append(el('p', 'eur-step', `${active.step + 1} / 3`));
      if (active.step === 0) form.append(choices('goal', t.goal, GOALS, t.goals));
      if (active.step === 1) form.append(textarea('recent_example', t.example));
      if (active.step === 2) {
        form.append(choices('visit_result', t.visit, RESULTS, t.results), textarea('detail', t.blocked));
        updateDetailLabel();
      }
    } else if (active.kind === 'lesson') {
      form.append(choices('helpfulness', t.lesson, RESULTS.slice(0, 3), t.helpful, true), textarea('detail', t.unclear));
    } else if (active.kind === 'billing') {
      form.append(choices('reason', t.billing, REASONS, t.reasons, true), textarea('detail', t.detail));
    } else form.append(textarea('detail', t.general, false));
    const privacy = el('p', 'eur-privacy', t.privacy);
    privacy.id = 'eur-privacy';
    const controls = el('div', 'eur-actions eur-form-actions');
    if (active.kind === 'goals' && active.step > 0) controls.append(button(t.back, () => { active.step--; render(); focusQuestion(); }));
    const submit = el('button', 'eur-button eur-primary', active.kind === 'goals' && active.step < 2 ? t.next : t.send);
    submit.type = 'submit';
    controls.append(submit);
    form.append(privacy, controls);
    form.addEventListener('submit', event => { event.preventDefault(); void submitForm(); });
    dialog.append(top, form);
    if (active.snapshot) {
      form.querySelectorAll('input,textarea,button[type="button"]').forEach(node => { node.disabled = true; });
      submit.textContent = t.retry;
    }
    updateDetailLabel();
  }
  function focusQuestion() {
    dialog.querySelector('input:checked, input, textarea, [type="submit"]')?.focus();
  }
  async function submitForm() {
    if (!active || active.busy || active.saved) return;
    const current = active;
    const t = copy();
    const required = current.kind === 'goals' ? current.step === 0 ? 'goal' : current.step === 2 ? 'visit_result' : null : current.kind === 'lesson' ? 'helpfulness' : current.kind === 'billing' ? 'reason' : null;
    if (required && !current.draft[required]) { message(t.required); focusQuestion(); return; }
    if (current.kind === 'general' && (current.draft.detail || '').trim().length < 3) { message(t.textRequired); focusQuestion(); return; }
    if (current.kind === 'goals' && current.step < 2) { current.step++; render(); focusQuestion(); return; }
    current.busy = true;
    form.querySelectorAll('button,input,textarea').forEach(node => { node.disabled = true; });
    form.querySelector('[type="submit"]').textContent = t.sending;
    try {
      const answers = current.snapshot || Object.fromEntries(Object.entries(current.draft).map(([key, value]) => [key, String(value).trim()]));
      current.snapshot = answers;
      const result = await action(current.kind, 'submitted', { requestId: current.requestId, answers, slug: current.slug, generation: current.generation });
      if (active !== current) return;
      if (!result?.ok || !result.response_id && !result.already_submitted) throw new Error('research_save_not_confirmed');
      current.saved = true; current.busy = false;
      render();
    } catch (_) {
      if (active !== current) return;
      current.busy = false;
      form.querySelector('[type="submit"]').disabled = false;
      form.querySelector('[type="submit"]').textContent = t.retry;
      message(t.error);
    }
  }
  async function open(kind = 'general', slug = null) {
    if (!userId || active || openedKind) return;
    const scope = generation;
    openedKind = kind;
    try {
      const state = await rpc('evo_research_state', { p_kind: kind, p_tracking_slug: slug }, scope);
      if (scope !== generation) return;
      if (!state?.can_open) {
        if (state?.submitted) removeInvitation();
        entryError(state?.submitted ? copy().done : copy().unavailable);
        return;
      }
      previousFocus = document.activeElement;
      await action(kind, 'opened', { slug, generation: scope });
      if (scope !== generation) return;
      removeInvitation();
      active = { kind, slug, step: 0, draft: {}, requestId: uuid(), generation: scope, busy: false, saved: false };
      ensureDialog(); render(); dialog.showModal(); focusQuestion();
    } catch (_) {
      if (scope === generation) entryError(copy().error);
    } finally { if (scope === generation) openedKind = null; }
  }
  function mountEntries() {
    const t = copy();
    if (isBilling()) {
      const panels = document.querySelectorAll('[data-evo-page="billing"] [data-evp-panel]');
      panels.forEach(panel => {
        if (panel.querySelector('[data-evo-research-billing]')) return;
        const section = el('div', 'eur eur-billing-entry');
        section.dataset.evoResearchBilling = '';
        const link = button(t.billing, () => void open('billing'), 'eur-link');
        section.append(link);
        const checkout = panel.querySelector('[data-checkout-plan]')?.closest('section');
        if (checkout && panel.contains(checkout)) checkout.after(section);
        else (panel.querySelector('.evp__body') || panel).append(section);
      });
      if (!panels.length) {
        floating = button(t.billing, () => void open('billing'), 'eur eur-floating');
        document.body.append(floating);
      }
    } else if (isAccount() || document.querySelector('meta[name="evo-tracking-slug"]')) {
      floating = button(t.feedback, () => void open('general'), 'eur eur-floating');
        floating.prepend(createElement(MessageSquare, { width: 18, height: 18, 'aria-hidden': 'true' }));
      document.body.append(floating);
    }
  }
  function reset() {
    clearTimeout(inviteTimer);
    close(false); removeInvitation();
    floating?.remove(); floating = null;
    entryNotice?.remove(); entryNotice = null;
    document.querySelectorAll('[data-evo-research-billing]').forEach(node => node.remove());
    latestLesson = null; openedKind = null;
  }
  function applySession(session) {
    const next = session?.user?.id || null;
    if (next === userId) return;
    generation++; reset(); userId = next;
    if (!userId) return;
    mountEntries();
    if (isAccount()) inviteTimer = setTimeout(() => void offer('goals'), 8000);
  }
  function installStyle() {
    const style = el('style');
    style.id = 'evo-user-research-style';
    style.textContent = `
      .eur{font:400 15px/1.5 Inter,system-ui,-apple-system,"Segoe UI",sans-serif;color:#20262e;letter-spacing:0;box-sizing:border-box}
      .eur *{box-sizing:border-box;letter-spacing:0}.eur button,.eur input,.eur textarea{font:inherit}.eur button{cursor:pointer}.eur button:disabled{cursor:wait;opacity:.65}
      .eur-button{min-height:44px;padding:9px 14px;border:1px solid #bbc5d1;border-radius:6px;background:#fff;color:#26364a;font-weight:600;line-height:1.4;white-space:normal;overflow-wrap:anywhere}
      .eur-primary{background:#2557f6;border-color:#2557f6;color:#fff}.eur-button:hover{filter:brightness(.96)}.eur-button:focus-visible,.eur textarea:focus-visible,.eur input:focus-visible{outline:3px solid #9fb8ff;outline-offset:3px}
      .eur-icon{width:40px;height:40px;min-height:40px;display:grid;place-items:center;padding:8px;flex:0 0 40px;border:0;background:transparent}
      .eur-invite{position:relative;padding:18px 56px 18px 18px;border-block:1px solid #dce3ec;background:#f4f8ff;max-width:1080px;margin:16px auto;width:100%}.eur-invite>.eur-icon{position:absolute;right:8px;top:8px}
      .eur-invite-title{margin:0 0 12px;font-weight:650;font-size:17px;overflow-wrap:anywhere}.eur-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.eur-form-actions{margin-top:20px;justify-content:flex-end}
      .eur-invite-floating{position:fixed;z-index:990;left:16px;bottom:calc(78px + env(safe-area-inset-bottom));width:min(420px,calc(100% - 32px));border:1px solid #c7d6ea;border-radius:8px;box-shadow:0 6px 24px #15283e1a;margin:0}
      .eur-entry-error{position:fixed;z-index:1001;left:16px;bottom:calc(78px + env(safe-area-inset-bottom));width:min(420px,calc(100% - 32px));padding:14px;margin:0;border:1px solid #e7b4bf;border-radius:6px;background:#fff6f7;color:#a61b36;overflow-wrap:anywhere}
      .eur-floating{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:985;display:flex;align-items:center;gap:8px;max-width:calc(100% - 32px);box-shadow:0 3px 16px #15283e15;background:#fff}
      .eur-dialog{padding:24px;width:min(600px,calc(100% - 24px));max-height:calc(100dvh - 32px);overflow-y:auto;border:1px solid #d7dee7;border-radius:8px;box-shadow:0 18px 60px #11182738;background:#fff;margin:auto}.eur-dialog::backdrop{background:#11182766}
      .eur-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:18px}.eur-top h2{font-size:21px;font-weight:700;line-height:1.35;margin:0;overflow-wrap:anywhere;min-width:0}
      .eur-fieldset{padding:0;margin:0 0 18px;border:0;min-width:0}.eur-fieldset legend{font-weight:650;font-size:17px;line-height:1.45;margin-bottom:12px;padding:0;width:100%;overflow-wrap:anywhere}
      .eur .eur-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
      .eur-options{display:grid;gap:4px}.eur-option{display:flex;align-items:flex-start;gap:12px;padding:10px 8px;min-height:44px;border-radius:4px;cursor:pointer;overflow-wrap:anywhere}.eur-option:has(input:checked){background:#edf2ff}.eur-option input{accent-color:#2557f6;width:18px;height:18px;flex:0 0 18px;margin:3px 0 0}.eur-option span{min-width:0}
      .eur-field{margin:16px 0}.eur-field>label{display:block;font-size:17px;font-weight:650;line-height:1.45;margin-bottom:8px;overflow-wrap:anywhere}.eur-optional{display:block;font-weight:400;font-size:13px;color:#626c78;margin-top:3px}
      .eur textarea{display:block;width:100%;min-height:108px;resize:vertical;border:1px solid #aeb9c7;border-radius:6px;padding:10px;background:#fff;color:#20262e}.eur-privacy{font-size:12px;color:#626c78;margin:18px 0 0;overflow-wrap:anywhere}.eur-step{font-size:13px;color:#626c78;margin:0 0 14px}
      .eur-status{color:#a61b36;margin:14px 0 0;font-size:14px}.eur-success{color:#126541;margin:16px 0 24px;font-size:17px}.eur-billing-entry{padding:12px 0;border-top:1px solid #dce3ec}.eur-link{padding:4px 0;border:0;background:none;color:#1d4ed8;text-align:left;text-decoration:underline;text-underline-offset:3px}
      @media(max-width:480px){.eur-dialog{padding:18px 16px;max-height:calc(100dvh - 24px)}.eur-top h2{font-size:19px}.eur-invite{padding-left:14px}.eur-actions{gap:8px}.eur-form-actions .eur-button{flex:1}.eur-floating{font-size:14px}.eur-fieldset legend,.eur-field>label{font-size:16px}}
      @media(prefers-reduced-motion:reduce){.eur *{scroll-behavior:auto!important}}
    `;
    document.head.append(style);
  }
  async function initialize() {
    const start = Date.now();
    while (Date.now() - start < 20000) {
      client = window.evoSupabase || window.supabaseClient || window.supabase || window.sb;
      if (client?.auth?.getSession && typeof client.rpc === 'function') break;
      client = null;
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    if (!client) return;
    installStyle();
    client.auth.onAuthStateChange?.((_event, session) => setTimeout(() => applySession(session), 0));
    try { const { data } = await client.auth.getSession(); applySession(data?.session); } catch (_) { }
    window.addEventListener('evo:lesson-complete', event => {
      const slug = event.detail?.trackingSlug;
      if (!userId || !slug) return;
      latestLesson = slug;
      clearTimeout(inviteTimer);
      inviteTimer = setTimeout(() => void offer('lesson', slug), 1000);
    });
    window.EvoResearch = Object.freeze({ open: () => open('general') });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => void initialize(), { once: true });
  else void initialize();
}
