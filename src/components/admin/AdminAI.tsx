"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Loader2, Copy, Check, FileText, PenTool, BarChart3, Mail } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const TEMPLATES = [
    { icon: FileText, label: "Blog Post", prompt: "Write a blog post about" },
    { icon: PenTool, label: "Service Description", prompt: "Write a compelling service description for" },
    { icon: BarChart3, label: "Case Study", prompt: "Write a case study about a client who" },
    { icon: Mail, label: "Email Copy", prompt: "Write a professional email template for" },
];

export default function AdminAI({ onClose }: { onClose: () => void }) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "I'm your AI content assistant. I can help you write blog posts, service descriptions, case studies, and more. What would you like to create?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (text: string, template?: string) => {
        if (!text.trim() || loading) return;

        const userMessage: Message = { role: "user", content: text.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages.slice(1), userMessage],
                    template,
                }),
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.reply || "Sorry, something went wrong." }]);
        } catch {
            setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string, idx: number) => {
        navigator.clipboard.writeText(text);
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Panel */}
            <div className="w-[480px] max-w-full h-full bg-navy-950 border-l border-white/5 flex flex-col">
                {/* Header */}
                <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-display font-bold text-white">AI Content Assistant</h2>
                        <p className="text-[10px] text-gray-500">Powered by Gemini</p>
                    </div>
                    <button onClick={onClose} className="ml-auto p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Templates */}
                {messages.length <= 1 && (
                    <div className="p-4 border-b border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-3">Quick Templates</p>
                        <div className="grid grid-cols-2 gap-2">
                            {TEMPLATES.map((t, i) => (
                                <button key={i} onClick={() => setInput(t.prompt + " ")}
                                    className="flex items-center gap-2 px-3 py-2.5 text-left text-xs text-gray-400 bg-white/[0.02] border border-white/5 rounded-lg hover:border-purple-500/20 hover:text-purple-300 hover:bg-purple-500/[0.03] transition-all">
                                    <t.icon className="w-4 h-4 flex-shrink-0" />{t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                    {messages.map((msg, i) => (
                        <div key={i}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-medium uppercase tracking-wider ${msg.role === "user" ? "text-gray-500" : "text-purple-400"}`}>
                                    {msg.role === "user" ? "You" : "AI Assistant"}
                                </span>
                                {msg.role === "assistant" && i > 0 && (
                                    <button onClick={() => copyToClipboard(msg.content, i)} className="ml-auto p-1 text-gray-600 hover:text-white rounded transition-colors">
                                        {copied === i ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                    </button>
                                )}
                            </div>
                            <div className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "text-gray-300" : "text-gray-200 bg-white/[0.02] border border-white/5 rounded-lg p-3"}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div>
                            <span className="text-[10px] font-medium uppercase tracking-wider text-purple-400">AI Assistant</span>
                            <div className="mt-1 bg-white/[0.02] border border-white/5 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Loader2 className="w-4 h-4 animate-spin text-purple-400" /> Generating content...
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/5">
                    <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Describe what you want to create..."
                            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-purple-500/30"
                            disabled={loading}
                        />
                        <button type="submit" disabled={!input.trim() || loading}
                            className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center disabled:opacity-30 hover:opacity-90">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
