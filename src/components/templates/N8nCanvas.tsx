"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

// ─── n8n Node Type Registry ──────────────────────────────────────────────────
export interface N8nNodeStyle {
    bg: string;
    border: string;
    headerBg: string;
    icon: string;
    iconBg: string;
    label: string;
    textColor?: string;
}

const NODE_REGISTRY: Record<string, N8nNodeStyle> = {
    // Triggers
    "n8n-nodes-base.webhook": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "⚡", iconBg: "#FF6D5A", label: "Webhook" },
    "n8n-nodes-base.scheduletrigger": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "⏰", iconBg: "#FF6D5A", label: "Schedule" },
    "n8n-nodes-base.manualTrigger": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "▶", iconBg: "#FF6D5A", label: "Manual" },
    // AI
    "n8n-nodes-base.openai": { bg: "#1a1a2e", border: "#74AA9C", headerBg: "#74AA9C", icon: "🤖", iconBg: "#74AA9C", label: "OpenAI" },
    "@n8n/n8n-nodes-langchain.agent": { bg: "#1a1a2e", border: "#9B59B6", headerBg: "#9B59B6", icon: "🧠", iconBg: "#9B59B6", label: "AI Agent" },
    // Logic
    "n8n-nodes-base.if": { bg: "#1a1a2e", border: "#FF9900", headerBg: "#FF9900", icon: "⑂", iconBg: "#FF9900", label: "IF" },
    // Communication
    "n8n-nodes-base.slack": { bg: "#1a1a2e", border: "#4A154B", headerBg: "#4A154B", icon: "💬", iconBg: "#4A154B", label: "Slack" },
    "n8n-nodes-base.telegram": { bg: "#1a1a2e", border: "#2CA5E0", headerBg: "#2CA5E0", icon: "✈", iconBg: "#2CA5E0", label: "Telegram" },
    "n8n-nodes-base.email": { bg: "#1a1a2e", border: "#E74C3C", headerBg: "#E74C3C", icon: "📧", iconBg: "#E74C3C", label: "Email" },
    "n8n-nodes-base.googleSheets": { bg: "#1a1a2e", border: "#34A853", headerBg: "#34A853", icon: "📊", iconBg: "#34A853", label: "Google Sheets" },
    "n8n-nodes-base.httpRequest": { bg: "#1a1a2e", border: "#3498DB", headerBg: "#3498DB", icon: "🌐", iconBg: "#3498DB", label: "HTTP" },
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
    const lower = (type || "").toLowerCase();
    if (NODE_REGISTRY[type]) return NODE_REGISTRY[type];
    const nameLower = (name || "").toLowerCase();
    if (nameLower.includes("openai")) return NODE_REGISTRY["n8n-nodes-base.openai"];
    if (nameLower.includes("google sheets")) return NODE_REGISTRY["n8n-nodes-base.googleSheets"];
    if (nameLower.includes("email") || nameLower.includes("gmail")) return NODE_REGISTRY["n8n-nodes-base.email"];
    if (nameLower.includes("crm") || nameLower.includes("hubspot")) return { ...DEFAULT_STYLE, icon: "🤝", label: "CRM" };
    if (nameLower.includes("filter") || nameLower.includes("switch")) return { ...DEFAULT_STYLE, icon: "🌲", label: "Logic" };
    if (nameLower.includes("webhook")) return NODE_REGISTRY["n8n-nodes-base.webhook"];
    if (nameLower.includes("slack")) return NODE_REGISTRY["n8n-nodes-base.slack"];
    if (nameLower.includes("agent")) return NODE_REGISTRY["@n8n/n8n-nodes-langchain.agent"];
    if (nameLower.includes("if")) return NODE_REGISTRY["n8n-nodes-base.if"];
    if (nameLower.includes("http")) return NODE_REGISTRY["n8n-nodes-base.httpRequest"];
    return DEFAULT_STYLE;
}

// ─── Layout Engine ────────────────────────────────────────────────────────────
interface LayoutNode {
    id: string;
    type: string;
    name: string;
    x: number;
    y: number;
    style: N8nNodeStyle;
    originalNode: any;
}

interface LayoutEdge {
    from: string;
    to: string;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
}

const NODE_W = 160;
const NODE_H = 90;

function layoutWorkflow(workflowJson: any): { nodes: LayoutNode[]; edges: LayoutEdge[]; width: number; height: number } {
    if (!workflowJson?.nodes?.length) return { nodes: [], edges: [], width: 400, height: 200 };
    const rawNodes: any[] = workflowJson.nodes || [];
    const connections: any = workflowJson.connections || {};

    const layoutNodes = rawNodes.map((n: any, i: number) => ({
        id: n.id || n.name,
        type: n.type || "",
        name: n.name || "Node",
        x: (n.position?.[0] ?? i * 250) + 50,
        y: (n.position?.[1] ?? 100) + 50,
        style: getN8nNodeStyle(n.type || "", n.name),
        originalNode: n,
    }));

    const edges: LayoutEdge[] = [];
    const nodeMap: Record<string, LayoutNode> = {};
    layoutNodes.forEach((n) => { nodeMap[n.name] = n; });

    Object.entries(connections).forEach(([fromName, outputs]: [string, any]) => {
        if (!outputs?.main) return;
        outputs.main.forEach((outputGroup: any[]) => {
            (outputGroup || []).forEach((conn: any) => {
                if (!conn?.node) return;
                const from = nodeMap[fromName];
                const to = nodeMap[conn.node];
                if (from && to) {
                    edges.push({
                        from: fromName,
                        to: conn.node,
                        fromX: from.x + NODE_W,
                        fromY: from.y + NODE_H / 2,
                        toX: to.x,
                        toY: to.y + NODE_H / 2,
                    });
                }
            });
        });
    });

    const maxX = Math.max(...layoutNodes.map((n) => n.x + NODE_W), 400) + 100;
    const maxY = Math.max(...layoutNodes.map((n) => n.y + NODE_H), 300) + 100;
    return { nodes: layoutNodes, edges, width: maxX, height: maxY };
}

function bezier(x1: number, y1: number, x2: number, y2: number): string {
    const cx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
}

function N8nNodeSvg({ node, compact, isHovered }: { node: LayoutNode; compact?: boolean; isHovered?: boolean }) {
    const { x, y, style, name } = node;
    const label = name.length > 20 ? name.slice(0, 19) + "…" : name;
    
    return (
        <g opacity={isHovered ? 1 : 0.85} style={{ transition: "opacity 0.2s" }}>
            {/* Main node box */}
            <rect 
                x={x} 
                y={y} 
                width={NODE_W} 
                height={NODE_H} 
                rx={14} 
                fill="rgba(20,20,35,0.95)" 
                stroke={style.border} 
                strokeWidth={isHovered ? 2.5 : 1.5}
                opacity={0.9}
            />
            
            {/* Header bar */}
            <rect 
                x={x} 
                y={y} 
                width={NODE_W} 
                height={6} 
                rx={3} 
                fill={style.headerBg} 
                opacity={0.9}
            />
            
            {/* Icon background circle */}
            <circle 
                cx={x + NODE_W / 2} 
                cy={y + 32} 
                r={22} 
                fill={style.iconBg} 
                opacity={0.15}
            />
            
            {/* Icon */}
            <text 
                x={x + NODE_W / 2} 
                y={y + 40} 
                textAnchor="middle" 
                fontSize={24} 
                fill="white"
                style={{ pointerEvents: "none" }}
            >
                {style.icon}
            </text>
            
            {/* Label */}
            <text 
                x={x + NODE_W / 2} 
                y={y + 72} 
                textAnchor="middle" 
                fill="white" 
                fontSize={12} 
                fontWeight="600"
                style={{ pointerEvents: "none" }}
            >
                {label}
            </text>
            
            {/* Connection points */}
            <circle 
                cx={x} 
                cy={y + NODE_H / 2} 
                r={5} 
                fill="#050510" 
                stroke={style.border} 
                strokeWidth={1.5}
                opacity={0.7}
            />
            <circle 
                cx={x + NODE_W} 
                cy={y + NODE_H / 2} 
                r={5} 
                fill="#050510" 
                stroke={style.border} 
                strokeWidth={1.5}
                opacity={0.7}
            />
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
    const { nodes, edges, width, height: layoutHeight } = layoutWorkflow(workflowJson);
    const canvasHeight = height || (compact ? 200 : Math.max(layoutHeight, 500));
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleZoom = (direction: "in" | "out") => {
        setZoom((z) => {
            const newZoom = direction === "in" ? Math.min(z + 0.2, 2) : Math.max(z - 0.2, 0.5);
            return newZoom;
        });
    };

    const handleFitToScreen = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    return (
        <div className={`relative overflow-hidden rounded-2xl group ${className}`} style={{ background: "linear-gradient(135deg, #050510 0%, #0a0a15 100%)", height: canvasHeight }} ref={containerRef}>
            {/* Grid background */}
            <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.08 }}>
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Canvas content */}
            <div className="absolute inset-0 overflow-auto" style={{ cursor: "grab" }}>
                <svg 
                    width={width} 
                    height={layoutHeight} 
                    viewBox={`0 0 ${width} ${layoutHeight}`}
                    style={{
                        transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                        transformOrigin: "0 0",
                        transition: "transform 0.2s ease-out",
                    }}
                >
                    <defs>
                        {/* Arrow marker for edges */}
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                            <path d="M0,0 L10,5 L0,10 Z" fill="rgba(255,255,255,0.3)" />
                        </marker>
                        {/* Gradient for edges */}
                        <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                        </linearGradient>
                    </defs>

                    {/* Edges */}
                    {edges.map((edge, i) => (
                        <path 
                            key={`edge-${i}`}
                            d={bezier(edge.fromX, edge.fromY, edge.toX, edge.toY)} 
                            fill="none" 
                            stroke="url(#edgeGradient)" 
                            strokeWidth={2.5}
                            markerEnd="url(#arrow)"
                            opacity={0.6}
                            style={{ transition: "opacity 0.2s" }}
                        />
                    ))}

                    {/* Nodes */}
                    {nodes.map((node) => (
                        <g
                            key={node.id}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            style={{ cursor: "pointer" }}
                        >
                            <N8nNodeSvg 
                                node={node} 
                                compact={compact}
                                isHovered={hoveredNode === node.id}
                            />
                        </g>
                    ))}
                </svg>
            </div>

            {/* Controls - only show on non-compact mode */}
            {!compact && (
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => handleZoom("in")}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
                        title="Zoom in"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleZoom("out")}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
                        title="Zoom out"
                    >
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleFitToScreen}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
                        title="Fit to screen"
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Empty state */}
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl">⚙️</span>
                        </div>
                        <p className="text-gray-500 text-sm font-semibold">No workflow configured</p>
                        <p className="text-gray-700 text-xs mt-1">The workflow visualization will appear here</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export function N8nNodeIconStrip({ nodes }: { nodes: string[] }) {
    return (
        <div className="flex -space-x-2">
            {nodes.slice(0, 5).map((node, i) => (
                <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-navy-950 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center text-xs font-semibold hover:scale-110 transition-transform" 
                    title={node}
                >
                    {getN8nNodeStyle(node).icon}
                </div>
            ))}
            {nodes.length > 5 && (
                <div className="w-8 h-8 rounded-full border-2 border-navy-950 bg-navy-800 flex items-center justify-center text-xs font-semibold text-gray-400">
                    +{nodes.length - 5}
                </div>
            )}
        </div>
    );
}
