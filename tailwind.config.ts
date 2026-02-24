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
                navy: {
                    950: "#050510",
                    900: "#0a0a1a",
                    800: "#0f0f2a",
                    700: "#15153a",
                    600: "#1a1a4a",
                },
                gold: {
                    50: "#fdf8e8",
                    100: "#f9ecc4",
                    200: "#f3d98a",
                    300: "#ecbf4a",
                    400: "#e6b422",
                    500: "#c9a227",
                    600: "#a68520",
                    700: "#836819",
                    800: "#6b5416",
                    900: "#584514",
                },
                surface: {
                    card: "#12122a",
                    hover: "#1a1a3a",
                    border: "rgba(255, 255, 255, 0.06)",
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
