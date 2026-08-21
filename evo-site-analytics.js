/* evo-site-analytics.js (global, loaded after evo-footer.js) */
(() => {
    "use strict";

    if (window.__evoSiteAnalyticsLoaded) return;
    window.__evoSiteAnalyticsLoaded = true;

    const CONFIG = {
        version: "2026-08-21",
        supabaseUrl: "https://mwcvjqelccqgmvvydixi.supabase.co",
        anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y3ZqcWVsY2NxZ212dnlkaXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTE3MjgsImV4cCI6MjA2ODI2NzcyOH0.BmvFQnifp7scTPBcdQx7rOJgyijIE4EaWXMqloAiIoU",
        functionName: "site-analytics",
        consentKey: "evo_consent_v1",
        anonymousIdKey: "evo_site_anonymous_id_v1",
        sessionKey: "evo_site_session_v1",
        sessionTimeoutMs: 30 * 60 * 1000,
        heartbeatMs: 15000,
        maxQueue: 40
    };

    const FUNCTION_URL = `${CONFIG.supabaseUrl}/functions/v1/${CONFIG.functionName}`;
    const SENSITIVE_PARAMS = [
        "access_token", "refresh_token", "id_token", "token", "code",
        "password", "pass", "email", "phone"
    ];
    const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const CLICK_KEYS = ["gclid", "fbclid", "msclkid"];

    let started = false;
    let queue = [];
    let sending = false;
    let heartbeatTimer = null;
    let consentTimer = null;
    let visibleSince = 0;
    let pendingEngagedMs = 0;
    let lastPageKey = "";
    let lastPageViewAt = 0;

    function now() {
        return Date.now();
    }

    function readJson(key) {
        try {
            return JSON.parse(localStorage.getItem(key) || "null");
        } catch (_) {
            return null;
        }
    }

    function writeJson(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (_) { }
    }

    function analyticsAllowed() {
        const consent = readJson(CONFIG.consentKey);
        return !!(consent && consent.analytics === true);
    }

    function text(value, max) {
        if (value === null || value === undefined) return "";
        return String(value).slice(0, max);
    }

    function cleanEventName(name) {
        return text(name || "event", 80)
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9_]+/g, "_")
            .replace(/^_+|_+$/g, "")
            .slice(0, 40) || "event";
    }

    function cleanMeta(raw) {
        const out = {};
        Object.keys(raw || {}).slice(0, 20).forEach((key) => {
            const cleanKey = text(key, 40)
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9_]+/g, "_")
                .replace(/^_+|_+$/g, "");
            if (!cleanKey) return;

            const value = raw[key];
            if (value === null || value === undefined || value === "") return;
            if (typeof value === "number" && Number.isFinite(value)) {
                out[cleanKey] = value;
            } else if (typeof value === "boolean") {
                out[cleanKey] = value;
            } else {
                out[cleanKey] = text(value, 200);
            }
        });
        return out;
    }

    function uuid() {
        if (window.crypto && typeof window.crypto.randomUUID === "function") {
            return window.crypto.randomUUID();
        }

        const bytes = new Uint8Array(16);
        if (window.crypto && typeof window.crypto.getRandomValues === "function") {
            window.crypto.getRandomValues(bytes);
        } else {
            for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
        }

        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;

        const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }

    function isUuid(value) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
    }

    function getAnonymousId() {
        let id = "";
        try {
            id = localStorage.getItem(CONFIG.anonymousIdKey) || "";
        } catch (_) { }

        if (!isUuid(id)) {
            id = uuid();
            try {
                localStorage.setItem(CONFIG.anonymousIdKey, id);
            } catch (_) { }
        }
        return id;
    }

    function safeUrl(rawUrl) {
        try {
            const url = new URL(rawUrl || window.location.href, window.location.origin);
            url.hash = "";
            SENSITIVE_PARAMS.forEach((key) => url.searchParams.delete(key));
            return url.toString();
        } catch (_) {
            return text(window.location.href.split("#")[0], 1000);
        }
    }

    function safePath() {
        try {
            return text(window.location.pathname || "/", 500);
        } catch (_) {
            return "/";
        }
    }

    function referrerInfo() {
        const raw = document.referrer || "";
        if (!raw) return { referrer: "", referrer_host: "" };

        try {
            const ref = new URL(raw);
            const currentHost = window.location.hostname.replace(/^www\./, "").toLowerCase();
            const refHost = ref.hostname.replace(/^www\./, "").toLowerCase();
            if (!refHost || refHost === currentHost) return { referrer: "", referrer_host: "" };

            ref.hash = "";
            SENSITIVE_PARAMS.forEach((key) => ref.searchParams.delete(key));
            return {
                referrer: text(ref.toString(), 1000),
                referrer_host: text(refHost, 255)
            };
        } catch (_) {
            return { referrer: text(raw, 1000), referrer_host: "" };
        }
    }

    function currentAttribution() {
        const params = new URLSearchParams(window.location.search || "");
        const out = {};

        UTM_KEYS.forEach((key) => {
            const value = params.get(key);
            if (value) out[key] = text(value, key === "utm_source" || key === "utm_medium" ? 200 : 300);
        });

        const clickIds = {};
        CLICK_KEYS.forEach((key) => {
            const value = params.get(key);
            if (value) clickIds[key] = text(value, 200);
        });

        if (!out.utm_source) {
            if (clickIds.gclid) {
                out.utm_source = "google";
                out.utm_medium = "cpc";
            } else if (clickIds.fbclid) {
                out.utm_source = "facebook";
                out.utm_medium = "paid_social";
            } else if (clickIds.msclkid) {
                out.utm_source = "bing";
                out.utm_medium = "cpc";
            }
        }

        return { utm: out, clickIds };
    }

    function attributionChanged(session, utm) {
        const hasCampaign = !!(utm.utm_source || utm.utm_medium || utm.utm_campaign);
        if (!hasCampaign) return false;
        return UTM_KEYS.some((key) => text(session[key], 300) !== text(utm[key], 300));
    }

    function createSession(anonymousId) {
        const ref = referrerInfo();
        const attribution = currentAttribution();
        const session = {
            session_id: uuid(),
            anonymous_id: anonymousId,
            started_at: new Date().toISOString(),
            last_seen_at: now(),
            landing_url: safeUrl(window.location.href),
            landing_path: safePath(),
            referrer: ref.referrer,
            referrer_host: ref.referrer_host,
            utm_source: attribution.utm.utm_source || "",
            utm_medium: attribution.utm.utm_medium || "",
            utm_campaign: attribution.utm.utm_campaign || "",
            utm_content: attribution.utm.utm_content || "",
            utm_term: attribution.utm.utm_term || "",
            click_ids: attribution.clickIds || {},
            is_new: true
        };

        writeJson(CONFIG.sessionKey, session);
        return session;
    }

    function getSession() {
        const anonymousId = getAnonymousId();
        const stored = readJson(CONFIG.sessionKey);
        const attribution = currentAttribution();
        const expired = !stored || !isUuid(stored.session_id) || (now() - Number(stored.last_seen_at || 0)) > CONFIG.sessionTimeoutMs;
        const changed = !expired && attributionChanged(stored, attribution.utm || {});

        if (expired || changed) return createSession(anonymousId);

        const session = {
            ...stored,
            anonymous_id: stored.anonymous_id || anonymousId,
            last_seen_at: now(),
            is_new: false
        };
        writeJson(CONFIG.sessionKey, session);
        return session;
    }

    function getMeta(name) {
        const el = document.querySelector(`meta[name="${name}"]`);
        return el ? text(el.getAttribute("content") || "", 200).trim() : "";
    }

    function lessonContext(meta) {
        const body = document.body || {};
        return {
            tracking_slug: text(
                meta.tracking_slug ||
                meta.lesson_slug ||
                getMeta("evo-tracking-slug") ||
                body.dataset?.trackingSlug ||
                "",
                200
            ),
            lesson_type: text(
                meta.lesson_type ||
                getMeta("evo-lesson-type") ||
                body.dataset?.lessonType ||
                "",
                100
            )
        };
    }

    function updateEngagement() {
        if (!started || !analyticsAllowed()) return;

        const t = now();
        if (visibleSince > 0) {
            pendingEngagedMs += Math.min(Math.max(t - visibleSince, 0), CONFIG.heartbeatMs * 2);
            visibleSince = t;
        }
    }

    function drainEngagement() {
        updateEngagement();
        const value = Math.round(pendingEngagedMs);
        pendingEngagedMs = 0;
        return Math.min(Math.max(value, 0), 120000);
    }

    function basePayload(eventName, meta, engagedMsDelta) {
        const session = getSession();
        const pageMeta = cleanMeta(meta || {});
        const lesson = lessonContext(pageMeta);

        return {
            event_id: uuid(),
            session_id: session.session_id,
            anonymous_id: session.anonymous_id,
            event_name: cleanEventName(eventName),
            page_url: safeUrl(window.location.href),
            page_path: safePath(),
            page_title: text(document.title || "", 300),
            tracking_slug: lesson.tracking_slug,
            lesson_type: lesson.lesson_type,
            engaged_ms_delta: engagedMsDelta || 0,
            landing_url: text(session.landing_url || "", 1000),
            landing_path: text(session.landing_path || "", 500),
            referrer: text(session.referrer || "", 1000),
            referrer_host: text(session.referrer_host || "", 255),
            utm_source: text(session.utm_source || "", 200),
            utm_medium: text(session.utm_medium || "", 200),
            utm_campaign: text(session.utm_campaign || "", 300),
            utm_content: text(session.utm_content || "", 300),
            utm_term: text(session.utm_term || "", 300),
            language: text(navigator.language || "", 30),
            timezone: text(Intl.DateTimeFormat().resolvedOptions().timeZone || "", 100),
            screen_width: Number(window.screen?.width) || null,
            screen_height: Number(window.screen?.height) || null,
            meta: cleanMeta({
                tracker_version: CONFIG.version,
                ...session.click_ids,
                ...pageMeta
            })
        };
    }

    function getSupabaseClient() {
        const sb = window.supabaseClient || window.supabase || window.sb || null;
        return sb && sb.auth ? sb : null;
    }

    async function getAccessToken() {
        const sb = getSupabaseClient();
        if (!sb || !sb.auth || typeof sb.auth.getSession !== "function") return "";

        try {
            const { data } = await sb.auth.getSession();
            return data?.session?.access_token || "";
        } catch (_) {
            return "";
        }
    }

    async function sendWithClient(payload) {
        const sb = getSupabaseClient();
        if (!sb || !sb.functions || typeof sb.functions.invoke !== "function") {
            throw new Error("Supabase functions client is not ready");
        }

        const { error } = await sb.functions.invoke(CONFIG.functionName, { body: payload });
        if (error) throw error;
    }

    async function sendWithFetch(payload) {
        const token = await getAccessToken();
        const response = await fetch(FUNCTION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": CONFIG.anonKey,
                "Authorization": `Bearer ${token || CONFIG.anonKey}`,
                "x-client-info": `evo-site-analytics-web/${CONFIG.version}`
            },
            body: JSON.stringify(payload),
            credentials: "omit",
            keepalive: JSON.stringify(payload).length < 8000
        });

        if (!response.ok) throw new Error(`site-analytics returned ${response.status}`);
    }

    function sendWithBeacon(payload) {
        if (!navigator.sendBeacon) return false;
        try {
            const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
            return navigator.sendBeacon(FUNCTION_URL, blob);
        } catch (_) {
            return false;
        }
    }

    async function sendPayload(payload, opts) {
        if (!analyticsAllowed()) return false;
        if (opts?.beacon && sendWithBeacon(payload)) return true;

        try {
            await sendWithClient(payload);
            return true;
        } catch (_) {
            await sendWithFetch(payload);
            return true;
        }
    }

    function enqueue(payload, opts) {
        if (!analyticsAllowed()) return false;

        if (opts?.beacon) {
            sendPayload(payload, opts).catch(() => { });
            return true;
        }

        queue.push({ payload, tries: 0 });
        if (queue.length > CONFIG.maxQueue) queue = queue.slice(queue.length - CONFIG.maxQueue);
        flush();
        return true;
    }

    async function flush() {
        if (sending || !analyticsAllowed()) return;
        sending = true;

        while (queue.length && analyticsAllowed()) {
            const item = queue.shift();
            try {
                await sendPayload(item.payload, {});
            } catch (_) {
                item.tries += 1;
                if (item.tries < 3) queue.unshift(item);
                break;
            }
        }

        sending = false;
        if (queue.length && analyticsAllowed()) window.setTimeout(flush, 3000);
    }

    function track(eventName, meta, opts) {
        if (!analyticsAllowed()) return false;

        const engagedMsDelta = opts?.engagedMsDelta ?? (opts?.includeEngagement ? drainEngagement() : 0);
        const payload = basePayload(eventName, meta || {}, engagedMsDelta);
        return enqueue(payload, opts || {});
    }

    function trackPageView() {
        if (!analyticsAllowed()) return false;

        const key = `${safeUrl(window.location.href)}|${document.title || ""}`;
        const t = now();
        if (key === lastPageKey && t - lastPageViewAt < 1000) return true;

        lastPageKey = key;
        lastPageViewAt = t;
        return track("page_view", {}, { includeEngagement: false });
    }

    function trackEngagement(opts) {
        const delta = drainEngagement();
        if (delta < 1000) return false;
        return track("engagement_tick", {}, { engagedMsDelta: delta, beacon: !!opts?.beacon });
    }

    function isVisibleAndFocused() {
        return document.visibilityState !== "hidden" && (typeof document.hasFocus !== "function" || document.hasFocus());
    }

    function refreshVisibility() {
        updateEngagement();
        visibleSince = isVisibleAndFocused() ? now() : 0;
    }

    function installNavigationHooks() {
        if (window.__evoSiteAnalyticsNavigationHooks) return;
        window.__evoSiteAnalyticsNavigationHooks = true;

        ["pushState", "replaceState"].forEach((method) => {
            const original = history[method];
            if (typeof original !== "function") return;
            history[method] = function patchedHistoryMethod() {
                const result = original.apply(this, arguments);
                window.setTimeout(trackPageView, 100);
                return result;
            };
        });

        window.addEventListener("popstate", () => window.setTimeout(trackPageView, 100));
    }

    function installListeners() {
        window.addEventListener("evo:analytics", (event) => {
            const detail = event.detail || {};
            const name = cleanEventName(detail.event || detail.event_name || "event");
            const params = detail.params && typeof detail.params === "object" ? detail.params : {};
            track(name, params, { includeEngagement: false });
        });

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                trackEngagement({ beacon: true });
            }
            refreshVisibility();
        });

        window.addEventListener("focus", refreshVisibility);
        window.addEventListener("blur", () => {
            trackEngagement({ beacon: true });
            refreshVisibility();
        });
        window.addEventListener("pagehide", () => trackEngagement({ beacon: true }));
        window.addEventListener("beforeunload", () => trackEngagement({ beacon: true }));
    }

    function start() {
        if (started || !analyticsAllowed()) return false;

        started = true;
        installNavigationHooks();
        refreshVisibility();

        const session = getSession();
        if (session.is_new) {
            track("session_start", {}, { includeEngagement: false });
        }

        trackPageView();
        heartbeatTimer = window.setInterval(() => {
            if (!analyticsAllowed()) return;
            trackEngagement();
            flush();
        }, CONFIG.heartbeatMs);
        return true;
    }

    window.EvoSiteAnalytics = {
        version: CONFIG.version,
        track,
        flush,
        start,
        analyticsAllowed,
        getSession: () => analyticsAllowed() ? getSession() : null
    };

    installListeners();
    start();

    if (!started) {
        consentTimer = window.setInterval(() => {
            if (start() && consentTimer) {
                window.clearInterval(consentTimer);
                consentTimer = null;
            }
        }, 1000);

        window.setTimeout(() => {
            if (consentTimer) {
                window.clearInterval(consentTimer);
                consentTimer = null;
            }
        }, 5 * 60 * 1000);
    }

    window.addEventListener("online", flush);
})();
