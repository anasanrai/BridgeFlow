"use client";

import { useState, useEffect } from "react";

const rotatingWords = [
    "Real Estate Deals",
    "E-commerce Sales",
    "Law Firm Clients",
    "Clinic Appointments",
    "Agency Retainers",
    "Coaching Clients",
    "B2B Contracts",
    "SaaS Signups",
    "Insurance Renewals",
    "School Enrollments",
];

export default function RotatingHeadline() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
                setIsVisible(true);
            }, 400);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 drop-shadow-lg">
            Stop Losing{" "}
            <br className="hidden sm:block" />
            <span
                className={`gold-text text-glow inline-block transition-all duration-400 ${isVisible
                        ? "opacity-100 translate-y-0 blur-0"
                        : "opacity-0 translate-y-2 blur-[2px]"
                    }`}
            >
                {rotatingWords[currentIndex]}
            </span>{" "}
            <br className="hidden sm:block" />
            to Slow Automation
        </h1>
    );
}
