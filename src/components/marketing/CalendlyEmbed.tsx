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
    const embedUrl = `${url}?hide_gdpr_banner=1&background_color=080d1a&text_color=e5e7eb&primary_color=e6b422`;

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
        <div className={`relative rounded-2xl border border-gold-400/20 overflow-hidden ${className}`} style={{ background: "#080d1a" }}>
            {/* Loading overlay */}
            {!loaded && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10" style={{ background: "#080d1a" }}>
                    <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
                    <p className="text-gray-400 text-sm">Loading calendar...</p>
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
            <div className="relative z-20 flex justify-center py-3 border-t border-white/5">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm font-semibold hover:bg-gold-400/20 transition-all duration-200"
                >
                    <Calendar className="w-4 h-4" />
                    Open Booking Calendar
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </div>
        </div>
    );
}
