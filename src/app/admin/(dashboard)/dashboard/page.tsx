"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FileText,
    Briefcase,
    Users,
    FolderOpen,
    Mail,
    Bell,
    TrendingUp,
    Clock,
    ArrowRight,
    Activity,
    Globe,
    Eye,
    MousePointer2,
    Shield,
    Zap,
    Database,
    Cpu,
    Wifi,
    Server,
    Terminal,
    RefreshCw,
    ChevronUp,
    ChevronDown,
    Sparkles,
    Radio,
    Link2,
    Settings,
} from "lucide-react";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";

interface DashboardStats {
    blog_posts: number;
    services: number;
    case_studies: number;
    team_members: number;
    contacts: number;
    subscribers: number;
    ai_models: number;
    webhooks: number;
    recent_activity: Array<{ action: string; section: string; details: string; created_at: string }>;
    telemetry: any[];
}

interface SystemHealth {
    database: "online" | "degraded" | "offline";
    ai_engine: "online" | "degraded" | "offline";
    smtp: "online" | "configured" | "not_configured";
    deployment: "production" | "development" | "staging";
}

function StatusDot({ status }: { status: string }) {
    const color = status === "online" || status === "production" || status === "configured"
        ? "bg-emerald-400"
        : status === "degraded" || status === "development" || status === "staging"
            ? "bg-amber-400"
            : "bg-red-400";
    return <span className={`w-2.5 h-2.5 rounded-full ${color} animate-pulse`} />;
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [systemHealth, setSystemHealth] = useState<SystemHealth>({
        database: "online",
        ai_engine: "online",
        smtp: "not_configured",
        deployment: process.env.NODE_ENV === "production" ? "production" : "development",
    });
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const loadStats = async () => {
        try {
            const sections = [
                "blog_posts", "services", "case_studies", "team_members",
                "contact_submissions", "newsletter_subscribers", "activity_log", "telemetry",
                "ai_models", "webhooks",
            ];
            const results = await Promise.all(
                sections.map((s) => fetch(`/api/admin/content/${s}`).then((r) => r.json()))
            );

            setStats({
                blog_posts: results[0]?.data?.length || 0,
                services: results[1]?.data?.length || 0,
                case_studies: results[2]?.data?.length || 0,
                team_members: results[3]?.data?.length || 0,
                contacts: results[4]?.data?.length || 0,
                subscribers: results[5]?.data?.length || 0,
                recent_activity: (results[6]?.data || []).slice(0, 10),
                telemetry: results[7]?.data || [],
                ai_models: results[8]?.data?.length || 0,
                webhooks: results[9]?.data?.length || 0,
            });

            // Check system health
            setSystemHealth(prev => ({
                ...prev,
                database: results[0]?.data ? "online" : "degraded",
            }));
        } catch (e) {
            setSystemHealth(prev => ({ ...prev, database: "offline" }));
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => { loadStats(); }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        loadStats();
    };

    const pageViews = stats?.telemetry.filter(t => t.event_type === "page_view").length || 0;
    const uniqueSessions = new Set(stats?.telemetry.map(t => t.session_id)).size;
    const clicks = stats?.telemetry.filter(t => t.event_type === "click").length || 0;
    const formSubmits = stats?.telemetry.filter(t => t.event_type === "form_submit").length || 0;

    const topPath = stats?.telemetry
        .filter(t => t.event_type === "page_view")
        .reduce((acc: any, t) => { acc[t.path] = (acc[t.path] || 0) + 1; return acc; }, {});
    const mostVisited = Object.entries(topPath || {}).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || "/";

    const systemModules = [
        { label: "Database", status: systemHealth.database, icon: Database, detail: "Supabase PostgreSQL" },
        { label: "AI Engine", status: systemHealth.ai_engine, icon: Cpu, detail: "GPT-4 + Claude + OpenRouter" },
        { label: "Email", status: systemHealth.smtp, icon: Mail, detail: systemHealth.smtp === "not_configured" ? "Configure in Settings" : "SMTP Active" },
        { label: "Environment", status: systemHealth.deployment, icon: Server, detail: systemHealth.deployment.toUpperCase() },
    ];

    const metricCards = [
        { label: "Page Views", count: pageViews, icon: Eye, color: "from-blue-500 to-cyan-400", href: "/admin/activity" },
        { label: "Unique Sessions", count: uniqueSessions, icon: Users, color: "from-gold-500 to-amber-400", href: "/admin/activity" },
        { label: "Interactions", count: clicks, icon: MousePointer2, color: "from-purple-500 to-pink-400", href: "/admin/activity" },
        { label: "Form Submissions", count: formSubmits, icon: Mail, color: "from-emerald-500 to-teal-400", href: "/admin/contacts" },
        { label: "Blog Posts", count: stats?.blog_posts || 0, icon: FileText, color: "from-indigo-500 to-blue-400", href: "/admin/blog" },
        { label: "Subscribers", count: stats?.subscribers || 0, icon: Bell, color: "from-rose-500 to-orange-400", href: "/admin/subscribers" },
    ];

    const quickActions = [
        { label: "Edit Homepage", href: "/admin/home", icon: Globe, desc: "Hero, stats & sections" },
        { label: "View Contacts", href: "/admin/contacts", icon: Mail, desc: `${stats?.contacts || 0} submissions` },
        { label: "AI Model Stack", href: "/admin/ai-models", icon: Cpu, desc: `${stats?.ai_models || 0} models` },
        { label: "Integrations", href: "/admin/integrations", icon: Link2, desc: `${stats?.webhooks || 0} webhooks` },
        { label: "Platform Settings", href: "/admin/settings", icon: Settings, desc: "AI, SMTP & Social" },
        { label: "SEO Manager", href: "/admin/seo", icon: Globe, desc: "Meta & sitemaps" },
        { label: "New Blog Post", href: "/admin/blog", icon: FileText, desc: "Create content" },
        { label: "Manage Team", href: "/admin/about", icon: Users, desc: `${stats?.team_members || 0} members` },
    ];

    return (
        <div className="space-y-6">
            {/* ── Command Center Header ── */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-gold-400/20 to-amber-500/10 border border-gold-400/20">
                            <Terminal className="w-5 h-5 text-gold-400" />
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-display font-bold text-white">
                            Control Room
                        </h1>
                    </div>
                    <p className="text-sm text-gray-500 ml-[52px]">
                        Enterprise command center — real-time system health and analytics.
                    </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/5 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/5">
                        <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span className="text-xs text-gray-400 font-mono">LIVE</span>
                    </div>
                    <div className="px-4 py-2 rounded-xl glass border border-white/5">
                        <span className="text-xs text-gray-400 font-mono">
                            {currentTime.toLocaleTimeString("en-US", { hour12: false })}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── System Health Strip ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {systemModules.map((mod) => (
                    <div
                        key={mod.label}
                        className="glass rounded-xl p-4 border border-white/5 flex items-center gap-3 hover:border-white/10 transition-all group"
                    >
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                            <mod.icon className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white uppercase tracking-wider">{mod.label}</span>
                                <StatusDot status={mod.status} />
                            </div>
                            <span className="text-[10px] text-gray-500 truncate block">{mod.detail}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Analytics Charts ── */}
            {!loading && stats?.telemetry && (
                <AnalyticsCharts data={stats.telemetry} />
            )}

            {/* ── Metric Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {metricCards.map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="premium-card glass rounded-xl p-5 card-glow card-glow-hover transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-5 rounded-full -translate-y-8 translate-x-8 group-hover:opacity-10 transition-opacity`} />
                        <div className="flex items-start justify-between mb-3 relative">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                                <card.icon className="w-5 h-5 text-white" />
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <div className="font-display font-bold text-2xl text-white relative">
                            {loading ? (
                                <div className="h-8 w-12 bg-white/5 rounded animate-pulse" />
                            ) : (
                                card.count
                            )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 font-medium">{card.label}</div>
                    </Link>
                ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* ── Quick Command Palette ── */}
                <div className="lg:col-span-3 glass rounded-xl p-6 card-glow">
                    <h2 className="text-lg font-display font-bold text-white mb-1 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-gold-400" />
                        Quick Actions
                    </h2>
                    <p className="text-xs text-gray-500 mb-5">Jump to any section instantly.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {quickActions.map((action) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="flex items-start gap-3 p-4 rounded-xl border border-white/5 hover:border-gold-400/20 hover:bg-gold-400/5 transition-all duration-200 group"
                            >
                                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-gold-400/10 transition-colors flex-shrink-0">
                                    <action.icon className="w-4 h-4 text-gray-500 group-hover:text-gold-400 transition-colors" />
                                </div>
                                <div className="min-w-0">
                                    <span className="text-sm text-gray-300 group-hover:text-white font-medium block">
                                        {action.label}
                                    </span>
                                    <span className="text-[10px] text-gray-600 block truncate">{action.desc}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── Live Activity Feed ── */}
                <div className="lg:col-span-2 glass rounded-xl p-6 card-glow">
                    <h2 className="text-lg font-display font-bold text-white mb-1 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gold-400" />
                        Activity Feed
                    </h2>
                    <p className="text-xs text-gray-500 mb-5">Recent system events.</p>
                    {loading ? (
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    ) : stats?.recent_activity && stats.recent_activity.length > 0 ? (
                        <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
                            {stats.recent_activity.map((activity, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.action === "create"
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : activity.action === "update"
                                            ? "bg-blue-500/10 text-blue-400"
                                            : "bg-red-500/10 text-red-400"
                                        }`}>
                                        {activity.action === "create" ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : activity.action === "update" ? (
                                            <RefreshCw className="w-3.5 h-3.5" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-300 truncate">
                                            {activity.details}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${activity.action === "create"
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : activity.action === "update"
                                                    ? "bg-blue-500/10 text-blue-400"
                                                    : "bg-red-500/10 text-red-400"
                                                }`}>
                                                {activity.action}
                                            </span>
                                            <span className="text-[10px] text-gray-600 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(activity.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-600 text-sm">
                            <Activity className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No activity yet</p>
                            <p className="text-xs mt-1">Start editing content to see events here.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Content Overview Strip ── */}
            <div className="glass rounded-xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gold-400" />
                        Content Inventory
                    </h3>
                    <span className="text-[10px] text-gray-600 font-mono">
                        {(stats?.blog_posts || 0) + (stats?.services || 0) + (stats?.case_studies || 0)} total items
                    </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Services", count: stats?.services || 0, icon: Briefcase, href: "/admin/services" },
                        { label: "Blog Posts", count: stats?.blog_posts || 0, icon: FileText, href: "/admin/blog" },
                        { label: "Case Studies", count: stats?.case_studies || 0, icon: FolderOpen, href: "/admin/case-studies" },
                        { label: "Team Members", count: stats?.team_members || 0, icon: Users, href: "/admin/about" },
                        { label: "AI Models", count: stats?.ai_models || 0, icon: Cpu, href: "/admin/ai-models" },
                        { label: "Webhooks", count: stats?.webhooks || 0, icon: Link2, href: "/admin/integrations" },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:border-gold-400/15 hover:bg-white/5 transition-all group"
                        >
                            <item.icon className="w-4 h-4 text-gray-500 group-hover:text-gold-400 transition-colors" />
                            <div>
                                <div className="text-lg font-bold text-white">{loading ? "—" : item.count}</div>
                                <div className="text-[10px] text-gray-500">{item.label}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
