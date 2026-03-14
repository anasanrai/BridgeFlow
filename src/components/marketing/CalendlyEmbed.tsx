"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, ExternalLink, Loader2 } from "lucide-react";

interface CalendlyEmbedProps {
    url?: string;
    className?: string;
}

export default function CalendlyEmbed({
    url = "https://calendly.com/raianasan10/30min",
    className = "",
}: CalendlyEmbedProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    // Build embed URL with dark theme params
    const embedUrl = `${url}?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ff6d5a`;

    useEffect(() => {
        let isMounted = true;

        const initCalendly = () => {
            if (!isMounted || !containerRef.current) return;
            const cal = (window as any).Calendly;
            if (cal && typeof cal.initInlineWidget === "function") {
                // Clear any previous widget
                containerRef.current.innerHTML = "";
                try {
                    cal.initInlineWidget({
                        url: embedUrl,
                        parentElement: containerRef.current,
                        prefill: {},
                        utm: {},
                    });
                    if (isMounted) setLoaded(true);
                } catch {
                    if (isMounted) setError(true);
                }
            } else {
                // Fallback: use data-url div approach
                if (isMounted) setLoaded(true);
            }
        };

        // Load Calendly CSS
        if (!document.getElementById("calendly-css")) {
            const link = document.createElement("link");
            link.id = "calendly-css";
            link.rel = "stylesheet";
            link.href = "https://assets.calendly.com/assets/external/widget.css";
            document.head.appendChild(link);
        }

        // Load Calendly JS
        const existingScript = document.getElementById("calendly-js") as HTMLScriptElement | null;
        if (existingScript) {
            if ((window as any).Calendly) {
                setTimeout(initCalendly, 100);
            } else {
                existingScript.addEventListener("load", () => setTimeout(initCalendly, 100));
            }
        } else {
            const script = document.createElement("script");
            script.id = "calendly-js";
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            script.onload = () => setTimeout(initCalendly, 300);
            script.onerror = () => { if (isMounted) setError(true); };
            document.head.appendChild(script);
        }

        return () => {
            isMounted = false;
        };
    }, [embedUrl]);

    return (
        <div className={`relative rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl ${className}`} style={{ background: "#0a0a0a" }}>
            {/* Loading overlay */}
            {!loaded && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 bg-neutral-950">
                    <div className="relative">
                        <Loader2 className="w-12 h-12 text-brand-coral animate-spin" />
                        <Calendar className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.2em] animate-pulse">Establishing Connection Cluster...</p>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-neutral-950 p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-brand-coral/10 border border-brand-coral/20 flex items-center justify-center mb-2">
                        <Calendar className="w-8 h-8 text-brand-coral" />
                    </div>
                    <p className="text-white font-black uppercase tracking-tighter text-xl">Protocol Error</p>
                    <p className="text-neutral-500 text-sm max-w-[280px]">Could not establish connection to the booking gateway.</p>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="mt-4 px-6 py-3 rounded-xl coral-gradient text-white text-xs font-black uppercase tracking-widest hover:opacity-90">
                        Manual Override
                    </a>
                </div>
            )}

            {/* Calendly inline widget — JS API initializes into this div */}
            <div
                ref={containerRef}
                className="calendly-inline-widget w-full"
                data-url={embedUrl}
                style={{ minWidth: "320px", height: "700px" }}
            />

            {/* Always-visible direct booking button */}
            <div className="relative z-20 flex justify-center py-5 border-t border-white/5 bg-neutral-900/50">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand-coral/10 border border-brand-coral/30 text-brand-coral text-[11px] font-black uppercase tracking-widest hover:bg-brand-coral/20 transition-all duration-300 shadow-lg shadow-brand-coral/10 group"
                >
                    <Calendar className="w-4 h-4" />
                    Secure Booking Gateway
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
            </div>
        </div>
    );
}
