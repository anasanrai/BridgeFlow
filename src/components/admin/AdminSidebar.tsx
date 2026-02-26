"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    Globe,
    Home,
    Briefcase,
    Users,
    FileText,
    FolderOpen,
    Mail,
    Bell,
    LogOut,
    ChevronRight,
    Activity,
    Sparkles,
    Link2,
    Cpu,
    Settings,
    Shield,
    Terminal,
} from "lucide-react";
import AdminAI from "./AdminAI";

// Track sidebar state globally for layout coordination
export const SIDEBAR_WIDTH = 256; // 64 * 4 = w-64

const sidebarLinks = [
    {
        group: "Command Center",
        items: [
            { href: "/admin/dashboard", label: "Control Room", icon: Terminal },
            { href: "/admin/settings", label: "Platform Settings", icon: Settings },
            { href: "/admin/seo", label: "SEO Management", icon: Globe },
            { href: "/admin/activity", label: "Activity Log", icon: Activity },
        ],
    },
    {
        group: "Enterprise",
        items: [
            { href: "/admin/integrations", label: "Integrations", icon: Link2 },
            { href: "/admin/ai-models", label: "AI Model Stack", icon: Cpu },
            { href: "/admin/media", label: "Media Manager", icon: FolderOpen },
        ],
    },
    {
        group: "Content",
        items: [
            { href: "/admin/site", label: "Site Config", icon: Globe },
            { href: "/admin/home", label: "Home Page", icon: Home },
            { href: "/admin/services", label: "Services", icon: Briefcase },
            { href: "/admin/about", label: "About & Team", icon: Users },
            { href: "/admin/blog", label: "Blog Posts", icon: FileText },
            { href: "/admin/case-studies", label: "Case Studies", icon: FolderOpen },
        ],
    },
    {
        group: "Data",
        items: [
            { href: "/admin/contacts", label: "Contact Forms", icon: Mail },
            { href: "/admin/subscribers", label: "Subscribers", icon: Bell },
        ],
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [showAI, setShowAI] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        router.push("/admin");
    };

    const envLabel = process.env.NODE_ENV === "production" ? "PROD" : "DEV";
    const envColor = process.env.NODE_ENV === "production"
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-amber-500/10 text-amber-400 border-amber-500/20";

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-[60] lg:hidden p-2.5 rounded-xl glass border border-white/10 text-white hover:bg-white/5 transition-colors"
                aria-label="Toggle sidebar"
            >
                {isOpen ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
            </button>

            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-navy-900/95 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Header */}
                <div className="p-5 border-b border-white/5">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                        <Image
                            src="/images/logo.png"
                            alt="BridgeFlow"
                            width={120}
                            height={30}
                            className="h-7 w-auto"
                        />
                    </Link>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                            Control Room
                        </span>
                        <span className={`ml-auto text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${envColor}`}>
                            {envLabel}
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin">
                    {sidebarLinks.map((group) => (
                        <div key={group.group}>
                            <h3 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                                {group.group}
                            </h3>
                            <ul className="space-y-0.5">
                                {group.items.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                                                    ? "bg-gold-400/10 text-gold-400 border border-gold-400/15"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                                    }`}
                                            >
                                                <link.icon
                                                    className={`w-4 h-4 ${isActive ? "text-gold-400" : "text-gray-500 group-hover:text-gray-300"
                                                        }`}
                                                />
                                                {link.label}
                                                {isActive && (
                                                    <ChevronRight className="w-3 h-3 ml-auto text-gold-400" />
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-white/5 space-y-1">
                    <button
                        onClick={() => setShowAI(true)}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-all"
                    >
                        <Sparkles className="w-4 h-4" />
                        AI Assistant
                    </button>
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <Globe className="w-4 h-4" />
                        View Website
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {showAI && <AdminAI onClose={() => setShowAI(false)} />}
        </>
    );
}
