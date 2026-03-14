"use client";
import React from "react";

interface AnimatedCounterProps {
    end: number;
    label: string;
    prefix?: string;
    suffix?: string;
    duration?: number;
}

export function AnimatedCounter({
    end,
    label,
    prefix = "",
    suffix = "",
    duration = 2,
}: AnimatedCounterProps) {
    const [count, setCount] = React.useState(0);
    const countRef = React.useRef(0);

    React.useEffect(() => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            const currentCount = Math.floor(progress * end);
            if (currentCount !== countRef.current) {
                countRef.current = currentCount;
                setCount(currentCount);
            }
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return (
        <div className="text-center">
            <div
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-coral font-bold"
                aria-label={`${prefix}${end}${suffix}`}
            >
                {prefix}
                {count}
                {suffix}
            </div>
            <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider">
                {label}
            </div>
        </div>
    );
}
