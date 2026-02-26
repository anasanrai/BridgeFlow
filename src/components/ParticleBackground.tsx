"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particleCount = 30;
        const particles: HTMLDivElement[] = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 15 + 15;
            const opacity = Math.random() * 0.5 + 0.1;

            particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${Math.random() > 0.5
                    ? "rgba(230, 180, 34, 0.4)"
                    : "rgba(255, 255, 255, 0.2)"
                };
        border-radius: 50%;
        left: ${left}%;
        top: 100%;
        pointer-events: none;
        opacity: ${opacity};
        animation: particleFloat ${duration}s linear ${delay}s infinite;
        z-index: 1;
      `;

            container.appendChild(particle);
            particles.push(particle);
        }

        return () => {
            particles.forEach((p) => p.remove());
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold-400/[0.03] rounded-full aurora-blur animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/[0.02] rounded-full aurora-blur animate-float" style={{ animationDelay: '2s' }} />
        </div>
    );
}
