import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getPublicClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

const SYSTEM_PROMPT = `You are BridgeFlow's AI assistant — a helpful, professional chatbot on the BridgeFlow website. BridgeFlow is an AI-powered automation agency founded by Anasan Rai.

About BridgeFlow:
- Founded by Anasan Rai (CEO & Founder & AI Automation Engineer) based in Kathmandu, Nepal.
- IMPORTANT: Anasan Rai is the ONLY founder and CEO. Do not mention any other names like Alex Moreau, Priya Sharma, etc. If asked about them, state they are not affiliated with BridgeFlow.
- We help B2B businesses automate workflows using n8n, GoHighLevel, AI (GPT-4, Claude), and custom SaaS tools.
- Services: n8n Workflow Automation, GoHighLevel CRM & Funnels, AI Integration, SaaS Tools.
- Remote-first, global agency serving clients worldwide.
- Contact: hello@bridgeflow.agency
- Website: https://www.bridgeflow.agency

Key selling points:
- Save 10+ hours/week with automation.
- Most automations are live within 1-2 weeks of kickoff.
- Production-grade, documented, and measured by real business impact.
- Results-driven: every workflow measured by ROI, not vanity metrics.
- Free 30-minute automation audit available — no commitment required.

Pricing (Founding Member Rates — Limited Time):
- Free Automation Audit: Free — 30-min strategy call, top 3 automation opportunities, custom ROI estimate.
- Quick Win Automation: $497 (founding rate, normally $997) — 1 custom n8n workflow, 5 integrated tools, 14 days support.
- Starter Automation Package: $997 (founding rate, normally $2,499) — 5 custom n8n workflows, CRM integration, 30 days monitoring.
- GoHighLevel Pro Setup: $1,997 (founding rate, normally $3,999) — complete GHL setup, 3 funnels, full team training.

Guidelines:
- Be concise, friendly, and professional.
- Answer questions about BridgeFlow's services, pricing, and founder (Anasan Rai).
- For specific project inquiries, encourage them to book a free consultation at /contact or claim a free audit at /audit.
- Keep responses under 150 words unless the user asks for detail.
- Use markdown formatting sparingly (bold for emphasis, lists for features).
- If asked something unrelated to BridgeFlow or automation, politely redirect.
- Never make up statistics or claims not listed above.`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
        }

        // Sanitize messages — limit to last 10 to prevent token abuse
        const sanitizedMessages = messages.slice(-10).map((m: any) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: String(m.content).slice(0, 2000), // cap per message
        }));

        const modalKey = process.env.MODAL_API_KEY;
        const ollamaKey = process.env.OLLAMA_API_KEY;
        const geminiKey = process.env.GEMINI_API_KEY;

        // Fetch primary AI model preference from DB (non-blocking)
        let primaryModel = "modal-glm5";
        try {
            const sb = getPublicClient();
            if (sb) {
                const { data } = await sb.from("site_settings").select("primary_ai_model").limit(1).single();
                if (data?.primary_ai_model) primaryModel = data.primary_ai_model;
            }
        } catch { /* site_settings table may not exist, use default */ }

        // --- DYNAMIC AI PROVIDER CHAIN ---

        // 1. Try Primary Model
        if (primaryModel === "modal-glm5" && modalKey) {
            const reply = await callModalGLM5(modalKey, sanitizedMessages);
            if (reply) return reply;
        } else if (primaryModel === "ollama-cloud" && ollamaKey) {
            const reply = await callOllamaCloud(ollamaKey, sanitizedMessages);
            if (reply) return reply;
        } else if (primaryModel === "gemini" && geminiKey) {
            const reply = await callGeminiFallback(geminiKey, sanitizedMessages);
            if (reply) return reply;
        }

        // 2. If Primary Fails, fallback to Modal (if it wasn't primary)
        if (primaryModel !== "modal-glm5" && modalKey) {
            const reply = await callModalGLM5(modalKey, sanitizedMessages);
            if (reply) return reply;
        }

        // 3. Fallback to Ollama (if it wasn't primary)
        if (primaryModel !== "ollama-cloud" && ollamaKey) {
            const reply = await callOllamaCloud(ollamaKey, sanitizedMessages);
            if (reply) return reply;
        }

        // 4. Ultimate Emergency Fallback to Gemini
        if (primaryModel !== "gemini" && geminiKey) {
            const reply = await callGeminiFallback(geminiKey, sanitizedMessages);
            if (reply) return reply;
        }

        return NextResponse.json({
            reply: "I'm sorry, but I'm temporarily unavailable. Please reach out directly at hello@bridgeflow.agency or visit our [Contact](/contact) page.",
            provider: "fallback-error"
        });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Chat API error:", message);
        return NextResponse.json({
            reply: "I'm having a brief connection issue. Please try again or explore our [Services](/services)!"
        });
    }
}

// ─── Modal GLM-5 (OpenAI-compatible endpoint) ───
async function callModalGLM5(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const response = await fetch("https://api.us-west-2.modal.direct/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "zai-org/GLM-5-FP8",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages,
                ],
                max_tokens: 500,
                temperature: 0.7,
            }),
            signal: controller.signal,
        });
        clearTimeout(timeout);

        if (response.ok) {
            const data = await response.json();
            const reply = data?.choices?.[0]?.message?.content;
            if (reply) {
                return NextResponse.json({ reply, provider: "modal-glm5" });
            }
        }
    } catch {
        // Provider unavailable, fall through to next
    }
    return null;
}

// ─── Ollama Cloud (Ollama API format) ───
async function callOllamaCloud(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const response = await fetch("https://ollama.com/api/chat", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-oss:120b",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages,
                ],
                stream: false,
            }),
            signal: controller.signal,
        });
        clearTimeout(timeout);

        if (response.ok) {
            const data = await response.json();
            const reply = data?.message?.content;
            if (reply) {
                return NextResponse.json({ reply, provider: "ollama-cloud" });
            }
        }
    } catch {
        // Provider unavailable, fall through to next
    }
    return null;
}

// ─── Gemini (emergency fallback) ───
async function callGeminiFallback(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
                        ...messages.map(m => ({
                            role: m.role === "assistant" ? "model" : "user",
                            parts: [{ text: m.content }]
                        }))
                    ],
                    generationConfig: {
                        maxOutputTokens: 500,
                        temperature: 0.7,
                    },
                }),
                signal: controller.signal,
            }
        );
        clearTimeout(timeout);

        if (response.ok) {
            const data = await response.json();
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) {
                return NextResponse.json({ reply, provider: "gemini" });
            }
        }
    } catch {
        // Provider unavailable, fall through to next
    }
    return null;
}
