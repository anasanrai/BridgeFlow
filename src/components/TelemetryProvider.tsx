"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function TelemetryProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const sessionIdRef = useRef<string>("");

    useEffect(() => {
        // Initialize or get session ID
        let sid = sessionStorage.getItem("bf_session_id");
        if (!sid) {
            sid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem("bf_session_id", sid);
        }
        sessionIdRef.current = sid;
    }, []);

    useEffect(() => {
        if (!sessionIdRef.current) return;

        // Log page view
        const logPageView = async () => {
            try {
                await fetch("/api/telemetry", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        event_type: "page_view",
                        path: pathname,
                        session_id: sessionIdRef.current,
                        referrer: document.referrer,
                        data: {
                            title: document.title,
                        },
                    }),
                });
            } catch (err) {
                // Silently ignore telemetry errors
            }
        };

        logPageView();
    }, [pathname]);

    useEffect(() => {
        // Track scroll depth
        let maxScroll = 0;
        const trackedThresholds = new Set<number>();

        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

            [25, 50, 75, 100].forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    fetch("/api/telemetry", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            event_type: "scroll_depth",
                            path: pathname,
                            session_id: sessionIdRef.current,
                            data: { depth: threshold },
                        }),
                    }).catch(() => { });
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    useEffect(() => {
        // Track clicks on interactive elements
        const handleGlobalClick = async (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest("a, button");

            if (interactive) {
                try {
                    await fetch("/api/telemetry", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            event_type: "click",
                            path: pathname,
                            session_id: sessionIdRef.current,
                            data: {
                                tag: interactive.tagName.toLowerCase(),
                                text: interactive.textContent?.trim().substring(0, 50),
                                href: (interactive as HTMLAnchorElement).href || null,
                                id: interactive.id || null,
                            },
                        }),
                    });
                } catch (err) { }
            }
        };

        window.addEventListener("click", handleGlobalClick);
        return () => window.removeEventListener("click", handleGlobalClick);
    }, [pathname]);

    return <>{children}</>;
}
