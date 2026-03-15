"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles, Zap } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: string;
    provider?: string;
}

const QUICK_REPLIES = [
    "What services do you offer?",
    "How much does automation cost?",
    "Can I book a free consultation?",
];

function formatTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Parse inline markdown (**bold**, *italic*, [link](url)) into safe React elements
function parseInline(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));

        if (match[1] !== undefined) {
            parts.push(<strong key={match.index}>{match[1]}</strong>);
        } else if (match[2] !== undefined) {
            parts.push(<em key={match.index}>{match[2]}</em>);
        } else {
            // Only allow http/https and relative links — block javascript: and data: URIs
            const href = /^(https?:\/\/|\/)/.test(match[4]) ? match[4] : "#";
            parts.push(
                <a
                    key={match.index}
                    href={href}
                    className="text-brand-coral underline hover:text-brand-coral/70"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                    {match[3]}
                </a>
            );
        }
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    return parts;
}

// Safe markdown renderer — no dangerouslySetInnerHTML
function renderContent(text: string) {
    return text.split("\n").map((line, i) => {
        const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
        const clean = isBullet ? line.trim().replace(/^[-•]\s*/, "") : line;
        const content = parseInline(clean);

        if (isBullet) {
            return (
                <p key={i} className={i > 0 ? "mt-1.5" : ""}>
                    <span className="flex gap-2">
                        <span className="text-brand-coral/60" aria-hidden="true">•</span>
                        <span>{content}</span>
                    </span>
                </p>
            );
        }
        return <p key={i} className={i > 0 ? "mt-1.5" : ""}>{content}</p>;
    });
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! 👋 I'm BridgeFlow's AI assistant. How can I help you learn about our automation services today?", timestamp: formatTime() },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
            setHasNewMessage(false);
        }
    }, [open]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || loading) return;

        const userMessage: Message = { role: "user", content: text.trim(), timestamp: formatTime() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setLoading(true);
        setMessageCount(prev => prev + 1);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages.slice(1).map(m => ({ role: m.role, content: m.content })) }),
            });

            const data = await res.json();
            const reply: Message = {
                role: "assistant",
                content: data.reply || "Sorry, something went wrong.",
                timestamp: formatTime(),
                provider: data.provider,
            };
            setMessages(prev => [...prev, reply]);
            if (!open) setHasNewMessage(true);
        } catch {
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again.", timestamp: formatTime() }]);
        } finally {
            setLoading(false);
        }
    }, [messages, loading, open]);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className={`fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full coral-gradient text-white shadow-lg shadow-brand-coral/20 hover:shadow-brand-coral/40 transition-all hover:scale-110 flex items-center justify-center ${!open ? 'animate-pulse-glow' : ''}`}
                aria-label={open ? "Close chat" : "Open chat with AI assistant"}
                aria-expanded={open}
                aria-controls="chat-panel"
            >
                {open ? <X className="w-6 h-6" aria-hidden="true" /> : <MessageCircle className="w-6 h-6" aria-hidden="true" />}
                {hasNewMessage && !open && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-coral rounded-full border-2 border-neutral-950 animate-pulse" />
                )}
            </button>

            {/* Chat Panel */}
            {open && (
                <div id="chat-panel" className="chat-entrance fixed bottom-24 right-6 z-[60] w-[400px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-120px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10" role="dialog" aria-label="Chat with BridgeFlow AI"
                    style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.98) 0%, rgba(20,20,20,0.98) 100%)", backdropFilter: "blur(20px)" }}>

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3" style={{ background: "linear-gradient(135deg, rgba(255,109,90,0.05) 0%, transparent 100%)" }}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-coral/20 to-brand-purple/10 border border-brand-coral/30 flex items-center justify-center animate-float">
                            <Sparkles className="w-5 h-5 text-brand-coral" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-display font-black uppercase tracking-tighter text-white flex items-center gap-2">
                                BridgeFlow AI
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-coral/10 text-brand-coral border border-brand-coral/20 font-bold flex items-center gap-1">
                                    <Zap className="w-2.5 h-2.5" /> PROTOCOL v2
                                </span>
                            </h3>
                            <p className="text-[10px] text-brand-teal flex items-center gap-1 font-bold uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal inline-block animate-pulse" /> Systems Active
                            </p>
                        </div>
                        <button onClick={() => setOpen(false)} className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex gap-2.5 animate-fade-in-up ${msg.role === "user" ? "flex-row-reverse" : ""}`} style={{ animationDelay: `${Math.min(i * 0.05, 0.3)}s` }}>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${msg.role === "user" ? "bg-white/10" : "bg-brand-coral/10 border border-brand-coral/20"}`}>
                                    {msg.role === "user" ? <User className="w-3.5 h-3.5 text-neutral-400" /> : <Bot className="w-3.5 h-3.5 text-brand-coral" />}
                                </div>
                                <div className="flex flex-col gap-1 max-w-[78%]">
                                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                        ? "bg-brand-coral/20 text-white border border-brand-coral/20 rounded-tr-sm"
                                        : "bg-white/5 text-neutral-200 border border-white/10 rounded-tl-sm shadow-xl"
                                        }`}>
                                        {renderContent(msg.content)}
                                    </div>
                                    <span className={`text-[9px] font-bold uppercase tracking-widest text-neutral-600 px-1 ${msg.role === "user" ? "text-right" : ""}`}>
                                        {msg.timestamp}
                                        {msg.provider && <span className="ml-1.5 text-brand-coral/40">via {msg.provider}</span>}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-2.5 animate-fade-in-up">
                                <div className="w-7 h-7 rounded-full bg-brand-coral/10 border border-brand-coral/20 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-3.5 h-3.5 text-brand-coral" />
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5 text-brand-coral">
                                            <span className="typing-dot bg-brand-coral" />
                                            <span className="typing-dot bg-brand-coral" />
                                            <span className="typing-dot bg-brand-coral" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 ml-1">Protocol processing...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Replies */}
                    {messages.length <= 2 && !loading && (
                        <div className="px-6 py-2 flex gap-2 flex-wrap border-t border-white/5 stagger-children">
                            {QUICK_REPLIES.map((q, i) => (
                                <button key={i} onClick={() => sendMessage(q)} className="text-[10px] px-3 py-1.5 rounded-full bg-brand-coral/5 border border-brand-coral/15 text-brand-coral/80 hover:bg-brand-coral/20 hover:text-white transition-all duration-300 hover:scale-105 font-bold uppercase tracking-widest">
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-4 border-t border-white/5">
                        <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Awaiting protocol request..."
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-600 text-sm focus:outline-none focus:border-brand-coral/30 transition-all duration-300 focus:bg-white/8 font-medium"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || loading}
                                className="w-12 h-12 rounded-xl coral-gradient text-white flex items-center justify-center disabled:opacity-30 hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg shadow-brand-coral/20"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </button>
                        </form>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-800 text-center mt-3">BridgeFlow Operational Intelligence • Port 443 active</p>
                    </div>
                </div>
            )}
        </>
    );
}
