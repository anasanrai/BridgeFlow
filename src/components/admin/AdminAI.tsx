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
            <div className="w-[480px] max-w-full h-full bg-neutral-950 border-l border-white/5 flex flex-col relative overflow-hidden shadow-2xl">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-coral/5 blur-[100px] pointer-events-none" />

                {/* Header */}
                <div className="px-6 py-5 border-b border-white/5 flex items-center gap-4 bg-white/5 backdrop-blur-md relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-coral to-brand-purple border border-brand-coral/30 flex items-center justify-center shadow-lg shadow-brand-coral/20">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black uppercase tracking-tighter text-white">AI Command <span className="text-brand-coral">Assistant</span></h2>
                        <p className="text-[9px] font-bold text-brand-teal uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" /> Operational Engine v4.0
                        </p>
                    </div>
                    <button onClick={onClose} className="ml-auto p-2 text-neutral-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Templates */}
                {messages.length <= 1 && (
                    <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                        <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-black mb-4">Tactical Protocols</p>
                        <div className="grid grid-cols-2 gap-3">
                            {TEMPLATES.map((t, i) => (
                                <button key={i} onClick={() => setInput(t.prompt + " ")}
                                    className="flex items-center gap-3 px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-neutral-400 bg-neutral-900 border border-white/5 rounded-xl hover:border-brand-coral/30 hover:text-white hover:bg-brand-coral/5 transition-all group">
                                    <t.icon className="w-4 h-4 flex-shrink-0 text-neutral-600 group-hover:text-brand-coral transition-colors" />
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                    {messages.map((msg, i) => (
                        <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${msg.role === "user" ? "text-neutral-600" : "text-brand-coral"}`}>
                                    {msg.role === "user" ? "Operator" : "Command Console"}
                                </span>
                                {msg.role === "assistant" && i > 0 && (
                                    <button onClick={() => copyToClipboard(msg.content, i)} className="ml-auto p-1.5 text-neutral-700 hover:text-brand-teal rounded-lg transition-colors bg-white/5 border border-transparent hover:border-brand-teal/20">
                                        {copied === i ? <Check className="w-3.5 h-3.5 text-brand-teal" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                )}
                            </div>
                            <div className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "text-neutral-400 pl-2 border-l border-white/5" : "text-neutral-200 bg-white/5 border border-white/5 rounded-2xl p-4 shadow-xl shadow-black/20"}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="animate-pulse">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-coral">Processing...</span>
                            <div className="mt-2 bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                                <Loader2 className="w-4 h-4 animate-spin text-brand-coral" />
                                <span className="text-sm text-neutral-500 font-medium">Synthesizing protocol response...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-6 border-t border-white/5 bg-neutral-900/50">
                    <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex gap-3">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Awaiting command input..."
                            className="flex-1 px-5 py-4 bg-neutral-900 border border-white/10 rounded-xl text-white placeholder:text-neutral-700 text-sm focus:outline-none focus:border-brand-coral/30 transition-all font-medium"
                            disabled={loading}
                        />
                        <button type="submit" disabled={!input.trim() || loading}
                            className="w-14 h-14 rounded-xl coral-gradient text-white flex items-center justify-center disabled:opacity-30 hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-brand-coral/20">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </button>
                    </form>
                    <p className="text-[8px] font-bold text-neutral-800 uppercase tracking-[0.3em] text-center mt-4">Command Terminal • Port 443 Active • Secure Session</p>
                </div>
            </div>
        </div>
    );
}
