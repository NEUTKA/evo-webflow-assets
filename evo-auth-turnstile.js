/* evo-auth-turnstile.js (login page, loaded after Supabase auth setup) */
(() => {
    "use strict";

    if (window.__evoAuthTurnstileLoaded) return;
    window.__evoAuthTurnstileLoaded = true;

    const loaderScript = document.currentScript;
    const siteKey = String(loaderScript?.dataset?.sitekey || "").trim();
    const TURNSTILE_API = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    const CAPTCHA_MESSAGE = "Complete the security check and try again.";

    const flows = {
        signup: {
            anchor: "#signup",
            action: "signup",
            token: "",
            widgetId: null
        },
        login: {
            anchor: "#login",
            action: "login",
            token: "",
            widgetId: null
        },
        reset: {
            anchor: "#ms-reset-send",
            action: "password_reset",
            token: "",
            widgetId: null
        }
    };

    function addStyles() {
        if (document.getElementById("evo-turnstile-styles")) return;

        const style = document.createElement("style");
        style.id = "evo-turnstile-styles";
        style.textContent = `
            .evo-turnstile {
                width: 100%;
                min-width: 0;
                min-height: 65px;
                margin: 12px 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .evo-turnstile > div,
            .evo-turnstile iframe {
                max-width: 100%;
            }
            .evo-turnstile-error {
                color: #b42318;
                font-size: 14px;
                line-height: 1.4;
                text-align: center;
            }
        `;
        document.head.appendChild(style);
    }

    function showError(flowName, message) {
        const host = document.getElementById(`evo-turnstile-${flowName}`);
        if (!host) return;
        host.classList.add("evo-turnstile-error");
        host.textContent = message;
    }

    function insertHost(flowName) {
        const flow = flows[flowName];
        const anchor = document.querySelector(flow.anchor);
        if (!anchor) return null;

        const host = document.createElement("div");
        host.id = `evo-turnstile-${flowName}`;
        host.className = "evo-turnstile";
        host.setAttribute("aria-label", "Security check");

        if (flowName === "reset") {
            anchor.parentNode?.insertBefore(host, anchor);
            return host;
        }

        const submit = anchor.querySelector(
            'button[type="submit"], input[type="submit"], .w-button[type="submit"]'
        );
        if (submit?.parentNode) {
            submit.parentNode.insertBefore(host, submit);
        } else {
            anchor.appendChild(host);
        }
        return host;
    }

    function resetFlow(flowName) {
        const flow = flows[flowName];
        flow.token = "";
        if (flow.widgetId !== null && window.turnstile) {
            window.turnstile.reset(flow.widgetId);
        }
    }

    function missingCaptchaResult() {
        const error = new Error(CAPTCHA_MESSAGE);
        error.name = "CaptchaRequiredError";
        return { data: null, error };
    }

    function tokenFor(flowName) {
        return flows[flowName]?.token || "";
    }

    function renderWidgets() {
        Object.keys(flows).forEach((flowName) => {
            const flow = flows[flowName];
            const host = insertHost(flowName);
            if (!host) return;

            flow.widgetId = window.turnstile.render(host, {
                sitekey: siteKey,
                action: flow.action,
                theme: "auto",
                size: "flexible",
                appearance: "always",
                callback(token) {
                    flow.token = token;
                    host.classList.remove("evo-turnstile-error");
                },
                "expired-callback"() {
                    flow.token = "";
                },
                "timeout-callback"() {
                    flow.token = "";
                },
                "error-callback"() {
                    flow.token = "";
                    showError(flowName, "Security check unavailable. Please reload the page.");
                }
            });
        });
    }

    function loadTurnstile() {
        if (window.turnstile) {
            renderWidgets();
            return;
        }

        const existing = document.querySelector(`script[src^="${TURNSTILE_API.split("?")[0]}"]`);
        if (existing) {
            existing.addEventListener("load", renderWidgets, { once: true });
            return;
        }

        const script = document.createElement("script");
        script.src = TURNSTILE_API;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", renderWidgets, { once: true });
        script.addEventListener("error", () => {
            Object.keys(flows).forEach((flowName) => {
                if (!document.getElementById(`evo-turnstile-${flowName}`)) insertHost(flowName);
                showError(flowName, "Security check unavailable. Please reload the page.");
            });
        }, { once: true });
        document.head.appendChild(script);
    }

    function findSupabaseClient() {
        const candidates = [
            window.supabase,
            window.supabaseClient,
            window.evoSupabase
        ];
        return candidates.find((client) => (
            client?.auth &&
            typeof client.auth.signUp === "function" &&
            typeof client.auth.signInWithPassword === "function" &&
            typeof client.auth.resetPasswordForEmail === "function"
        ));
    }

    function patchAuth(client) {
        const auth = client.auth;
        if (auth.__evoTurnstilePatched) return;

        const originalSignUp = auth.signUp.bind(auth);
        const originalSignIn = auth.signInWithPassword.bind(auth);
        const originalReset = auth.resetPasswordForEmail.bind(auth);

        auth.signUp = async (credentials) => {
            const captchaToken = tokenFor("signup");
            if (!captchaToken) return missingCaptchaResult();

            try {
                return await originalSignUp({
                    ...credentials,
                    options: {
                        ...(credentials?.options || {}),
                        captchaToken
                    }
                });
            } finally {
                resetFlow("signup");
            }
        };

        auth.signInWithPassword = async (credentials) => {
            const captchaToken = tokenFor("login");
            if (!captchaToken) return missingCaptchaResult();

            try {
                return await originalSignIn({
                    ...credentials,
                    options: {
                        ...(credentials?.options || {}),
                        captchaToken
                    }
                });
            } finally {
                resetFlow("login");
            }
        };

        auth.resetPasswordForEmail = async (email, options = {}) => {
            const captchaToken = tokenFor("reset");
            if (!captchaToken) return missingCaptchaResult();

            try {
                return await originalReset(email, {
                    ...options,
                    captchaToken
                });
            } finally {
                resetFlow("reset");
            }
        };

        Object.defineProperty(auth, "__evoTurnstilePatched", {
            value: true,
            configurable: false,
            enumerable: false,
            writable: false
        });
    }

    function waitForSupabase(timeoutMs = 10000) {
        const startedAt = Date.now();
        const timer = window.setInterval(() => {
            const client = findSupabaseClient();
            if (client) {
                window.clearInterval(timer);
                patchAuth(client);
                return;
            }

            if (Date.now() - startedAt >= timeoutMs) {
                window.clearInterval(timer);
                console.error("[EVO Auth] Supabase client was not available for CAPTCHA protection.");
            }
        }, 100);
    }

    window.evoAuthCaptcha = {
        isReady(flowName) {
            return Boolean(tokenFor(flowName));
        },
        reset: resetFlow
    };

    if (!siteKey) {
        console.error("[EVO Auth] Missing Turnstile site key.");
        return;
    }

    addStyles();
    loadTurnstile();
    waitForSupabase();
})();
