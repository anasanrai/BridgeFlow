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
    Activity,
    Sparkles,
    Link2,
    Cpu,
    Settings,
    Shield,
    Terminal,
    DollarSign,
    Phone,
    Search,
    Workflow,
    CreditCard,
    History,
    Menu,
    X,
    ChevronDown,
    TrendingUp,
    BarChart3,
    Package,
    UserCheck,
    FileSearch,
    Database,
    Key,
    Moon,
    Sun,
} from "lucide-react";
import AdminAI from "./AdminAI";

// Track sidebar state globally for layout coordinates
export const SIDEBAR_WIDTH = 280;

interface User {
    id?: string;
    email?: string;
    user_metadata?: {
        name?: string;
        avatar_url?: string;
    };
}

interface SidebarProps {
    user?: User | null;
}

const navigation = [
    {
        name: "Main",
        items: [
            { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
            { name: "Analytics", href: "/admin/activity", icon: BarChart3 },
        ],
    },
    {
        name: "Content",
        items: [
            { name: "Templates", href: "/admin/templates", icon: Workflow },
            { name: "Blog", href: "/admin/blog", icon: FileText },
            { name: "Services", href: "/admin/services", icon: Briefcase },
            { name: "Case Studies", href: "/admin/case-studies", icon: FolderOpen },
        ],
    },
    {
        name: "Sales",
        items: [
            { name: "Orders", href: "/admin/purchases", icon: History },
            { name: "Payments", href: "/admin/payments", icon: CreditCard },
            { name: "Customers", href: "/admin/contacts", icon: UserCheck },
        ],
    },
    {
        name: "System",
        items: [
            { name: "Integrations", href: "/admin/integrations", icon: Link2 },
            { name: "AI Models", href: "/admin/ai-models", icon: Cpu },
            { name: "Media", href: "/admin/media", icon: Package },
            { name: "Settings", href: "/admin/settings", icon: Settings },
        ],
    },
];

export default function AdminSidebar({ user }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [showAI, setShowAI] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const handleLogout = async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        router.push("/admin");
    };

    const isActive = (href: string) => {
        if (href === "/admin/dashboard") {
            return pathname === "/admin/dashboard";
        }
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-900 border-b border-white/5 z-40 flex items-center justify-between px-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg text-neutral-400 hover:bg-white/5"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-coral to-brand-purple flex items-center justify-center">
                        <span className="text-white font-bold text-sm italic">B</span>
                    </div>
                    <span className="font-bold uppercase tracking-tighter text-white">BridgeFlow</span>
                </div>
                <div className="w-10" />
            </div>

            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 bottom-0 w-[280px] bg-neutral-900 border-r border-white/5 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-coral to-brand-purple flex items-center justify-center shadow-lg shadow-brand-coral/20">
                            <span className="text-white font-bold text-lg italic">B</span>
                        </div>
                        <div>
                            <span className="font-bold uppercase tracking-tighter text-white block">BridgeFlow</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Enterprise Admin</span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-lg text-neutral-500 hover:bg-white/5 transition-colors"
                    >
                        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                </div>

                {/* Search */}
                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input
                            type="text"
                            placeholder="Execute search..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-800 border-0 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-coral/50"
                        />
                        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900 text-[10px] text-neutral-500">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-2">
                    {navigation.map((group) => (
                        <div key={group.name} className="mb-6">
                            <h3 className="px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">
                                {group.name}
                            </h3>
                            <ul className="space-y-1">
                                {group.items.map((item) => {
                                    const active = isActive(item.href);
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                                                    active
                                                        ? "bg-brand-coral/10 text-brand-coral"
                                                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                <item.icon className={`w-4 h-4 ${active ? "text-brand-coral" : "text-neutral-500"}`} />
                                                {item.name}
                                                {active && (
                                                    <div className="ml-auto w-1 h-1 rounded-full bg-brand-coral shadow-[0_0_8px_rgba(255,109,90,0.8)]" />
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* User Section */}
                <div className="p-3 border-t border-white/5">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-teal to-emerald-600 flex items-center justify-center text-white font-bold text-sm italic">
                            {user?.email?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black uppercase tracking-widest text-white truncate">
                                {user?.user_metadata?.name || "Admin"}
                            </p>
                            <p className="text-[10px] font-bold text-neutral-600 truncate">
                                {user?.email || "admin@bridgeflow.agency"}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-lg text-neutral-600 hover:text-brand-coral hover:bg-brand-coral/10 transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="p-3 border-t border-white/5">
                    <button
                        onClick={() => setShowAI(true)}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] bg-gradient-to-r from-brand-purple to-brand-coral text-white hover:opacity-90 transition-all shadow-lg shadow-brand-purple/20"
                    >
                        <Sparkles className="w-4 h-4" />
                        AI Command Center
                    </button>
                </div>
            </aside>

            {showAI && <AdminAI onClose={() => setShowAI(false)} />}
        </>
    );
}
