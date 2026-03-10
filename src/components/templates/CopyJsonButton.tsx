"use client";

import React from "react";
import { Zap } from "lucide-react";

interface CopyJsonButtonProps {
    json: any;
}

export default function CopyJsonButton({ json }: CopyJsonButtonProps) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(JSON.stringify(json, null, 2));
            alert("Workflow JSON copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy JSON:", err);
            alert("Failed to copy JSON to clipboard.");
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all font-bold text-sm"
        >
            <Zap className="w-4 h-4" />
            Copy JSON
        </button>
    );
}
