import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getPublicClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

const SYSTEM_PROMPT = `You are BridgeFlow's internal AI content assistant for the admin dashboard. Help admins generate and improve website content.

You can help with:
- Writing blog post drafts
- Creating service descriptions
- Generating case study copy
- Improving existing content
- Writing SEO meta descriptions
- Creating email templates

Guidelines:
- Write in BridgeFlow's brand voice: professional, confident, technically sharp
- Use data-driven language (metrics, percentages, time savings)
- Focus on B2B automation, AI integration, and workflow optimization
- When generating blog posts, include clear headings and actionable takeaways
- Keep content concise unless asked for long-form
- Use markdown formatting for structured content`;

export async function POST(req: NextRequest) {
    try {
        const { messages, template } = await req.json();

        const modalKey = process.env.MODAL_API_KEY;
        const ollamaKey = process.env.OLLAMA_API_KEY;
        const geminiKey = process.env.GEMINI_API_KEY;

        // Build the final user message with optional template prefix
        const finalMessages = [...messages];
        if (template && finalMessages.length > 0) {
            const lastIdx = finalMessages.length - 1;
            finalMessages[lastIdx] = {
                ...finalMessages[lastIdx],
                content: `${template}\n\nUser request: ${finalMessages[lastIdx].content}`,
            };
        }

        let primaryAiModel: string | null = null;
        const supabase = getPublicClient();
        if (supabase) {
            const { data, error } = await supabase
                .from("site_settings")
                .select("primary_ai_model")
                .single();

            if (error) {
                console.error("Error fetching primary_ai_model:", error);
            } else if (data) {
                primaryAiModel = data.primary_ai_model;
            }
        }

        let result: NextResponse | null = null;
        let primaryModelUsed = false;

        // 0. Try the primary AI model if configured
        if (primaryAiModel === "modal" && modalKey && modalKey.trim() !== "") {
            result = await callModalGLM5(modalKey, finalMessages);
            if (result) primaryModelUsed = true;
        } else if (primaryAiModel === "ollama" && ollamaKey && ollamaKey.trim() !== "") {
            result = await callOllamaCloud(ollamaKey, finalMessages);
            if (result) primaryModelUsed = true;
        } else if (primaryAiModel === "gemini" && geminiKey && geminiKey.trim() !== "") {
            result = await callGeminiFallback(geminiKey, finalMessages);
            if (result) primaryModelUsed = true;
        }

        if (result) return result;

        // 1. Try Modal GLM-5 (primary — best for content generation)
        if (!primaryModelUsed || primaryAiModel !== "modal") {
            if (modalKey && modalKey.trim() !== "") {
                result = await callModalGLM5(modalKey, finalMessages);
                if (result) return result;
            }
        }

        // 2. Try Ollama Cloud (secondary fallback)
        if (ollamaKey && ollamaKey.trim() !== "") {
            const result = await callOllamaCloud(ollamaKey, finalMessages);
            if (result) return result;
        }

        // 3. Try Gemini (emergency fallback)
        if (geminiKey && geminiKey.trim() !== "") {
            const result = await callGeminiFallback(geminiKey, finalMessages);
            if (result) return result;
        }

        return NextResponse.json({
            reply: "⚠️ **AI Assistant is offline.** Please check your API configuration or try again in a moment."
        });
    } catch (error) {
        console.error("Admin AI error:", error);
        return NextResponse.json({
            reply: "⚠️ **AI Error:** There was a problem generating the content. Please try again."
        });
    }
}

// ─── Modal GLM-5 (OpenAI-compatible) ───
async function callModalGLM5(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        console.log("Trying Modal GLM-5 (Admin)...");
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
                max_tokens: 2000,
                temperature: 0.8,
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
            console.error("Modal GLM-5 (Admin) error:", response.status, errText);
        }
    } catch (error) {
        console.error("Modal GLM-5 (Admin) fetch error:", error);
    }
    return null;
}

// ─── Ollama Cloud ───
async function callOllamaCloud(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        console.log("Trying Ollama Cloud (Admin)...");
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
            console.error("Ollama Cloud (Admin) error:", response.status, errText);
        }
    } catch (error) {
        console.error("Ollama Cloud (Admin) fetch error:", error);
    }
    return null;
}

// ─── Gemini (emergency fallback) ───
async function callGeminiFallback(apiKey: string, messages: { role: string; content: string }[]) {
    try {
        console.log("Trying Gemini fallback (Admin)...");
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
                        maxOutputTokens: 2000,
                        temperature: 0.8,
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
            console.error("Gemini (Admin) API Error:", response.status, errText);
        }
    } catch (error) {
        console.error("Gemini (Admin) Fetch Error:", error);
    }
    return null;
}
