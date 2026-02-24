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
- We help B2B businesses automate workflows using n8n, AI (GPT-4, Claude), and custom SaaS tools
- Services: n8n Workflow Automation, AI Integration, SaaS Tools, Consulting & Strategy
- Stats: 150+ workflows built, 40+ happy clients, 98% uptime SLA, 10x average ROI
- Team: Alex Moreau (CEO), Priya Sharma (Engineering), James Okonkwo (AI Architect), Elena Vasquez (Client Success)
- Location: Remote-first, Global
- Contact: hello@bridgeflow.agency
- Website: https://www.bridgeflow.agency

Key selling points:
- Save 20+ hours/week with automation
- Most automations live within 1-2 weeks
- Enterprise-grade security (SOC 2 compliant)
- 98% client retention rate

Pricing approach: Custom quotes based on project scope. We offer free consultations to assess needs.

Guidelines:
- Be concise, friendly, and professional
- Answer questions about BridgeFlow's services, pricing, and team
- For specific project inquiries, encourage them to book a free consultation at /contact
- Keep responses under 150 words unless the user asks for detail
- Use markdown formatting sparingly (bold for emphasis, lists for features)
- If asked something unrelated to BridgeFlow or automation, politely redirect`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
        }

        const modalKey = process.env.MODAL_API_KEY;
        const ollamaKey = process.env.OLLAMA_API_KEY;
        const geminiKey = process.env.GEMINI_API_KEY;

        // Fetch primary AI model preference from DB
        let primaryModel = "modal-glm5";
        // Assuming getPublicClient() is defined elsewhere or imported
        // For this example, we'll assume it's available in scope.
        // If not, you'd need to add `import { getPublicClient } from '@/lib/supabase/client';` or similar.
        const sb = getPublicClient();
        if (sb) {
            const { data } = await sb.from("site_settings").select("primary_ai_model").limit(1).single();
            if (data && data.primary_ai_model) {
                primaryModel = data.primary_ai_model;
            }
        }

        // --- DYNAMIC AI PROVIDER CHAIN ---

        // 1. Try Primary Model
        if (primaryModel === "modal-glm5" && modalKey) {
            const reply = await callModalGLM5(modalKey, messages);
            if (reply) return reply;
        } else if (primaryModel === "ollama-cloud" && ollamaKey) {
            const reply = await callOllamaCloud(ollamaKey, messages);
            if (reply) return reply;
        } else if (primaryModel === "gemini" && geminiKey) {
            const reply = await callGeminiFallback(geminiKey, messages);
            if (reply) return reply;
        }

        // 2. If Primary Fails, fallback to Modal (if it wasn't primary)
        if (primaryModel !== "modal-glm5" && modalKey) {
            const reply = await callModalGLM5(modalKey, messages);
            if (reply) return reply;
        }

        // 3. Fallback to Ollama (if it wasn't primary)
        if (primaryModel !== "ollama-cloud" && ollamaKey) {
            const reply = await callOllamaCloud(ollamaKey, messages);
            if (reply) return reply;
        }

        // 4. Ultimate Emergency Fallback to Gemini
        if (primaryModel !== "gemini" && geminiKey) {
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

// ─── Modal GLM-5 (OpenAI-compatible endpoint) ───
async function callModalGLM5(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        console.log("Trying Modal GLM-5...");
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
        });

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
        });

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
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
            }
        );

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
