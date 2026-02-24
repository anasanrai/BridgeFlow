"use client";

import { useEffect, useState, useCallback } from "react";
import { Mail, Eye, Clock, Search, Archive, Trash2, MessageSquare } from "lucide-react";

interface Contact {
    id: string; name: string; email: string; company: string; budget: string;
    message: string; status: string; notes: string; created_at: string;
}

export default function ContactsAdmin() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Contact | null>(null);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");

    const load = useCallback(async () => {
        const res = await fetch("/api/admin/content/contact_submissions");
        const { data } = await res.json();
        setContacts(data || []);
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

    const updateStatus = async (id: string, status: string) => {
        await fetch("/api/admin/content/contact_submissions", {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        showToast(`Marked as ${status}`);
        load();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete submission?")) return;
        await fetch(`/api/admin/content/contact_submissions?id=${id}`, { method: "DELETE" });
        showToast("Deleted");
        if (selected?.id === id) setSelected(null);
        load();
    };

    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.company?.toLowerCase().includes(search.toLowerCase())
    );

    const statusColors: Record<string, string> = {
        new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        read: "bg-gray-500/10 text-gray-400 border-gray-500/20",
        replied: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        archived: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    };

    return (
        <div>
            {toast && <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium">{toast}</div>}

            <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2"><Mail className="w-6 h-6 text-gold-400" />Contact Submissions</h1>
                <p className="text-sm text-gray-500 mt-1">{contacts.filter(c => c.status === "new").length} new · {contacts.length} total</p>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts..." className="w-full pl-11 pr-4 py-2.5 bg-navy-900/50 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400/50 text-sm" />
            </div>

            <div className="flex gap-6">
                {/* List */}
                <div className="flex-1">
                    {loading ? <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 glass rounded-lg animate-pulse" />)}</div> : filtered.length === 0 ? (
                        <div className="text-center py-16 glass rounded-xl"><MessageSquare className="w-10 h-10 mx-auto mb-3 text-gray-600" /><p className="text-gray-400">No submissions yet</p></div>
                    ) : (
                        <div className="space-y-2">
                            {filtered.map(c => (
                                <button key={c.id} onClick={() => { setSelected(c); if (c.status === "new") updateStatus(c.id, "read"); }}
                                    className={`w-full text-left glass rounded-xl p-4 transition-all hover:border-white/10 ${selected?.id === c.id ? "border-gold-400/20 bg-gold-400/[0.03]" : ""}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-semibold text-white">{c.name}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusColors[c.status] || statusColors.new}`}>{c.status}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{c.email}{c.company && ` · ${c.company}`}</p>
                                    <p className="text-xs text-gray-600 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(c.created_at).toLocaleDateString()}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Detail Panel */}
                {selected && (
                    <div className="w-96 glass rounded-xl p-6 card-glow sticky top-6 self-start">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-display font-bold text-white">{selected.name}</h3>
                            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white text-xs">Close</button>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div><span className="text-gray-500">Email:</span> <a href={`mailto:${selected.email}`} className="text-gold-400 hover:underline">{selected.email}</a></div>
                            {selected.company && <div><span className="text-gray-500">Company:</span> <span className="text-gray-300">{selected.company}</span></div>}
                            {selected.budget && <div><span className="text-gray-500">Budget:</span> <span className="text-gray-300">{selected.budget}</span></div>}
                            <div className="pt-3 border-t border-white/5">
                                <span className="text-gray-500 block mb-1">Message:</span>
                                <p className="text-gray-300 whitespace-pre-wrap">{selected.message}</p>
                            </div>
                            <div className="pt-3 border-t border-white/5 flex gap-2">
                                <button onClick={() => updateStatus(selected.id, "replied")} className="flex-1 py-2 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20">Replied</button>
                                <button onClick={() => updateStatus(selected.id, "archived")} className="flex-1 py-2 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg hover:bg-amber-500/20">Archive</button>
                                <button onClick={() => handleDelete(selected.id)} className="py-2 px-3 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
