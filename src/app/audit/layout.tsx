import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Automation Audit | Find Your Revenue Leaks — BridgeFlow",
    description:
        "Enter your website URL for a free Speed-to-Lead performance audit. Find out exactly how many leads you're losing to slow automation. Takes 60 seconds.",
    openGraph: {
        title: "Free Automation Audit — BridgeFlow",
        description:
            "Find out how many leads you're losing. Free 60-second audit.",
        images: [{ url: "/images/og-audit.png" }],
    },
};

export default function AuditLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
