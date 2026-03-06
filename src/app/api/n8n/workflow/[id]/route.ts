import { NextRequest, NextResponse } from "next/server";

// N8N_BASE_URL is read from Vercel environment variables.
// Set N8N_BASE_URL in your Vercel project settings (e.g. https://your-n8n.cloud/api/v1/workflows).
// Falls back to the default n8n cloud instance if the env var is not configured.
const N8N_BASE_URL =
    process.env.N8N_BASE_URL || "https://n8n.n8ngalaxy.com/api/v1/workflows";

// Simple in-memory cache (5 min TTL)
const cache = new Map<string, { data: unknown; expires: number }>();
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
        console.error("[n8n proxy] N8N_API_KEY not set in environment variables");
        return NextResponse.json(
            { error: "Preview unavailable" },
            { status: 500 }
        );
    }

    console.log("[n8n proxy] Fetching workflow:", workflowId);
    console.log("[n8n proxy] From URL:", `${N8N_BASE_URL}/${workflowId}`);

    // Return cached result if still fresh
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

        // Strip sensitive credential data before returning to client
        const sanitized = {
            id: data.id,
            name: data.name,
            nodes: (data.nodes || []).map((n: {
                id: string;
                name: string;
                type: string;
                typeVersion: number;
                position: [number, number];
            }) => ({
                id: n.id,
                name: n.name,
                type: n.type,
                typeVersion: n.typeVersion,
                position: n.position,
                parameters: {}, // Never expose node credentials/config
            })),
            connections: data.connections || {},
        };

        // Cache the sanitized result
        cache.set(workflowId, { data: sanitized, expires: Date.now() + CACHE_TTL });

        return NextResponse.json(sanitized, {
            headers: { "X-Cache": "MISS" },
        });
    } catch (err: unknown) {
        const error = err as { name?: string; message?: string };
        if (error.name === "AbortError") {
            console.error("[n8n proxy] Request timeout for workflow:", workflowId);
            return NextResponse.json(
                { error: "Live preview temporarily offline" },
                { status: 504 }
            );
        }
        console.error("[n8n proxy] Network error:", error.message);
        return NextResponse.json(
            { error: "Live preview temporarily offline" },
            { status: 503 }
        );
    }
}
