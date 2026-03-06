"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import ReactFlow, {
    Controls,
    MiniMap,
    Background,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    Handle,
    Position,
    NodeProps,
    ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { slugToWorkflowId, convertN8nToReactFlow, getNodeTypeInfo, type RFNode, type RFEdge } from "@/lib/n8n";

// ── Custom n8n Node Component ────────────────────────────────────────────────
function N8nNodeComponent({ data }: NodeProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: "#1a1a2e",
                border: hovered ? "1px solid rgba(0,255,200,0.5)" : "1px solid rgba(0,255,200,0.2)",
                borderRadius: 8,
                padding: 12,
                width: 160,
                transition: "all 200ms ease",
                boxShadow: hovered
                    ? "0 0 20px rgba(0,255,200,0.15), 0 4px 12px rgba(0,0,0,0.4)"
                    : "0 2px 8px rgba(0,0,0,0.3)",
                position: "relative",
            }}
        >
            <Handle type="target" position={Position.Left} style={{ background: "#00ffc8", width: 8, height: 8 }} />
            <Handle type="source" position={Position.Right} style={{ background: "#00ffc8", width: 8, height: 8 }} />

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>{data.icon}</span>
                <div style={{ overflow: "hidden", flex: 1 }}>
                    <div
                        style={{
                            color: "rgba(255,255,255,0.92)",
                            fontSize: 11,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontFamily: "Inter, system-ui, sans-serif",
                        }}
                    >
                        {data.label}
                    </div>
                    <div
                        style={{
                            color: "rgba(255,255,255,0.4)",
                            fontSize: 9,
                            fontFamily: "Inter, system-ui, sans-serif",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {data.humanLabel}
                    </div>
                </div>
            </div>

            {/* Tooltip on hover */}
            {hovered && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#0d0d1a",
                        border: "1px solid rgba(0,255,200,0.2)",
                        borderRadius: 8,
                        padding: "8px 12px",
                        minWidth: 180,
                        zIndex: 50,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    }}
                >
                    <div style={{ fontSize: 10, color: "#00ffc8", fontWeight: 700, marginBottom: 2, fontFamily: "Inter, system-ui, sans-serif" }}>
                        {data.humanLabel}
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", fontWeight: 600, marginBottom: 4, fontFamily: "Inter, system-ui, sans-serif" }}>
                        {data.label}
                    </div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", lineHeight: 1.4, fontFamily: "Inter, system-ui, sans-serif" }}>
                        {data.description}
                    </div>
                </div>
            )}
        </div>
    );
}

const nodeTypes = { n8nNode: N8nNodeComponent };

// ── Error states ─────────────────────────────────────────────────────────────
type ErrorType = "auth" | "not_found" | "network" | null;

function getErrorMessage(errorType: ErrorType): string {
    switch (errorType) {
        case "auth": return "Preview unavailable";
        case "not_found": return "Workflow not found";
        case "network": return "Live preview temporarily offline";
        default: return "Live preview temporarily unavailable";
    }
}

// ── Loading skeleton ─────────────────────────────────────────────────────────
function CanvasSkeleton() {
    return (
        <div className="flex items-center justify-center w-full h-full" style={{ background: "#0a0a0f" }}>
            <div className="text-center">
                {/* Pulsing mock nodes */}
                <div className="flex items-center gap-6 mb-6">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div
                                className="rounded-lg animate-pulse"
                                style={{
                                    width: 80,
                                    height: 40,
                                    background: "rgba(0,255,200,0.06)",
                                    border: "1px solid rgba(0,255,200,0.1)",
                                    animationDelay: `${i * 0.15}s`,
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="w-6 h-6 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-600 text-xs font-semibold">Loading live workflow...</p>
            </div>
        </div>
    );
}

// ── Error fallback ───────────────────────────────────────────────────────────
function CanvasError({ errorType, slug }: { errorType: ErrorType; slug: string }) {
    const screenshotSrc = `/images/templates/${slug}.png`;
    const [hasImage, setHasImage] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full" style={{ background: "#0a0a0f" }}>
            {hasImage ? (
                <img
                    src={screenshotSrc}
                    alt="Workflow preview"
                    className="w-full h-full object-contain opacity-50"
                    onError={() => setHasImage(false)}
                />
            ) : (
                <div className="text-center p-8">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <p className="text-gray-500 text-sm font-semibold mb-1">{getErrorMessage(errorType)}</p>
                    <p className="text-gray-700 text-xs">The n8n workflow canvas will appear here when available.</p>
                </div>
            )}
        </div>
    );
}

// ── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ nodeCount, edgeCount }: { nodeCount: number; edgeCount: number }) {
    return (
        <div
            className="flex items-center justify-center gap-6 py-2.5 px-4 text-xs font-semibold"
            style={{
                background: "rgba(10,10,15,0.9)",
                borderBottom: "1px solid rgba(0,255,200,0.1)",
                borderRadius: "12px 12px 0 0",
                fontFamily: "Inter, system-ui, sans-serif",
            }}
        >
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
                <span style={{ color: "#00ffc8" }}>⚡</span> {nodeCount} Nodes
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
                <span style={{ color: "#00ffc8" }}>🔗</span> {edgeCount} Connections
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
            <span style={{ color: "#00ffc8" }}>
                🟢 Live Preview
            </span>
        </div>
    );
}

// ── Mobile Banner ────────────────────────────────────────────────────────────
function MobileBanner() {
    return (
        <div
            className="md:hidden flex items-center justify-center gap-2 py-2 text-[10px] font-semibold"
            style={{ background: "rgba(0,255,200,0.05)", color: "rgba(0,255,200,0.7)", borderBottom: "1px solid rgba(0,255,200,0.08)" }}
        >
            ← Scroll to explore • Best viewed on desktop →
        </div>
    );
}

// ── Main Canvas Component ────────────────────────────────────────────────────
interface WorkflowCanvasProps {
    slug: string;
    /** Fallback workflow JSON (from the template's inline data) */
    fallbackWorkflowJson?: Record<string, any> | null;
}

function WorkflowCanvasInner({ slug, fallbackWorkflowJson }: WorkflowCanvasProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [loading, setLoading] = useState(true);
    const [errorType, setErrorType] = useState<ErrorType>(null);
    const [statsNodeCount, setStatsNodeCount] = useState(0);
    const [statsEdgeCount, setStatsEdgeCount] = useState(0);

    const workflowId = slugToWorkflowId[slug];

    // Fallback using inline workflowJson
    const loadFromFallback = useCallback(() => {
        if (fallbackWorkflowJson && fallbackWorkflowJson.nodes) {
            const { nodes: rfNodes, edges: rfEdges } = convertN8nToReactFlow(fallbackWorkflowJson);
            setNodes(rfNodes as Node[]);
            setEdges(rfEdges as Edge[]);
            setStatsNodeCount(rfNodes.length);
            setStatsEdgeCount(rfEdges.length);
            setLoading(false);
            return true;
        }
        return false;
    }, [fallbackWorkflowJson, setNodes, setEdges]);

    useEffect(() => {
        async function fetchWorkflow() {
            if (!workflowId) {
                // No mapping — try fallback
                if (!loadFromFallback()) {
                    setErrorType("not_found");
                    setLoading(false);
                }
                return;
            }

            try {
                const res = await fetch(`/api/n8n/workflow/${workflowId}`);

                if (res.status === 401 || res.status === 403) {
                    console.error("[WorkflowCanvas] Auth error");
                    setErrorType("auth");
                    loadFromFallback();
                    setLoading(false);
                    return;
                }

                if (res.status === 404) {
                    setErrorType("not_found");
                    loadFromFallback();
                    setLoading(false);
                    return;
                }

                if (!res.ok) {
                    setErrorType("network");
                    loadFromFallback();
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                const { nodes: rfNodes, edges: rfEdges } = convertN8nToReactFlow(data);

                setNodes(rfNodes as Node[]);
                setEdges(rfEdges as Edge[]);
                setStatsNodeCount(rfNodes.length);
                setStatsEdgeCount(rfEdges.length);
                setLoading(false);
            } catch (err) {
                console.error("[WorkflowCanvas] Network error:", err);
                setErrorType("network");
                loadFromFallback();
                setLoading(false);
            }
        }

        fetchWorkflow();
    }, [workflowId, loadFromFallback, setNodes, setEdges]);

    // Show dimensions
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (loading) {
        return (
            <div style={{ height: isMobile ? 300 : 500 }}>
                <CanvasSkeleton />
            </div>
        );
    }

    if (errorType && nodes.length === 0) {
        return (
            <div style={{ height: isMobile ? 300 : 500 }}>
                <CanvasError errorType={errorType} slug={slug} />
            </div>
        );
    }

    return (
        <div>
            <StatsBar nodeCount={statsNodeCount} edgeCount={statsEdgeCount} />
            <MobileBanner />
            <div
                style={{
                    height: isMobile ? 300 : 500,
                    background: "#0a0a0f",
                }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    nodesDraggable={false}
                    nodesConnectable={false}
                    elementsSelectable={false}
                    zoomOnDoubleClick={false}
                    fitView
                    fitViewOptions={{ padding: 0.3 }}
                    proOptions={{ hideAttribution: true }}
                    style={{ background: "#0a0a0f" }}
                >
                    <Controls
                        showInteractive={false}
                        style={{
                            background: "rgba(26,26,46,0.9)",
                            border: "1px solid rgba(0,255,200,0.15)",
                            borderRadius: 8,
                        }}
                    />
                    {!isMobile && (
                        <MiniMap
                            style={{
                                background: "#0d0d1a",
                                border: "1px solid rgba(0,255,200,0.1)",
                                borderRadius: 8,
                            }}
                            maskColor="rgba(0,0,0,0.6)"
                            nodeColor={() => "rgba(0,255,200,0.3)"}
                            position="bottom-right"
                        />
                    )}
                    <Background color="rgba(0,255,200,0.04)" gap={24} size={1} />
                </ReactFlow>
            </div>
        </div>
    );
}

export default function WorkflowCanvas(props: WorkflowCanvasProps) {
    return (
        <ReactFlowProvider>
            <WorkflowCanvasInner {...props} />
        </ReactFlowProvider>
    );
}
