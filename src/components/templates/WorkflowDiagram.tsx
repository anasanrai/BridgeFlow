"use client";

import { Template } from "@/data/templates";

interface WorkflowDiagramProps {
    template: Template;
    compact?: boolean;
}

// ── Node appearance by type ──────────────────────────────────────────────────
interface NodeStyle {
    bg: string;
    border: string;
    iconBg: string;
    icon: string;
    sub: boolean; // circular sub-node (AI model, memory, tool)
}

function getNodeStyle(type: string, name: string): NodeStyle {
    const t = (type || "").toLowerCase();
    const n = (name || "").toLowerCase();

    if (t.includes("webhook")) return { bg: "#1c1c1c", border: "#f04d11", iconBg: "#f04d11", icon: "⚡", sub: false };
    if (t.includes("lmchatopenrouter") || t.includes("lmchatanthropicClaude") || t.includes("lmchat") || t.includes("openrouter") || t.includes("anthropic")) {
        return { bg: "#1a1233", border: "#764ba2", iconBg: "#764ba2", icon: "🤖", sub: true };
    }
    if (t.includes("lmchatapikey") || t.includes("lmchatgroq") || t.includes("lmchatopenai")) {
        return { bg: "#1a1233", border: "#764ba2", iconBg: "#764ba2", icon: "🤖", sub: true };
    }
    if (t.includes("chatmemory") || t.includes("memory")) {
        return { bg: "#0f1a2e", border: "#3b82f6", iconBg: "#3b82f6", icon: "🧠", sub: true };
    }
    if (t.includes("tool") && !t.includes("toolsagent")) {
        return { bg: "#1a2e1a", border: "#22c55e", iconBg: "#22c55e", icon: "🔧", sub: true };
    }
    if (t.includes("chainllm") || t.includes("chain")) return { bg: "#1a0d2e", border: "#a855f7", iconBg: "#a855f7", icon: "⛓", sub: false };
    if (t.includes("toolsagent") || t.includes("agent")) return { bg: "#1a1c2e", border: "#6366f1", iconBg: "#6366f1", icon: "🦾", sub: false };
    if (t.includes("gmail") || t.includes("email")) return { bg: "#2e0d0d", border: "#ef4444", iconBg: "#ef4444", icon: "✉", sub: false };
    if (t.includes("telegram")) return { bg: "#0d1a2e", border: "#0088cc", iconBg: "#0088cc", icon: "✈", sub: false };
    if (t.includes("googlesheets") || t.includes("sheets")) return { bg: "#0d2e1a", border: "#22c55e", iconBg: "#22c55e", icon: "📊", sub: false };
    if (t.includes("googledrive")) return { bg: "#0d2e1a", border: "#facc15", iconBg: "#facc15", icon: "📁", sub: false };
    if (t.includes("code")) return { bg: "#2e1a0d", border: "#f97316", iconBg: "#f97316", icon: "{}", sub: false };
    if (t.includes(".if")) return { bg: "#0d2e2a", border: "#14b8a6", iconBg: "#14b8a6", icon: "⑂", sub: false };
    if (t.includes("switch")) return { bg: "#0d2e2a", border: "#06b6d4", iconBg: "#06b6d4", icon: "⇄", sub: false };
    if (t.includes("wait") || t.includes("schedule")) return { bg: "#1a1a0d", border: "#eab308", iconBg: "#eab308", icon: "⏱", sub: false };
    if (t.includes("slack")) return { bg: "#2e0f1a", border: "#e01563", iconBg: "#e01563", icon: "💬", sub: false };
    if (t.includes("notion")) return { bg: "#1c1c1c", border: "#ffffff", iconBg: "#444", icon: "📝", sub: false };
    if (t.includes("edit") || t.includes("set")) return { bg: "#1a1c2e", border: "#818cf8", iconBg: "#818cf8", icon: "✏", sub: false };
    return { bg: "#1c1c2a", border: "#6b7280", iconBg: "#374151", icon: "⚙", sub: false };
}

// ── SVG helpers ──────────────────────────────────────────────────────────────
function bezierPath(x1: number, y1: number, x2: number, y2: number, vertical = false): string {
    if (vertical) {
        const cy = (y1 + y2) / 2;
        return `M${x1},${y1} C${x1},${cy} ${x2},${cy} ${x2},${y2}`;
    }
    const cx = (x1 + x2) / 2;
    return `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WorkflowDiagram({ template, compact = false }: WorkflowDiagramProps) {
    const json = template.workflowJson as any;
    const hasJson = json && Array.isArray(json.nodes) && json.nodes.length > 0;

    // ── Rich mode: real n8n JSON ──────────────────────────────────────────────
    if (hasJson) {
        const rawNodes: any[] = json.nodes;
        const connections: Record<string, any> = json.connections || {};

        const NODE_W = compact ? 110 : 140;
        const NODE_H = compact ? 42 : 54;
        const SUB_R = compact ? 26 : 34;  // radius for circular sub-nodes
        const FONT = compact ? 9 : 10;
        const PAD = 40;

        // Calculate bounding box from real positions
        const positions = rawNodes.map((n: any) => n.position || [0, 0]);
        let minX = Math.min(...positions.map(([x]: number[]) => x));
        let minY = Math.min(...positions.map(([_, y]: number[]) => y));
        let maxX = Math.max(...positions.map(([x]: number[]) => x));
        let maxY = Math.max(...positions.map(([_, y]: number[]) => y));

        // Padding
        minX -= NODE_W; minY -= NODE_W;
        maxX += NODE_W * 2; maxY += NODE_W * 2;

        const rawW = maxX - minX;
        const rawH = maxY - minY;
        const CANVAS_W = Math.max(rawW, 800);
        const CANVAS_H = Math.max(rawH, compact ? 200 : 320);
        const scaleX = (CANVAS_W - PAD * 2) / rawW;
        const scaleY = (CANVAS_H - PAD * 2) / rawH;
        const scale = Math.min(scaleX, scaleY, compact ? 0.55 : 0.75);

        // Map each node to canvas coords
        interface Mapped {
            id: string; name: string; type: string;
            cx: number; cy: number;
            style: NodeStyle;
        }
        const mapped: Mapped[] = rawNodes.map((n: any) => {
            const [rx, ry] = n.position || [0, 0];
            return {
                id: n.id || n.name,
                name: n.name || (n.type || "").split(".").pop() || "Node",
                type: n.type || "",
                cx: PAD + (rx - minX) * scale,
                cy: PAD + (ry - minY) * scale,
                style: getNodeStyle(n.type || "", n.name || ""),
            };
        });

        // Index by name for connection lookup
        const byName: Record<string, Mapped> = {};
        mapped.forEach((n) => { byName[n.name] = n; byName[n.id] = n; });

        // Build edge list
        interface Edge { from: Mapped; to: Mapped; branch: number; outputIndex: number; type: "main" | "sub"; label?: string }
        const edges: Edge[] = [];

        Object.entries(connections).forEach(([fromName, outputs]: [string, any]) => {
            const from = byName[fromName];
            if (!from) return;

            // main connections
            const mainOutputs: any[][] = outputs?.main || [];
            mainOutputs.forEach((branch: any[], branchIdx: number) => {
                branch?.forEach((conn: any) => {
                    const to = byName[conn?.node];
                    if (!to) return;
                    const label = mainOutputs.length > 1 ? (branchIdx === 0 ? "true" : "false") : undefined;
                    edges.push({ from, to, branch: branchIdx, outputIndex: conn.index || 0, type: "main", label });
                });
            });

            // sub connections (ai_languageModel, tool, etc.)
            const subTypes = ["ai_languageModel", "ai_tool", "ai_memory", "ai_outputParser"];
            subTypes.forEach((st) => {
                const subOutputs: any[][] = outputs?.[st] || [];
                subOutputs.forEach((branch: any[]) => {
                    branch?.forEach((conn: any) => {
                        const to = byName[conn?.node];
                        if (!to) return;
                        edges.push({ from, to, branch: 0, outputIndex: 0, type: "sub" });
                    });
                });
            });
        });

        const NW = NODE_W, NH = NODE_H;

        return (
            <svg
                viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                className="w-full rounded-xl"
                style={{ background: "#0d0d12" }}
            >
                <defs>
                    {/* Dot grid pattern */}
                    <pattern id="n8n-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.07)" />
                    </pattern>

                    {/* Arrow marker — gold */}
                    <marker id="arr-main" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                        <polygon points="0 1, 5 3.5, 0 6" fill="rgba(200,200,200,0.6)" />
                    </marker>
                    {/* Arrow marker — sub (dashed) */}
                    <marker id="arr-sub" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                        <polygon points="0 1, 5 3.5, 0 6" fill="rgba(148,100,220,0.6)" />
                    </marker>
                </defs>

                {/* Grid */}
                <rect width={CANVAS_W} height={CANVAS_H} fill="url(#n8n-grid)" />

                {/* ── Sub-connection edges (dashed, below) ───────────── */}
                {edges.filter(e => e.type === "sub").map((e, i) => {
                    // sub-nodes connect from their top to the bottom of the parent
                    const x1 = e.to.cx + NW / 2;
                    const y1 = e.to.cy + SUB_R * 2; // bottom of circular sub-node (approx)
                    const x2 = e.from.cx + NW / 2;
                    const y2 = e.from.cy + NH;
                    return (
                        <path
                            key={`sub-${i}`}
                            d={bezierPath(x1, y1, x2, y2, true)}
                            fill="none"
                            stroke="rgba(148,100,220,0.45)"
                            strokeWidth={1.5}
                            strokeDasharray="5,4"
                            markerEnd="url(#arr-sub)"
                        />
                    );
                })}

                {/* ── Main edges ─────────────────────────────────────── */}
                {edges.filter(e => e.type === "main").map((e, i) => {
                    const x1 = e.from.cx + NW;
                    const y1 = e.from.cy + NH / 2;
                    const x2 = e.to.cx;
                    const y2 = e.to.cy + NH / 2;
                    const midX = (x1 + x2) / 2;
                    const midY = (y1 + y2) / 2;

                    return (
                        <g key={`edge-${i}`}>
                            <path
                                d={bezierPath(x1, y1, x2, y2)}
                                fill="none"
                                stroke="rgba(200,200,200,0.35)"
                                strokeWidth={1.5}
                                markerEnd="url(#arr-main)"
                            />
                            {/* Dot at output */}
                            <circle cx={x1} cy={y1} r={3} fill="rgba(200,200,200,0.5)" />
                            {/* Branch label */}
                            {e.label && (
                                <g>
                                    <rect
                                        x={midX - 14} y={midY - 9}
                                        width={28} height={16}
                                        rx={4}
                                        fill={e.label === "true" ? "rgba(20,184,166,0.25)" : "rgba(239,68,68,0.2)"}
                                        stroke={e.label === "true" ? "rgba(20,184,166,0.5)" : "rgba(239,68,68,0.4)"}
                                        strokeWidth={0.8}
                                    />
                                    <text
                                        x={midX} y={midY + 4}
                                        textAnchor="middle"
                                        fill={e.label === "true" ? "#5eead4" : "#f87171"}
                                        fontSize={FONT - 1}
                                        fontFamily="Inter, system-ui, sans-serif"
                                        fontWeight="700"
                                    >
                                        {e.label}
                                    </text>
                                </g>
                            )}
                        </g>
                    );
                })}

                {/* ── Nodes ──────────────────────────────────────────── */}
                {mapped.map((n) => {
                    const { style, cx, cy, name } = n;

                    if (style.sub) {
                        // Circular sub-node
                        const label = name.length > 16 ? name.slice(0, 15) + "…" : name;
                        return (
                            <g key={n.id}>
                                {/* Outer glow */}
                                <circle cx={cx + NW / 2} cy={cy + SUB_R} r={SUB_R + 4} fill={style.border + "15"} />
                                {/* Circle */}
                                <circle
                                    cx={cx + NW / 2} cy={cy + SUB_R} r={SUB_R}
                                    fill={style.bg}
                                    stroke={style.border}
                                    strokeWidth={1.5}
                                />
                                {/* Icon */}
                                <text
                                    x={cx + NW / 2} y={cy + SUB_R + FONT * 0.5}
                                    textAnchor="middle"
                                    fontSize={FONT + 6}
                                    fontFamily="system-ui, sans-serif"
                                >
                                    {style.icon}
                                </text>
                                {/* Label below */}
                                <text
                                    x={cx + NW / 2} y={cy + SUB_R * 2 + FONT + 4}
                                    textAnchor="middle"
                                    fill="rgba(200,200,200,0.7)"
                                    fontSize={FONT - 1}
                                    fontFamily="Inter, system-ui, sans-serif"
                                >
                                    {label}
                                </text>
                            </g>
                        );
                    }

                    // Rectangular main node
                    const label = name.length > 16 ? name.slice(0, 15) + "…" : name;
                    const typeLabel = (n.type || "").split(".").pop()?.replace(/([A-Z])/g, " $1").trim().slice(0, 18) || "";
                    const ICON_SIZE = compact ? 20 : 26;
                    const ICON_PAD = compact ? 7 : 10;

                    return (
                        <g key={n.id}>
                            {/* Subtle glow behind card */}
                            <rect
                                x={cx - 3} y={cy - 3}
                                width={NW + 6} height={NH + 6}
                                rx={12}
                                fill={style.border + "20"}
                            />
                            {/* Card body */}
                            <rect
                                x={cx} y={cy}
                                width={NW} height={NH}
                                rx={9}
                                fill={style.bg}
                                stroke={style.border}
                                strokeWidth={1.5}
                            />
                            {/* Left color accent stripe */}
                            <rect
                                x={cx} y={cy + 8}
                                width={4} height={NH - 16}
                                rx={2}
                                fill={style.border}
                                opacity={0.9}
                            />
                            {/* Icon background bubble */}
                            <rect
                                x={cx + ICON_PAD} y={cy + (NH - ICON_SIZE) / 2}
                                width={ICON_SIZE} height={ICON_SIZE}
                                rx={6}
                                fill={style.iconBg + "dd"}
                            />
                            {/* Icon text */}
                            <text
                                x={cx + ICON_PAD + ICON_SIZE / 2}
                                y={cy + NH / 2 + (compact ? 4 : 5)}
                                textAnchor="middle"
                                fontSize={compact ? 9 : 12}
                                fontFamily="system-ui, sans-serif"
                            >
                                {style.icon}
                            </text>
                            {/* Node name */}
                            <text
                                x={cx + ICON_PAD + ICON_SIZE + 6}
                                y={cy + NH / 2 - (compact ? 2 : 4)}
                                fill="rgba(255,255,255,0.92)"
                                fontSize={FONT}
                                fontFamily="Inter, system-ui, sans-serif"
                                fontWeight="700"
                            >
                                {label}
                            </text>
                            {/* Node type subtitle */}
                            {!compact && (
                                <text
                                    x={cx + ICON_PAD + ICON_SIZE + 6}
                                    y={cy + NH / 2 + 10}
                                    fill="rgba(255,255,255,0.38)"
                                    fontSize={FONT - 1.5}
                                    fontFamily="Inter, system-ui, sans-serif"
                                >
                                    {typeLabel}
                                </text>
                            )}
                            {/* Right-side output connector dot */}
                            <circle
                                cx={cx + NW} cy={cy + NH / 2}
                                r={4} fill="#2a2a3a" stroke="rgba(200,200,200,0.4)" strokeWidth={1.5}
                            />
                            {/* Left-side input connector dot */}
                            <circle
                                cx={cx} cy={cy + NH / 2}
                                r={4} fill="#2a2a3a" stroke="rgba(200,200,200,0.25)" strokeWidth={1.5}
                            />
                        </g>
                    );
                })}
            </svg>
        );
    }

    // ── Static fallback mode ───────────────────────────────────────────────────
    const nodes = template.nodes;
    const count = nodes.length;
    const CANVAS_W = 800;
    const CANVAS_H = compact ? 150 : 220;
    const NODE_W = compact ? 100 : 120;
    const NODE_H = compact ? 36 : 44;
    const PAD = 20;
    const FONT = compact ? 9 : 10;

    const perRow = count > 5 ? Math.ceil(count / 2) : count;
    const rows = Math.ceil(count / perRow);
    const colGap = perRow > 1 ? (CANVAS_W - PAD * 2 - NODE_W) / (perRow - 1) : 0;
    const rowGap = rows > 1 ? (CANVAS_H - PAD * 2 - NODE_H) / (rows - 1) : 0;

    return (
        <svg
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            className="w-full rounded-xl"
            style={{ background: "#0d0d12" }}
        >
            <defs>
                <pattern id="grid-static" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.07)" />
                </pattern>
                <marker id="arr-s" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                    <polygon points="0 1, 5 3.5, 0 6" fill="rgba(200,200,200,0.5)" />
                </marker>
            </defs>
            <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid-static)" />

            {nodes.map((name, i) => {
                const row = Math.floor(i / perRow);
                const col = i % perRow;
                const cx = PAD + col * colGap;
                const cy = PAD + row * rowGap;
                const style = getNodeStyle("", name);
                const label = name.length > 14 ? name.slice(0, 13) + "…" : name;

                const nextI = i + 1;
                const nextRow = Math.floor(nextI / perRow);
                const nextCol = nextI % perRow;
                const nx = PAD + nextCol * colGap;
                const ny = PAD + nextRow * rowGap;

                return (
                    <g key={i}>
                        {/* Edge to next node */}
                        {i < nodes.length - 1 && (
                            <path
                                d={bezierPath(cx + NODE_W, cy + NODE_H / 2, nx, ny + NODE_H / 2)}
                                fill="none"
                                stroke="rgba(200,200,200,0.3)"
                                strokeWidth={1.5}
                                markerEnd="url(#arr-s)"
                            />
                        )}
                        {/* Card */}
                        <rect x={cx - 2} y={cy - 2} width={NODE_W + 4} height={NODE_H + 4} rx={10} fill={style.border + "18"} />
                        <rect x={cx} y={cy} width={NODE_W} height={NODE_H} rx={8} fill={style.bg} stroke={style.border} strokeWidth={1.5} />
                        {/* Stripe */}
                        <rect x={cx} y={cy + 6} width={3} height={NODE_H - 12} rx={2} fill={style.border} />
                        {/* Icon */}
                        <text x={cx + 16} y={cy + NODE_H / 2 + FONT * 0.45} textAnchor="middle" fontSize={FONT + 4} fontFamily="system-ui">
                            {style.icon}
                        </text>
                        {/* Name */}
                        <text x={cx + 28} y={cy + NODE_H / 2 + FONT * 0.4} fill="rgba(255,255,255,0.9)" fontSize={FONT} fontFamily="Inter, system-ui, sans-serif" fontWeight="700">
                            {label}
                        </text>
                        {/* Dots */}
                        <circle cx={cx + NODE_W} cy={cy + NODE_H / 2} r={3.5} fill="#2a2a3a" stroke="rgba(200,200,200,0.4)" strokeWidth={1.5} />
                        <circle cx={cx} cy={cy + NODE_H / 2} r={3.5} fill="#2a2a3a" stroke="rgba(200,200,200,0.25)" strokeWidth={1.5} />
                    </g>
                );
            })}
        </svg>
    );
}
