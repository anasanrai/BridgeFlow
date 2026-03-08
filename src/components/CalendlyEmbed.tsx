"use client";

import { useState, useEffect } from "react";
import { Calendar, ExternalLink, Loader2 } from "lucide-react";

interface CalendlyEmbedProps {
    url?: string;
    className?: string;
}

export default function CalendlyEmbed({
    url = "https://calendly.com/raianasan10/30min",
    className = "",
}: CalendlyEmbedProps) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const embedUrl = `${url}?hide_gdpr_banner=1&background_color=080d1a&text_color=e5e7eb&primary_color=e6b422`;

    useEffect(() => {
        // Load Calendly widget script
        const existing = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
        if (existing) {
            setScriptLoaded(true);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        script.onerror = () => setError(true);
        document.head.appendChild(script);
        return () => {
            // Don't remove script on unmount as it may be used elsewhere
        };
    }, []);

    const handleIframeLoad = () => {
        setLoaded(true);
    };

    const handleIframeError = () => {
        setError(false); // Don't show error for iframe — use fallback button instead
        setLoaded(true);
    };

    return (
        <div className={`relative rounded-2xl border border-gold-400/20 overflow-hidden bg-navy-900/30 ${className}`}>
            {/* Loading state */}
            {!loaded && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-navy-900/80 z-10">
                    <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
                    <p className="text-gray-400 text-sm">Loading calendar...</p>
                </div>
            )}

            {/* Calendly inline widget */}
            <div
                className="calendly-inline-widget"
                data-url={embedUrl}
                style={{ minWidth: "320px", height: "700px" }}
            />

            {/* Fallback iframe */}
            <iframe
                src={embedUrl}
                width="100%"
                height="700"
                frameBorder="0"
                title="Book a Strategy Call with BridgeFlow"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} absolute inset-0 w-full h-full`}
                allow="camera; microphone; fullscreen"
                loading="lazy"
            />

            {/* Always-visible fallback button at bottom */}
            <div className="relative z-20 flex justify-center py-4 bg-gradient-to-t from-navy-950/80 to-transparent">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm font-semibold hover:bg-gold-400/20 transition-all duration-200"
                >
                    <Calendar className="w-4 h-4" />
                    Open Calendar in New Tab
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </div>
        </div>
    );
}
