"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { logger } from "@/lib/logger";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error using our new structured logger
        logger.error("Global uncaught error", error, { digest: error.digest });
    }, [error]);

    return (
        <html>
            <body className="bg-neutral-950 text-white font-sans antialiased min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md w-full glass rounded-3xl p-8 border border-white/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-500" />

                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>

                    <h1 className="text-2xl font-display font-bold text-white mb-2">Something went wrong!</h1>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        A critical error occurred while rendering the interface. Our team has been notified.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => reset()}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold border border-white/10 hover:bg-white/5 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Try again
                        </button>
                        <Link
                            href="/"
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-neutral-950 transition-all hover:scale-[1.02]"
                            style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}
                        >
                            <Home className="w-4 h-4" />
                            Go home
                        </Link>
                    </div>

                    {process.env.NODE_ENV !== "production" && (
                        <div className="mt-8 p-4 rounded-xl bg-black/40 border border-red-500/20 text-left overflow-auto max-h-48">
                            <p className="text-red-400 font-mono text-xs mb-2 font-bold">{error.message || "Unknown Error"}</p>
                            <pre className="text-red-400/70 font-mono text-[10px] whitespace-pre-wrap">
                                {error.stack}
                            </pre>
                        </div>
                    )}
                </div>
            </body>
        </html>
    );
}
