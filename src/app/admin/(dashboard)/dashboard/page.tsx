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
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                    </div>
                    {change !== undefined && (
                        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-emerald-500" : isNegative ? "text-red-500" : "text-slate-400"}`}>
                            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : isNegative ? <ArrowDownRight className="w-4 h-4" /> : null}
                            {Math.abs(change)}%
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</p>
                    {changeLabel && (
                        <p className="text-xs text-slate-400">{changeLabel}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}

function OrderRow({ order }: { order: Order }) {
    const statusColors: Record<string, { bg: string; text: string }> = {
        completed: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400" },
        pending: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400" },
        failed: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400" },
    };

    const status = statusColors[order.status] || statusColors.pending;

    return (
        <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{order.plan_name}</p>
                    <p className="text-xs text-slate-500">{order.customer_email}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">${order.plan_price}</p>
                    <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${status.bg} ${status.text}`}>
                    {order.status}
                </span>
            </div>
        </div>
    );
}

function TemplateRow({ template, index }: { template: Template; index: number }) {
    return (
        <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-500">
                    {index + 1}
                </span>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Workflow className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{template.name}</p>
                    <p className="text-xs text-slate-500">{template.slug}</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-center">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{template.view_count}</p>
                    <p className="text-xs text-slate-400">views</p>
                </div>
                <div className="text-center">
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{template.download_count}</p>
                    <p className="text-xs text-slate-400">downloads</p>
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

            setStats({
                totalTemplates: templates.length,
                publishedTemplates,
                draftTemplates,
                totalViews: templates.reduce((sum: number, t: any) => sum + (t.view_count || 0), 0),
                totalDownloads: templates.reduce((sum: number, t: any) => sum + (t.download_count || 0), 0),
                totalOrders: orders.length,
                totalRevenue,
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Welcome back! Here&apos;s what&apos;s happening with your business.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1">
                        {["24h", "7d", "30d", "90d"].map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                    dateRange === range
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={fetchStats}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
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
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Views Overview</h3>
                            <p className="text-sm text-slate-500">Daily page views</p>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-medium">+12.5%</span>
                        </div>
                    </div>
                    <div className="h-48 flex items-end gap-2">
                        {stats?.viewsByDay.map((day, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-500 hover:to-blue-300"
                                    style={{ height: `${(day.value / maxViews) * 100}%`, minHeight: "4px" }}
                                />
                                <span className="text-[10px] text-slate-400">
                                    {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Revenue Overview</h3>
                            <p className="text-sm text-slate-500">Daily revenue</p>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-medium">+8.3%</span>
                        </div>
                    </div>
                    <div className="h-48 flex items-end gap-2">
                        {stats?.revenueByDay.map((day, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all duration-500 hover:from-emerald-500 hover:to-emerald-300"
                                    style={{ height: `${(day.value / maxRevenue) * 100}%`, minHeight: "4px" }}
                                />
                                <span className="text-[10px] text-slate-400">
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
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Orders</h3>
                            <p className="text-sm text-slate-500">Latest transactions</p>
                        </div>
                        <Link
                            href="/admin/purchases"
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                        >
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-2">
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-16 bg-slate-100 dark:bg-slate-700 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : stats?.recentOrders && stats.recentOrders.length > 0 ? (
                            stats.recentOrders.map((order) => <OrderRow key={order.id} order={order} />)
                        ) : (
                            <div className="text-center py-8">
                                <ShoppingCart className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-500">No orders yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Top Templates */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Top Templates</h3>
                            <p className="text-sm text-slate-500">Most downloaded</p>
                        </div>
                        <Link
                            href="/admin/templates"
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                        >
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-2">
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-16 bg-slate-100 dark:bg-slate-700 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : stats?.topTemplates && stats.topTemplates.length > 0 ? (
                            stats.topTemplates.map((template, i) => (
                                <TemplateRow key={template.id} template={template} index={i} />
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <Workflow className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-500">No templates yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <CheckCircle2 className="w-5 h-5 text-white/80" />
                        <span className="text-xs text-white/60">Status</span>
                    </div>
                    <p className="text-2xl font-bold">Operational</p>
                    <p className="text-xs text-white/60">All systems running</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                        <Cpu className="w-5 h-5 text-blue-600" />
                        <span className="text-xs text-slate-400">AI Models</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">3 Active</p>
                    <p className="text-xs text-slate-400">GPT-4, Claude, Gemini</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                        <Database className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs text-slate-400">Database</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">Online</p>
                    <p className="text-xs text-slate-400">Supabase</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-xs text-slate-400">Users</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats?.totalOrders || 0}</p>
                    <p className="text-xs text-slate-400">Total customers</p>
                </div>
            </div>
        </div>
    );
}
