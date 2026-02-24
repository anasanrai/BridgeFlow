"use client";

import { useEffect, useState, useCallback } from "react";
import { Activity, Clock, Plus, Edit, Trash2 } from "lucide-react";

interface LogEntry { id: string; action: string; section: string; details: string; created_at: string; }

const actionColors: Record<string, string> = {
    create: "bg-emerald-400", update: "bg-blue-400", delete: "bg-red-400",
};

export default function ActivityAdmin() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        const res = await fetch("/api/admin/content/activity_log");
        const { data } = await res.json();
        setLogs(data || []);
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2"><Activity className="w-6 h-6 text-gold-400" />Activity Log</h1>
                <p className="text-sm text-gray-500 mt-1">Audit trail of all admin actions</p>
            </div>

            {loading ? <div className="space-y-3">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-14 glass rounded-lg animate-pulse" />)}</div> : logs.length === 0 ? (
                <div className="text-center py-16 glass rounded-xl"><Activity className="w-10 h-10 mx-auto mb-3 text-gray-600" /><p className="text-gray-400">No activity yet</p></div>
            ) : (
                <div className="relative">
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/5" />
                    <div className="space-y-1">
                        {logs.map((log) => (
                            <div key={log.id} className="flex items-start gap-4 pl-1 py-2">
                                <div className={`w-4 h-4 rounded-full ${actionColors[log.action] || "bg-gray-400"} flex-shrink-0 mt-1 ring-4 ring-navy-950`} />
                                <div className="flex-1 glass rounded-lg px-4 py-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{log.section.replace(/_/g, " ")}</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${log.action === "create" ? "bg-emerald-500/10 text-emerald-400" : log.action === "update" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`}>{log.action}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-600 flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(log.created_at).toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-300 mt-0.5">{log.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
