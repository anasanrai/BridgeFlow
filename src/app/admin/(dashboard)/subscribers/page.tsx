"use client";

import { useEffect, useState, useCallback } from "react";
import { Bell, Trash2, Search, Download, UserX, UserCheck } from "lucide-react";

interface Subscriber { id: string; email: string; is_active: boolean; subscribed_at: string; }

export default function SubscribersAdmin() {
    const [subs, setSubs] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");

    const load = useCallback(async () => {
        const res = await fetch("/api/admin/content/newsletter_subscribers");
        const { data } = await res.json();
        setSubs(data || []);
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

    const toggleActive = async (id: string, is_active: boolean) => {
        await fetch("/api/admin/content/newsletter_subscribers", {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, is_active }),
        });
        showToast(is_active ? "Reactivated" : "Deactivated");
        load();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete subscriber?")) return;
        await fetch(`/api/admin/content/newsletter_subscribers?id=${id}`, { method: "DELETE" });
        showToast("Deleted"); load();
    };

    const exportCSV = () => {
        const csv = "Email,Status,Date\n" + subs.map(s => `${s.email},${s.is_active ? "Active" : "Inactive"},${new Date(s.subscribed_at).toLocaleDateString()}`).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = "subscribers.csv"; a.click();
    };

    const filtered = subs.filter(s => s.email.toLowerCase().includes(search.toLowerCase()));
    const active = subs.filter(s => s.is_active).length;

    return (
        <div>
            {toast && <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium">{toast}</div>}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2"><Bell className="w-6 h-6 text-gold-400" />Subscribers</h1>
                    <p className="text-sm text-gray-500 mt-1">{active} active · {subs.length} total</p>
                </div>
                <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 glass text-gray-300 font-medium rounded-lg text-sm hover:text-white transition-colors border border-white/10">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search emails..." className="w-full pl-11 pr-4 py-2.5 bg-navy-900/50 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400/50 text-sm" />
            </div>

            {loading ? <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 glass rounded-lg animate-pulse" />)}</div> : filtered.length === 0 ? (
                <div className="text-center py-16 glass rounded-xl"><Bell className="w-10 h-10 mx-auto mb-3 text-gray-600" /><p className="text-gray-400">No subscribers yet</p></div>
            ) : (
                <div className="glass rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead><tr className="border-b border-white/5">
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr></thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map(s => (
                                <tr key={s.id} className="hover:bg-white/[0.02]">
                                    <td className="py-3 px-4 text-sm text-white">{s.email}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${s.is_active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-gray-500/10 text-gray-400 border border-gray-500/20"}`}>
                                            {s.is_active ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                                            {s.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-xs text-gray-500">{new Date(s.subscribed_at).toLocaleDateString()}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-end gap-1">
                                            <button onClick={() => toggleActive(s.id, !s.is_active)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg" title={s.is_active ? "Deactivate" : "Activate"}>
                                                {s.is_active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                            </button>
                                            <button onClick={() => handleDelete(s.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
