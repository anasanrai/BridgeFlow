/**
 * n8n API helpers — slug-to-workflow mapping, node type info, and
 * React Flow conversion utilities.
 */

// ── Slug → n8n Workflow ID ─────────────────────────────────────────────────
export const slugToWorkflowId: Record<string, string> = {
    // Primary templates from spec
    "real-estate-lead-capture": "wKBnBodZY46OaPoA",
    "follow-up-email-sequence": "BWepF6rYUerOW3fh",
    "lead-routing-system": "dav9j1aEDKynzp0O",
    "missed-call-text-back": "2t0HPTKtNWo1y2OP",
    "ai-personalized-email": "J5BbDcr2qrz0poja",
    "ai-lead-scoring": "Uca80DipBMoWBifX",
    "complete-lead-machine": "bwr0OQ2lH5Ylq4hP",

    // Future workflows
    "daily-missed-call-summary": "zGvI3ncTKmldM17m",
    "real-estate-lead-pipeline": "al92b8LXKroaPJ74",
};

// ── Node type → icon + human-readable label ────────────────────────────────
interface NodeTypeInfo {
    icon: string;
    label: string;
    description: string;
}

export const nodeTypeMap: Record<string, NodeTypeInfo> = {
    "n8n-nodes-base.webhook": { icon: "⚡", label: "Webhook", description: "Receives incoming HTTP requests" },
    "n8n-nodes-base.gmail": { icon: "📧", label: "Gmail", description: "Sends and manages emails via Gmail" },
    "n8n-nodes-base.telegram": { icon: "💬", label: "Telegram", description: "Sends messages via Telegram bot" },
    "n8n-nodes-base.googleSheets": { icon: "📊", label: "Google Sheets", description: "Reads/writes spreadsheet data" },
    "n8n-nodes-base.openAi": { icon: "🤖", label: "OpenAI", description: "AI text generation and analysis" },
    "n8n-nodes-base.code": { icon: "</>", label: "Code", description: "Runs custom JavaScript code" },
    "n8n-nodes-base.if": { icon: "🔀", label: "IF Condition", description: "Routes data based on conditions" },
    "n8n-nodes-base.switch": { icon: "🔄", label: "Switch", description: "Routes data to multiple outputs" },
    "n8n-nodes-base.wait": { icon: "⏱", label: "Wait", description: "Pauses execution for a set time" },
    "n8n-nodes-base.scheduleTrigger": { icon: "📅", label: "Schedule", description: "Triggers workflow on a schedule" },
    "n8n-nodes-base.set": { icon: "✏️", label: "Edit Fields", description: "Sets or transforms data fields" },
    "@n8n/n8n-nodes-langchain.lmChatOpenAi": { icon: "🤖", label: "OpenAI Chat", description: "AI chat model for conversations" },
    "@n8n/n8n-nodes-langchain.chainLlm": { icon: "🔗", label: "LLM Chain", description: "Chains AI model with prompts" },
    "@n8n/n8n-nodes-langchain.lmChatOpenRouter": { icon: "🤖", label: "OpenRouter", description: "AI model via OpenRouter" },
    "n8n-nodes-base.httpRequest": { icon: "🌐", label: "HTTP Request", description: "Makes HTTP API calls" },
    "n8n-nodes-base.merge": { icon: "🔀", label: "Merge", description: "Merges data from multiple sources" },
    "n8n-nodes-base.noOp": { icon: "⏹", label: "No Operation", description: "Passes data through unchanged" },
};

export function getNodeTypeInfo(type: string): NodeTypeInfo {
    return nodeTypeMap[type] || { icon: "⚙️", label: type.split(".").pop() || "Node", description: "Workflow automation node" };
}

// ── n8n API response → React Flow nodes & edges ───────────────────────────
export interface RFNode {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: {
        label: string;
        icon: string;
        nodeType: string;
        humanLabel: string;
        description: string;
    };
}

export interface RFEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    type: string;
    animated: boolean;
    style: Record<string, string | number>;
    label?: string;
    labelStyle?: Record<string, string | number>;
    labelBgStyle?: Record<string, string | number>;
    labelBgPadding?: [number, number];
    labelBgBorderRadius?: number;
}

export function convertN8nToReactFlow(
    workflowData: any
): { nodes: RFNode[]; edges: RFEdge[] } {
    const rawNodes: any[] = workflowData?.nodes || [];
    const connections: Record<string, any> = workflowData?.connections || {};

    // Convert nodes
    const nodes: RFNode[] = rawNodes.map((n: any) => {
        const pos = n.position || [0, 0];
        const info = getNodeTypeInfo(n.type || "");
        const label = (n.name || info.label || "Node").slice(0, 20);

        return {
            id: n.id || n.name,
            type: "n8nNode",
            position: { x: pos[0], y: pos[1] },
            data: {
                label,
                icon: info.icon,
                nodeType: n.type || "",
                humanLabel: info.label,
                description: info.description,
            },
        };
    });

    // Build name→id lookup
    const nameToId: Record<string, string> = {};
    rawNodes.forEach((n: any) => {
        nameToId[n.name] = n.id || n.name;
    });

    // Convert connections → edges
    const edges: RFEdge[] = [];
    const edgeStyle = { stroke: "#00ffc8", strokeWidth: 2.5, opacity: 0.9 };

    Object.entries(connections).forEach(([fromName, outputs]: [string, any]) => {
        const sourceId = nameToId[fromName];
        if (!sourceId) return;

        // Main connections
        const mainOutputs: any[][] = outputs?.main || [];
        mainOutputs.forEach((branch: any[], branchIdx: number) => {
            branch?.forEach((conn: any, connIdx: number) => {
                const targetId = nameToId[conn?.node];
                if (!targetId) return;

                const edgeId = `edge-${sourceId}-${targetId}-${branchIdx}-${connIdx}`;
                const edgeObj: RFEdge = {
                    id: edgeId,
                    source: sourceId,
                    target: targetId,
                    type: "smoothstep",
                    animated: true,
                    style: edgeStyle,
                };

                // Label for IF/Switch/Branching nodes
                if (mainOutputs.length > 1) {
                    if (mainOutputs.length === 2) {
                        edgeObj.label = branchIdx === 0 ? "True" : "False";
                    } else {
                        edgeObj.label = `Output ${branchIdx}`;
                    }

                    edgeObj.labelStyle = {
                        fill: branchIdx === 0 ? "#00ffc8" : "#94a3b8",
                        fontWeight: 700,
                        fontSize: 10,
                        fontFamily: "Inter, system-ui, sans-serif",
                    };
                    edgeObj.labelBgStyle = {
                        fill: branchIdx === 0 ? "rgba(0,255,200,0.1)" : "rgba(30,41,59,0.6)",
                        stroke: branchIdx === 0 ? "rgba(0,255,200,0.3)" : "rgba(148,163,184,0.3)",
                        strokeWidth: 1,
                    };
                    edgeObj.labelBgPadding = [8, 4];
                    edgeObj.labelBgBorderRadius = 6;
                }

                edges.push(edgeObj);
            });
        });

        // Sub connections (ai_languageModel, ai_tool, ai_memory, etc.)
        const subTypes = ["ai_languageModel", "ai_tool", "ai_memory", "ai_outputParser"];
        subTypes.forEach((st) => {
            const subOutputs: any[][] = outputs?.[st] || [];
            subOutputs.forEach((branch: any[], branchIdx: number) => {
                branch?.forEach((conn: any, connIdx: number) => {
                    const targetId = nameToId[conn?.node];
                    if (!targetId) return;

                    edges.push({
                        id: `edge-${st}-${sourceId}-${targetId}-${branchIdx}-${connIdx}`,
                        source: sourceId,
                        target: targetId,
                        type: "smoothstep",
                        animated: true,
                        style: { ...edgeStyle, strokeDasharray: "5,4", stroke: "rgba(148,100,220,0.6)" },
                    });
                });
            });
        });
    });

    return { nodes, edges };
}
