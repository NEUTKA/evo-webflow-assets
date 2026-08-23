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

    /* ================== EVO ANALYTICS ================== */
    const EVO_ANALYTICS_CONSENT_KEY = "evo_consent_v1";

    function initEvoAnalytics() {
        if (window.EvoAnalytics && typeof window.EvoAnalytics.track === "function") {
            return window.EvoAnalytics;
        }

        const ATTRIBUTION_KEY = "evo_attribution_v1";
        const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
        const CLICK_KEYS = ["gclid", "fbclid", "msclkid"];

        function readJson(key) {
            try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (e) { return null; }
        }

        function writeJson(key, value) {
            try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { }
        }

        function analyticsAllowed() {
            const consent = readJson(EVO_ANALYTICS_CONSENT_KEY);
            return !!(consent && consent.analytics === true);
        }

        function normalizePath(path) {
            path = String(path || "/").split("?")[0].split("#")[0];
            if (path.length > 1) path = path.replace(/\/+$/, "");
            return path || "/";
        }

        function cleanEventName(name) {
            return String(name || "event")
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9_]+/g, "_")
                .replace(/^_+|_+$/g, "")
                .slice(0, 40) || "event";
        }

        function cleanParamKey(key) {
            return String(key || "")
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9_]+/g, "_")
                .replace(/^_+|_+$/g, "")
                .slice(0, 40);
        }

        function cleanParamValue(value) {
            if (value === null || value === undefined) return undefined;
            if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
            if (typeof value === "boolean") return value ? "true" : "false";
            return String(value).slice(0, 100);
        }

        function compactParams(raw) {
            const out = {};
            Object.keys(raw || {}).forEach((key) => {
                const cleanKey = cleanParamKey(key);
                if (!cleanKey) return;
                const cleanValue = cleanParamValue(raw[key]);
                if (cleanValue === undefined || cleanValue === "") return;
                out[cleanKey] = cleanValue;
            });
            return out;
        }

        function referrerSource() {
            try {
                const ref = document.referrer ? new URL(document.referrer) : null;
                if (!ref || ref.hostname === window.location.hostname) return null;
                const host = ref.hostname.replace(/^www\./, "").toLowerCase();
                if (host.includes("linkedin")) return "linkedin";
                if (host.includes("instagram")) return "instagram";
                if (host.includes("facebook") || host.includes("fb.")) return "facebook";
                if (host.includes("pinterest")) return "pinterest";
                if (host.includes("reddit")) return "reddit";
                if (host.includes("youtube")) return "youtube";
                if (host.includes("tiktok")) return "tiktok";
                return host;
            } catch (e) {
                return null;
            }
        }

        function readUrlAttribution() {
            const params = new URLSearchParams(window.location.search || "");
            const touch = {};
            UTM_KEYS.concat(CLICK_KEYS).forEach((key) => {
                const value = params.get(key);
                if (value) touch[key] = value.slice(0, 120);
            });

            if (!touch.utm_source) {
                const ref = referrerSource();
                if (ref) {
                    touch.utm_source = ref;
                    touch.utm_medium = "referral";
                }
            }

            if (!Object.keys(touch).length) return null;

            touch.landing_path = window.location.pathname || "/";
            touch.captured_at = new Date().toISOString();
            return touch;
        }

        function captureAttribution() {
            const stored = analyticsAllowed() ? (readJson(ATTRIBUTION_KEY) || {}) : (window.__evoAttribution || {});
            const touch = readUrlAttribution();
            const next = { ...stored };

            if (touch) {
                if (!next.first_touch) next.first_touch = touch;
                next.last_touch = touch;
                next.updated_at = new Date().toISOString();
            }

            window.__evoAttribution = next;
            if (analyticsAllowed() && Object.keys(next).length) {
                writeJson(ATTRIBUTION_KEY, next);
            }
            return next;
        }

        function getAttribution() {
            return captureAttribution();
        }

        function eventParams(params) {
            const attribution = getAttribution();
            const last = attribution.last_touch || attribution.first_touch || {};
            return compactParams({
                event_source: "evo_site",
                page_path: window.location.pathname || "/",
                page_title: document.title || "",
                utm_source: last.utm_source,
                utm_medium: last.utm_medium,
                utm_campaign: last.utm_campaign,
                utm_content: last.utm_content,
                utm_term: last.utm_term,
                ...params
            });
        }

        function track(eventName, params = {}) {
            if (!analyticsAllowed()) return false;
            const name = cleanEventName(eventName);
            const payload = eventParams(params);
            try {
                window.dispatchEvent(new CustomEvent("evo:analytics", { detail: { event: name, params: payload } }));
            } catch (e) { }

            if (typeof window.gtag !== "function") return false;

            try {
                window.gtag("event", name, payload);
                return true;
            } catch (e) {
                console.warn("[EvoAnalytics] track failed:", e?.message || e);
                return false;
            }
        }

        function trackPageContext() {
            if (!analyticsAllowed()) return false;

            const path = normalizePath(window.location.pathname);
            const eventByPath = {
                "/for-teachers": "teacher_landing_view",
                "/teacher-dashboard": "teacher_dashboard_view",
                "/student-dashboard": "student_dashboard_view",
                "/personal-account": "self_study_dashboard_view"
            };

            let eventName = eventByPath[path] || null;
            if (!eventName && path.indexOf("/teacher-dashboard/") === 0) eventName = "teacher_dashboard_view";
            if (!eventName && path.indexOf("/student-dashboard/") === 0) eventName = "student_dashboard_view";
            if (!eventName) return false;

            const key = `evo_page_event:${eventName}:${path}`;
            try {
                if (sessionStorage.getItem(key) === "1") return true;
            } catch (e) { }

            const sent = track(eventName, { path });
            if (sent) {
                try { sessionStorage.setItem(key, "1"); } catch (e) { }
            }
            return sent;
        }

        const api = {
            version: "2026-05-22",
            track,
            captureAttribution,
            getAttribution,
            trackPageContext,
            analyticsAllowed
        };

        window.EvoAnalytics = api;
        captureAttribution();
        setTimeout(trackPageContext, 0);
        return api;
    }

    function evoTrack(eventName, params) {
        try {
            if (window.EvoAnalytics && typeof window.EvoAnalytics.track === "function") {
                return window.EvoAnalytics.track(eventName, params || {});
            }
        } catch (e) { }
        return false;
    }

    
    
    /* ================== GLOBAL AUTH GUARD ================== */
    const EVO_SUPPORT_MAILTO = 'mailto:evoenglish@outlook.com?subject=Evo-English%20support';

    // Keep teacher workspaces available until payment processing is ready.
    const EVO_BILLING_ENFORCEMENT_ENABLED = false;
    window.__evoBillingEnforcementEnabled = EVO_BILLING_ENFORCEMENT_ENABLED;

    const EVO_PUBLIC_PATHS = [
        '/',
        '/about-us',
        '/login',
        '/update-password',
        '/privacy-policy',
        '/terms-of-service',
        '/terms-of-use',
        '/checkout',
        '/paypal-checkout',
        '/order-confirmation',

        '/grammar-a1',
        '/grammar-a2',
        '/grammar-b1',
        '/grammar-b1plus',
        '/grammar-b2',

        '/vocabulary-a1',
        '/vocabulary-a2',
        '/vocabulary-b1-2',
        '/vocabulary-B1',
        '/vocabulary-b2',

        '/listening-a1',
        '/listening-a2',
        '/listening-b1',
        '/listening-b1plus',
        '/listening-b2',

        '/reading-a1',
        '/reading-a2',
        '/reading-b1',
        '/reading-b1plus',
        '/reading-b2',

        /* Writing course pages — PUBLIC */
'/writing-a1',
'/writing-a2',
'/writing-b1',
'/writing-b1-upper-intermediate',
'/writing-b2-pre-advanced',

        '/books',

        '/welcome',
        '/for-teachers',
        '/pricing'
    ];

    const EVO_PROTECTED_PREFIXES = [
        '/personal-account',
        '/student-dashboard',
        '/teacher-dashboard',

        '/grammar-lessons',
        '/vocabulary-lessons',
        '/listening',
        '/reading-lessons',
        '/writing',

        '/books/books-section',
        '/a1-grammar-section',

        '/ai-chat-assistant',
        '/billing',
        '/find-teacher',
        '/test'
    ];

    const EVO_ROLE_HOME = {
        self_study: '/personal-account',
        student: '/student-dashboard',
        teacher: '/teacher-dashboard'
    };

    function evoNormalizePath(path) {
        path = String(path || '/').split('?')[0].split('#')[0];
        if (path.length > 1) path = path.replace(/\/+$/, '');
        return path || '/';
    }

    function evoIsPublicPath(path) {
        path = evoNormalizePath(path);
        return EVO_PUBLIC_PATHS.indexOf(path) !== -1;
    }

    function evoIsProtectedPath(path) {
        path = evoNormalizePath(path);

        if (evoIsPublicPath(path)) return false;

        return EVO_PROTECTED_PREFIXES.some(function (prefix) {
            return path === prefix || path.indexOf(prefix + '/') === 0;
        });
    }

    function evoHidePageDuringAuthCheck() {
        injectStyleOnce('evo-auth-guard-hide', `
      html.evo-auth-checking body {
        visibility: hidden !important;
      }
    `);

        document.documentElement.classList.add('evo-auth-checking');
    }

    function evoRevealPage() {
        document.documentElement.classList.remove('evo-auth-checking');
    }

    function evoRedirectTo(url) {
        const current = window.location.pathname + window.location.search;
        if (current !== url) {
            window.location.replace(url);
        }
    }

    function evoLoginWithNext() {
        const next = window.location.pathname + window.location.search + window.location.hash;
        evoRedirectTo('/login?tab=signup&next=' + encodeURIComponent(next));
    }

    async function evoGetProfile(sb, userId) {
        const result = await sb
            .from('profiles')
            .select('id, email, full_name, role')
            .eq('id', userId)
            .maybeSingle();

        if (result.error) throw result.error;
        return result.data || null;
    }

    async function evoHasActiveTeacherLink(sb, userId) {
        try {
            const { data, error } = await sb
                .from('teacher_students')
                .select('student_id')
                .eq('student_id', userId)
                .eq('status', 'active')
                .limit(1);

            if (error) {
                console.warn('[Evo Auth Guard] teacher_students check failed:', error);
                return false;
            }

            return Array.isArray(data) && data.length > 0;
        } catch (err) {
            console.warn('[Evo Auth Guard] teacher_students check error:', err);
            return false;
        }
    }

        async function evoGetTeacherAccess(sb) {
        if (!sb || typeof sb.rpc !== 'function') {
            throw new Error('Supabase RPC is not available.');
        }

        const { data, error } = await sb.rpc('evo_get_teacher_access');

        if (error) throw error;

        return data || {
            ok: false,
            has_access: false,
            reason: 'no_access'
        };
    }

    function evoHideTeacherTools() {
        const selectors = [
            '#teacher-dashboard-app',
            '#teacher-dashboard-cards-app',
            '#teacher-live-lesson-app',
            '[data-teacher-tool]',
            '[data-teacher-protected]'
        ];

        selectors.forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (el) {
                el.style.display = 'none';
            });
        });
    }

    function evoShowTeacherPaywall(access) {
        evoRevealPage();
        evoHideTeacherTools();

        if (window.__evoTeacherPaywallObserver) {
            try { window.__evoTeacherPaywallObserver.disconnect(); } catch (_) {}
            window.__evoTeacherPaywallObserver = null;
        }

        window.__evoTeacherPaywallObserver = new MutationObserver(function () {
            evoHideTeacherTools();
        });

        try {
            window.__evoTeacherPaywallObserver.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        } catch (_) {}

        injectStyleOnce('evo-teacher-paywall-css', `
            #evo-teacher-paywall {
                max-width: 920px;
                margin: 36px auto;
                padding: 0 16px 48px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                color: #0f172a;
            }

            #evo-teacher-paywall * {
                box-sizing: border-box;
            }

            #evo-teacher-paywall .ep-card {
                background: #ffffff;
                border: 1px solid #dbe7f3;
                border-radius: 22px;
                box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);
                overflow: hidden;
            }

            #evo-teacher-paywall .ep-head {
                padding: 30px 26px;
                background:
                    radial-gradient(circle at 12% 8%, rgba(37, 99, 235, 0.10), transparent 28%),
                    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
                border-bottom: 1px solid #edf2f7;
            }

            #evo-teacher-paywall .ep-kicker {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 7px 12px;
                border-radius: 999px;
                background: #eff6ff;
                color: #1d4ed8;
                font-size: 13px;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                margin-bottom: 12px;
            }

            #evo-teacher-paywall h1 {
                margin: 0;
                font-size: clamp(30px, 4vw, 44px);
                line-height: 1.08;
                letter-spacing: -0.03em;
            }

            #evo-teacher-paywall .ep-sub {
                max-width: 760px;
                margin-top: 12px;
                color: #475569;
                font-size: 16px;
                line-height: 1.65;
            }

            #evo-teacher-paywall .ep-body {
                padding: 24px 26px 26px;
                display: grid;
                gap: 18px;
            }

            #evo-teacher-paywall .ep-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
            }

            #evo-teacher-paywall .ep-feature {
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                padding: 14px;
                background: #ffffff;
            }

            #evo-teacher-paywall .ep-feature strong {
                display: block;
                margin-bottom: 4px;
                color: #0f172a;
            }

            #evo-teacher-paywall .ep-feature span {
                color: #64748b;
                font-size: 14px;
                line-height: 1.45;
            }

            #evo-teacher-paywall .ep-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                align-items: center;
            }

            #evo-teacher-paywall .ep-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-height: 46px;
                padding: 12px 18px;
                border-radius: 14px;
                text-decoration: none;
                font-weight: 900;
                font-size: 15px;
                line-height: 1.15;
            }

            #evo-teacher-paywall .ep-btn.primary {
                background: #111213;
                color: #ffffff;
                border: 1px solid #111213;
            }

            #evo-teacher-paywall .ep-btn.secondary {
                background: #eff6ff;
                color: #1d4ed8;
                border: 1px solid #bfdbfe;
            }

            #evo-teacher-paywall .ep-note {
                color: #64748b;
                font-size: 14px;
                line-height: 1.55;
            }

            @media (max-width: 760px) {
                #evo-teacher-paywall {
                    margin-top: 24px;
                    padding: 0 12px 36px;
                }

                #evo-teacher-paywall .ep-head,
                #evo-teacher-paywall .ep-body {
                    padding: 20px;
                }

                #evo-teacher-paywall .ep-grid {
                    grid-template-columns: 1fr;
                }

                #evo-teacher-paywall .ep-actions {
                    align-items: stretch;
                    flex-direction: column;
                }

                #evo-teacher-paywall .ep-btn {
                    width: 100%;
                }
            }
        `);

        const old = document.getElementById('evo-teacher-paywall');
        if (old) old.remove();

        const reason = access && access.reason ? access.reason : 'no_access';
        const status = access && access.status ? access.status : reason;

        let title = 'Start your teacher trial';
        let text = 'Request teacher access to try student management, assignments, vocabulary modules and live lessons.';
        let primaryHref = EVO_SUPPORT_MAILTO;
        let primaryLabel = 'Request teacher access';
        let secondaryHref = '/pricing';
        let secondaryLabel = 'View plans';

        if (reason === 'past_due') {
            title = 'Payment issue';
            text = 'Please update your billing details to continue using your teacher workspace.';
            primaryHref = '/billing';
            primaryLabel = 'Update billing';
            secondaryHref = '/pricing';
            secondaryLabel = 'View plans';
        }

        if (reason === 'canceled') {
            title = 'Your teacher subscription is canceled';
            text = 'Choose a plan to reactivate your teacher workspace and continue teaching with Evo-English.';
            primaryHref = '/pricing';
            primaryLabel = 'Reactivate access';
            secondaryHref = '/for-teachers';
            secondaryLabel = 'Learn more';
        }

        if (reason === 'not_authenticated') {
            title = 'Please log in';
            text = 'You need to log in to access your teacher workspace.';
            primaryHref = '/login?tab=signup&next=/teacher-dashboard';
            primaryLabel = 'Create teacher account';
            secondaryHref = '/login?next=/teacher-dashboard';
            secondaryLabel = 'Log in';
        }

        if (reason === 'not_teacher') {
            title = 'Teacher account required';
            text = 'This workspace is available only for teacher accounts.';
            primaryHref = EVO_SUPPORT_MAILTO;
            primaryLabel = 'Request teacher access';
            secondaryHref = '/for-teachers';
            secondaryLabel = 'Learn more';
        }

        if (reason === 'verification_failed') {
            title = 'Could not verify your access';
            text = 'Please refresh the page. If the issue continues, contact support.';
            primaryHref = EVO_SUPPORT_MAILTO;
            primaryLabel = 'Contact support';
            secondaryHref = '/teacher-dashboard';
            secondaryLabel = 'Try again';
        }

        const wrap = document.createElement('div');
        wrap.id = 'evo-teacher-paywall';

        wrap.innerHTML = `
            <div class="ep-card">
                <div class="ep-head">
                    <div class="ep-kicker">Teacher access</div>
                    <h1>${title}</h1>
                    <div class="ep-sub">${text}</div>
                </div>

                <div class="ep-body">
                    <div class="ep-grid">
                        <div class="ep-feature">
                            <strong>Manage students</strong>
                            <span>Create a workspace for your learners and track their work.</span>
                        </div>

                        <div class="ep-feature">
                            <strong>Create assignments</strong>
                            <span>Use templates, tasks, feedback and review tools.</span>
                        </div>

                        <div class="ep-feature">
                            <strong>Teach live</strong>
                            <span>Use video lessons, vocabulary cards and teacher tools in one place.</span>
                        </div>
                    </div>

                    <div class="ep-actions">
                        <a class="ep-btn primary" href="${primaryHref}">${primaryLabel}</a>
                        <a class="ep-btn secondary" href="${secondaryHref}">${secondaryLabel}</a>
                    </div>

                    <div class="ep-note">
                        Current teacher access status: ${String(status).replace(/[<>&"]/g, '')}.
                    </div>
                </div>
            </div>
        `;

        if (document.body) {
            document.body.prepend(wrap);
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                document.body.prepend(wrap);
            }, { once: true });
        }
    }

    function evoAllowTeacherApps() {
    if (window.__evoTeacherAppsAllowed) return;

    window.__evoTeacherAppsAllowed = true;
    window.__evoAllowTeacherApp = true;

    window.dispatchEvent(new CustomEvent('evo:teacher-ready'));
}

function evoAllowStudentApps() {
    if (window.__evoStudentAppsAllowed) return;

    window.__evoStudentAppsAllowed = true;
    window.__evoAllowStudentApp = true;

    window.dispatchEvent(new CustomEvent('evo:student-ready'));
}

    async function initGlobalAuthGuard() {
        if (window.__evoGlobalAuthGuardDone) {
            evoRevealPage();
            return true;
        }

        window.__evoGlobalAuthGuardDone = true;

        const path = evoNormalizePath(window.location.pathname);

        if (!evoIsProtectedPath(path)) {
            evoRevealPage();
            return true;
        }

        evoHidePageDuringAuthCheck();

        const sb = window.supabaseClient || window.supabase || window.sb || null;

        if (!sb || !sb.auth || typeof sb.auth.getUser !== 'function') {
            console.warn('[Evo Auth Guard] Supabase client is not ready.');
            evoRevealPage();
            return true;
        }

        try {
            const userResult = await sb.auth.getUser();
            const user = userResult?.data?.user || null;

            if (!user) {
                evoLoginWithNext();
                return false;
            }

            const profile = await evoGetProfile(sb, user.id);
            const role = profile?.role || '';

            if (!role) {
                evoRedirectTo('/welcome');
                return false;
            }

            /*
  /billing:
  Only teacher accounts can open billing.
  Important: billing must stay available even if trial expired,
  because teacher needs this page to pay/reactivate.
*/
if (path.indexOf('/billing') === 0) {
    if (role !== 'teacher') {
        evoRedirectTo(EVO_ROLE_HOME[role] || '/welcome');
        return false;
    }
}

            /*
  /teacher-dashboard:
  Teacher role is always required. Trial/subscription access is enforced only
  after payment processing is ready.
*/
            if (path.indexOf('/teacher-dashboard') === 0) {
                if (role !== 'teacher') {
                    evoRedirectTo(EVO_ROLE_HOME[role] || '/welcome');
                    return false;
                }

                if (!EVO_BILLING_ENFORCEMENT_ENABLED) {
                    evoAllowTeacherApps();
                } else {
                    try {
                        const access = await evoGetTeacherAccess(sb);

                        if (!access || !access.has_access) {
                            evoShowTeacherPaywall(access || {
                                reason: 'no_access',
                                status: 'no_access'
                            });

                            // Continue global footer initialization. Teacher apps
                            // will not start because evoAllowTeacherApps() was not called.
                            return true;
                        }

                        evoAllowTeacherApps();

                    } catch (err) {
                        console.error('[Evo Teacher Access Guard]', err);

                        evoShowTeacherPaywall({
                            reason: 'verification_failed',
                            status: 'verification_failed'
                        });

                        return false;
                    }
                }
            }

            /*
              /student-dashboard:
              Allowed if:
              1) role = student
              OR
              2) user is self_study but has an active teacher_students link.
            */
          if (path.indexOf('/student-dashboard') === 0) {
    const hasStudentAccess =
        role === 'student' ||
        role === 'self_study';

    if (!hasStudentAccess) {
        evoRedirectTo(EVO_ROLE_HOME[role] || '/welcome');
        return false;
    }
        evoAllowStudentApps();

}

            /*
              /personal-account:
              Allowed for self-study learners and students.
              Teachers stay in teacher dashboard.
            */
          if (path.indexOf('/personal-account') === 0) {
    const hasPersonalAccess =
        role === 'self_study' ||
        role === 'student';

    if (!hasPersonalAccess) {
        evoRedirectTo(EVO_ROLE_HOME[role] || '/welcome');
        return false;
    }
}

            evoRevealPage();
            return true;
        } catch (err) {
            console.error('[Evo Auth Guard]', err);
            evoRevealPage();
            return true;
        }
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

                let latestSession = null;
                let latestRole = '';
                const ACCOUNT_HOME_KEY = 'evo.account.home';

                const rememberAccountHome = (path) => {
                    const normalized = evoNormalizePath(path);

                    if (
                        normalized === '/personal-account' ||
                        normalized === '/student-dashboard' ||
                        normalized === '/teacher-dashboard'
                    ) {
                        try { localStorage.setItem(ACCOUNT_HOME_KEY, normalized); } catch { }
                    }
                };

                const getRememberedAccountHome = () => {
                    try {
                        const value = localStorage.getItem(ACCOUNT_HOME_KEY);
                        if (
                            value === '/personal-account' ||
                            value === '/student-dashboard' ||
                            value === '/teacher-dashboard'
                        ) {
                            return value;
                        }
                    } catch { }

                    return '';
                };

                const getAccountHref = () => {
                    const path = evoNormalizePath(window.location.pathname);

                    if (path.indexOf('/student-dashboard') === 0) return '/student-dashboard';
                    if (path.indexOf('/personal-account') === 0) return '/personal-account';
                    if (path.indexOf('/teacher-dashboard') === 0) return '/teacher-dashboard';

                    if (latestRole === 'teacher') return '/teacher-dashboard';

                    const remembered = getRememberedAccountHome();
                    if (
                        remembered === '/personal-account' ||
                        remembered === '/student-dashboard'
                    ) {
                        return remembered;
                    }

                    return EVO_ROLE_HOME[latestRole] || '/personal-account';
                };

                const syncAccountLinks = () => {
                    const logged = !!(latestSession && latestSession.user);
                    if (!logged) return;

                    const href = getAccountHref();

                    document.querySelectorAll('[data-auth="account"]').forEach(link => {
                        if (link.tagName === 'A') {
                            link.setAttribute('href', href);
                        }

                        if (link.__evoAccountLinkBound) return;
                        link.__evoAccountLinkBound = true;

                        link.addEventListener('click', function (event) {
                            const target = getAccountHref();
                            const currentPath = evoNormalizePath(window.location.pathname);
                            const targetPath = evoNormalizePath(target);

                            if (currentPath === targetPath) {
                                event.preventDefault();
                                return;
                            }

                            if (link.tagName === 'A') {
                                link.setAttribute('href', target);
                                return;
                            }

                            event.preventDefault();
                            window.location.href = target;
                        });
                    });
                };

                const refreshRole = async (user) => {
                    latestRole = '';

                    if (!user) {
                        syncAccountLinks();
                        return;
                    }

                    try {
                        const profile = await evoGetProfile(sb, user.id);
                        latestRole = profile?.role || '';
                    } catch (err) {
                        console.warn('[auth-ui] profile role check:', err?.message || err);
                    }

                    syncAccountLinks();
                };

                const apply = (session) => {
                    latestSession = session || null;
                    rememberAccountHome(window.location.pathname);
                    const root = document.documentElement;
                    const logged = !!(session && session.user);
                    root.classList.toggle("auth-logged-in", logged);
                    root.classList.toggle("auth-logged-out", !logged);
                    try { localStorage.setItem("auth.last", logged ? "in" : "out"); } catch { }
                    document.getElementById("auth-guard")?.remove();
                    syncAccountLinks();
                    refreshRole(logged ? session.user : null);
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

                const bindDynamicAuthElements = () => {
                    bindLogout();
                    syncAccountLinks();
                };

                bindDynamicAuthElements();
                new MutationObserver(bindDynamicAuthElements).observe(document.body, { childList: true, subtree: true });
            }

            when(() => document.readyState !== "loading", initAuthUI);
        })();
    }


    /* ================== UNIVERSAL CARDS BRIDGE ================== */
    window.EvoCardsBridge = window.EvoCardsBridge || (() => {
        let provider = null;

        return {
            register(nextProvider) {
                provider = nextProvider || null;
                window.dispatchEvent(new CustomEvent("evo:cards-bridge-provider", { detail: { provider } }));
            },
            unregister(nextProvider) {
                if (!nextProvider || provider === nextProvider) provider = null;
            },
            hasProvider() {
                return !!(provider && typeof provider.saveWord === "function");
            },
            async saveWord(payload) {
                if (!provider || typeof provider.saveWord !== "function") {
                    throw new Error("Cards app is not ready.");
                }
                return provider.saveWord(payload);
            },
            async listModules() {
                if (!provider || typeof provider.listModules !== "function") return [];
                return provider.listModules();
            },
            getProvider() {
                return provider;
            }
        };
    })();

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
                evoTrack("word_selected", {
                    feature: "translator_popup",
                    target_language: currentLang,
                    word_length: String(word || "").length
                });

                el.querySelector("#popup-say").onclick = () => {
                    evoTrack("word_tts_clicked", {
                        source: "translator_popup",
                        word_length: String(word || "").length
                    });
                    window.ttsEn.speak(word);
                };
                el.querySelector("#popup-close").onclick = removePopup;
                el.querySelector("#popup-save").onclick = saveCard;
                el.querySelector("#popup-ask").onclick = () => {
                    evoTrack("ask_ai_clicked", {
                        source: "translator_popup",
                        word_length: String(selText || word || "").length
                    });
                    removePopup();
                    window.openAssistant(selText || word);
                };

                el.querySelector("#popup-lang").addEventListener("change", (e) => {
                    const code = String(e.target.value || "").trim().toLowerCase();
                    if (!code) return;
                    setLang(code);
                    evoTrack("translation_language_changed", {
                        source: "translator_popup",
                        target_language: code
                    });
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
                    evoTrack("word_translated", {
                        source: "translator_popup",
                        target_language: target,
                        word_length: String(word || "").length,
                        has_translation: !!selTranslation
                    });

                } catch (e) {
                    const box = document.getElementById("translation");
                    if (box) box.textContent = "Error: " + (e.message || e);
                }
            }

            function getCardsActiveModuleStorageKey(uid, scope = "personal") {
                return `cards.activeModuleId:${uid}:${scope}`;
            }

            async function getActiveModule(uid) {
                const key = getCardsActiveModuleStorageKey(uid, "personal");
                const legacyKey = "cards.activeModuleId";
                let mid = null;

                try {
                    mid = localStorage.getItem(key);
                } catch (_) {}

                if (mid) {
                    const { data: existing } = await supabase
                        .from("modules")
                        .select("id")
                        .eq("user_id", uid)
                        .eq("id", mid)
                        .maybeSingle();

                    if (existing?.id) return existing.id;
                }

                const { data } = await supabase
                    .from("modules")
                    .select("id")
                    .eq("user_id", uid)
                    .order("created_at", { ascending: true })
                    .limit(1);

                mid = data?.[0]?.id;

                if (!mid) {
                    const { data: n, error } = await supabase
                        .from("modules")
                        .insert({ user_id: uid, name: "My Words" })
                        .select("id")
                        .single();

                    if (error) throw error;
                    mid = n.id;
                }

                try {
                    localStorage.setItem(key, mid);
                    localStorage.removeItem(legacyKey);
                } catch (_) {}

                return mid;
            }

            async function saveCardFallbackToPersonalVocabulary(user, word, translation) {
                await supabase.from("cards").upsert({
                    user_id: user.id,
                    module_id: await getActiveModule(user.id),
                    word,
                    translation
                }, { onConflict: "user_id,module_id,word_norm" });
            }

            async function getCurrentCardsUser() {
                try {
                    const { data, error } = await supabase.auth.getUser();

                    if (error) {
                        const message = String(error.message || error || "");
                        if (/session missing|missing session|auth session/i.test(message)) return null;
                        throw error;
                    }

                    return data?.user || null;
                } catch (err) {
                    const message = String(err?.message || err || "");
                    if (/session missing|missing session|auth session/i.test(message)) return null;
                    throw err;
                }
            }

            function redirectToCardsLogin() {
                const next = window.location.pathname + window.location.search + window.location.hash;
                window.location.replace("/login?tab=signup&next=" + encodeURIComponent(next));
            }

            async function saveCard() {
                const btn = document.getElementById("popup-save");
                if (!btn) return;

                btn.disabled = true;
                btn.textContent = "Saving…";

                try {
                    btn.textContent = "Checking account...";
                    const user = await getCurrentCardsUser();

                    if (!user) {
                        btn.textContent = "Log in to save";
                        evoTrack("save_to_cards_login_required", {
                            source: "translator_popup",
                            word_length: String(selText || "").length
                        });
                        redirectToCardsLogin();
                        return;
                    }

                    btn.textContent = "Saving...";

                    const payload = {
                        user,
                        word: selText,
                        translation: selTranslation,
                        source: "translator-popup"
                    };

                    const provider = window.EvoCardsBridge?.hasProvider?.() ? "bridge" : "fallback";

                    if (provider === "bridge") {
                        await window.EvoCardsBridge.saveWord(payload);
                    } else {
                        await saveCardFallbackToPersonalVocabulary(user, payload.word, payload.translation);
                    }

                    btn.textContent = "Saved ✓";
                    evoTrack("save_to_cards", {
                        source: "translator_popup",
                        provider,
                        word_length: String(payload.word || "").length,
                        has_translation: !!payload.translation
                    });
                    setTimeout(removePopup, 800);

                } catch (e) {
                    console.error("[saveCard]", e);
                    alert(e?.message || "Could not save this word to your cards.");
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
                evoTrack("ai_assistant_opened", {
                    source: prefill ? "translator_popup" : "floating_button",
                    has_prefill: !!prefill
                });

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

                    evoTrack("ai_message_sent", {
                        source: "assistant",
                        message_length: text.length
                    });

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
                        evoTrack("ai_voice_input_started", { source: "assistant" });
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
                                if (t) {
                                    evoTrack("ai_voice_transcribed", {
                                        source: "assistant",
                                        message_length: t.length
                                    });
                                    await send(t);
                                }
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
            if (consent.analytics) {
                loadGA();
                setTimeout(function () {
                    try { window.EvoAnalytics?.trackPageContext?.(); } catch (e) { }
                }, 0);
            }

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
                        try {
                            window.EvoAnalytics?.captureAttribution?.();
                            window.EvoAnalytics?.track?.("analytics_consent_accepted");
                            window.EvoAnalytics?.trackPageContext?.();
                        } catch (e) { }
                        close();
                        return;
                    }

                    if (act === "save") {
                        consent.necessary = true;
                        save(consent);
                        gtagConsentUpdate(consent);
                        if (consent.analytics) {
                            loadGA();
                            try {
                                window.EvoAnalytics?.captureAttribution?.();
                                window.EvoAnalytics?.track?.("analytics_consent_saved");
                                window.EvoAnalytics?.trackPageContext?.();
                            } catch (e) { }
                        }
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
                        .select("id, visits_count, status, progress_percent")
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
                            visits_count: (existing.visits_count || 0) + (payload.__countVisit ? 1 : 0)
                        };
                        delete next.__countVisit;

                        await sb
                            .from("user_lesson_progress")
                            .update(next)
                            .eq("id", existing.id);
                    }
                } catch (e) {
                    console.warn("[EvoTracker] upsertProgress error", e);
                }
            }

            async function markComplete(progressPercent = 100, extraMeta = {}) {
                if (!currentUserId) return;

                // Save the final active seconds and stop the lesson timer.
                try {
                    await window.EvoLessonTimeTracker?.finish?.();
                } catch (_) { }

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

            window.EvoProgress.markCompleteOrLogin = async function (progressPercent = 100, extraMeta = {}) {
                try {
                    const { data: { user }, error } = await sb.auth.getUser();

                    // guest -> go to login immediately, with returnTo
                    if (error || !user) {
                        const returnTo =
                            window.location.pathname +
                            window.location.search +
                            window.location.hash;

                        sessionStorage.setItem("evo_pending_complete", JSON.stringify({
                            progressPercent,
                            extraMeta,
                            returnTo
                        }));

                        window.location.href = "/login?returnTo=" + encodeURIComponent(returnTo);
                        return false;
                    }

                    currentUserId = user.id;

                    await markComplete(progressPercent, extraMeta);
                    return true;
                } catch (e) {
                    console.warn("[EvoTracker] markCompleteOrLogin error", e);

                    const returnTo =
                        window.location.pathname +
                        window.location.search +
                        window.location.hash;

                    sessionStorage.setItem("evo_pending_complete", JSON.stringify({
                        progressPercent,
                        extraMeta,
                        returnTo
                    }));

                    window.location.href = "/login?returnTo=" + encodeURIComponent(returnTo);
                    return false;
                }
            };

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

                // Time is recorded only by initTimeTrackerRpc().
                // Keeping one writer prevents duplicate counting and update races.
            }

            init();
        })();
    }

    /* ================== active lesson time tracker RPC ================== */
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

            const IDLE_LIMIT_MS = 2 * 60 * 1000;
            const TICK_MS = 1000;
            const FLUSH_MS = 15000;
            const MAX_TICK_SECONDS = 5;
            const MAX_RPC_SECONDS = 60;

            let userId = null;
            let pendingSeconds = 0;
            let lastTickMs = performance.now();
            let lastActivityMs = Date.now();
            let flushing = false;
            let stopped = false;
            let tickInterval = null;
            let flushInterval = null;

            function mediaIsPlaying() {
                return Array.from(document.querySelectorAll("audio,video"))
                    .some(media => !media.paused && !media.ended && media.readyState > 1);
            }

            function pageHasFocus() {
                return typeof document.hasFocus !== "function" || document.hasFocus();
            }

            function isActivelyLearning() {
                if (stopped || document.hidden || document.visibilityState !== "visible") return false;
                if (!pageHasFocus()) return false;

                const recentlyActive = (Date.now() - lastActivityMs) <= IDLE_LIMIT_MS;
                return recentlyActive || mediaIsPlaying();
            }

            function markActivity() {
                lastActivityMs = Date.now();
            }

            function captureTick() {
                const now = performance.now();
                const elapsed = Math.max(
                    0,
                    Math.min((now - lastTickMs) / 1000, MAX_TICK_SECONDS)
                );
                lastTickMs = now;

                if (isActivelyLearning()) {
                    pendingSeconds += elapsed;
                }
            }

            async function flushTime(force = false) {
                if (stopped || flushing || !userId) return false;

                captureTick();

                const wholeSeconds = Math.floor(pendingSeconds);
                if (!force && wholeSeconds < 10) return false;
                if (wholeSeconds <= 0) return false;

                const sb = getSB();
                if (!sb?.rpc) return false;

                const secondsToSend = Math.min(wholeSeconds, MAX_RPC_SECONDS);
                flushing = true;

                try {
                    const { error } = await sb.rpc("evo_add_lesson_seconds", {
                        p_tracking_slug: trackingSlug,
                        p_lesson_type: lessonType,
                        p_add_seconds: secondsToSend
                    });

                    if (error) {
                        console.warn("evo_add_lesson_seconds error:", error);
                        return false;
                    }

                    pendingSeconds = Math.max(0, pendingSeconds - secondsToSend);
                    return true;
                } catch (e) {
                    console.warn("flushTime failed:", e);
                    return false;
                } finally {
                    flushing = false;
                }
            }

            function clearTimers() {
                if (tickInterval) clearInterval(tickInterval);
                if (flushInterval) clearInterval(flushInterval);
                tickInterval = null;
                flushInterval = null;
            }

            async function finish() {
                if (stopped) return;
                captureTick();
                await flushTime(true);
                stopped = true;
                clearTimers();
            }

            async function init() {
                const sb = getSB();
                if (!sb?.auth?.getSession || !sb?.rpc) return;

                try {
                    // Read the session once. Do not call /auth/v1/user every 15 seconds.
                    const { data, error } = await sb.auth.getSession();
                    if (error) return;
                    userId = data?.session?.user?.id || null;
                } catch (_) {
                    userId = null;
                }

                if (!userId) return;

                ["pointerdown", "keydown", "touchstart", "scroll"].forEach(eventName => {
                    window.addEventListener(eventName, markActivity, { passive: true });
                });

                window.addEventListener("focus", () => {
                    lastTickMs = performance.now();
                    markActivity();
                });

                window.addEventListener("blur", () => {
                    captureTick();
                    flushTime(true);
                });

                document.addEventListener("visibilitychange", () => {
                    captureTick();
                    lastTickMs = performance.now();

                    if (document.hidden) {
                        flushTime(true);
                    } else {
                        markActivity();
                    }
                });

                window.addEventListener("pagehide", () => {
                    captureTick();
                    flushTime(true);
                    clearTimers();
                });

                // This is best-effort only; frequent flushing limits possible loss.
                window.addEventListener("beforeunload", () => flushTime(true));

                tickInterval = setInterval(captureTick, TICK_MS);
                flushInterval = setInterval(() => flushTime(false), FLUSH_MS);

                window.EvoLessonTimeTracker = {
                    flush: flushTime,
                    finish,
                    getPendingSeconds: () => Math.floor(pendingSeconds)
                };
            }

            init();
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
                window.EvoProgress
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

    /* ================== lesson theory localization ================== */
    function initLessonTheoryLocalization() {
        (function () {
            if (window.__evoLessonTheoryLocalizationInited) return;
            window.__evoLessonTheoryLocalizationInited = true;

            const theoryEls = Array.from(document.querySelectorAll("[data-evo-theory] [data-evo-translate]"));
            if (!theoryEls.length) return;

            const STORAGE_KEY = "evo_lesson_language";
            const DEFAULT_LANGUAGE = "en";
            const PREVIEW_PARAM = "evo-translation-preview";
            const previewRequested = (() => {
                try {
                    return new URL(window.location.href).searchParams.get(PREVIEW_PARAM) === "1";
                } catch (_) {
                    return false;
                }
            })();
            const LANGUAGES = [
                { code: "en", label: "English", dir: "ltr" },
                { code: "es", label: "Español", dir: "ltr" },
                { code: "pt", label: "Português", dir: "ltr" },
                { code: "de", label: "Deutsch", dir: "ltr" },
                { code: "fr", label: "Français", dir: "ltr" },
                { code: "it", label: "Italiano", dir: "ltr" },
                { code: "ru", label: "Русский", dir: "ltr" },
                { code: "kk", label: "Қазақша", dir: "ltr" },
                { code: "hy", label: "Հայերեն", dir: "ltr" },
                { code: "zh-Hans", label: "简体中文", dir: "ltr" },
                { code: "ja", label: "日本語", dir: "ltr" },
                { code: "ko", label: "한국어", dir: "ltr" },
                { code: "hi", label: "हिन्दी", dir: "ltr" },
                { code: "bn", label: "বাংলা", dir: "ltr" },
                { code: "ur", label: "اردو", dir: "rtl" },
                { code: "ar", label: "العربية", dir: "rtl" },
                { code: "id", label: "Bahasa Indonesia", dir: "ltr" },
                { code: "tr", label: "Türkçe", dir: "ltr" },
                { code: "vi", label: "Tiếng Việt", dir: "ltr" }
            ];
            const LANGUAGE_MAP = new Map(LANGUAGES.map(lang => [lang.code, lang]));
            const SUPPORTED_BASE_CODES = new Set(LANGUAGES.map(lang => lang.code).filter(code => !code.includes("-")));

            let currentUserId = null;
            let preferredLanguage = DEFAULT_LANGUAGE;
            let displayedLanguage = DEFAULT_LANGUAGE;
            let loadingLanguage = false;
            let previewActive = false;

            function getSB() {
                return window.supabaseClient || window.supabase || window.sb || null;
            }

            function getLessonId() {
                const root = document.querySelector("[data-evo-lesson-id]");
                const meta = document.querySelector('meta[name="evo-tracking-slug"]');
                return (
                    root?.getAttribute("data-evo-lesson-id") ||
                    document.body?.getAttribute("data-evo-lesson-id") ||
                    meta?.content ||
                    ""
                ).trim();
            }

            function getSourceVersion() {
                const root = document.querySelector("[data-evo-lesson-id]") || document.querySelector("[data-evo-theory]");
                const raw = root?.getAttribute("data-evo-source-version") || document.body?.getAttribute("data-evo-source-version") || "1";
                const version = Number(raw);
                return Number.isInteger(version) && version > 0 ? version : 1;
            }

            function normalizeLocale(value) {
                const raw = String(value || "").trim().replace(/_/g, "-");
                if (!raw) return "";

                const exact = LANGUAGES.find(lang => lang.code.toLowerCase() === raw.toLowerCase());
                if (exact) return exact.code;

                const lower = raw.toLowerCase();
                const parts = lower.split("-");
                const base = parts[0] || "";

                if (base === "zh") {
                    const region = parts[1] || "";
                    if (lower.includes("hans") || region === "cn" || region === "sg") return "zh-Hans";
                    return "";
                }

                if (SUPPORTED_BASE_CODES.has(base)) return base;
                return "";
            }

            function getBrowserLanguage() {
                const candidates = Array.isArray(navigator.languages) && navigator.languages.length
                    ? navigator.languages
                    : [navigator.language];

                for (const locale of candidates) {
                    const normalized = normalizeLocale(locale);
                    if (normalized) return normalized;
                }

                return DEFAULT_LANGUAGE;
            }

            function readLocalPreference() {
                try {
                    return normalizeLocale(localStorage.getItem(STORAGE_KEY));
                } catch (_) {
                    return "";
                }
            }

            function writeLocalPreference(languageCode) {
                try {
                    localStorage.setItem(STORAGE_KEY, languageCode);
                } catch (_) { }
            }

            async function getSessionUser(sb) {
                if (!sb?.auth?.getSession) return null;
                try {
                    const { data } = await sb.auth.getSession();
                    return data?.session?.user || null;
                } catch (_) {
                    return null;
                }
            }

            async function readRemotePreference(sb, userId) {
                if (!sb || !userId) return "";
                try {
                    const { data, error } = await sb
                        .from("user_lesson_preferences")
                        .select("preferred_lesson_language")
                        .eq("user_id", userId)
                        .maybeSingle();

                    if (error) return "";
                    return normalizeLocale(data?.preferred_lesson_language);
                } catch (_) {
                    return "";
                }
            }

            async function saveRemotePreference(sb, userId, languageCode) {
                if (!sb || !userId || !LANGUAGE_MAP.has(languageCode)) return;
                try {
                    await sb.from("user_lesson_preferences").upsert({
                        user_id: userId,
                        preferred_lesson_language: languageCode,
                        updated_at: new Date().toISOString()
                    });
                } catch (e) {
                    console.warn("[EvoLessonLanguage] preference sync failed:", e?.message || e);
                }
            }

            function rememberOriginals() {
                theoryEls.forEach(el => {
                    if (!el.hasAttribute("data-evo-original-text")) {
                        el.setAttribute("data-evo-original-text", (el.textContent || "").trim());
                    }
                });
            }

            function applyContent(languageCode, content) {
                const lang = LANGUAGE_MAP.get(languageCode) || LANGUAGE_MAP.get(DEFAULT_LANGUAGE);
                const dir = lang?.dir || "ltr";

                theoryEls.forEach(el => {
                    const key = el.getAttribute("data-evo-translate") || "";
                    const translated = content && typeof content[key] === "string" ? content[key] : "";
                    const original = el.getAttribute("data-evo-original-text") || "";
                    el.textContent = translated || original;
                    el.setAttribute("lang", languageCode);
                    el.setAttribute("dir", dir);
                });

                document.querySelectorAll("[data-evo-theory]").forEach(root => {
                    root.setAttribute("data-evo-active-language", languageCode);
                    root.setAttribute("data-evo-text-direction", dir);
                });

                displayedLanguage = languageCode;
                syncSwitcher();
            }

            function applyEnglishFallback(reason) {
                previewActive = false;
                applyContent(DEFAULT_LANGUAGE, null);
                document.querySelectorAll("[data-evo-lesson-language-select]").forEach(select => {
                    select.title = reason || "";
                });
            }

            function setPreviewBanner(message, state = "idle") {
                if (!previewRequested) return;
                document.querySelectorAll("[data-evo-lesson-preview-status]").forEach(el => {
                    el.textContent = message;
                    el.setAttribute("data-state", state);
                });
            }

            function exitPreviewMode() {
                try {
                    const url = new URL(window.location.href);
                    url.searchParams.delete(PREVIEW_PARAM);
                    window.location.assign(url.toString());
                } catch (_) {
                    window.location.reload();
                }
            }

            async function fetchPublishedTranslation(sb, lessonId, languageCode) {
                if (!sb || !lessonId || languageCode === DEFAULT_LANGUAGE) return null;

                const { data, error } = await sb
                    .from("lesson_theory_translations")
                    .select("content,status,source_version,source_hash")
                    .eq("lesson_id", lessonId)
                    .eq("language_code", languageCode)
                    .eq("source_version", getSourceVersion())
                    .eq("status", "published")
                    .maybeSingle();

                if (error || !data?.content || typeof data.content !== "object") return null;
                return data;
            }

            async function fetchDraftPreview(sb, lessonId, languageCode) {
                if (!previewRequested || !sb?.functions?.invoke || !lessonId || languageCode === DEFAULT_LANGUAGE) {
                    return null;
                }

                const { data, error } = await sb.functions.invoke("translate_lesson_theory", {
                    body: {
                        action: "preview",
                        lesson_id: lessonId,
                        language_code: languageCode,
                        source_version: getSourceVersion()
                    }
                });

                if (error) throw error;
                if (!data?.content || typeof data.content !== "object" || data.status !== "draft") return null;
                return data;
            }

            async function showLanguage(languageCode, options = {}) {
                const sb = getSB();
                const lessonId = getLessonId();
                const normalized = normalizeLocale(languageCode) || DEFAULT_LANGUAGE;
                preferredLanguage = normalized;

                if (!LANGUAGE_MAP.has(normalized)) {
                    preferredLanguage = DEFAULT_LANGUAGE;
                    applyEnglishFallback("Unsupported language. Showing English.");
                    return;
                }

                if (normalized === DEFAULT_LANGUAGE) {
                    previewActive = false;
                    applyContent(DEFAULT_LANGUAGE, null);
                    setPreviewBanner("Draft preview mode: English original", "idle");
                    return;
                }

                loadingLanguage = true;
                syncSwitcher();
                if (previewRequested) {
                    setPreviewBanner("Checking administrator draft preview...", "loading");
                }

                try {
                    let row = await fetchPublishedTranslation(sb, lessonId, normalized);
                    let isDraftPreview = false;

                    if (!row && previewRequested) {
                        try {
                            row = await fetchDraftPreview(sb, lessonId, normalized);
                            isDraftPreview = !!row;
                        } catch (_) {
                            applyEnglishFallback("Draft preview is unavailable. Sign in with the administrator account.");
                            setPreviewBanner("Draft preview unavailable: administrator sign-in required", "error");
                            return;
                        }
                    }

                    if (!row) {
                        applyEnglishFallback("Translation is not published for this lesson yet. Showing English.");
                        setPreviewBanner("No current draft is available for this language", "error");
                        return;
                    }

                    previewActive = isDraftPreview;
                    applyContent(normalized, row.content);
                    const languageLabel = LANGUAGE_MAP.get(normalized)?.label || normalized;
                    if (isDraftPreview) {
                        setPreviewBanner(`Draft preview: ${languageLabel}. Not visible to students.`, "active");
                    } else {
                        setPreviewBanner(`Published translation: ${languageLabel}`, "published");
                    }
                } finally {
                    loadingLanguage = false;
                    syncSwitcher();
                }

                if (options.persist) {
                    writeLocalPreference(normalized);
                    await saveRemotePreference(sb, currentUserId, normalized);
                }
            }

            function collectTheoryPayload(extra = {}) {
                const lessonId = getLessonId();
                if (!lessonId) throw new Error("Missing lesson id. Add data-evo-lesson-id or meta[name='evo-tracking-slug'].");

                const theory = {};
                theoryEls.forEach(el => {
                    const key = el.getAttribute("data-evo-translate") || "";
                    if (!key) return;
                    theory[key] = (el.getAttribute("data-evo-original-text") || el.textContent || "").trim();
                });

                const lockedTerms = Array.from(document.querySelectorAll(
                    "[data-evo-theory] [data-evo-locked-term], [data-evo-theory] [data-evo-keep-english], [data-evo-theory] code"
                ))
                    .map(el => (el.textContent || "").trim())
                    .filter(Boolean)
                    .filter((value, index, arr) => arr.indexOf(value) === index);

                return {
                    action: "generate",
                    lesson_id: lessonId,
                    source_version: getSourceVersion(),
                    theory,
                    locked_terms: lockedTerms,
                    ...extra
                };
            }

            async function generateTranslations(options = {}) {
                const sb = getSB();
                if (!sb?.functions?.invoke) throw new Error("Supabase Functions client is not ready");
                const body = collectTheoryPayload(options);
                const { data, error } = await sb.functions.invoke("translate_lesson_theory", { body });
                if (error) throw error;
                return data;
            }

            async function generateUnpublishedDrafts(button) {
                const sb = getSB();
                const lessonId = getLessonId();
                const statusEl = document.querySelector("[data-evo-translation-generation-status]");
                if (!sb || !lessonId || !statusEl) throw new Error("Translation controls are not ready");

                button.disabled = true;
                statusEl.hidden = false;
                statusEl.setAttribute("data-state", "loading");
                statusEl.textContent = "Checking translation statuses...";

                try {
                    const { data: statusData, error } = await sb.functions.invoke("translate_lesson_theory", {
                        body: {
                            action: "status",
                            lesson_id: lessonId,
                            source_version: getSourceVersion()
                        }
                    });

                    if (error) throw error;

                    const ready = new Set((statusData?.translations || [])
                        .filter(row => ["draft", "published", "generating"].includes(row.status))
                        .map(row => row.language_code));
                    const targets = LANGUAGES.filter(lang => lang.code !== DEFAULT_LANGUAGE && !ready.has(lang.code));

                    if (!targets.length) {
                        statusEl.setAttribute("data-state", "active");
                        statusEl.textContent = "All translations have drafts or are already published.";
                        return;
                    }

                    const drafts = [];
                    const failed = [];

                    for (let index = 0; index < targets.length; index += 1) {
                        const lang = targets[index];
                        statusEl.textContent = `Generating ${lang.label} (${index + 1}/${targets.length})...`;

                        try {
                            const result = await generateTranslations({ languages: [lang.code] });
                            const languageResult = result?.results?.find(item => item.language_code === lang.code);
                            if (languageResult?.status === "draft") {
                                drafts.push(lang.code);
                            } else {
                                failed.push(lang.code);
                            }
                        } catch (error) {
                            failed.push(lang.code);
                            console.warn(`[EvoLessonLanguage] ${lang.code} generation failed:`, error?.message || error);
                        }
                    }

                    statusEl.setAttribute("data-state", failed.length ? "error" : "active");
                    statusEl.textContent = failed.length
                        ? `Created ${drafts.length} drafts. Failed: ${failed.join(", ")}.`
                        : `Created ${drafts.length} drafts. Review before publishing.`;
                } finally {
                    button.disabled = false;
                }
            }

            async function publishTranslations(options = {}) {
                const sb = getSB();
                if (!sb?.functions?.invoke) throw new Error("Supabase Functions client is not ready");
                const lessonId = getLessonId();
                const body = {
                    action: "publish",
                    lesson_id: lessonId,
                    source_version: getSourceVersion(),
                    ...options
                };
                const { data, error } = await sb.functions.invoke("translate_lesson_theory", { body });
                if (error) throw error;
                return data;
            }

            function renderSwitcher() {
                injectStyleOnce("evo-lesson-language-style", `
          .evo-lesson-language{display:flex;justify-content:flex-end;align-items:center;flex-wrap:wrap;gap:8px;margin:14px 0;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
          .evo-lesson-language label{display:inline-flex;align-items:center;gap:8px;color:#223044;font-size:14px;font-weight:650}
          .evo-lesson-language select{min-width:168px;border:1px solid #c7d8ee;border-radius:8px;background:#fff;color:#122033;padding:8px 34px 8px 10px;font:inherit}
          .evo-lesson-language select:disabled{opacity:.62;cursor:wait}
          .evo-lesson-preview{display:flex;align-items:center;gap:8px;border:1px solid #e3a72f;border-radius:8px;background:#fff7df;padding:7px 8px;color:#49340b;font-size:13px;font-weight:650}
          .evo-lesson-preview [data-state="active"]{color:#166534}
          .evo-lesson-preview [data-state="error"]{color:#9f1239}
          .evo-lesson-preview button{border:0;border-left:1px solid #d7bd79;background:transparent;color:#49340b;padding:2px 4px 2px 10px;font:inherit;cursor:pointer}
          .evo-lesson-preview button:disabled{opacity:.55;cursor:wait;text-decoration:none}
          .evo-lesson-preview button:hover{text-decoration:underline}
          @media (max-width:640px){.evo-lesson-language{justify-content:stretch}.evo-lesson-language label,.evo-lesson-preview{width:100%;justify-content:space-between}.evo-lesson-language select{min-width:0;flex:1}}
        `);

                let host = document.querySelector("[data-evo-lesson-language-switcher]");
                if (!host) {
                    host = document.createElement("div");
                    host.setAttribute("data-evo-lesson-language-switcher", "auto");
                    const firstTheory = document.querySelector("[data-evo-theory]");
                    firstTheory?.parentNode?.insertBefore(host, firstTheory);
                }

                if (!host || host.getAttribute("data-evo-ready") === "1") return;
                host.setAttribute("data-evo-ready", "1");
                host.classList.add("evo-lesson-language");
                host.innerHTML = `
          ${previewRequested ? `
          <div class="evo-lesson-preview" role="status" aria-live="polite">
            <span data-evo-lesson-preview-status data-state="loading">Checking administrator draft preview...</span>
            <span data-evo-translation-generation-status data-state="idle" hidden></span>
            <button type="button" data-evo-generate-unpublished>Generate unpublished</button>
            <button type="button" data-evo-exit-preview>Exit preview</button>
          </div>` : ""}
          <label>
            <span>Explanations</span>
            <select data-evo-lesson-language-select aria-label="Lesson explanation language">
              ${LANGUAGES.map(lang => `<option value="${lang.code}">${lang.label}</option>`).join("")}
            </select>
          </label>
        `;

                host.querySelector("[data-evo-exit-preview]")?.addEventListener("click", exitPreviewMode);
                host.querySelector("[data-evo-generate-unpublished]")?.addEventListener("click", async (event) => {
                    try {
                        await generateUnpublishedDrafts(event.currentTarget);
                    } catch (error) {
                        const statusEl = host.querySelector("[data-evo-translation-generation-status]");
                        if (statusEl) {
                            statusEl.hidden = false;
                            statusEl.setAttribute("data-state", "error");
                            statusEl.textContent = error?.message || "Translation generation failed.";
                        }
                        event.currentTarget.disabled = false;
                    }
                });

                host.querySelector("[data-evo-lesson-language-select]")?.addEventListener("change", async (event) => {
                    const next = normalizeLocale(event.target.value) || DEFAULT_LANGUAGE;
                    writeLocalPreference(next);
                    await saveRemotePreference(getSB(), currentUserId, next);
                    await showLanguage(next, { persist: false });
                    try {
                        window.evoTrack?.("lesson_language_changed", {
                            lesson_id: getLessonId(),
                            preferred_language: next,
                            displayed_language: displayedLanguage
                        });
                    } catch (_) { }
                });
            }

            function syncSwitcher() {
                document.querySelectorAll("[data-evo-lesson-language-select]").forEach(select => {
                    select.value = preferredLanguage;
                    select.disabled = loadingLanguage;
                    select.setAttribute("data-evo-displayed-language", displayedLanguage);
                });
            }

            async function init() {
                rememberOriginals();
                renderSwitcher();

                const sb = getSB();
                const user = await getSessionUser(sb);
                currentUserId = user?.id || null;

                const remote = await readRemotePreference(sb, currentUserId);
                const local = readLocalPreference();
                const browser = getBrowserLanguage();

                preferredLanguage = remote || local || browser || DEFAULT_LANGUAGE;

                if (currentUserId && !remote && local) {
                    await saveRemotePreference(sb, currentUserId, local);
                }

                await showLanguage(preferredLanguage, { persist: false });

                window.EvoLessonTheoryLocalization = {
                    languages: LANGUAGES.slice(),
                    getLessonId,
                    getSourceVersion,
                    collectTheoryPayload,
                    generateTranslations,
                    publishTranslations,
                    showLanguage: (languageCode) => showLanguage(languageCode, { persist: true }),
                    getState: () => ({
                        preferredLanguage,
                        displayedLanguage,
                        userId: currentUserId,
                        previewRequested,
                        previewActive
                    })
                };
            }

            init().catch(e => console.warn("[EvoLessonLanguage]", e?.message || e));
        })();
    }

    /* ================== boot ================== */
    async function boot() {
        try {
            initEvoAnalytics();
            await loadSupabaseLib();
            initClient();                 // makes window.supabase = client

            const canContinue = await initGlobalAuthGuard();
            if (!canContinue) return;

            initAuthUIToggleAndLogout();
            initTranslatorPopup();
            initAssistant();
            initConsentBanner();
            initProgressTracker();
            initTimeTrackerRpc();
            initCardStatuses();
            initLessonTheoryLocalization();
        } catch (e) {
            console.warn("[Evo] footer failed:", e?.message || e);
            evoRevealPage();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
