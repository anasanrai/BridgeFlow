"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    Download,
    CreditCard,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Trash2,
    ExternalLink,
    Loader2,
    DollarSign,
    User,
    Mail,
    Calendar,
    ArrowUpRight,
    Tag,
    History,
    Eye
} from "lucide-react";
import Link from "next/link";

interface Purchase {
    id: string;
    user_email: string;
    template_id: string;
    amount: number;
    currency: string;
    gateway: string;
    transaction_id: string;
    status: string;
    created_at: string;
    provider_data?: any;
    templates?: {
        name: string;
        slug: string;
    };
}

export default function AdminPurchasesPage() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchPurchases = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/purchases");
            const data = await res.json();
            if (data.ok) {
                setPurchases(data.purchases);
            }
        } catch (err) {
            console.error("Failed to fetch purchases:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this purchase record?")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/purchases?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.ok) {
                setPurchases(purchases.filter(p => p.id !== id));
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert("Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = purchases.filter(p => {
        const matchesSearch = p.user_email?.toLowerCase().includes(search.toLowerCase()) ||
            p.transaction_id?.toLowerCase().includes(search.toLowerCase()) ||
            p.templates?.name?.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || p.status === filter || p.gateway === filter;
        return matchesSearch && matchesFilter;
    });

    const totalRevenue = purchases
        .filter(p => p.status === "completed" || p.status === "captured")
        .reduce((sum, p) => sum + Number(p.amount), 0);

    const statusColors: any = {
        completed: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        captured: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        pending: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        failed: "text-red-400 bg-red-500/10 border-red-500/20",
        refunded: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Loading Transactions...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20">
                        <History className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-display font-bold text-white">Purchase History</h1>
                        <p className="text-xs text-gray-500">Monitor transactions, revenue, and customer orders</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-xl glass border border-white/5 flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Total Revenue</p>
                            <p className="text-lg font-display font-bold gold-text">${totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-gold-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-navy-950/40">
                <div className="flex items-center gap-3 flex-1 min-w-[280px]">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search email, txn id, or template..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-navy-950/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/30 transition-all"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-navy-950/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/30 transition-all appearance-none cursor-pointer"
                    >
                        <option value="all">All States</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="paypal">PayPal</option>
                        <option value="stripe">Stripe</option>
                    </select>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient text-navy-950 text-sm font-bold transition-all hover:scale-105 active:scale-95">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-white/5 overflow-hidden glass">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/3 border-b border-white/5">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Customer</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Template / Item</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Order Details</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500">Date</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {filtered.length > 0 ? filtered.map((p) => (
                                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                                <User className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium">{p.user_email}</span>
                                                <span className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">{p.id.slice(0, 8)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-3.5 h-3.5 text-gold-400" />
                                            <span className="text-gray-300 font-bold">{p.templates?.name || p.template_id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-white font-bold">${p.amount}</span>
                                                <span className="text-[10px] text-gray-500 font-mono">{p.currency}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/5 w-fit">
                                                <CreditCard className="w-3 h-3 text-gray-500" />
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{p.gateway}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[p.status] || "text-gray-400 bg-gray-500/10 border-gray-500/20"}`}>
                                            {p.status === "completed" || p.status === "captured" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-gray-400 font-mono text-[11px]">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(p.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                title="View Transaction"
                                                className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                disabled={deletingId === p.id}
                                                className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                                            >
                                                {deletingId === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                                        No transactions found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
