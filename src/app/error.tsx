"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
            <div className="text-center max-w-lg">
                {/* Icon */}
                <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
                    <AlertTriangle className="w-10 h-10 text-red-400" />
                </div>

                <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                    Something went <span className="text-red-400">wrong</span>
                </h1>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    We hit an unexpected error. Our team has been notified.
                    You can try again or head back to the homepage.
                </p>

                {error.digest && (
                    <p className="text-xs text-gray-600 mb-6 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-widest gold-gradient text-navy-950 rounded-full hover:shadow-[0_0_30px_rgba(230,180,34,0.4)] hover:scale-105 active:scale-95 transition-all duration-500"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-widest border border-white/10 text-gray-300 hover:text-white rounded-full hover:bg-white/5 transition-all duration-300"
                    >
                        <Home className="w-4 h-4" />
                        Homepage
                    </a>
                </div>
            </div>
        </div>
    );
}
