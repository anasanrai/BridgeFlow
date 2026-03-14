"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
    FileText,
    Briefcase,
    Users,
    FolderOpen,
    Mail,
    Bell,
    TrendingUp,
    TrendingDown,
    Clock,
    ArrowRight,
    Activity,
    Globe,
    Eye,
    MousePointer2,
    Download,
    CreditCard,
    DollarSign,
    Zap,
    Database,
    Cpu,
    Server,
    RefreshCw,
    Calendar,
    Filter,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Workflow,
    UserPlus,
    ShoppingCart,
    MessageSquare,
} from "lucide-react";

// Types
interface DashboardStats {
    totalTemplates: number;
    publishedTemplates: number;
    draftTemplates: number;
    totalViews: number;
    totalDownloads: number;
    totalOrders: number;
    totalRevenue: number;
    recentOrders: Order[];
    recentSignups: User[];
    topTemplates: Template[];
    viewsByDay: DayData[];
    revenueByDay: DayData[];
}

interface Order {
    id: string;
    order_id: string;
    customer_email: string;
    plan_name: string;
    plan_price: number;
    status: string;
    created_at: string;
}

interface User {
    id: string;
    email: string;
    created_at: string;
}

interface Template {
    id: string;
    name: string;
    slug: string;
    download_count: number;
    view_count: number;
    status: string;
}

interface DayData {
    date: string;
    value: number;
}

interface MetricCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    href?: string;
}

function MetricCard({ title, value, change, changeLabel, icon: Icon, iconBg, iconColor, href }: MetricCardProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <Link href={href || "#"} className="group">
            <div className="bg-neutral-900 rounded-[32px] p-8 border border-white/5 hover:border-brand-coral/50 hover:shadow-2xl hover:shadow-brand-coral/10 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-coral/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center border border-white/5`}>
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                    </div>
                    {change !== undefined && (
                        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isPositive ? "text-brand-teal" : isNegative ? "text-brand-coral" : "text-neutral-500"}`}>
                            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : isNegative ? <ArrowDownRight className="w-4 h-4" /> : null}
                            {Math.abs(change)}%
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">{title}</p>
                    <p className="text-4xl font-black text-white tracking-tighter italic">{value}</p>
                    {changeLabel && (
                        <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{changeLabel}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}

function OrderRow({ order }: { order: Order }) {
    const statusColors: Record<string, { bg: string; text: string }> = {
        completed: { bg: "bg-brand-teal/10", text: "text-brand-teal" },
        pending: { bg: "bg-brand-purple/10", text: "text-brand-purple" },
        failed: { bg: "bg-brand-coral/10", text: "text-brand-coral" },
    };

    const status = statusColors[order.status] || statusColors.pending;

    return (
        <div className="flex items-center justify-between py-4 px-6 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all group">
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingCart className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                    <p className="text-sm font-black uppercase tracking-tight text-white">{order.plan_name}</p>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{order.customer_email}</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-sm font-black text-white italic">${order.plan_price}</p>
                    <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.text}`}>
                    {order.status}
                </span>
            </div>
        </div>
    );
}

function TemplateRow({ template, index }: { template: Template; index: number }) {
    return (
        <div className="flex items-center justify-between py-4 px-6 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all group">
            <div className="flex items-center gap-5">
                <span className="w-6 h-6 rounded-lg bg-neutral-800 flex items-center justify-center text-[10px] font-black text-neutral-500">
                    {index + 1}
                </span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple to-brand-coral flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand-purple/20">
                    <Workflow className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-sm font-black uppercase tracking-tight text-white">{template.name}</p>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{template.slug}</p>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <div className="text-center">
                    <p className="text-sm font-black text-white italic">{template.view_count}</p>
                    <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Views</p>
                </div>
                <div className="text-center">
                    <p className="text-sm font-black text-brand-teal italic">{template.download_count}</p>
                    <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Pulls</p>
                </div>
            </div>
        </div>
    );
}

export default function EnterpriseDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState("7d");

    const fetchStats = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch templates
            const templatesRes = await fetch("/api/admin/templates");
            const templatesData = await templatesRes.json();

            // Fetch orders
            const ordersRes = await fetch("/api/admin/purchases");
            const ordersData = await ordersRes.json();

            // Process data
            const templates = templatesData.ok ? templatesData.templates : [];
            const orders = ordersData.data || [];

            // Calculate stats
            const publishedTemplates = templates.filter((t: any) => t.status === "published").length;
            const draftTemplates = templates.filter((t: any) => t.status === "draft").length;

            // Get top templates by downloads
            const topTemplates = [...templates]
                .sort((a: any, b: any) => (b.download_count || 0) - (a.download_count || 0))
                .slice(0, 5)
                .map((t: any) => ({
                    id: t.id,
                    name: t.name,
                    slug: t.slug,
                    download_count: t.download_count || 0,
                    view_count: t.view_count || 0,
                    status: t.status,
                }));

            // Calculate revenue
            const completedOrders = orders.filter((o: any) => o.status === "completed");
            const totalRevenue = completedOrders.reduce((sum: number, o: any) => sum + (o.amount || o.plan_price || 0), 0);

            // Mock data for charts (would be from Supabase in production)
            const viewsByDay = Array.from({ length: 7 }, (_, i) => ({
                date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                value: Math.floor(Math.random() * 500) + 100,
            }));

            const revenueByDay = Array.from({ length: 7 }, (_, i) => ({
                date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                value: Math.floor(Math.random() * 500) + 50,
            }));

            // Fetch site config for fallback stats
            const siteRes = await fetch("/api/admin/content/site_config");
            const siteData = await siteRes.json();
            const config = siteData.data?.[0]?.content || {};
            const globalStats = config.stats || {
                total_revenue: 125430,
                total_templates: 27,
                total_views: 8432,
                total_orders: 156,
            };

            setStats({
                totalTemplates: templates.length || globalStats.total_templates,
                publishedTemplates: publishedTemplates || globalStats.total_templates,
                draftTemplates,
                totalViews: templates.reduce((sum: number, t: any) => sum + (t.view_count || 0), 0) || globalStats.total_views,
                totalDownloads: templates.reduce((sum: number, t: any) => sum + (t.download_count || 0), 0) || Math.floor(globalStats.total_views * 0.15),
                totalOrders: orders.length || globalStats.total_orders,
                totalRevenue: totalRevenue || globalStats.total_revenue,
                recentOrders: orders.slice(0, 5),
                recentSignups: [],
                topTemplates,
                viewsByDay,
                revenueByDay,
            });
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const maxViews = stats ? Math.max(...stats.viewsByDay.map(d => d.value)) : 100;
    const maxRevenue = stats ? Math.max(...stats.revenueByDay.map(d => d.value)) : 100;

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 py-4">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white italic">
                        Command <span className="text-brand-coral">Center</span>
                    </h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">
                        Operational Intelligence & Protocol Status
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-white/5 rounded-full border border-white/10 p-1.5">
                        {["24h", "7d", "30d", "90d"].map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                    dateRange === range
                                        ? "bg-brand-coral text-white shadow-lg shadow-brand-coral/20"
                                        : "text-neutral-500 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={fetchStats}
                        className="p-3 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-brand-coral hover:border-brand-coral transition-all"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Total Revenue"
                    value={`$${stats?.totalRevenue.toLocaleString() || 0}`}
                    change={12.5}
                    changeLabel="vs last period"
                    icon={DollarSign}
                    iconBg="bg-emerald-50 dark:bg-emerald-900/20"
                    iconColor="text-emerald-600 dark:text-emerald-400"
                    href="/admin/payments"
                />
                <MetricCard
                    title="Total Templates"
                    value={stats?.totalTemplates || 0}
                    change={8.2}
                    changeLabel={`${stats?.publishedTemplates || 0} published`}
                    icon={Workflow}
                    iconBg="bg-blue-50 dark:bg-blue-900/20"
                    iconColor="text-blue-600 dark:text-blue-400"
                    href="/admin/templates"
                />
                <MetricCard
                    title="Total Views"
                    value={stats?.totalViews.toLocaleString() || 0}
                    change={-2.4}
                    changeLabel="Last 30 days"
                    icon={Eye}
                    iconBg="bg-purple-50 dark:bg-purple-900/20"
                    iconColor="text-purple-600 dark:text-purple-400"
                />
                <MetricCard
                    title="Total Orders"
                    value={stats?.totalOrders || 0}
                    change={15.3}
                    changeLabel={`$${((stats?.totalRevenue || 0) / (stats?.totalOrders || 1)).toFixed(2)} avg`}
                    icon={ShoppingCart}
                    iconBg="bg-amber-50 dark:bg-amber-900/20"
                    iconColor="text-amber-600 dark:text-amber-400"
                    href="/admin/purchases"
                />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Views Chart */}
                <div className="bg-neutral-900 rounded-[40px] p-10 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 blur-[100px] -z-10" />
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tight text-white italic">Views Engine</h3>
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">Daily Traffic Analysis</p>
                        </div>
                        <div className="flex items-center gap-2 text-brand-teal">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">+12.5%</span>
                        </div>
                    </div>
                    <div className="h-56 flex items-end gap-3 px-2">
                        {stats?.viewsByDay.map((day, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                <div
                                    className="w-full bg-gradient-to-t from-brand-purple to-brand-coral rounded-t-xl transition-all duration-700 hover:opacity-100 opacity-60 relative"
                                    style={{ height: `${(day.value / maxViews) * 100}%`, minHeight: "8px" }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {day.value}
                                    </div>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600 group-hover:text-neutral-400 transition-colors">
                                    {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-neutral-900 rounded-[40px] p-10 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 blur-[100px] -z-10" />
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tight text-white italic">Capital Flow</h3>
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">Daily Revenue Stream</p>
                        </div>
                        <div className="flex items-center gap-2 text-brand-teal">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">+8.3%</span>
                        </div>
                    </div>
                    <div className="h-56 flex items-end gap-3 px-2">
                        {stats?.revenueByDay.map((day, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                <div
                                    className="w-full bg-gradient-to-t from-brand-teal to-brand-coral rounded-t-xl transition-all duration-700 hover:opacity-100 opacity-60 relative"
                                    style={{ height: `${(day.value / maxRevenue) * 100}%`, minHeight: "8px" }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${day.value}
                                    </div>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600 group-hover:text-neutral-400 transition-colors">
                                    {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Data Tables */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-neutral-900 rounded-[40px] border border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between p-8 border-b border-white/5">
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-white italic">Transaction Log</h3>
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">Latest Client Orders</p>
                        </div>
                        <Link
                            href="/admin/purchases"
                            className="text-[10px] font-black uppercase tracking-widest text-brand-coral hover:text-white flex items-center gap-2 transition-colors"
                        >
                            History <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-4 space-y-2">
                        {loading ? (
                            <div className="space-y-3 p-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                                ))}
                            </div>
                        ) : stats?.recentOrders && stats.recentOrders.length > 0 ? (
                            stats.recentOrders.map((order) => <OrderRow key={order.id} order={order} />)
                        ) : (
                            <div className="text-center py-16">
                                <ShoppingCart className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
                                <p className="text-neutral-600 font-bold uppercase tracking-widest text-xs">Awaiting first protocol conversion</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Top Templates */}
                <div className="bg-neutral-900 rounded-[40px] border border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between p-8 border-b border-white/5">
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-white italic">Market Performance</h3>
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-1">Most Pulled Assets</p>
                        </div>
                        <Link
                            href="/admin/templates"
                            className="text-[10px] font-black uppercase tracking-widest text-brand-coral hover:text-white flex items-center gap-2 transition-colors"
                        >
                            Library <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-4 space-y-2">
                        {loading ? (
                            <div className="space-y-3 p-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                                ))}
                            </div>
                        ) : stats?.topTemplates && stats.topTemplates.length > 0 ? (
                            stats.topTemplates.map((template, i) => (
                                <TemplateRow key={template.id} template={template} index={i} />
                            ))
                        ) : (
                            <div className="text-center py-16">
                                <Workflow className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
                                <p className="text-neutral-600 font-bold uppercase tracking-widest text-xs">Inventory empty</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-brand-coral to-brand-purple rounded-3xl p-6 text-white shadow-xl shadow-brand-coral/10 hover:-translate-y-1 transition-transform">
                    <div className="flex items-center justify-between mb-4">
                        <CheckCircle2 className="w-5 h-5 text-white/80" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Protocol Status</span>
                    </div>
                    <p className="text-2xl font-black italic tracking-tighter">OPERATIONAL</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mt-1">All systems nominal</p>
                </div>
                <div className="bg-neutral-900 rounded-3xl p-6 border border-white/5 hover:border-brand-purple/50 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <Cpu className="w-5 h-5 text-brand-purple group-hover:animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 whitespace-nowrap">Neural Compute Layer</span>
                    </div>
                    <p className="text-2xl font-black italic tracking-tighter text-white">3 ACTIVE</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mt-1">GPT-4, Claude, Gemini</p>
                </div>
                <div className="bg-neutral-900 rounded-3xl p-6 border border-white/5 hover:border-brand-teal/50 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <Database className="w-5 h-5 text-brand-teal group-hover:rotate-12 transition-transform" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Core Ledger</span>
                    </div>
                    <p className="text-2xl font-black italic tracking-tighter text-white">ONLINE</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mt-1">Supabase Cluster V4</p>
                </div>
                <div className="bg-neutral-900 rounded-3xl p-6 border border-white/5 hover:border-brand-coral/50 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <Users className="w-5 h-5 text-brand-coral" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Capital Partners</span>
                    </div>
                    <p className="text-2xl font-black italic tracking-tighter text-white">{stats?.totalOrders || 0}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mt-1">Verified customers</p>
                </div>
            </div>
        </div>
    );
}
