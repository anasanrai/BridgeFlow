/**
 * Standard enterprise logging utility
 * In the future, this can be swapped with Pino, Sentry, or Datadog without changing the app codebase.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
    message: string;
    level: LogLevel;
    context?: Record<string, any>;
    error?: Error | unknown;
    timestamp: string;
}

class Logger {
    private formatLog(level: LogLevel, message: string, context?: any, error?: any): LogPayload {
        return {
            level,
            message,
            context,
            error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error,
            timestamp: new Date().toISOString(),
        };
    }

    private print(payload: LogPayload) {
        // Skip debug logs in production
        if (payload.level === "debug" && process.env.NODE_ENV === "production") return;

        const logString = JSON.stringify(payload);

        switch (payload.level) {
            case "error":
                console.error(logString);
                break;
            case "warn":
                console.warn(logString);
                break;
            case "info":
                console.info(logString);
                break;
            case "debug":
                console.log(logString);
                break;
        }
    }

    info(message: string, context?: any) {
        this.print(this.formatLog("info", message, context));
    }

    warn(message: string, context?: any) {
        this.print(this.formatLog("warn", message, context));
    }

    error(message: string, error?: any, context?: any) {
        this.print(this.formatLog("error", message, context, error));
    }

    debug(message: string, context?: any) {
        this.print(this.formatLog("debug", message, context));
    }
}

export const logger = new Logger();
