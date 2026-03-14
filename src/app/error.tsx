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
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
            <div className="text-center max-w-lg">
                {/* Icon */}
                <div className="w-20 h-20 rounded-[30px] bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>

                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white mb-4">
                    Exception <span className="text-red-500">Caught</span>
                </h1>
                <p className="text-neutral-400 font-medium text-lg mb-8 leading-relaxed">
                    We hit an unexpected error. Our team has been notified.
                    You can try again or head back to the homepage.
                </p>

                {error.digest && (
                    <p className="text-[11px] font-black tracking-widest uppercase text-neutral-600 mb-8 border border-white/5 inline-block px-3 py-1 bg-neutral-900/50 rounded-lg">
                        Error Hash: {error.digest}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="inline-flex justify-center items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest bg-white text-neutral-950 rounded-full hover:bg-neutral-200 transition-all transform hover:-translate-y-1"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reinitialize
                    </button>
                    <a
                        href="/"
                        className="inline-flex justify-center items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest border border-white/10 text-white rounded-full hover:bg-white/5 transition-all"
                    >
                        <Home className="w-4 h-4" />
                        System Root
                    </a>
                </div>
            </div>
        </div>
    );
}
