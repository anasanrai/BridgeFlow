"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";

// ─── n8n Node Type Registry ──────────────────────────────────────────────────
// Maps n8n node types to their real brand colors and icons (SVG paths / emoji)
export interface N8nNodeStyle {
    bg: string;
    border: string;
    headerBg: string;
    icon: string; // emoji or short label
    iconBg: string;
    label: string;
}

const NODE_REGISTRY: Record<string, N8nNodeStyle> = {
    // Triggers
    "n8n-nodes-base.webhook": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "⚡", iconBg: "#FF6D5A", label: "Webhook" },
    "n8n-nodes-base.scheduletrigger": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "⏰", iconBg: "#FF6D5A", label: "Schedule" },
    "n8n-nodes-base.manualTrigger": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "▶", iconBg: "#FF6D5A", label: "Manual" },
    "n8n-nodes-base.emailtrigger": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "📧", iconBg: "#FF6D5A", label: "Email Trigger" },
    "n8n-nodes-base.formtrigger": { bg: "#1a1a2e", border: "#FF6D5A", headerBg: "#FF6D5A", icon: "📋", iconBg: "#FF6D5A", label: "Form Trigger" },
    // HTTP / API
    "n8n-nodes-base.httprequest": { bg: "#1a1a2e", border: "#7B68EE", headerBg: "#7B68EE", icon: "🌐", iconBg: "#7B68EE", label: "HTTP Request" },
    "n8n-nodes-base.respondtowebhook": { bg: "#1a1a2e", border: "#7B68EE", headerBg: "#7B68EE", icon: "↩", iconBg: "#7B68EE", label: "Respond" },
    // Google
    "n8n-nodes-base.gmail": { bg: "#1a1a2e", border: "#EA4335", headerBg: "#EA4335", icon: "✉", iconBg: "#EA4335", label: "Gmail" },
    "n8n-nodes-base.googlesheets": { bg: "#1a1a2e", border: "#34A853", headerBg: "#34A853", icon: "📊", iconBg: "#34A853", label: "Google Sheets" },
    "n8n-nodes-base.googledrive": { bg: "#1a1a2e", border: "#4285F4", headerBg: "#4285F4", icon: "📁", iconBg: "#4285F4", label: "Google Drive" },
    "n8n-nodes-base.googlecalendar": { bg: "#1a1a2e", border: "#4285F4", headerBg: "#4285F4", icon: "📅", iconBg: "#4285F4", label: "Google Calendar" },
    "n8n-nodes-base.googledocs": { bg: "#1a1a2e", border: "#4285F4", headerBg: "#4285F4", icon: "📄", iconBg: "#4285F4", label: "Google Docs" },
    // Communication
    "n8n-nodes-base.slack": { bg: "#1a1a2e", border: "#4A154B", headerBg: "#4A154B", icon: "💬", iconBg: "#4A154B", label: "Slack" },
    "n8n-nodes-base.telegram": { bg: "#1a1a2e", border: "#2CA5E0", headerBg: "#2CA5E0", icon: "✈", iconBg: "#2CA5E0", label: "Telegram" },
    "n8n-nodes-base.discord": { bg: "#1a1a2e", border: "#5865F2", headerBg: "#5865F2", icon: "🎮", iconBg: "#5865F2", label: "Discord" },
    "n8n-nodes-base.microsoftoutlook": { bg: "#1a1a2e", border: "#0078D4", headerBg: "#0078D4", icon: "📬", iconBg: "#0078D4", label: "Outlook" },
    "n8n-nodes-base.twilio": { bg: "#1a1a2e", border: "#F22F46", headerBg: "#F22F46", icon: "📱", iconBg: "#F22F46", label: "Twilio" },
    "n8n-nodes-base.whatsapp": { bg: "#1a1a2e", border: "#25D366", headerBg: "#25D366", icon: "💬", iconBg: "#25D366", label: "WhatsApp" },
    // AI
    "n8n-nodes-base.openai": { bg: "#1a1a2e", border: "#74AA9C", headerBg: "#74AA9C", icon: "🤖", iconBg: "#74AA9C", label: "OpenAI" },
    "@n8n/n8n-nodes-langchain.openai": { bg: "#1a1a2e", border: "#74AA9C", headerBg: "#74AA9C", icon: "🤖", iconBg: "#74AA9C", label: "OpenAI" },
    "@n8n/n8n-nodes-langchain.lmchatopenai": { bg: "#1a1a2e", border: "#74AA9C", headerBg: "#74AA9C", icon: "🤖", iconBg: "#74AA9C", label: "OpenAI Chat" },
    "@n8n/n8n-nodes-langchain.lmchatopenrouter": { bg: "#1a1a2e", border: "#74AA9C", headerBg: "#74AA9C", icon: "🔀", iconBg: "#74AA9C", label: "OpenRouter" },
    "@n8n/n8n-nodes-langchain.chainllm": { bg: "#1a1a2e", border: "#74AA9C", headerBg: "#74AA9C", icon: "⛓", iconBg: "#74AA9C", label: "LLM Chain" },
    "@n8n/n8n-nodes-langchain.agent": { bg: "#1a1a2e", border: "#9B59B6", headerBg: "#9B59B6", icon: "🧠", iconBg: "#9B59B6", label: "AI Agent" },
    "@n8n/n8n-nodes-langchain.toolworkflow": { bg: "#1a1a2e", border: "#9B59B6", headerBg: "#9B59B6", icon: "🔧", iconBg: "#9B59B6", label: "Tool Workflow" },
    // Logic
    "n8n-nodes-base.if": { bg: "#1a1a2e", border: "#FF9900", headerBg: "#FF9900", icon: "⑂", iconBg: "#FF9900", label: "IF" },
    "n8n-nodes-base.switch": { bg: "#1a1a2e", border: "#FF9900", headerBg: "#FF9900", icon: "⇄", iconBg: "#FF9900", label: "Switch" },
    "n8n-nodes-base.merge": { bg: "#1a1a2e", border: "#FF9900", headerBg: "#FF9900", icon: "⊕", iconBg: "#FF9900", label: "Merge" },
    "n8n-nodes-base.splitinbatches": { bg: "#1a1a2e", border: "#FF9900", headerBg: "#FF9900", icon: "⊞", iconBg: "#FF9900", label: "Split Batches" },
    "n8n-nodes-base.wait": { bg: "#1a1a2e", border: "#FF9900", headerBg: "#FF9900", icon: "⏳", iconBg: "#FF9900", label: "Wait" },
    "n8n-nodes-base.filter": { bg: "#1a1a2e", border: "#FF9900", headerBg: "#FF9900", icon: "⊿", iconBg: "#FF9900", label: "Filter" },
    // Data
    "n8n-nodes-base.set": { bg: "#1a1a2e", border: "#637BFE", headerBg: "#637BFE", icon: "✏", iconBg: "#637BFE", label: "Edit Fields" },
    "n8n-nodes-base.code": { bg: "#1a1a2e", border: "#F7DF1E", headerBg: "#F7DF1E", icon: "</>", iconBg: "#F7DF1E", label: "Code" },
    "n8n-nodes-base.function": { bg: "#1a1a2e", border: "#F7DF1E", headerBg: "#F7DF1E", icon: "ƒ", iconBg: "#F7DF1E", label: "Function" },
    "n8n-nodes-base.aggregate": { bg: "#1a1a2e", border: "#637BFE", headerBg: "#637BFE", icon: "Σ", iconBg: "#637BFE", label: "Aggregate" },
    "n8n-nodes-base.spreadsheetfile": { bg: "#1a1a2e", border: "#34A853", headerBg: "#34A853", icon: "📑", iconBg: "#34A853", label: "Spreadsheet" },
    // CRM / Business
    "n8n-nodes-base.hubspot": { bg: "#1a1a2e", border: "#FF7A59", headerBg: "#FF7A59", icon: "🔶", iconBg: "#FF7A59", label: "HubSpot" },
    "n8n-nodes-base.salesforce": { bg: "#1a1a2e", border: "#00A1E0", headerBg: "#00A1E0", icon: "☁", iconBg: "#00A1E0", label: "Salesforce" },
    "n8n-nodes-base.airtable": { bg: "#1a1a2e", border: "#FCB400", headerBg: "#FCB400", icon: "🗃", iconBg: "#FCB400", label: "Airtable" },
    "n8n-nodes-base.notion": { bg: "#1a1a2e", border: "#ffffff", headerBg: "#333", icon: "📝", iconBg: "#333", label: "Notion" },
    "n8n-nodes-base.mysql": { bg: "#1a1a2e", border: "#4479A1", headerBg: "#4479A1", icon: "🗄", iconBg: "#4479A1", label: "MySQL" },
    "n8n-nodes-base.postgres": { bg: "#1a1a2e", border: "#336791", headerBg: "#336791", icon: "🐘", iconBg: "#336791", label: "Postgres" },
    "n8n-nodes-base.supabase": { bg: "#1a1a2e", border: "#3ECF8E", headerBg: "#3ECF8E", icon: "⚡", iconBg: "#3ECF8E", label: "Supabase" },
    // Misc
    "n8n-nodes-base.stickynote": { bg: "#FFE066", border: "#FFD700", headerBg: "#FFD700", icon: "📌", iconBg: "#FFD700", label: "Sticky Note" },
    "n8n-nodes-base.nooperation": { bg: "#1a1a2e", border: "#555", headerBg: "#555", icon: "○", iconBg: "#555", label: "No-Op" },
};

// Default style for unknown nodes
const DEFAULT_STYLE: N8nNodeStyle = {
    bg: "#1a1a2e",
    border: "#637BFE",
    headerBg: "#637BFE",
    icon: "⚙",
    iconBg: "#637BFE",
    label: "Node",
};

export function getN8nNodeStyle(type: string, name?: string): N8nNodeStyle {
    // Try exact match
    const lower = (type || "").toLowerCase();
    if (NODE_REGISTRY[type]) return NODE_REGISTRY[type];
    if (NODE_REGISTRY[lower]) return NODE_REGISTRY[lower];

    // Try partial match
    for (const [key, style] of Object.entries(NODE_REGISTRY)) {
        if (lower.includes(key.split(".").pop()?.toLowerCase() || "")) return style;
    }

    // Try name-based matching
    const nameLower = (name || "").toLowerCase();
    if (nameLower.includes("webhook")) return NODE_REGISTRY["n8n-nodes-base.webhook"];
    if (nameLower.includes("gmail") || nameLower.includes("email")) return NODE_REGISTRY["n8n-nodes-base.gmail"];
    if (nameLower.includes("slack")) return NODE_REGISTRY["n8n-nodes-base.slack"];
    if (nameLower.includes("telegram")) return NODE_REGISTRY["n8n-nodes-base.telegram"];
    if (nameLower.includes("sheet")) return NODE_REGISTRY["n8n-nodes-base.googlesheets"];
    if (nameLower.includes("openai") || nameLower.includes("gpt")) return NODE_REGISTRY["n8n-nodes-base.openai"];
    if (nameLower.includes("openrouter")) return NODE_REGISTRY["@n8n/n8n-nodes-langchain.lmchatopenrouter"];
    if (nameLower.includes("llm") || nameLower.includes("chain")) return NODE_REGISTRY["@n8n/n8n-nodes-langchain.chainllm"];
    if (nameLower.includes("agent")) return NODE_REGISTRY["@n8n/n8n-nodes-langchain.agent"];
    if (nameLower.includes("code") || nameLower.includes("javascript")) return NODE_REGISTRY["n8n-nodes-base.code"];
    if (nameLower.includes("if") || nameLower.includes("condition")) return NODE_REGISTRY["n8n-nodes-base.if"];
    if (nameLower.includes("switch")) return NODE_REGISTRY["n8n-nodes-base.switch"];
    if (nameLower.includes("http")) return NODE_REGISTRY["n8n-nodes-base.httprequest"];
    if (nameLower.includes("schedule")) return NODE_REGISTRY["n8n-nodes-base.scheduletrigger"];
    if (nameLower.includes("notion")) return NODE_REGISTRY["n8n-nodes-base.notion"];
    if (nameLower.includes("airtable")) return NODE_REGISTRY["n8n-nodes-base.airtable"];
    if (nameLower.includes("hubspot")) return NODE_REGISTRY["n8n-nodes-base.hubspot"];
    if (nameLower.includes("discord")) return NODE_REGISTRY["n8n-nodes-base.discord"];
    if (nameLower.includes("twilio") || nameLower.includes("sms")) return NODE_REGISTRY["n8n-nodes-base.twilio"];
    if (nameLower.includes("whatsapp")) return NODE_REGISTRY["n8n-nodes-base.whatsapp"];
    if (nameLower.includes("drive")) return NODE_REGISTRY["n8n-nodes-base.googledrive"];
    if (nameLower.includes("calendar")) return NODE_REGISTRY["n8n-nodes-base.googlecalendar"];
    if (nameLower.includes("postgres")) return NODE_REGISTRY["n8n-nodes-base.postgres"];
    if (nameLower.includes("mysql")) return NODE_REGISTRY["n8n-nodes-base.mysql"];
    if (nameLower.includes("supabase")) return NODE_REGISTRY["n8n-nodes-base.supabase"];
    if (nameLower.includes("set") || nameLower.includes("edit field")) return NODE_REGISTRY["n8n-nodes-base.set"];
    if (nameLower.includes("wait")) return NODE_REGISTRY["n8n-nodes-base.wait"];
    if (nameLower.includes("merge")) return NODE_REGISTRY["n8n-nodes-base.merge"];
    if (nameLower.includes("split")) return NODE_REGISTRY["n8n-nodes-base.splitinbatches"];

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
const NODE_H = 60;
const H_GAP = 60;
const V_GAP = 40;

function layoutWorkflow(workflowJson: any): { nodes: LayoutNode[]; edges: LayoutEdge[]; width: number; height: number } {
    if (!workflowJson?.nodes?.length) return { nodes: [], edges: [], width: 400, height: 200 };

    const rawNodes: any[] = workflowJson.nodes || [];
    const connections: any = workflowJson.connections || {};

    // Use existing positions if available, otherwise auto-layout
    const hasPositions = rawNodes.some((n: any) => n.position && Array.isArray(n.position));

    let layoutNodes: LayoutNode[];

    if (hasPositions) {
        // Use n8n's own positions, normalize them
        const minX = Math.min(...rawNodes.map((n: any) => n.position?.[0] ?? 0));
        const minY = Math.min(...rawNodes.map((n: any) => n.position?.[1] ?? 0));

        layoutNodes = rawNodes.map((n: any) => ({
            id: n.id || n.name,
            type: n.type || "",
            name: n.name || n.type?.split(".").pop() || "Node",
            x: (n.position?.[0] ?? 0) - minX + 40,
            y: (n.position?.[1] ?? 0) - minY + 40,
            style: getN8nNodeStyle(n.type || "", n.name),
            originalNode: n,
        }));
    } else {
        // Auto-layout: build adjacency, do BFS layering
        const nameToNode: Record<string, any> = {};
        rawNodes.forEach((n: any) => { nameToNode[n.name] = n; });

        // Build edges from connections
        const adj: Record<string, string[]> = {};
        rawNodes.forEach((n: any) => { adj[n.name] = []; });

        Object.entries(connections).forEach(([fromName, outputs]: [string, any]) => {
            if (!outputs?.main) return;
            outputs.main.forEach((outputGroup: any[]) => {
                (outputGroup || []).forEach((conn: any) => {
                    if (conn?.node) {
                        adj[fromName] = adj[fromName] || [];
                        adj[fromName].push(conn.node);
                    }
                });
            });
        });

        // BFS layering
        const inDegree: Record<string, number> = {};
        rawNodes.forEach((n: any) => { inDegree[n.name] = 0; });
        Object.values(adj).forEach((targets) => {
            targets.forEach((t) => { inDegree[t] = (inDegree[t] || 0) + 1; });
        });

        const layers: string[][] = [];
        const visited = new Set<string>();
        let queue = rawNodes.filter((n: any) => inDegree[n.name] === 0).map((n: any) => n.name);
        if (queue.length === 0) queue = [rawNodes[0].name]; // fallback

        while (queue.length > 0) {
            layers.push([...queue]);
            queue.forEach((n) => visited.add(n));
            const nextQueue: string[] = [];
            queue.forEach((name) => {
                (adj[name] || []).forEach((target) => {
                    if (!visited.has(target) && !nextQueue.includes(target)) {
                        nextQueue.push(target);
                    }
                });
            });
            queue = nextQueue;
        }

        // Add any unvisited nodes
        rawNodes.forEach((n: any) => {
            if (!visited.has(n.name)) {
                layers.push([n.name]);
                visited.add(n.name);
            }
        });

        // Assign positions
        const posMap: Record<string, { x: number; y: number }> = {};
        layers.forEach((layer, li) => {
            const totalH = layer.length * NODE_H + (layer.length - 1) * V_GAP;
            layer.forEach((name, ni) => {
                posMap[name] = {
                    x: 40 + li * (NODE_W + H_GAP),
                    y: 40 + ni * (NODE_H + V_GAP),
                };
            });
        });

        layoutNodes = rawNodes.map((n: any) => ({
            id: n.id || n.name,
            type: n.type || "",
            name: n.name || "Node",
            x: posMap[n.name]?.x ?? 40,
            y: posMap[n.name]?.y ?? 40,
            style: getN8nNodeStyle(n.type || "", n.name),
            originalNode: n,
        }));
    }

    // Build edges
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

    const maxX = Math.max(...layoutNodes.map((n) => n.x + NODE_W)) + 60;
    const maxY = Math.max(...layoutNodes.map((n) => n.y + NODE_H)) + 60;

    return { nodes: layoutNodes, edges, width: maxX, height: maxY };
}

// ─── Bezier path helper ───────────────────────────────────────────────────────
function bezier(x1: number, y1: number, x2: number, y2: number): string {
    const cx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
}

// ─── Single Node SVG ──────────────────────────────────────────────────────────
function N8nNodeSvg({ node, compact }: { node: LayoutNode; compact?: boolean }) {
    const { x, y, style, name } = node;
    const label = name.length > 18 ? name.slice(0, 17) + "…" : name;
    const fontSize = compact ? 9 : 11;
    const iconFontSize = compact ? 12 : 14;

    return (
        <g>
            {/* Shadow */}
            <rect x={x + 2} y={y + 2} width={NODE_W} height={NODE_H} rx={8} fill="rgba(0,0,0,0.4)" />
            {/* Card background */}
            <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={8} fill={style.bg} stroke={style.border} strokeWidth={1.5} />
            {/* Header stripe */}
            <rect x={x} y={y} width={NODE_W} height={compact ? 18 : 22} rx={8} fill={style.headerBg} opacity={0.9} />
            <rect x={x} y={y + (compact ? 10 : 14)} width={NODE_W} height={8} fill={style.headerBg} opacity={0.9} />
            {/* Icon circle */}
            <circle cx={x + (compact ? 14 : 18)} cy={y + NODE_H / 2 + (compact ? 4 : 6)} r={compact ? 10 : 13} fill={style.iconBg} opacity={0.2} />
            <circle cx={x + (compact ? 14 : 18)} cy={y + NODE_H / 2 + (compact ? 4 : 6)} r={compact ? 8 : 11} fill={style.iconBg} opacity={0.35} />
            {/* Icon */}
            <text
                x={x + (compact ? 14 : 18)}
                y={y + NODE_H / 2 + (compact ? 8 : 11)}
                textAnchor="middle"
                fontSize={iconFontSize}
                fontFamily="system-ui, -apple-system, sans-serif"
                fill="white"
            >
                {style.icon}
            </text>
            {/* Node name */}
            <text
                x={x + (compact ? 30 : 36)}
                y={y + NODE_H / 2 + (compact ? 8 : 11)}
                fill="rgba(255,255,255,0.92)"
                fontSize={fontSize}
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="600"
            >
                {label}
            </text>
            {/* Input port */}
            <circle cx={x} cy={y + NODE_H / 2} r={4} fill="#1a1a2e" stroke={style.border} strokeWidth={1.5} />
            {/* Output port */}
            <circle cx={x + NODE_W} cy={y + NODE_H / 2} r={4} fill="#1a1a2e" stroke={style.border} strokeWidth={1.5} />
        </g>
    );
}

// ─── Main Canvas Component ────────────────────────────────────────────────────
interface N8nCanvasProps {
    workflowJson: any;
    compact?: boolean;
    className?: string;
    height?: number;
}

export default function N8nCanvas({ workflowJson, compact = false, className = "", height }: N8nCanvasProps) {
    const { nodes, edges, width, height: layoutHeight } = layoutWorkflow(workflowJson);
    const canvasHeight = height || (compact ? 180 : Math.max(layoutHeight, 300));
    const canvasWidth = compact ? undefined : Math.max(width, 600);

    if (!nodes.length) {
        return (
            <div className={`flex items-center justify-center bg-navy-950/60 rounded-xl ${className}`} style={{ height: canvasHeight }}>
                <p className="text-gray-600 text-xs">No workflow data</p>
            </div>
        );
    }

    // For compact mode, scale to fit
    const scaleX = compact ? 320 / Math.max(width, 320) : 1;
    const scaleY = compact ? 180 / Math.max(layoutHeight, 180) : 1;
    const scale = Math.min(scaleX, scaleY, 1);

    const svgWidth = compact ? 320 : (canvasWidth || width + 80);
    const svgHeight = compact ? 180 : canvasHeight;

    return (
        <div
            className={`relative overflow-hidden rounded-xl ${className}`}
            style={{
                background: "radial-gradient(ellipse at 50% 50%, #0d0d20 0%, #050510 100%)",
                height: canvasHeight,
            }}
        >
            {/* Grid background */}
            <svg
                width="100%"
                height="100%"
                className="absolute inset-0"
                style={{ opacity: 0.4 }}
            >
                <defs>
                    <pattern id={`grid-${compact ? "c" : "f"}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.08)" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${compact ? "c" : "f"})`} />
            </svg>

            {/* Workflow canvas */}
            <div className={compact ? "absolute inset-0 flex items-center justify-center" : "overflow-auto w-full h-full p-4"}>
                <svg
                    width={compact ? svgWidth * scale : svgWidth}
                    height={compact ? svgHeight * scale : svgHeight}
                    viewBox={`0 0 ${width + 80} ${layoutHeight + 80}`}
                    style={compact ? { transform: `scale(${scale})`, transformOrigin: "center center" } : {}}
                >
                    <defs>
                        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                            <polygon points="0 1, 6 4, 0 7" fill="rgba(150,150,200,0.6)" />
                        </marker>
                    </defs>

                    {/* Edges */}
                    {edges.map((edge, i) => (
                        <path
                            key={i}
                            d={bezier(edge.fromX, edge.fromY, edge.toX, edge.toY)}
                            fill="none"
                            stroke="rgba(150,150,200,0.35)"
                            strokeWidth={1.5}
                            strokeDasharray={compact ? undefined : undefined}
                            markerEnd="url(#arrowhead)"
                        />
                    ))}

                    {/* Nodes */}
                    {nodes.map((node) => (
                        <N8nNodeSvg key={node.id} node={node} compact={compact} />
                    ))}
                </svg>
            </div>
        </div>
    );
}

// ─── Node Icon Strip (for template cards) ────────────────────────────────────
export function N8nNodeIconStrip({ nodes }: { nodes: string[] }) {
    const MAX_SHOW = 6;
    const shown = nodes.slice(0, MAX_SHOW);
    const extra = nodes.length - MAX_SHOW;

    return (
        <div className="flex items-center gap-1.5 flex-wrap">
            {shown.map((name, i) => {
                const style = getN8nNodeStyle("", name);
                return (
                    <div
                        key={i}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold"
                        style={{
                            background: style.iconBg + "22",
                            border: `1px solid ${style.border}44`,
                            color: style.border,
                        }}
                        title={name}
                    >
                        <span style={{ fontSize: 11 }}>{style.icon}</span>
                        <span className="max-w-[70px] truncate">{name.length > 10 ? name.slice(0, 9) + "…" : name}</span>
                    </div>
                );
            })}
            {extra > 0 && (
                <div className="px-2 py-1 rounded-md text-[10px] font-semibold bg-white/5 text-gray-500 border border-white/10">
                    +{extra}
                </div>
            )}
        </div>
    );
}
