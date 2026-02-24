"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
} from "recharts";

interface TelemetryData {
    event_type: string;
    created_at: string;
    path: string;
    session_id: string;
    data?: any;
}

export default function AnalyticsCharts({ data }: { data: TelemetryData[] }) {
    // Process data for traffic trend (last 7 days)
    const processTrafficData = () => {
        const days: Record<string, number> = {};
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            days[d.toISOString().split("T")[0]] = 0;
        }

        data.forEach((item) => {
            const date = item.created_at.split("T")[0];
            if (days[date] !== undefined && item.event_type === "page_view") {
                days[date]++;
            }
        });

        return Object.entries(days).map(([date, views]) => ({
            date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            views,
        }));
    };

    // Process data for event distribution
    const processEventData = () => {
        const counts: Record<string, number> = {};
        data.forEach((item) => {
            counts[item.event_type] = (counts[item.event_type] || 0) + 1;
        });

        return Object.entries(counts).map(([name, value]) => ({
            name: name.replace("_", " ").toUpperCase(),
            value,
        }));
    };

    // Process data for top content
    const processTopContentData = () => {
        const paths: Record<string, number> = {};
        data.filter(item => item.event_type === "page_view").forEach((item) => {
            if (item.path.includes("/admin")) return; // Exclude admin pages
            paths[item.path] = (paths[item.path] || 0) + 1;
        });

        return Object.entries(paths)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, value]) => ({ name, value }));
    };

    // Process data for conversion funnel
    const processFunnelData = () => {
        const sessions = Array.from(new Set(data.map(t => t.session_id)));
        const uniqueSessions = sessions.length;

        const pageViews = data.filter(t => t.event_type === "page_view").length;

        // Engaged sessions: those that scrolled at least 50%
        const engagedSessions = new Set(
            data.filter(t => t.event_type === "scroll_depth" && (t.data as any)?.depth >= 50)
                .map(t => t.session_id)
        ).size;

        const formSubmits = data.filter(t => t.event_type === "form_submit").length;

        return [
            { name: "Total Sessions", value: uniqueSessions, color: "#94A3B8" },
            { name: "Page Views", value: pageViews, color: "#60A5FA" },
            { name: "Engaged (50%+)", value: engagedSessions, color: "#8B5CF6" },
            { name: "Form Submits", value: formSubmits, color: "#D4AF37" },
        ];
    };

    // Process engagement metrics
    const processEngagementData = () => {
        const depths = [25, 50, 75, 100];
        const counts = depths.map(depth => ({
            depth: `${depth}%`,
            users: new Set(data.filter(t => t.event_type === "scroll_depth" && (t.data as any)?.depth >= depth).map(t => t.session_id)).size
        }));
        return counts;
    };

    const trafficData = processTrafficData();
    const eventData = processEventData();
    const topContentData = processTopContentData();
    const funnelData = processFunnelData();
    const engagementData = processEngagementData();

    const COLORS = ["#D4AF37", "#8B5CF6", "#06B6D4", "#EF4444"];

    return (
        <div className="space-y-6 mb-8">
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass rounded-xl p-6 h-[350px] card-glow">
                    <h3 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">
                        Traffic Overview (7 Days)
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={trafficData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                            <XAxis
                                dataKey="date"
                                stroke="#666"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#666"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0A0F1D",
                                    border: "1px solid #ffffff10",
                                    borderRadius: "8px",
                                }}
                                itemStyle={{ color: "#D4AF37" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="views"
                                stroke="#D4AF37"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#D4AF37", strokeWidth: 2, stroke: "#0A0F1D" }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass rounded-xl p-6 h-[350px] card-glow">
                    <h3 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">
                        Engagement (Scroll Depth)
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={engagementData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis
                                dataKey="depth"
                                stroke="#666"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#666"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                hide
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0A0F1D",
                                    border: "1px solid #ffffff10",
                                    borderRadius: "8px",
                                }}
                                itemStyle={{ color: "#8B5CF6" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#8B5CF6"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#8B5CF6", strokeWidth: 2, stroke: "#0A0F1D" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass rounded-xl p-6 h-[350px] card-glow">
                    <h3 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">
                        Top Viewed Pages
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={topContentData} layout="vertical" margin={{ left: 40, right: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                stroke="#94A3B8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                width={120}
                            />
                            <Tooltip
                                cursor={{ fill: "#ffffff05" }}
                                contentStyle={{
                                    backgroundColor: "#0A0F1D",
                                    border: "1px solid #ffffff10",
                                    borderRadius: "8px",
                                }}
                            />
                            <Bar dataKey="value" fill="#60A5FA" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass rounded-xl p-6 h-[350px] card-glow">
                    <h3 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">
                        Conversion Funnel
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={funnelData} margin={{ top: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#666"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: "#ffffff05" }}
                                contentStyle={{
                                    backgroundColor: "#0A0F1D",
                                    border: "1px solid #ffffff10",
                                    borderRadius: "8px",
                                }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {funnelData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
