/**
 * Environment variable validation.
 * Called at app startup — throws on missing critical vars in production.
 */

const REQUIRED_IN_PRODUCTION: string[] = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "JWT_SECRET",
    "ADMIN_PASSWORD",
];

const OPTIONAL_BUT_WARN: string[] = [
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "OPENROUTER_API_KEY",
    "TELEGRAM_BOT_TOKEN",
    "TELEGRAM_CHAT_ID",
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
];

export function validateEnv(): void {
    if (process.env.NODE_ENV !== "production") return;

    const missing = REQUIRED_IN_PRODUCTION.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        throw new Error(
            `[BridgeFlow] Missing required environment variables:\n  ${missing.join("\n  ")}\n` +
            `Set these in your deployment environment before starting the server.`
        );
    }

    const unset = OPTIONAL_BUT_WARN.filter((key) => !process.env[key]);
    if (unset.length > 0) {
        console.warn(
            `[BridgeFlow] Optional environment variables not set (some features may be unavailable):\n  ${unset.join("\n  ")}`
        );
    }
}
