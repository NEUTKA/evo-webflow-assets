/* evo-footer.js (global, loaded on all pages) */
(() => {
    if (window.__evoFooterJsLoaded) return;
    window.__evoFooterJsLoaded = true;

    /* ================== helpers ================== */
    function injectStyleOnce(id, css) {
        if (id && document.getElementById(id)) return;
        const st = document.createElement("style");
        if (id) st.id = id;
        st.textContent = css;
        document.head.appendChild(st);
    }

    function loadSupabaseLib() {
        return new Promise((resolve, reject) => {
            // Already have library?
            if (window.supabaseLib && typeof window.supabaseLib.createClient === "function") return resolve();

            // If window.supabase is still the library (before we overwrite it with client)
            if (window.supabase && typeof window.supabase.createClient === "function") {
                window.supabaseLib = window.supabase;
                return resolve();
            }

            // Load supabase-js v2
            const s = document.createElement("script");
            s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
            s.async = true;
            s.onload = () => {
                if (window.supabase && typeof window.supabase.createClient === "function") {
                    window.supabaseLib = window.supabase;
                    resolve();
                } else {
                    reject(new Error("Supabase library loaded but createClient not found"));
                }
            };
            s.onerror = () => reject(new Error("Failed to load supabase-js"));
            document.head.appendChild(s);
        });
    }

    function initClient() {
        // already created
        if (window.supabaseClient && window.supabaseClient.auth) return window.supabaseClient;

        const supabaseLib = window.supabaseLib || null;
        if (!supabaseLib || typeof supabaseLib.createClient !== "function") {
            throw new Error("Supabase library not ready");
        }

        const client = supabaseLib.createClient(
            "https://mwcvjqelccqgmvvydixi.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y3ZqcWVsY2NxZ212dnlkaXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTE3MjgsImV4cCI6MjA2ODI2NzcyOH0.BmvFQnifp7scTPBcdQx7rOJgyijIE4EaWXMqloAiIoU",
            { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
        );

        // keep BOTH (library + client)
        window.supabaseLib = supabaseLib; // library (createClient)
        window.supabase = client;         // client (auth/from/rpc) — IMPORTANT
        window.supabaseClient = client;   // alias
        window.sb = client;              // alias
        return client;
    }

    function waitSupabaseClient(maxMs = 7000) {
        return new Promise((res, rej) => {
            const t0 = Date.now();
            const t = setInterval(() => {
                const sb = window.supabaseClient || window.supabase || null;
                const ok = !!(sb && sb.auth && typeof sb.auth.getUser === "function");
                if (ok) { clearInterval(t); res(sb); }
                else if (Date.now() - t0 > maxMs) { clearInterval(t); rej(new Error("Supabase not ready")); }
            }, 120);
        });
    }

    /* ================== AUTH UI TOGGLE (login/logout) ================== */
    function initAuthUIToggleAndLogout() {
        injectStyleOnce("auth-ui", `
      [data-auth]{ display:none !important; }
      html.auth-logged-in  [data-auth="account"],
      html.auth-logged-in  [data-auth="logout"] { display:inline-flex !important; }
      html.auth-logged-out [data-auth="login"]  { display:inline-flex !important; }
    `);

        // Your original auth-ui script (fixed: no duplicate <script>)
        (() => {
            function when(cond, cb, tries = 120, delay = 100) {
                const t = setInterval(() => {
                    if (cond()) { clearInterval(t); cb(); }
                    else if (--tries <= 0) clearInterval(t);
                }, delay);
            }

            async function initAuthUI() {
                let sb;
                try { sb = await waitSupabaseClient(7000); }
                catch (e) { console.warn("[auth-ui]", e.message || e); return; }

                const apply = (session) => {
                    const root = document.documentElement;
                    const logged = !!(session && session.user);
                    root.classList.toggle("auth-logged-in", logged);
                    root.classList.toggle("auth-logged-out", !logged);
                    try { localStorage.setItem("auth.last", logged ? "in" : "out"); } catch { }
                    document.getElementById("auth-guard")?.remove();
                };

                try {
                    const { data: { user } } = await sb.auth.getUser();
                    apply({ user });
                } catch {
                    apply(null);
                }

                if (sb.auth.onAuthStateChange) {
                    sb.auth.onAuthStateChange((_evt, session) => apply(session));
                }

                const bindLogout = () => {
                    document.querySelectorAll('[data-auth="logout"]').forEach(btn => {
                        if (btn.__bound) return;
                        btn.__bound = true;
                        btn.addEventListener("click", async (e) => {
                            e.preventDefault();
                            btn.disabled = true;
                            try {
                                btn.textContent = "Logging out…";
                                await sb.auth.signOut();
                            } catch (err) {
                                console.error("[logout] signOut error:", err);
                            } finally {
                                try { localStorage.removeItem("cards.activeModuleId"); } catch { }
                                window.location.href = "/login";
                            }
                        });
                    });
                };

                bindLogout();
                new MutationObserver(bindLogout).observe(document.body, { childList: true, subtree: true });
            }

            when(() => document.readyState !== "loading", initAuthUI);
        })();
    }

    /* ================== TRANSLATOR POPUP ================== */
    function initTranslatorPopup() {
        (() => {
            if (window.__translatorInit) return;
            window.__translatorInit = true;

            const GUEST_LIMIT = 20;
            const QUOTA_KEY = "tr.quota.v1";
            const MAX_LEN = 240;
            const LANG_KEY = "tr.targetLang.v2";
            const LANGS_CACHE_KEY = "tr.langs.cache.v1";
            const LANGS_TTL_MS = 24 * 3600 * 1000; // 24h
            let reqId = 0, debounceT = null;

            const onCards = () => !!document.getElementById("cards-app");
            const esc = s => String(s).replace(/[&<]/g, m => m === "&" ? "&amp;" : "&lt;");
            const inPopup = el => el?.closest?.("#translate-popup");
            let selText = "", selTranslation = "";

            const FALLBACK_LANGS = [
                { language: "ru", name: "Russian" },
                { language: "hy", name: "Armenian" },
                { language: "en", name: "English" },
                { language: "es", name: "Spanish" },
                { language: "fr", name: "French" },
                { language: "de", name: "German" },
                { language: "tr", name: "Turkish" }
            ];

            function getDefaultLang() {
                try {
                    const saved = localStorage.getItem(LANG_KEY);
                    if (saved) return saved;
                } catch (e) { }
                const nav = (navigator.language || "ru").split("-")[0].toLowerCase();
                return nav || "ru";
            }
            function setLang(code) { try { localStorage.setItem(LANG_KEY, code); } catch (e) { } }
            function getLang() { return getDefaultLang(); }

            function readLangsCache() {
                try {
                    const raw = JSON.parse(localStorage.getItem(LANGS_CACHE_KEY) || "null");
                    if (!raw || !raw.at || !Array.isArray(raw.languages)) return null;
                    if ((Date.now() - raw.at) > LANGS_TTL_MS) return null;
                    return raw.languages;
                } catch (e) { return null; }
            }
            function writeLangsCache(langs) {
                try {
                    localStorage.setItem(LANGS_CACHE_KEY, JSON.stringify({ at: Date.now(), languages: langs }));
                } catch (e) { }
            }

            let ALL_LANGS = readLangsCache() || FALLBACK_LANGS;

            function langName(code) {
                code = String(code || "").toLowerCase();
                const x = (ALL_LANGS || []).find(l => String(l.language).toLowerCase() === code);
                return x?.name || code;
            }

            async function loadAllLanguages() {
                try {
                    if (!window.supabase?.functions?.invoke) return;
                    const { data, error } = await supabase.functions.invoke("languages", { body: null });
                    if (error) return;
                    const langs = data?.languages;
                    if (Array.isArray(langs) && langs.length > 50) {
                        ALL_LANGS = langs;
                        writeLangsCache(langs);
                        const sel = document.getElementById("popup-lang");
                        if (sel) {
                            const cur = getLang();
                            sel.innerHTML = langOptionsHtml(cur);
                            sel.value = cur;
                        }
                    }
                } catch (e) { }
            }

            function quotaState() {
                try {
                    const raw = JSON.parse(localStorage.getItem(QUOTA_KEY) || "{}");
                    if (typeof raw.remaining === "number" && typeof raw.limit === "number" && typeof raw.resetAt === "string") {
                        return raw;
                    }
                } catch { }
                return {
                    remaining: GUEST_LIMIT,
                    limit: GUEST_LIMIT,
                    resetAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString()
                };
            }
            function saveQuota(q) { try { localStorage.setItem(QUOTA_KEY, JSON.stringify(q)); } catch { } }
            function syncQuotaFromServer(payload) {
                if (!payload) return;
                const q = quotaState();
                if (typeof payload.limit === "number") q.limit = payload.limit;
                if (typeof payload.remaining === "number") q.remaining = payload.remaining;
                if (payload.reset_at) q.resetAt = payload.reset_at;
                saveQuota(q);
            }
            function isLoggedInSync() {
                const r = document.documentElement;
                return r.classList.contains("auth-logged-in") && !r.classList.contains("auth-logged-out");
            }

            function updateQuotaUI() {
                const box = document.getElementById("quota");
                if (!box) return;
                if (isLoggedInSync()) { box.textContent = ""; return; }
                const q = quotaState();
                box.textContent = `Guest translations left today: ${q.remaining}/${q.limit}`;
            }

            function loginCTA(reason = "Your daily limit is reached. Please log in or sign up.", opts = {}) {
                const { resetAt, retryAfterSec } = opts;
                const secondsLeft = (() => {
                    if (typeof retryAfterSec === "number" && retryAfterSec > 0) return retryAfterSec;
                    if (resetAt) {
                        const ms = new Date(resetAt).getTime() - Date.now();
                        if (ms > 0) return Math.ceil(ms / 1000);
                    }
                    return null;
                })();

                const fmt = (s) => {
                    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
                    return (h ? `${h}h ` : "") + (m ? `${m}m ` : "") + `${sec}s`;
                };

                const eta = secondsLeft
                    ? `<div style="margin-top:4px;color:#6b7280">Resets in <strong>${fmt(secondsLeft)}</strong> (≈ ${new Date(Date.now() + secondsLeft * 1000).toLocaleTimeString()}).</div>`
                    : "";

                const box = document.getElementById("translation");
                if (!box) return;
                const url = "https://www.evo-english.com/login";
                box.innerHTML = `
          <div style="margin:6px 0"><strong>${esc(reason)}</strong></div>
          <div>Log in or create an account to continue without limits.</div>
          ${eta}
          <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
            <a class="ee-btn" href="${url}">Log in</a>
            <a class="ee-btn" href="${url}">Create account</a>
          </div>`;
            }

            window.ttsEn = window.ttsEn || {
                speak(text = "") {
                    if (!text) return;
                    speechSynthesis.cancel();
                    const utt = new SpeechSynthesisUtterance(text);
                    utt.lang = "en-US";
                    const v = speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith("en"));
                    if (v) utt.voice = v;
                    speechSynthesis.speak(utt);
                }
            };
            if (speechSynthesis.onvoiceschanged === null) {
                speechSynthesis.onvoiceschanged = () => { };
            }

            function removePopup() { document.getElementById("translate-popup")?.remove(); }

            function langOptionsHtml(current) {
                current = String(current || "").toLowerCase();
                const list = (ALL_LANGS || []).slice().sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
                const hasCurrent = list.some(l => String(l.language).toLowerCase() === current);
                const extra = hasCurrent ? "" : `<option value="${esc(current)}">${esc(current)}</option>`;
                const opts = list.map(l => {
                    const code = String(l.language || "").toLowerCase();
                    const name = String(l.name || code);
                    return `<option value="${esc(code)}"${code === current ? " selected" : ""}>${esc(name)}</option>`;
                }).join("");
                return extra + opts;
            }

            function showPopup(word) {
                removePopup();
                const currentLang = getLang();

                const el = document.createElement("div");
                el.id = "translate-popup";
                el.style.cssText = `
          position:fixed;right:20px;bottom:20px;z-index:9999;background:#fff;
          border:1px solid #ccc;border-radius:12px;padding:12px 16px;max-width:380px;
          font:14px system-ui;box-shadow:0 0 12px rgba(0,0,0,.25);user-select:none;
        `;
                el.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
            <div style="min-width:0"><strong>Word:</strong> <span id="popup-word">${esc(word)}</span></div>
            <button id="popup-say" class="ee-btn" title="Speak">🔊</button>
          </div>

          <div style="margin-top:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <div style="color:#6b7280;font-size:12px">Translate to:</div>
            <select id="popup-lang" class="ee-btn" style="padding:6px 10px;border-radius:10px;border:1px solid #d1d5db;background:#fff;max-width:240px">
              ${langOptionsHtml(currentLang)}
            </select>
          </div>

          <div id="translation" style="margin-top:8px;"><em>Translating to ${esc(langName(currentLang))}…</em></div>
          <div id="quota" style="margin-top:6px;color:#6b7280"></div>

          <div id="popup-buttons" style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
            <button id="popup-save" class="ee-btn">⭐ Save&nbsp;to&nbsp;cards</button>
            <button id="popup-ask"  class="ee-btn">🤖 Ask&nbsp;AI</button>
            <button id="popup-close"class="ee-btn">Close</button>
          </div>
        `;
                document.body.appendChild(el);

                el.querySelector("#popup-say").onclick = () => window.ttsEn.speak(word);
                el.querySelector("#popup-close").onclick = removePopup;
                el.querySelector("#popup-save").onclick = saveCard;
                el.querySelector("#popup-ask").onclick = () => { removePopup(); window.openAssistant(selText || word); };

                el.querySelector("#popup-lang").addEventListener("change", (e) => {
                    const code = String(e.target.value || "").trim().toLowerCase();
                    if (!code) return;
                    setLang(code);
                    const box = document.getElementById("translation");
                    if (box) box.innerHTML = `<em>Translating to ${esc(langName(code))}…</em>`;
                    translateWord(selText || word);
                });

                updateQuotaUI();
                adjustFab();
                loadAllLanguages();
            }

            async function translateWord(word) {
                const thisReq = ++reqId;
                const target = getLang();

                try {
                    const { data, error } = await supabase.functions.invoke("translate", {
                        body: { q: word, target }
                    });

                    if (error) {
                        const status = error?.status ?? error?.context?.response?.status;

                        let bodyJson = null;
                        try {
                            const raw = error?.context?.response?.body;
                            bodyJson = typeof raw === "string" ? JSON.parse(raw) : raw;
                        } catch { }

                        const hdrs = error?.context?.response?.headers || {};
                        const getHdr = (k) => {
                            if (!hdrs) return null;
                            if (typeof hdrs.get === "function") return hdrs.get(k);
                            const key = Object.keys(hdrs).find(x => x.toLowerCase() === k.toLowerCase());
                            return key ? hdrs[key] : null;
                        };

                        const retryAfterSec = Number(getHdr("Retry-After")) || null;
                        const resetAtHdr = getHdr("X-RateLimit-Reset") || null;
                        const resetAtBody = bodyJson?.reset_at || null;

                        const isOurGuestLimit = status === 429 && (bodyJson?.error === "free_limit_reached");

                        if (isOurGuestLimit || (status === 429 && quotaState().remaining === 0)) {
                            syncQuotaFromServer({
                                limit: GUEST_LIMIT,
                                remaining: 0,
                                reset_at: resetAtBody || resetAtHdr
                            });
                            updateQuotaUI();

                            return loginCTA("Your daily limit is reached. Please log in or sign up.", {
                                resetAt: resetAtBody || resetAtHdr,
                                retryAfterSec
                            });
                        }

                        const box = document.getElementById("translation");
                        if (box) box.textContent = "Service is busy. Please try again in a minute.";
                        return;
                    }

                    if (thisReq !== reqId) return;

                    if (typeof data?.remaining === "number") {
                        syncQuotaFromServer(data);
                        updateQuotaUI();
                    }

                    selTranslation = data.translation || "";
                    const box = document.getElementById("translation");
                    if (box) box.innerHTML = `<strong>Translation (${esc(langName(target))}):</strong> ${esc(selTranslation)}`;

                } catch (e) {
                    const box = document.getElementById("translation");
                    if (box) box.textContent = "Error: " + (e.message || e);
                }
            }

            async function getActiveModule(uid) {
                let mid = localStorage.getItem("cards.activeModuleId");
                if (mid) return mid;
                const { data } = await supabase.from("modules").select("id").eq("user_id", uid).limit(1);
                mid = data?.[0]?.id;
                if (!mid) {
                    const { data: n } = await supabase.from("modules").insert({ user_id: uid, name: "Module 1" }).select("id").single();
                    mid = n.id;
                }
                localStorage.setItem("cards.activeModuleId", mid);
                return mid;
            }

            async function saveCard() {
                const btn = document.getElementById("popup-save");
                btn.disabled = true; btn.textContent = "Saving…";
                try {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (!user) throw new Error("Login first");
                    await supabase.from("cards").upsert({
                        user_id: user.id,
                        module_id: await getActiveModule(user.id),
                        word: selText,
                        translation: selTranslation
                    }, { onConflict: "user_id,module_id,word_norm" });

                    btn.textContent = "Saved ✓";
                    setTimeout(removePopup, 800);
                } catch (e) {
                    alert(e.message || e);
                    btn.disabled = false;
                    btn.textContent = "⭐ Save to cards";
                }
            }

            function adjustFab() {
                const fab = document.getElementById("ee-fab");
                if (!fab) return;
                const pop = document.getElementById("translate-popup");
                fab.style.bottom = pop ? (window.innerHeight - pop.getBoundingClientRect().top + 16) + "px" : "22px";
            }
            new MutationObserver(adjustFab).observe(document.body, { childList: true, subtree: true });
            window.addEventListener("resize", adjustFab);

            function handleSel(e) {
                if (onCards() || inPopup(e.target)) return;
                const txt = (getSelection().toString() || "").trim();
                if (!txt || txt.length > MAX_LEN) return;

                selText = txt;
                selTranslation = "";
                showPopup(txt);

                clearTimeout(debounceT);
                debounceT = setTimeout(() => translateWord(txt), 150);
            }

            document.addEventListener("mouseup", handleSel, true);
            document.addEventListener("touchend", handleSel, true);
        })();
    }

    /* ================== CHAT-ASSISTANT (REST + Whisper STT) ================== */
    function initAssistant() {
        (() => {
            if (window.__assistantReady) return;
            window.__assistantReady = true;

            const esc = s => String(s).replace(/[&<]/g, m => (m === "&" ? "&amp;" : "&lt;"));

            const css = `
        :root{--ee-black:#111;--ee-border:#D0D5DD;}
        .ee-btn{border:1px solid var(--ee-border);background:#fff;border-radius:10px;padding:6px 10px;font:500 13px system-ui;cursor:pointer}
        .ee-fab{position:fixed;right:18px;bottom:22px;z-index:99998;background:var(--ee-black);color:#fff;border:none;border-radius:999px;padding:12px 16px;font:600 14px system-ui;cursor:pointer}
        .ee-as-modal{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center}
        .ee-as-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.45)}
        .ee-as-dialog{position:relative;width:min(680px,96vw);max-height:90vh;display:flex;flex-direction:column;background:#fff;border:1px solid #E7E9EE;border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.35);opacity:0;transform:translateY(8px);transition:.18s}
        .ee-as-dialog.open{opacity:1;transform:none}
        .ee-as-head{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #EEF1F5}
        .ee-as-body{flex:1 1 auto;display:flex;flex-direction:column;padding:10px 12px;min-height:0}
        .ee-as-chat{flex:1 1 auto;min-height:0;border:1px solid #EEF1F5;border-radius:10px;padding:8px 10px;background:#FAFCFF;overflow-y:auto;scrollbar-width:thin;scrollbar-gutter:stable}
        .ee-as-chat::-webkit-scrollbar{width:6px;}
        .ee-as-chat::-webkit-scrollbar-thumb{background:#d0d5dd;border-radius:3px;}
        .ee-as-msg{margin-bottom:8px;font:14px system-ui}
        .ee-as-msg b{display:block;margin-bottom:2px}
        .ee-as-input-row{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #EEF1F5}
        .ee-as-input{flex:1;border:1px solid var(--ee-border);border-radius:10px;padding:8px 10px;font:14px system-ui}
        .ee-as-note{color:#6b7280;font:12px/1.3 system-ui;padding:4px 12px 10px}
      `;
            injectStyleOnce("ee-as-css", css);

            async function requireAuth() {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    alert("Please log in to use the AI assistant.");
                    window.location.href = "/login";
                    return false;
                }
                return true;
            }

            const fab = document.body.appendChild(
                Object.assign(document.createElement("button"), {
                    id: "ee-fab", className: "ee-fab", textContent: "Talk to AI"
                })
            );

            const fx = (action, payload = {}) =>
                supabase.functions
                    .invoke("assistant_rest", { body: { action, ...payload } })
                    .then(r => {
                        if (r.error) {
                            const msg = String(r.error.message || "");
                            if (/unauthorized/i.test(msg)) throw new Error("Please log in to use the assistant.");
                            throw new Error(msg || "Request failed");
                        }
                        return r.data;
                    });

            function openAssistant(prefill = "") {
                const modal = document.body.appendChild(
                    Object.assign(document.createElement("div"), {
                        className: "ee-as-modal",
                        innerHTML: `
              <div class="ee-as-backdrop" data-close></div>
              <div class="ee-as-dialog">
                <div class="ee-as-head">
                  <strong>AI Assistant</strong>
                  <div style="flex:1"></div>
                  <button class="ee-btn" id="ee-mic">🎤 Start mic</button>
                  <button class="ee-btn" data-close>Close</button>
                </div>
                <div class="ee-as-body">
                  <div class="ee-as-chat" id="ee-chat"></div>
                </div>
                <div class="ee-as-input-row">
                  <input class="ee-as-input" id="ee-in" maxlength="240" placeholder="Ask about English (max 240 chars)...">
                  <button class="ee-btn" id="ee-send" style="background:var(--ee-black);color:#fff">Send</button>
                </div>
                <div class="ee-as-note">Speech-to-text and chat require login.</div>
              </div>
            `
                    })
                );

                const dlg = modal.querySelector(".ee-as-dialog");
                const chat = modal.querySelector("#ee-chat");
                const inp = modal.querySelector("#ee-in");
                const sendBtn = modal.querySelector("#ee-send");
                const micBtn = modal.querySelector("#ee-mic");

                requestAnimationFrame(() => dlg.classList.add("open"));
                inp.value = prefill;
                if (prefill) inp.focus();

                const add = (who, html) => {
                    const d = document.createElement("div");
                    d.className = "ee-as-msg";
                    d.innerHTML = `<b>${who}</b><div>${html}</div>`;
                    chat.appendChild(d);
                    chat.scrollTop = chat.scrollHeight;
                };

                const MAX_LOCAL = 50;
                const MAX_SEND = 12;

                let history = [];
                let LSKEY = null;

                async function initHistory() {
                    try {
                        const { data: { user } } = await supabase.auth.getUser();
                        LSKEY = user?.id ? `ee_as_hist_${user.id}` : `ee_as_hist_guest`;

                        history = JSON.parse(localStorage.getItem(LSKEY) || "[]");
                        if (!Array.isArray(history)) history = [];
                        history = history.slice(-MAX_LOCAL);

                        for (const m of history) {
                            if (!m?.role || typeof m?.content !== "string") continue;
                            add(m.role === "user" ? "You" : "Assistant", esc(m.content));
                        }
                    } catch {
                        history = [];
                    }
                }

                function saveHistory() {
                    if (!LSKEY) return;
                    localStorage.setItem(LSKEY, JSON.stringify(history.slice(-MAX_LOCAL)));
                }

                function payloadMessages() {
                    return history.slice(-MAX_SEND);
                }

                initHistory();

                async function send(text) {
                    text = String(text || "").trim();
                    if (!text) return;

                    if (text.length > 240) {
                        add("Assistant", esc("Your message is too long. Please keep it under 240 characters."));
                        return;
                    }

                    if (!(await requireAuth())) return;

                    add("You", esc(text));

                    history.push({ role: "user", content: text });
                    history = history.slice(-MAX_LOCAL);
                    saveHistory();

                    try {
                        const { text: answer = "" } = await fx("chat", { messages: payloadMessages() });
                        if (answer) {
                            add("Assistant", esc(answer));
                            history.push({ role: "assistant", content: answer });
                            history = history.slice(-MAX_LOCAL);
                            saveHistory();
                        }
                    } catch (e) {
                        const err = "⚠ " + e.message;
                        add("Assistant", esc(err));
                        history.push({ role: "assistant", content: err });
                        history = history.slice(-MAX_LOCAL);
                        saveHistory();
                    }
                }

                let rec = null, chunks = [];
                micBtn.onclick = async () => {
                    if (rec) { rec.stop(); return; }
                    if (!(await requireAuth())) return;
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        rec = new MediaRecorder(stream);
                        chunks = [];
                        micBtn.textContent = "🛑 Stop mic";

                        rec.ondataavailable = e => e.data.size && chunks.push(e.data);

                        rec.onstop = async () => {
                            try {
                                const buf = await new Blob(chunks).arrayBuffer();
                                const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
                                const { text = "" } = await fx("stt", {
                                    audio_base64: `data:audio/webm;base64,${b64}`,
                                    mime: "audio/webm"
                                });

                                const t = String(text || "").trim().slice(0, 240);
                                if (t) await send(t);
                                else add("Assistant", "⚠ No speech detected");
                            } catch (e) {
                                add("Assistant", "⚠ " + e.message);
                            } finally {
                                rec = null;
                                stream.getTracks().forEach(t => t.stop());
                                micBtn.textContent = "🎤 Start mic";
                            }
                        };

                        rec.start();
                    } catch (e) {
                        add("Assistant", "⚠ " + e.message);
                        rec = null;
                    }
                };

                sendBtn.onclick = () => { const v = inp.value; inp.value = ""; send(v); };
                inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); sendBtn.click(); } });

                modal.addEventListener("click", e => {
                    if (e.target.closest("[data-close]")) {
                        if (rec) rec.stop();
                        modal.remove();
                    }
                });
            }

            fab.onclick = () => openAssistant();

            function adjustFab() {
                const pop = document.getElementById("translate-popup");
                fab.style.bottom = pop ? (window.innerHeight - pop.getBoundingClientRect().top + 16) + "px" : "22px";
            }
            new MutationObserver(adjustFab).observe(document.body, { childList: true, subtree: true });
            window.addEventListener("resize", adjustFab);
            setInterval(adjustFab, 1000);

            window.openAssistant = openAssistant;
        })();
    }

    /* ================== CONSENT + GA4 ================== */
    function initConsentBanner() {
        (function () {
            var GA_ID = "G-WB5Y815NW2";
            var KEY = "evo_consent_v1";
            var DEFAULTS = { necessary: true, analytics: false, ads: false };

            function load() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } }
            function save(obj) { try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) { } }
            function merge(a, b) { var o = {}; for (var k in a) o[k] = a[k]; for (var k2 in b) o[k2] = b[k2]; return o; }

            function ensureDataLayer() {
                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function () { dataLayer.push(arguments); };
            }

            function gtagConsentUpdate(c) {
                try {
                    ensureDataLayer();
                    window.gtag("consent", "update", {
                        analytics_storage: c.analytics ? "granted" : "denied",
                        ad_storage: c.ads ? "granted" : "denied",
                        ad_user_data: c.ads ? "granted" : "denied",
                        ad_personalization: c.ads ? "granted" : "denied"
                    });
                } catch (e) { }
            }

            function loadGA() {
                if (window.__evoGA_loaded) return;
                window.__evoGA_loaded = true;

                ensureDataLayer();

                var s = document.createElement("script");
                s.async = true;
                s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
                document.head.appendChild(s);

                window.gtag("js", new Date());
                window.gtag("config", GA_ID, { send_page_view: true });
            }

            ensureDataLayer();
            window.gtag("consent", "default", {
                analytics_storage: "denied",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied"
            });

            var consent = merge(DEFAULTS, load() || {});
            gtagConsentUpdate(consent);
            if (consent.analytics) loadGA();

            function mount() {
                if (window.__evoConsentMounted) return;
                window.__evoConsentMounted = true;

                var css = `
          .evo-consent{
            position:fixed; inset:0; z-index:2147483000;
            display:none; align-items:center; justify-content:center;
            padding:12px;
            background:rgba(15,23,42,.45);
            -webkit-tap-highlight-color:transparent;
          }
          .evo-consent *{
            box-sizing:border-box;
            font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif;
          }
          .evo-consent .card{
            width:min(640px, 92vw);
            max-height:min(82vh, 560px);
            background:#fff;
            border:1px solid #c7e2ff;
            border-radius:16px;
            box-shadow:0 18px 50px rgba(2,6,23,.28);
            overflow:hidden;
            display:flex;
            flex-direction:column;
          }
          .evo-consent .head{
            display:flex; align-items:center; justify-content:space-between;
            padding:12px 14px;
            border-bottom:1px solid #eef2f7;
            gap:10px;
          }
          .evo-consent .head h3{
            margin:0;
            font-size:clamp(18px, 3.2vw, 20px);
            letter-spacing:-.01em;
            line-height:1.2;
          }
          .evo-consent .x{
            border:1px solid #e5e7eb;
            background:#fff;
            border-radius:12px;
            width:38px; height:38px;
            cursor:pointer;
            font-size:22px; line-height:1;
            display:grid; place-items:center;
          }
          .evo-consent .body{
            padding:12px 14px;
            overflow:auto;
            flex:1 1 auto;
            min-height:0;
          }
          .evo-consent .row{
            display:flex; align-items:flex-start; justify-content:space-between;
            gap:12px;
            padding:12px 12px;
            border:1px solid #e5e7eb;
            border-radius:14px;
            margin-bottom:10px;
            background:#fff;
          }
          .evo-consent .ttl{
            font-weight:800;
            font-size:clamp(16px, 3vw, 18px);
            margin:0 0 4px;
          }
          .evo-consent .txt{
            margin:0;
            color:#475569;
            font-size:clamp(13px, 2.5vw, 14px);
            line-height:1.45;
          }
          .evo-consent .right{
            display:flex; align-items:center; gap:10px;
            flex-shrink:0;
          }
          .evo-consent .pill{
            font-weight:800; color:#111827;
            font-size:13px;
            white-space:nowrap;
          }
          .evo-consent .actions{
            position:sticky;
            bottom:0;
            display:flex;
            justify-content:flex-end;
            gap:10px;
            padding:10px 14px;
            border-top:1px solid #eef2f7;
            background:#f8fafc;
            flex-wrap:wrap;
            z-index:2;
          }
          .evo-consent .btn{
            cursor:pointer;
            border-radius:12px;
            border:1px solid transparent;
            padding:10px 14px;
            font-weight:900;
            font-size:14px;
            line-height:1;
          }
          .evo-consent .btn.primary{background:#0ea5e9;color:#fff}
          .evo-consent .btn.ghost{background:#fff;border-color:#e5e7eb;color:#111827}
          .evo-consent .btn.danger{background:#fff;border-color:#ef4444;color:#ef4444}
          .evo-consent .btn:active{transform:translateY(1px)}
          .evo-consent .tip{
            margin-top:8px;
            color:#64748b;
            font-size:12.5px;
          }
          .evo-toggle{
            position:relative;
            width:54px; height:30px;
            border-radius:999px;
            background:#e5e7eb;
            border:1px solid #d1d5db;
            cursor:pointer;
            flex-shrink:0;
          }
          .evo-toggle .knob{
            position:absolute;
            top:3px; left:3px;
            width:24px; height:24px;
            border-radius:999px;
            background:#fff;
            box-shadow:0 4px 10px rgba(2,6,23,.14);
            transition:transform .18s ease;
          }
          .evo-toggle.on{background:#0090ff;border-color:#0090ff}
          .evo-toggle.on .knob{transform:translateX(24px)}
          .evo-toggle[aria-disabled="true"]{opacity:.65;cursor:not-allowed}
          @media (max-width:560px){
            .evo-consent{padding:10px}
            .evo-consent .card{
              width:94vw;
              max-height:86dvh;
              border-radius:14px;
            }
            .evo-consent .actions{justify-content:stretch;}
            .evo-consent .btn{width:100%; padding:12px 14px;}
          }
        `;
                injectStyleOnce("evo-consent-css", css);

                var root = document.createElement("div");
                root.className = "evo-consent";
                root.setAttribute("role", "dialog");
                root.setAttribute("aria-modal", "true");

                root.innerHTML = `
          <div class="card" role="document" aria-label="Cookie settings">
            <div class="head">
              <h3>Cookie settings</h3>
              <button class="x" type="button" aria-label="Close">×</button>
            </div>

            <div class="body">
              <div class="row">
                <div>
                  <div class="ttl">Necessary</div>
                  <p class="txt">Required for basic site functions and remembering your consent choice.</p>
                </div>
                <div class="right">
                  <div class="pill">Always on</div>
                </div>
              </div>

              <div class="row">
                <div>
                  <div class="ttl">Analytics</div>
                  <p class="txt">Helps us measure engagement (page views, time on page, feature usage). Google Analytics is not loaded until you allow this.</p>
                </div>
                <div class="right">
                  <button class="evo-toggle" data-toggle="analytics" type="button" aria-label="Toggle analytics">
                    <span class="knob"></span>
                  </button>
                </div>
              </div>

              <div class="row">
                <div>
                  <div class="ttl">Ads</div>
                  <p class="txt">For future monetization (e.g., ad personalization). You can keep this off and still use analytics.</p>
                </div>
                <div class="right">
                  <button class="evo-toggle" data-toggle="ads" type="button" aria-label="Toggle ads">
                    <span class="knob"></span>
                  </button>
                </div>
              </div>

              <div class="tip">Tip: You can reopen this window anytime from the Privacy Policy page.</div>
            </div>

            <div class="actions">
              <button class="btn danger" type="button" data-act="reject">Reject all</button>
              <button class="btn ghost" type="button" data-act="save">Save</button>
              <button class="btn primary" type="button" data-act="accept">Accept all</button>
            </div>
          </div>
        `;

                (document.body || document.documentElement).appendChild(root);

                function setToggle(btn, on) {
                    if (!btn) return;
                    btn.classList.toggle("on", !!on);
                    btn.setAttribute("aria-pressed", !!on ? "true" : "false");
                }

                function syncUI() {
                    setToggle(root.querySelector('[data-toggle="analytics"]'), !!consent.analytics);
                    setToggle(root.querySelector('[data-toggle="ads"]'), !!consent.ads);
                }

                var prevOverflow = null;
                function lockScroll() {
                    try {
                        if (prevOverflow !== null) return;
                        prevOverflow = document.documentElement.style.overflow || "";
                        document.documentElement.style.overflow = "hidden";
                    } catch (e) { }
                }
                function unlockScroll() {
                    try {
                        if (prevOverflow === null) return;
                        document.documentElement.style.overflow = prevOverflow;
                        prevOverflow = null;
                    } catch (e) { }
                }

                function open() {
                    syncUI();
                    root.style.display = "flex";
                    lockScroll();
                    var x = root.querySelector(".x");
                    if (x) setTimeout(function () { try { x.focus(); } catch (e) { } }, 0);
                }

                function close() {
                    root.style.display = "none";
                    unlockScroll();
                }

                window.evoOpenConsent = open;

                var saved = load();
                if (!saved) {
                    setTimeout(open, 600);
                }

                root.addEventListener("click", function (e) {
                    var x = e.target.closest(".x");
                    if (x) { close(); return; }

                    var tg = e.target.closest(".evo-toggle");
                    if (tg) {
                        var k = tg.getAttribute("data-toggle");
                        if (k === "analytics") consent.analytics = !consent.analytics;
                        if (k === "ads") consent.ads = !consent.ads;
                        syncUI();
                        return;
                    }

                    var actBtn = e.target.closest("[data-act]");
                    if (!actBtn) return;
                    var act = actBtn.getAttribute("data-act");

                    if (act === "reject") {
                        consent = { necessary: true, analytics: false, ads: false };
                        save(consent);
                        gtagConsentUpdate(consent);
                        close();
                        return;
                    }

                    if (act === "accept") {
                        consent = { necessary: true, analytics: true, ads: true };
                        save(consent);
                        gtagConsentUpdate(consent);
                        loadGA();
                        close();
                        return;
                    }

                    if (act === "save") {
                        consent.necessary = true;
                        save(consent);
                        gtagConsentUpdate(consent);
                        if (consent.analytics) loadGA();
                        close();
                        return;
                    }
                }, true);

                root.addEventListener("mousedown", function (e) {
                    if (e.target === root) close();
                });

                document.addEventListener("keydown", function (e) {
                    if (e.key === "Escape" && root.style.display === "flex") close();
                }, true);
            }

            if (document.body) mount();
            else document.addEventListener("DOMContentLoaded", mount);
        })();
    }

    /* ================== Progress tracker v1 ================== */
    function initProgressTracker() {
        (function () {
            const slugMeta = document.querySelector('meta[name="evo-tracking-slug"]');
            const typeMeta = document.querySelector('meta[name="evo-lesson-type"]');

            const trackingSlug = slugMeta?.content?.trim();
            const lessonType = typeMeta?.content?.trim() || "unknown";
            if (!trackingSlug) return;

            const sb = window.evoSupabase || window.supabase || window.supabaseClient || null;
            if (!sb) { console.warn("[EvoTracker] Supabase client not found"); return; }

            let lastHeartbeat = Date.now();
            let currentUserId = null;
            let initialized = false;

            async function getUser() {
                try {
                    const { data, error } = await sb.auth.getUser();
                    if (error) return null;
                    return data?.user || null;
                } catch (e) {
                    return null;
                }
            }

            async function logEvent(eventName, meta = {}) {
                if (!currentUserId) return;
                try {
                    await sb.from("user_learning_events").insert({
                        user_id: currentUserId,
                        tracking_slug: trackingSlug,
                        lesson_type: lessonType,
                        event_name: eventName,
                        meta
                    });
                } catch (e) {
                    console.warn("[EvoTracker] logEvent error", e);
                }
            }

            async function upsertProgress(payload = {}) {
                if (!currentUserId) return;

                const row = {
                    user_id: currentUserId,
                    tracking_slug: trackingSlug,
                    lesson_type: lessonType,
                    last_opened_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    ...payload
                };

                try {
                    const { data: existing } = await sb
                        .from("user_lesson_progress")
                        .select("id, visits_count, seconds_spent, status, progress_percent")
                        .eq("user_id", currentUserId)
                        .eq("tracking_slug", trackingSlug)
                        .maybeSingle();

                    if (!existing) {
                        await sb.from("user_lesson_progress").insert({
                            ...row,
                            first_opened_at: new Date().toISOString(),
                            visits_count: 1
                        });
                    } else {
                        const next = {
                            ...row,
                            visits_count: (existing.visits_count || 0) + (payload.__countVisit ? 1 : 0),
                            seconds_spent: (existing.seconds_spent || 0) + (payload.__addSeconds || 0)
                        };
                        delete next.__countVisit;
                        delete next.__addSeconds;

                        await sb
                            .from("user_lesson_progress")
                            .update(next)
                            .eq("id", existing.id);
                    }
                } catch (e) {
                    console.warn("[EvoTracker] upsertProgress error", e);
                }
            }

            async function heartbeat() {
                if (document.hidden) return;
                const now = Date.now();
                const deltaSec = Math.max(0, Math.round((now - lastHeartbeat) / 1000));
                lastHeartbeat = now;

                if (deltaSec > 0) {
                    await upsertProgress({ __addSeconds: deltaSec });
                }
            }

            async function markComplete(progressPercent = 100, extraMeta = {}) {
                if (!currentUserId) return;
                const ts = new Date().toISOString();

                await upsertProgress({
                    status: "completed",
                    progress_percent: progressPercent,
                    completed_at: ts
                });

                await logEvent("lesson_complete", extraMeta);
            }

            // ✅ do NOT overwrite object; extend it
            window.EvoProgress = window.EvoProgress || {};
            window.EvoProgress.markComplete = markComplete;
            window.EvoProgress.logEvent = logEvent;
            window.EvoProgress.getTracking = () => ({ trackingSlug, lessonType });

            async function init() {
                if (initialized) return;
                initialized = true;

                const user = await getUser();
                if (!user) { return; }

                currentUserId = user.id;

                await upsertProgress({
                    status: "started",
                    progress_percent: 0,
                    __countVisit: true
                });

                await logEvent("page_view", { url: location.pathname });

                setInterval(heartbeat, 30000);

                window.addEventListener("beforeunload", function () {
                    const now = Date.now();
                    const deltaSec = Math.max(0, Math.round((now - lastHeartbeat) / 1000));
                    if (deltaSec > 0) upsertProgress({ __addSeconds: deltaSec });
                });

                document.addEventListener("visibilitychange", function () {
                    if (!document.hidden) lastHeartbeat = Date.now();
                });
            }

            init();
        })();
    }

    /* ================== time tracker RPC ================== */
    function initTimeTrackerRpc() {
        (function () {
            if (window.__evoTimeTrackerInited) return;
            window.__evoTimeTrackerInited = true;

            function getSB() {
                return window.supabaseClient || window.supabase || window.sb || null;
            }

            function getMeta(name) {
                const el = document.querySelector(`meta[name="${name}"]`);
                return el ? (el.getAttribute("content") || "").trim() : "";
            }

            const trackingSlug = getMeta("evo-tracking-slug");
            const lessonType = getMeta("evo-lesson-type") || "unknown";
            if (!trackingSlug) return;

            let startedAtMs = Date.now();
            let sentSeconds = 0;
            let flushing = false;

            async function getUserId() {
                const sb = getSB();
                if (!sb?.auth?.getUser) return null;
                try {
                    const { data, error } = await sb.auth.getUser();
                    if (error) return null;
                    return data?.user?.id || null;
                } catch (e) {
                    return null;
                }
            }

            async function flushTime(force) {
                if (flushing) return;
                const sb = getSB();
                if (!sb?.rpc) return;

                const userId = await getUserId();
                if (!userId) return;

                const totalElapsed = Math.floor((Date.now() - startedAtMs) / 1000);
                const delta = totalElapsed - sentSeconds;

                if (!force && delta < 10) return;
                if (delta <= 0) return;

                flushing = true;
                try {
                    const { error } = await sb.rpc("evo_add_lesson_seconds", {
                        p_tracking_slug: trackingSlug,
                        p_lesson_type: lessonType,
                        p_add_seconds: delta
                    });

                    if (!error) sentSeconds += delta;
                    else console.warn("evo_add_lesson_seconds error:", error);
                } catch (e) {
                    console.warn("flushTime failed:", e);
                } finally {
                    flushing = false;
                }
            }

            const interval = setInterval(() => flushTime(false), 15000);

            document.addEventListener("visibilitychange", () => {
                if (document.hidden) flushTime(true);
            });

            window.addEventListener("pagehide", () => {
                flushTime(true);
                clearInterval(interval);
            });

            window.addEventListener("beforeunload", () => flushTime(true));
        })();
    }

    /* ================== card statuses on grids ================== */
    function initCardStatuses() {
        (function () {
            if (window.__evoCardStatusInited) return;
            window.__evoCardStatusInited = true;

            function getSB() {
                return window.supabaseClient || window.supabase || window.sb || null;
            }

            async function getUserId() {
                const sb = getSB();
                if (!sb?.auth?.getUser) return null;
                try {
                    const { data } = await sb.auth.getUser();
                    return data?.user?.id || null;
                } catch (e) {
                    return null;
                }
            }

            function normalizeStatus(rawStatus, progress) {
                const s = String(rawStatus || "").trim().toLowerCase();
                const p = Number(progress || 0);

                if (s === "completed" || s === "done" || s === "finished") return "completed";
                if (s === "started" || s === "in_progress" || s === "in progress" || p > 0) return "in_progress";
                return "not_started";
            }

            function applyStatus(card, row) {
                const statusEl = card.querySelector("[data-evo-status]");
                const ctaEl = card.querySelector("[data-evo-cta]");

                const normalized = normalizeStatus(row?.status, row?.progress_percent);

                if (statusEl) {
                    if (normalized === "completed") statusEl.textContent = "✅ Completed";
                    else if (normalized === "in_progress") statusEl.textContent = "⏳ In progress";
                    else statusEl.textContent = "🔒 Not started";
                }

                if (ctaEl) {
                    if (normalized === "completed") ctaEl.textContent = "Next lesson";
                    else if (normalized === "in_progress") ctaEl.textContent = "Continue lesson";
                    else ctaEl.textContent = "Start lesson";
                }

                card.setAttribute("data-evo-status-state", normalized);
            }

            async function decorateCards(root) {
                root = root || document;

                const cards = Array.from(root.querySelectorAll("[data-evo-card][data-evo-tracking-slug]"));
                if (!cards.length) return;

                const slugs = [...new Set(cards.map(c => (c.getAttribute("data-evo-tracking-slug") || "").trim()).filter(Boolean))];
                if (!slugs.length) return;

                const userId = await getUserId();
                if (!userId) {
                    cards.forEach(card => applyStatus(card, null));
                    return;
                }

                const sb = getSB();
                if (!sb) return;

                const { data, error } = await sb
                    .from("user_lesson_progress")
                    .select("tracking_slug,status,progress_percent")
                    .in("tracking_slug", slugs);

                if (error) {
                    console.warn("load card statuses error:", error);
                    return;
                }

                const map = new Map((data || []).map(r => [r.tracking_slug, r]));
                cards.forEach(card => {
                    const slug = (card.getAttribute("data-evo-tracking-slug") || "").trim();
                    applyStatus(card, map.get(slug));
                });

                cards.forEach(c => c.removeAttribute("data-evo-recommended"));
                const recommended = cards.find(c => c.getAttribute("data-evo-status-state") !== "completed");
                if (recommended) recommended.setAttribute("data-evo-recommended", "1");
            }

            // keep existing EvoProgress object, just add refresh function
            window.EvoProgress = window.EvoProgress || {};
            window.EvoProgress.refreshLessonCards = decorateCards;

            function boot() { decorateCards(document); }

            document.addEventListener("DOMContentLoaded", boot);
            if (window.Webflow && Array.isArray(window.Webflow)) window.Webflow.push(boot);
            setTimeout(boot, 1200);

            window.addEventListener("pageshow", boot);
            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) boot();
            });
        })();
    }

    /* ================== boot ================== */
    async function boot() {
        try {
            await loadSupabaseLib();
            initClient();                 // makes window.supabase = client
            initAuthUIToggleAndLogout();
            initTranslatorPopup();
            initAssistant();
            initConsentBanner();
            initProgressTracker();
            initTimeTrackerRpc();
            initCardStatuses();
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