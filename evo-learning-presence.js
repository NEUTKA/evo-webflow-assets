(function () {
  'use strict';
  if (window.__evoLearningPresenceInit) return;
  window.__evoLearningPresenceInit = true;
  let client = null, currentUser = null, lastAttempt = 0, lastInteraction = Date.now(), pending = false;
  const visible = () => document.visibilityState !== 'hidden';
  async function record() {
    if (!client || !currentUser || !visible() || pending || Date.now() - lastAttempt < 120000) return;
    const userAtStart = currentUser;
    pending = true;
    lastAttempt = Date.now();
    try {
      const { error } = await client.rpc('evo_record_learning_visit');
      if (error && currentUser === userAtStart) lastAttempt = 0;
    } catch (_) { if (currentUser === userAtStart) lastAttempt = 0; }
    finally { pending = false; }
  }
  function active() { lastInteraction = Date.now(); }
  function resume() { if (visible()) { active(); void record(); } }
  async function initialize() {
    const start = Date.now();
    while (Date.now() - start < 15000) {
      client = window.evoSupabase || window.supabaseClient || window.supabase || window.sb;
      if (client?.auth?.getSession && typeof client.rpc === 'function') break;
      client = null;
      await new Promise(resolve => setTimeout(resolve,200));
    }
    if (!client) return;
    const apply = session => {
      const next = session?.user?.id || null;
      if (next !== currentUser) { currentUser = next; lastAttempt = 0; }
      // Do not await a Supabase call inside its auth-state callback.
      if (currentUser) setTimeout(() => { void record(); },0);
    };
    client.auth.onAuthStateChange?.((_event,session) => apply(session));
    try { const { data } = await client.auth.getSession(); apply(data?.session); } catch (_) {}
    window.addEventListener('focus',resume);
    window.addEventListener('pageshow',resume);
    document.addEventListener('visibilitychange',resume);
    for (const name of ['pointerdown','keydown','scroll','touchstart']) document.addEventListener(name,active,{passive:true});
    setInterval(() => { if (visible() && Date.now() - lastInteraction < 120000) void record(); },60000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initialize,{once:true});
  else void initialize();
})();
