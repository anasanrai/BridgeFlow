"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronRight } from "lucide-react";

interface JsonViewerProps {
    json: Record<string, unknown>;
}

export default function JsonViewer({ json }: JsonViewerProps) {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const jsonString = JSON.stringify(json, null, 2);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-3">
            {/* Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-300 transition-all"
                >
                    {expanded ? (
                        <ChevronDown className="w-4 h-4" />
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                    {expanded ? "Hide" : "Show"} JSON
                </button>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/20 text-sm text-brand-coral transition-all"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copy JSON
                        </>
                    )}
                </button>
            </div>

            {/* JSON Display */}
            {expanded && (
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-neutral-950/50">
                    <pre className="p-6 text-xs font-mono text-gray-300 overflow-x-auto max-h-96 overflow-y-auto">
                        <code>{jsonString}</code>
                    </pre>
                    {/* Syntax highlighting overlay hint */}
                    <div className="absolute top-2 right-2 text-[10px] text-gray-600 uppercase tracking-widest font-semibold">
                        JSON
                    </div>
                </div>
            )}

            {/* Info box */}
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <p className="text-xs text-blue-300 leading-relaxed">
                    <strong>How to use:</strong> Copy this JSON and import it into your n8n instance by going to{" "}
                    <code className="bg-white/10 px-1.5 py-0.5 rounded text-[11px]">File → Import from URL/JSON</code>.
                </p>
            </div>
        </div>
    );
}
