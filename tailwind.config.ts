import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    coral: "#ff6d5a",
                    purple: "#8b6dff",
                    teal: "#14b8a6",
                },
                neutral: {
                    950: "#0a0a0a",
                    900: "#141414",
                    800: "#1f1f1f",
                    700: "#2a2a2a",
                },
                surface: {
                    card: "#141414",
                    hover: "#1f1f1f",
                    border: "rgba(255, 255, 255, 0.08)",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Outfit", "system-ui", "sans-serif"],
            },
            animation: {
                "fade-in-up": "fadeInUp 0.6s ease-out forwards",
                "fade-in": "fadeIn 0.6s ease-out forwards",
                "slide-in-left": "slideInLeft 0.6s ease-out forwards",
                "slide-in-right": "slideInRight 0.6s ease-out forwards",
                "glow-pulse": "glowPulse 3s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "particle": "particle 20s linear infinite",
                "count-up": "countUp 2s ease-out forwards",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideInLeft: {
                    "0%": { opacity: "0", transform: "translateX(-30px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                slideInRight: {
                    "0%": { opacity: "0", transform: "translateX(30px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                glowPulse: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(230, 180, 34, 0.15)" },
                    "50%": { boxShadow: "0 0 40px rgba(230, 180, 34, 0.3)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                particle: {
                    "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
                    "10%": { opacity: "1" },
                    "90%": { opacity: "1" },
                    "100%": { transform: "translateY(-100vh) rotate(720deg)", opacity: "0" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "hero-glow": "radial-gradient(ellipse at center, rgba(230, 180, 34, 0.08) 0%, transparent 70%)",
            },
        },
    },
    plugins: [],
};

export default config;
