"use client";
import React, { useMemo } from "react";

// ─── n8n Node Type Registry ──────────────────────────────────────────────────
export interface N8nNodeStyle {
    bg: string;
    border: string;
    headerBg: string;
    icon: string;
    iconBg: string;
    label: string;
}

const NODE_REGISTRY: Record<string, N8nNodeStyle> = {
    // Triggers
    "n8n-nodes-base.webhook": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "⚡", iconBg: "#FF6D5A", label: "Webhook" },
    "n8n-nodes-base.scheduletrigger": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "⏰", iconBg: "#FF6D5A", label: "Schedule" },
    "n8n-nodes-base.manualTrigger": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "▶", iconBg: "#FF6D5A", label: "Manual" },
    // AI & ML
    "n8n-nodes-base.openai": { bg: "#1a1a2e", border: "#74AA9C", headerBg: "#74AA9C", icon: "🤖", iconBg: "#74AA9C", label: "OpenAI" },
    "@n8n/n8n-nodes-langchain.agent": { bg: "#1a1a2e", border: "#9B59B6", headerBg: "#9B59B6", icon: "🧠", iconBg: "#9B59B6", label: "AI Agent" },
    // Logic
    "n8n-nodes-base.if": { bg: "#1a1a2e", border: "#FF9900", headerBg: "#FF9900", icon: "⑂", iconBg: "#FF9900", label: "IF" },
    "n8n-nodes-base.switch": { bg: "#1a1a2e", border: "#FF9900", headerBg: "#FF9900", icon: "🔀", iconBg: "#FF9900", label: "Switch" },
    // Communication
    "n8n-nodes-base.slack": { bg: "#1a1a2e", border: "#4A154B", headerBg: "#4A154B", icon: "💬", iconBg: "#4A154B", label: "Slack" },
    "n8n-nodes-base.telegram": { bg: "#1a1a2e", border: "#2CA5E0", headerBg: "#2CA5E0", icon: "✈", iconBg: "#2CA5E0", label: "Telegram" },
    "n8n-nodes-base.email": { bg: "#1a1a2e", border: "#E74C3C", headerBg: "#E74C3C", icon: "📧", iconBg: "#E74C3C", label: "Email" },
    // Data
    "n8n-nodes-base.googleSheets": { bg: "#1a1a2e", border: "#34A853", headerBg: "#34A853", icon: "📊", iconBg: "#34A853", label: "Sheets" },
    "n8n-nodes-base.httpRequest": { bg: "#1a1a2e", border: "#3498DB", headerBg: "#3498DB", icon: "🌐", iconBg: "#3498DB", label: "HTTP" },
    "n8n-nodes-base.code": { bg: "#1a1a2e", border: "#E67E22", headerBg: "#E67E22", icon: "</", iconBg: "#E67E22", label: "Code" },
};

const DEFAULT_STYLE: N8nNodeStyle = {
    bg: "#1a1a2e",
    border: "#637BFE",
    headerBg: "#637BFE",
    icon: "⚙",
    iconBg: "#637BFE",
    label: "Node",
};

export function getN8nNodeStyle(type: string, name?: string): N8nNodeStyle {
    if (NODE_REGISTRY[type]) return NODE_REGISTRY[type];
    const nameLower = (name || "").toLowerCase();
    if (nameLower.includes("openai")) return NODE_REGISTRY["n8n-nodes-base.openai"];
    if (nameLower.includes("google sheets")) return NODE_REGISTRY["n8n-nodes-base.googleSheets"];
    if (nameLower.includes("email") || nameLower.includes("gmail")) return NODE_REGISTRY["n8n-nodes-base.email"];
    if (nameLower.includes("slack")) return NODE_REGISTRY["n8n-nodes-base.slack"];
    if (nameLower.includes("http")) return NODE_REGISTRY["n8n-nodes-base.httpRequest"];
    if (nameLower.includes("code")) return NODE_REGISTRY["n8n-nodes-base.code"];
    if (nameLower.includes("if") || nameLower.includes("condition")) return NODE_REGISTRY["n8n-nodes-base.if"];
    if (nameLower.includes("switch")) return NODE_REGISTRY["n8n-nodes-base.switch"];
    if (nameLower.includes("agent")) return NODE_REGISTRY["@n8n/n8n-nodes-langchain.agent"];
    if (nameLower.includes("webhook")) return NODE_REGISTRY["n8n-nodes-base.webhook"];
    return DEFAULT_STYLE;
}

// ─── Hierarchical Layout Engine ──────────────────────────────────────────────
interface LayoutNode {
    id: string;
    name: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    style: N8nNodeStyle;
}

interface LayoutEdge {
    from: string;
    to: string;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
}

const NODE_WIDTH = 180;
const NODE_HEIGHT = 100;
const LEVEL_HEIGHT = 180;
const LEVEL_WIDTH = 250;

function buildDependencyGraph(workflowJson: any): Map<string, Set<string>> {
    const graph = new Map<string, Set<string>>();
    const nodes = workflowJson?.nodes || [];
    const connections = workflowJson?.connections || {};

    // Initialize all nodes
    nodes.forEach((n: any) => {
        if (!graph.has(n.name)) graph.set(n.name, new Set());
    });

    // Add edges
    Object.entries(connections).forEach(([fromName, outputs]: [string, any]) => {
        if (!outputs?.main) return;
        outputs.main.forEach((outputGroup: any[]) => {
            (outputGroup || []).forEach((conn: any) => {
                if (conn?.node) {
                    if (!graph.has(conn.node)) graph.set(conn.node, new Set());
                    graph.get(fromName)?.add(conn.node);
                }
            });
        });
    });

    return graph;
}

function computeHierarchicalLayout(workflowJson: any): { nodes: LayoutNode[]; edges: LayoutEdge[]; width: number; height: number } {
    const rawNodes = workflowJson?.nodes || [];
    if (!Array.isArray(rawNodes) || rawNodes.length === 0) return { nodes: [], edges: [], width: 400, height: 300 };

    const graph = buildDependencyGraph(workflowJson);
    const levels = new Map<string, number>();
    const visited = new Set<string>();

    // Compute levels using topological sort
    function computeLevel(nodeName: string): number {
        if (levels.has(nodeName)) return levels.get(nodeName)!;
        if (visited.has(nodeName)) return 0; // Cycle detected
        visited.add(nodeName);

        const deps = graph.get(nodeName) || new Set();
        let maxDepLevel = 0;
        deps.forEach((dep) => {
            maxDepLevel = Math.max(maxDepLevel, computeLevel(dep));
        });

        const level = maxDepLevel + 1;
        levels.set(nodeName, level);
        return level;
    }

    rawNodes.forEach((n: any) => computeLevel(n.name));

    // Group nodes by level
    const levelGroups = new Map<number, string[]>();
    levels.forEach((level, nodeName) => {
        if (!levelGroups.has(level)) levelGroups.set(level, []);
        levelGroups.get(level)!.push(nodeName);
    });

    // Position nodes
    const layoutNodes: LayoutNode[] = [];
    const nodeMap = new Map<string, LayoutNode>();

    levelGroups.forEach((nodeNames, level) => {
        const count = (nodeNames || []).length;
        const totalWidth = count * LEVEL_WIDTH;
        const startX = Math.max(50, (800 - totalWidth) / 2);

        nodeNames.forEach((nodeName, idx) => {
            const rawNode = rawNodes.find((n: any) => n.name === nodeName);
            const x = startX + idx * LEVEL_WIDTH;
            const y = level * LEVEL_HEIGHT + 50;

            const layoutNode: LayoutNode = {
                id: rawNode?.id || nodeName,
                name: nodeName,
                type: rawNode?.type || "",
                x,
                y,
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
                style: getN8nNodeStyle(rawNode?.type || "", nodeName),
            };

            layoutNodes.push(layoutNode);
            nodeMap.set(nodeName, layoutNode);
        });
    });

    // Create edges
    const edges: LayoutEdge[] = [];
    const connections = workflowJson?.connections || {};

    Object.entries(connections).forEach(([fromName, outputs]: [string, any]) => {
        if (!outputs?.main) return;
        const fromNode = nodeMap.get(fromName);
        if (!fromNode) return;

        outputs.main.forEach((outputGroup: any[]) => {
            (outputGroup || []).forEach((conn: any) => {
                const toNode = nodeMap.get(conn.node);
                if (toNode) {
                    edges.push({
                        from: fromName,
                        to: conn.node,
                        fromX: fromNode.x + fromNode.width,
                        fromY: fromNode.y + fromNode.height / 2,
                        toX: toNode.x,
                        toY: toNode.y + toNode.height / 2,
                    });
                }
            });
        });
    });

    const maxLevel = Math.max(...Array.from(levels.values()), 0);
    const width = Math.max(800, 250 * (maxLevel + 1));
    const height = Math.max(400, (maxLevel + 1) * LEVEL_HEIGHT + 100);

    return { nodes: layoutNodes, edges, width, height };
}

function bezierPath(x1: number, y1: number, x2: number, y2: number): string {
    const dx = x2 - x1;
    const cx = x1 + dx * 0.5;
    return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
}

function N8nNodeSvg({ node }: { node: LayoutNode }) {
    const { x, y, width, height, style, name } = node;
    const label = (name || "").length > 22 ? (name || "").slice(0, 21) + "…" : (name || "");

    return (
        <g>
            {/* Main box */}
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={16}
                fill="rgba(20,20,35,0.95)"
                stroke={style.border}
                strokeWidth={2}
                opacity={0.9}
            />

            {/* Header bar */}
            <rect x={x} y={y} width={width} height={7} rx={3} fill={style.headerBg} opacity={0.95} />

            {/* Icon circle */}
            <circle cx={x + width / 2} cy={y + 35} r={26} fill={style.iconBg} opacity={0.18} />

            {/* Icon */}
            <text
                x={x + width / 2}
                y={y + 42}
                textAnchor="middle"
                fontSize={28}
                fill="white"
                style={{ pointerEvents: "none", fontWeight: "bold" }}
            >
                {style.icon}
            </text>

            {/* Label */}
            <text
                x={x + width / 2}
                y={y + height - 16}
                textAnchor="middle"
                fill="white"
                fontSize={13}
                fontWeight="600"
                style={{ pointerEvents: "none" }}
            >
                {label}
            </text>

            {/* Connection ports */}
            <circle cx={x} cy={y + height / 2} r={5.5} fill="#050510" stroke={style.border} strokeWidth={1.5} opacity={0.8} />
            <circle cx={x + width} cy={y + height / 2} r={5.5} fill="#050510" stroke={style.border} strokeWidth={1.5} opacity={0.8} />
        </g>
    );
}

interface N8nCanvasProps {
    workflowJson: any;
    compact?: boolean;
    className?: string;
    height?: number;
}

export default function N8nCanvas({ workflowJson, compact = false, className = "", height }: N8nCanvasProps) {
    const { nodes, edges, width, height: layoutHeight } = useMemo(
        () => computeHierarchicalLayout(workflowJson),
        [workflowJson]
    );

    const canvasHeight = height || (compact ? 220 : Math.max(layoutHeight, 500));

    if (!workflowJson || nodes.length === 0) {
        return (
            <div className={`relative overflow-hidden rounded-2xl flex items-center justify-center ${className}`} style={{ background: "linear-gradient(135deg, #050510 0%, #0a0a15 100%)", height: canvasHeight }}>
                <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">⚙️</span>
                    </div>
                    <p className="text-gray-500 text-sm font-semibold">No workflow configured</p>
                    <p className="text-gray-700 text-xs mt-1">Workflow visualization will appear here</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ background: "linear-gradient(135deg, #050510 0%, #0a0a15 100%)", height: canvasHeight }}>
            {/* Grid background */}
            <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.06 }}>
                <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Canvas */}
            <div className="absolute inset-0 overflow-auto">
                <svg width={width} height={layoutHeight} viewBox={`0 0 ${width} ${layoutHeight}`} preserveAspectRatio="xMidYMid meet">
                    <defs>
                        {/* Arrow marker */}
                        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="rgba(255,255,255,0.35)" />
                        </marker>
                        {/* Gradient */}
                        <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
                        </linearGradient>
                    </defs>

                    {/* Edges */}
                    {edges.map((edge, i) => (
                        <path
                            key={`edge-${i}`}
                            d={bezierPath(edge.fromX, edge.fromY, edge.toX, edge.toY)}
                            fill="none"
                            stroke="url(#edgeGrad)"
                            strokeWidth={3}
                            markerEnd="url(#arrowhead)"
                            opacity={0.65}
                            style={{ transition: "opacity 0.2s" }}
                        />
                    ))}

                    {/* Nodes */}
                    {nodes.map((node) => (
                        <g key={node.id} style={{ cursor: "pointer" }}>
                            <N8nNodeSvg node={node} />
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
}

export function N8nNodeIconStrip({ nodes = [] }: { nodes?: string[] }) {
    return (
        <div className="flex -space-x-2">
            {(nodes || []).slice(0, 5).map((node, i) => (
                <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-navy-950 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center text-xs font-semibold hover:scale-110 transition-transform"
                    title={node}
                >
                    {getN8nNodeStyle(node).icon}
                </div>
            ))}
            {(nodes || []).length > 5 && (
                <div className="w-8 h-8 rounded-full border-2 border-navy-950 bg-navy-800 flex items-center justify-center text-xs font-semibold text-gray-400">
                    +{(nodes || []).length - 5}
                </div>
            )}
        </div>
    );
}
