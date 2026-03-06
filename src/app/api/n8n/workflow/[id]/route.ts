import { NextRequest, NextResponse } from "next/server";

const N8N_BASE_URL = "https://n8n.n8ngalaxy.com/api/v1/workflows";

// Simple in-memory cache (5 min TTL)
const cache = new Map<string, { data: any; expires: number }>();
const CACHE_TTL = 5 * 60 * 1000;

export async function GET(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    const workflowId = params.id;

    if (!workflowId || workflowId.length < 4) {
        return NextResponse.json(
            { error: "Invalid workflow ID" },
            { status: 400 }
        );
    }

    const apiKey = process.env.N8N_API_KEY;
    if (!apiKey) {
        console.error("[n8n proxy] N8N_API_KEY not set");
        return NextResponse.json(
            { error: "Preview unavailable" },
            { status: 500 }
        );
    }

    // Check cache
    const cached = cache.get(workflowId);
    if (cached && Date.now() < cached.expires) {
        return NextResponse.json(cached.data, {
            headers: { "X-Cache": "HIT" },
        });
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(`${N8N_BASE_URL}/${workflowId}`, {
            headers: { "X-N8N-API-KEY": apiKey },
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (response.status === 401 || response.status === 403) {
            console.error("[n8n proxy] Authentication failed for workflow:", workflowId);
            return NextResponse.json(
                { error: "Preview unavailable" },
                { status: 401 }
            );
        }

        if (response.status === 404) {
            return NextResponse.json(
                { error: "Workflow not found" },
                { status: 404 }
            );
        }

        if (!response.ok) {
            console.error("[n8n proxy] API error:", response.status);
            return NextResponse.json(
                { error: "Live preview temporarily offline" },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Strip sensitive credential data
        const sanitized = {
            id: data.id,
            name: data.name,
            nodes: (data.nodes || []).map((n: any) => ({
                id: n.id,
                name: n.name,
                type: n.type,
                typeVersion: n.typeVersion,
                position: n.position,
                parameters: {}, // Don't leak config
            })),
            connections: data.connections || {},
        };

        // Cache the result
        cache.set(workflowId, { data: sanitized, expires: Date.now() + CACHE_TTL });

        return NextResponse.json(sanitized, {
            headers: { "X-Cache": "MISS" },
        });
    } catch (err: any) {
        if (err.name === "AbortError") {
            console.error("[n8n proxy] Request timeout for workflow:", workflowId);
            return NextResponse.json(
                { error: "Live preview temporarily offline" },
                { status: 504 }
            );
        }
        console.error("[n8n proxy] Network error:", err.message);
        return NextResponse.json(
            { error: "Live preview temporarily offline" },
            { status: 503 }
        );
    }
}
