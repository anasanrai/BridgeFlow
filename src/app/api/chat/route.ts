import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";


const SYSTEM_PROMPT = `You are BridgeFlow's AI assistant. BridgeFlow is a B2B AI automation agency — humans building custom automation systems for businesses, powered by AI tools.

**About BridgeFlow:**
- Founded by Anasan Rai (Founder & AI Automation Engineer) — self-taught, from Kathmandu, Nepal
- We build custom n8n workflows, AI integrations, and automation systems for B2B businesses worldwide
- Tagline: "Automate Everything. Launch in Days."
- Contact: hello@bridgeflow.agency | Website: bridgeflow.agency
- HQ: Kathmandu, Nepal. Operating globally.

**IMPORTANT:** Anasan Rai is the sole founder. Do NOT invent team members. If asked about the team, say it's a founder-led agency.

**Services & Pricing:**
- **Starter — $497**: 1 custom n8n workflow, up to 5 integrations, delivered in 5 business days. Full upfront.
- **Growth — $997**: 3 workflows, up to 10 integrations, CRM + email automation, delivered in 2–3 weeks. 50/50 payment.
- **Pro — $1,797**: 5+ workflows, unlimited integrations, AI agent, 60-day monitoring, delivered in 3–4 weeks. 50/50 payment.
- **Retainer — $697/month**: Ongoing automation partner. Up to 2 new workflows/month, priority support, cancel anytime.
- **Free Automation Audit**: 30-min call with Anasan. Top 3 automation opportunities + ROI estimate. No credit card. Book at /audit.

**Template Marketplace (n8ngalaxy.com):**
7 pre-built n8n workflow templates ($150–$997) for technical buyers who want to self-deploy.

**Who we serve best:** Real estate agencies, marketing/lead gen agencies, e-commerce brands, small B2B SaaS, professional services.

**Key facts:**
- 7 production workflows live. 100% client satisfaction.
- Most clients go live in under 2 weeks.
- We use n8n (not Zapier) — clients own their automations, no per-task fees, self-hostable.
- Every delivery includes full documentation + video walkthrough.

**Tone:** Direct, confident, human. No fluff. Short sentences. Benefits over features. Numbers wherever possible.

**Guidelines:**
- Be concise. Keep responses under 150 words unless the user asks for detail.
- Use markdown sparingly (bold for emphasis, bullet lists for features).
- For project inquiries, direct to the free audit at /audit or contact at /contact.
- If asked about pricing, give the actual fixed prices above — do NOT say "custom quotes".
- If asked something unrelated to BridgeFlow or automation, politely redirect.
- Never fabricate case study numbers or client quotes.`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
        }

        // Rate limit: 60 requests per minute per IP
        const rateLimit = await checkRateLimit(req, "api-public");
        if (!rateLimit.success) {
            return NextResponse.json(
                { error: "Too many messages. Please wait a moment before trying again." },
                { status: 429 }
            );
        }

        const openrouterKey = process.env.OPENROUTER_API_KEY;
        const geminiKey = process.env.GEMINI_API_KEY;
        const modalKey = process.env.MODAL_API_KEY;
        const ollamaKey = process.env.OLLAMA_API_KEY;

        // --- DYNAMIC AI PROVIDER CHAIN ---

        // 1. OpenRouter (Primary — 300+ models via single API key)
        if (openrouterKey) {
            const reply = await callOpenRouter(openrouterKey, messages);
            if (reply) return reply;
        }

        // 2. Gemini (Secondary — direct Google API)
        if (geminiKey) {
            const reply = await callGeminiFallback(geminiKey, messages);
            if (reply) return reply;
        }

        // 3. Modal GLM-5 (Fallback)
        if (modalKey) {
            const reply = await callModalGLM5(modalKey, messages);
            if (reply) return reply;
        }

        // 4. Ollama Cloud (Emergency)
        if (ollamaKey) {
            const reply = await callOllamaCloud(ollamaKey, messages);
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

// ─── OpenRouter (Primary — 300+ models via single API) ───
async function callOpenRouter(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const model = process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001";

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://bridgeflow.agency",
                "X-Title": "BridgeFlow",
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
                return NextResponse.json({ reply, provider: "openrouter" });
            }
        } else {
            const errText = await response.text();
            console.error("OpenRouter API error:", response.status, errText);
        }
    } catch (error) {
        console.error("OpenRouter fetch error:", error);
    }
    return null;
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
