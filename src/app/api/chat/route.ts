import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getPublicClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

const SYSTEM_PROMPT = `You are BridgeFlow's AI assistant — a helpful, professional chatbot on the BridgeFlow website. BridgeFlow is an AI-powered automation agency.

About BridgeFlow:
- Founded and led by Anasan Rai (Founder & CEO) — the sole founder and operator of BridgeFlow
- We help businesses automate workflows using n8n, AI (GPT-4, Claude), GoHighLevel CRM, and custom SaaS tools
- Services: n8n Workflow Automation, GoHighLevel CRM Setup, AI Integration, SaaS Tools, Consulting & Strategy
- Stats: 50+ workflows built, 7+ beta clients served, 10+ hours saved per client weekly, 100% client satisfaction
- Location: Remote-first, Global
- Contact: hello@bridgeflow.agency
- Website: https://www.bridgeflow.agency

IMPORTANT: Anasan Rai is the ONLY founder and CEO. There is NO other team member. Do NOT mention any other names as team members. If asked about the team, say it's a solo-founder agency led by Anasan Rai with plans to grow.

Key selling points:
- Save 10+ hours/week with automation
- Most automations live within 1-2 weeks
- Currently onboarding founding clients at special rates (limited to 5 spots)
- Specializes in real estate, e-commerce, and agency automation

Pricing approach: Custom quotes based on project scope. We offer free automation audits at /audit and consultations at /contact.

Guidelines:
- Be concise, friendly, and professional
- Answer questions about BridgeFlow's services, pricing, and founder
- For specific project inquiries, encourage them to book a free audit at /audit or contact at /contact
- Keep responses under 150 words unless the user asks for detail
- Use markdown formatting sparingly (bold for emphasis, lists for features)
- If asked something unrelated to BridgeFlow or automation, politely redirect`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
        }

        const openaiKey = process.env.OPENAI_API_KEY;
        const modalKey = process.env.MODAL_API_KEY;
        const ollamaKey = process.env.OLLAMA_API_KEY;
        const geminiKey = process.env.GEMINI_API_KEY;

        // Fetch primary AI model preference from DB (non-blocking)
        let primaryModel = "openai";
        try {
            const sb = getPublicClient();
            if (sb) {
                const { data } = await sb.from("site_settings").select("primary_ai_model").limit(1).single();
                if (data?.primary_ai_model) primaryModel = data.primary_ai_model;
            }
        } catch { /* site_settings table may not exist, use default */ }

        // --- DYNAMIC AI PROVIDER CHAIN ---

        // 1. Try OpenAI-compatible API (primary — always available via env)
        if (openaiKey) {
            const reply = await callOpenAI(openaiKey, messages);
            if (reply) return reply;
        }

        // 2. Try Modal GLM-5
        if (primaryModel === "modal-glm5" && modalKey) {
            const reply = await callModalGLM5(modalKey, messages);
            if (reply) return reply;
        } else if (modalKey) {
            const reply = await callModalGLM5(modalKey, messages);
            if (reply) return reply;
        }

        // 3. Try Ollama Cloud
        if (ollamaKey) {
            const reply = await callOllamaCloud(ollamaKey, messages);
            if (reply) return reply;
        }

        // 4. Ultimate Emergency Fallback to Gemini
        if (geminiKey) {
            const reply = await callGeminiFallback(geminiKey, messages);
            if (reply) return reply;
        }

        return NextResponse.json({
            reply: "I'm sorry, but all my connection nodes are currently asleep. Please try again in a moment! 🌟",
            provider: "fallback-error"
        });

    } catch (error: any) {
        console.error("Chat error:", error);
        return NextResponse.json({
            reply: "I'm having a brief connection issue. Please try again or explore our [Services](/services)!"
        });
    }
}

// ─── OpenAI / OpenAI-compatible API (primary) ───
async function callOpenAI(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        console.log("Trying OpenAI API...");
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        // Support custom base URL for OpenAI-compatible providers
        const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
        const model = process.env.OPENAI_CHAT_MODEL || "gpt-4.1-mini";

        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model,
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
                return NextResponse.json({ reply, provider: "openai" });
            }
        } else {
            const errText = await response.text();
            console.error("OpenAI API error:", response.status, errText);
        }
    } catch (error) {
        console.error("OpenAI fetch error:", error);
    }
    return null;
}

// ─── Modal GLM-5 (OpenAI-compatible endpoint) ───
async function callModalGLM5(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        console.log("Trying Modal GLM-5...");
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
        } else {
            const errText = await response.text();
            console.error("Modal GLM-5 error:", response.status, errText);
        }
    } catch (error) {
        console.error("Modal GLM-5 fetch error:", error);
    }
    return null;
}

// ─── Ollama Cloud (Ollama API format) ───
async function callOllamaCloud(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        console.log("Trying Ollama Cloud...");
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
        } else {
            const errText = await response.text();
            console.error("Ollama Cloud error:", response.status, errText);
        }
    } catch (error) {
        console.error("Ollama Cloud fetch error:", error);
    }
    return null;
}

// ─── Gemini (emergency fallback) ───
async function callGeminiFallback(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        console.log("Trying Gemini fallback...");
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
        } else {
            const errText = await response.text();
            console.error("Gemini API Error:", response.status, errText);
        }
    } catch (error) {
        console.error("Gemini Fetch Error:", error);
    }
    return null;
}
