"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";

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
    if (nameLower.includes("google sheets")) return { ...DEFAULT_STYLE, icon: "📊", label: "Google Sheets" };
    if (nameLower.includes("email") || nameLower.includes("gmail")) return { ...DEFAULT_STYLE, icon: "📧", label: "Email" };
    if (nameLower.includes("crm") || nameLower.includes("hubspot")) return { ...DEFAULT_STYLE, icon: "🤝", label: "CRM" };
    if (nameLower.includes("filter") || nameLower.includes("switch")) return { ...DEFAULT_STYLE, icon: "🌲", label: "Logic" };
    if (nameLower.includes("webhook")) return NODE_REGISTRY["n8n-nodes-base.webhook"];
    if (nameLower.includes("slack")) return NODE_REGISTRY["n8n-nodes-base.slack"];
    if (nameLower.includes("agent")) return NODE_REGISTRY["@n8n/n8n-nodes-langchain.agent"];
    if (nameLower.includes("if")) return NODE_REGISTRY["n8n-nodes-base.if"];
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

const NODE_W = 140;
const NODE_H = 80;

function layoutWorkflow(workflowJson: any): { nodes: LayoutNode[]; edges: LayoutEdge[]; width: number; height: number } {
    if (!workflowJson?.nodes?.length) return { nodes: [], edges: [], width: 400, height: 200 };
    const rawNodes: any[] = workflowJson.nodes || [];
    const connections: any = workflowJson.connections || {};

    const layoutNodes = rawNodes.map((n: any, i: number) => ({
        id: n.id || n.name,
        type: n.type || "",
        name: n.name || "Node",
        x: (n.position?.[0] ?? i * 200) + 50,
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

    const maxX = Math.max(...layoutNodes.map((n) => n.x + NODE_W)) + 100;
    const maxY = Math.max(...layoutNodes.map((n) => n.y + NODE_H)) + 100;
    return { nodes: layoutNodes, edges, width: maxX, height: maxY };
}

function bezier(x1: number, y1: number, x2: number, y2: number): string {
    const cx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
}

function N8nNodeSvg({ node, compact }: { node: LayoutNode; compact?: boolean }) {
    const { x, y, style, name } = node;
    const label = name.length > 18 ? name.slice(0, 17) + "…" : name;
    return (
        <g>
            <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={12} fill="rgba(20,20,35,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            <rect x={x} y={y} width={NODE_W} height={4} rx={2} fill={style.headerBg} />
            <circle cx={x + NODE_W / 2} cy={y + 30} r={18} fill={style.iconBg} opacity={0.2} />
            <text x={x + NODE_W / 2} y={y + 36} textAnchor="middle" fontSize={20} fill="white">{style.icon}</text>
            <text x={x + NODE_W / 2} y={y + 65} textAnchor="middle" fill="white" fontSize={11} fontWeight="600">{label}</text>
            <circle cx={x} cy={y + NODE_H / 2} r={4} fill="#050510" stroke="rgba(255,255,255,0.3)" />
            <circle cx={x + NODE_W} cy={y + NODE_H / 2} r={4} fill="#050510" stroke="rgba(255,255,255,0.3)" />
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
    const canvasHeight = height || (compact ? 180 : Math.max(layoutHeight, 400));

    return (
        <div className={`relative overflow-hidden rounded-3xl ${className}`} style={{ background: "#050510", height: canvasHeight }}>
            <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.1 }}>
                <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="white" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div className="absolute inset-0 overflow-auto p-10">
                <svg width={width} height={layoutHeight} viewBox={`0 0 ${width} ${layoutHeight}`}>
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                            <path d="M0,0 L10,5 L0,10 Z" fill="rgba(255,255,255,0.2)" />
                        </marker>
                    </defs>
                    {edges.map((edge, i) => (
                        <path key={i} d={bezier(edge.fromX, edge.fromY, edge.toX, edge.toY)} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={2} markerEnd="url(#arrow)" />
                    ))}
                    {nodes.map((node) => (
                        <N8nNodeSvg key={node.id} node={node} compact={compact} />
                    ))}
                </svg>
            </div>
        </div>
    );
}

export function N8nNodeIconStrip({ nodes }: { nodes: string[] }) {
    return (
        <div className="flex -space-x-2">
            {nodes.slice(0, 5).map((node, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-navy-950 bg-navy-900 flex items-center justify-center text-xs" title={node}>
                    {getN8nNodeStyle(node).icon}
                </div>
            ))}
        </div>
    );
}
