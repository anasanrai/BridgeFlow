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
} from "lucide-react";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";

interface DashboardStats {
    blog_posts: number;
    services: number;
    case_studies: number;
    team_members: number;
    contacts: number;
    subscribers: number;
    recent_activity: Array<{ action: string; section: string; details: string; created_at: string }>;
    telemetry: any[];
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            try {
                const sections = [
                    "blog_posts",
                    "services",
                    "case_studies",
                    "team_members",
                    "contact_submissions",
                    "newsletter_subscribers",
                    "activity_log",
                    "telemetry",
                ];
                const results = await Promise.all(
                    sections.map((s) =>
                        fetch(`/api/admin/content/${s}`).then((r) => r.json())
                    )
                );

                setStats({
                    blog_posts: results[0]?.data?.length || 0,
                    services: results[1]?.data?.length || 0,
                    case_studies: results[2]?.data?.length || 0,
                    team_members: results[3]?.data?.length || 0,
                    contacts: results[4]?.data?.length || 0,
                    subscribers: results[5]?.data?.length || 0,
                    recent_activity: (results[6]?.data || []).slice(0, 8),
                    telemetry: results[7]?.data || [],
                });
            } catch (e) {
                console.error("Failed to load stats:", e);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    const pageViews = stats?.telemetry.filter(t => t.event_type === "page_view").length || 0;
    const uniqueSessions = new Set(stats?.telemetry.map(t => t.session_id)).size;
    const topPath = stats?.telemetry
        .filter(t => t.event_type === "page_view")
        .reduce((acc: any, t) => {
            acc[t.path] = (acc[t.path] || 0) + 1;
            return acc;
        }, {});
    const mostVisited = Object.entries(topPath || {})
        .sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || "/";

    const cards = [
        { label: "Total Page Views", count: pageViews, icon: Eye, href: "/admin/activity", color: "from-blue-500 to-cyan-400" },
        { label: "Unique Visitors", count: uniqueSessions, icon: Users, href: "/admin/activity", color: "from-gold-500 to-amber-400" },
        { label: "Top Page", count: mostVisited, icon: TrendingUp, href: "/admin/activity", color: "from-emerald-500 to-teal-400", isRoute: true },
        { label: "Blog Posts", count: stats?.blog_posts || 0, icon: FileText, href: "/admin/blog", color: "from-blue-500 to-cyan-400" },
        { label: "Contact Forms", count: stats?.contacts || 0, icon: Mail, href: "/admin/contacts", color: "from-red-500 to-orange-400" },
        { label: "Subscribers", count: stats?.subscribers || 0, icon: Bell, href: "/admin/subscribers", color: "from-indigo-500 to-violet-400" },
    ];

    const quickActions = [
        { label: "New Blog Post", href: "/admin/blog", icon: FileText },
        { label: "Add Team Member", href: "/admin/about", icon: Users },
        { label: "New Case Study", href: "/admin/case-studies", icon: FolderOpen },
        { label: "Edit Site Config", href: "/admin/site", icon: Globe },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-white">
                    Dashboard Overview
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Real-time telemetry and content management.
                </p>
            </div>

            {/* Analytics Section */}
            {!loading && stats?.telemetry && (
                <AnalyticsCharts data={stats.telemetry} />
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8 stagger-children">
                {cards.map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="premium-card glass rounded-xl p-5 card-glow card-glow-hover transition-all duration-300 hover:-translate-y-1 group"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div
                                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
                            >
                                <card.icon className="w-5 h-5 text-white" />
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gold-400 transition-colors" />
                        </div>
                        <div className={`font-display font-bold text-white ${card.isRoute ? "text-lg truncate" : "text-2xl"}`}>
                            {loading ? (
                                <div className="h-8 w-12 bg-white/5 rounded animate-pulse" />
                            ) : (
                                card.count
                            )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{card.label}</div>
                    </Link>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="glass rounded-xl p-6 card-glow">
                    <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-gold-400" />
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:border-gold-400/20 hover:bg-gold-400/5 transition-all duration-200 group"
                            >
                                <action.icon className="w-4 h-4 text-gray-500 group-hover:text-gold-400" />
                                <span className="text-sm text-gray-300 group-hover:text-white">
                                    {action.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass rounded-xl p-6 card-glow">
                    <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gold-400" />
                        Recent Activity
                    </h2>
                    {loading ? (
                        <div className="space-y-3">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    ) : stats?.recent_activity && stats.recent_activity.length > 0 ? (
                        <div className="space-y-2">
                            {stats.recent_activity.map((activity, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full flex-shrink-0 animate-pulse ${activity.action === "create"
                                            ? "bg-emerald-400"
                                            : activity.action === "update"
                                                ? "bg-blue-400"
                                                : "bg-red-400"
                                            }`}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-300 truncate">
                                            {activity.details}
                                        </p>
                                        <p className="text-[10px] text-gray-600 flex items-center gap-1 mt-0.5">
                                            <Clock className="w-3 h-3" />
                                            {new Date(activity.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-600 text-sm">
                            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            No activity yet. Start editing content!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
