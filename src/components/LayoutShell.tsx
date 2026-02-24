"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ParticleBackground from "./ParticleBackground";
import ChatWidget from "./ChatWidget";

export default function LayoutShell({
    children,
    siteConfig,
}: {
    children: React.ReactNode;
    siteConfig: any;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) return <>{children}</>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar siteConfig={siteConfig} />
            <ParticleBackground />
            <main className="flex-grow">{children}</main>
            <Footer siteConfig={siteConfig} />
            <ChatWidget />
        </div>
    );
}
