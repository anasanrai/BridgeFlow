/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.supabase.co",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "n8n.io",
            },
        ],
        // Optimize image quality
        formats: ["image/avif", "image/webp"],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        // CSP: fonts are now served via next/font (no googleapis needed)
                        key: "Content-Security-Policy",
                        value: [
                            "default-src 'self'",
                            // unsafe-inline needed for Next.js inline scripts; unsafe-eval for framer-motion
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                            "style-src 'self' 'unsafe-inline'",
                            "font-src 'self' data:",
                            "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://n8n.io",
                            [
                                "connect-src 'self'",
                                "https://*.supabase.co",
                                "https://api.openai.com",
                                "https://api.us-west-2.modal.direct",
                                "https://generativelanguage.googleapis.com",
                            ].join(" "),
                            "frame-ancestors 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                        ].join("; "),
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/admin",
                destination: "/admin/dashboard",
                permanent: false,
                has: [{ type: "cookie", key: "admin_token" }],
            },
            // Fix: /ai-calculator was linked in nav but page lives at /calculator
            {
                source: "/ai-calculator",
                destination: "/calculator",
                permanent: true,
            },
        ];
    },
    // Remove console.log in production (keep error/warn)
    compiler: {
        removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
    },
    // Tree-shake large packages
    experimental: {
        optimizePackageImports: ["lucide-react", "framer-motion"],
    },
};

module.exports = nextConfig;
