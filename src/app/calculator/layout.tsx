import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI ROI Calculator — Estimate Your Automation Savings",
    description:
        "Calculate how much time and money your business can save with AI automation. Enter your tasks, frequency, and hourly rate to get an instant ROI estimate.",
    keywords: [
        "AI ROI calculator",
        "automation savings calculator",
        "workflow automation ROI",
        "n8n automation cost savings",
        "AI cost calculator",
    ],
    alternates: {
        canonical: "https://www.bridgeflow.agency/calculator",
    },
    openGraph: {
        title: "AI ROI Calculator — BridgeFlow",
        description:
            "See exactly how much time and money AI automation can save your business. Free, instant estimate.",
        url: "https://www.bridgeflow.agency/calculator",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI ROI Calculator — BridgeFlow",
        description:
            "See exactly how much time and money AI automation can save your business. Free, instant estimate.",
    },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
