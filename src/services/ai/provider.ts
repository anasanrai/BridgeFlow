/**
 * Unified AI Provider Service
 * Abstracts away specific LLM provider logic.
 */

export type AIProvider = 'openrouter' | 'gemini' | 'anthropic' | 'replicate' | 'ollama' | 'modal';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  content: string;
  provider: AIProvider;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Main entry point for chatting with any AI provider
 */
export async function chatCompletion(
  messages: ChatMessage[],
  options: ChatOptions = {},
  preferredProvider?: AIProvider
): Promise<ChatResponse> {
  const provider = preferredProvider || (process.env.DEFAULT_AI_PROVIDER as AIProvider) || 'openrouter';
  
  switch (provider) {
    case 'openrouter':
      return callOpenRouter(messages, options);
    case 'gemini':
      return callGemini(messages, options);
    default:
      throw new Error(`AI Provider ${provider} not implemented`);
  }
}

async function callOpenRouter(messages: ChatMessage[], options: ChatOptions): Promise<ChatResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = options.model || process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001";

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
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    provider: 'openrouter',
    model,
    usage: data.usage ? {
      promptTokens: data.usage.prompt_tokens,
      completionTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens,
    } : undefined,
  };
}

async function callGemini(messages: ChatMessage[], options: ChatOptions): Promise<ChatResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = options.model || "gemini-2.0-flash";
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: messages.map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        })),
        generationConfig: {
          maxOutputTokens: options.maxTokens ?? 1000,
          temperature: options.temperature ?? 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  
  return {
    content: content || '',
    provider: 'gemini',
    model,
  };
}
