// webflow/evo-footer.js
(() => {
  // 1) Load supabase-js v2 if not already loaded
  function loadSupabaseLib() {
    return new Promise((resolve, reject) => {
      if (window.supabase && typeof window.supabase.createClient === "function") return resolve();
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      s.async = true;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Failed to load supabase-js"));
      document.head.appendChild(s);
    });
  }

  // 2) Create client (safe)
  function initClient() {
    // already created
    if (window.supabaseClient && window.supabaseClient.auth) return window.supabaseClient;

    const lib = window.supabase; // supabase-js library (createClient)
    if (!lib || typeof lib.createClient !== "function") {
      throw new Error("Supabase library not ready");
    }

    const client = lib.createClient(
      "https://mwcvjqelccqgmvvydixi.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y3ZqcWVsY2NxZ212dnlkaXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTE3MjgsImV4cCI6MjA2ODI2NzcyOH0.BmvFQnifp7scTPBcdQx7rOJgyijIE4EaWXMqloAiIoU",
      { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
    );

    // keep both references
    window.supabaseLib = lib;        // library (createClient)
    window.supabase = client;        // client (auth/from/rpc)
    window.supabaseClient = client;  // alias
    window.sb = client;              // alias
    return client;
  }

  async function boot() {
    try {
      await loadSupabaseLib();
      const sb = initClient();

      // next: initAuthUI(sb), initTranslator(sb), initAssistant(sb), initConsent(), etc.
      // console.log("[Evo] footer loaded", !!sb);

    } catch (e) {
      console.warn("[Evo] footer failed:", e?.message || e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();