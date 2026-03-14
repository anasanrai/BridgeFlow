"use client";

import { useState } from "react";
import { Copy, Cloud, BookOpen, X, CheckCircle2 } from "lucide-react";

export default function TemplatePaymentModal({
    isOpen,
    onClose,
    templateId,
    templateValue
}: {
    isOpen: boolean;
    onClose: () => void;
    templateId: string;
    templateValue?: number;
}) {
    const [copied, setCopied] = useState(false);
    const [hasPaid, setHasPaid] = useState(false);

    if (!isOpen) return null;

    const dummyJson = {
        meta: { templateId: templateId },
        nodes: [{ parameters: {}, name: "Start", type: "n8n-nodes-base.start" }],
        connections: {}
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(dummyJson, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleMockPayment = () => {
        // Mock a brief 1-second loading state, then unlock
        setTimeout(() => setHasPaid(true), 800);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            <div
                className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                style={{ backgroundColor: "#1c1c28", border: "1px solid rgba(255,255,255,0.08)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <h2 className="text-xl font-display font-medium text-white">
                        {hasPaid ? "Use template" : "Complete Purchase"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {!hasPaid ? (
                        /* Mock Checkout State */
                        <div className="space-y-6">
                            <div className="bg-[#252533] rounded-xl p-6 border border-white/5 space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-white/5 text-gray-300">
                                    <span>Template License</span>
                                    <span className="font-semibold text-white">${(templateValue || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold text-white">
                                    <span>Total Due</span>
                                    <span className="text-brand-coral">${(templateValue || 0).toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleMockPayment}
                                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,80,0,0.4)] hover:scale-105"
                                style={{ background: "linear-gradient(135deg, #ff5000 0%, #ff7700 100%)" }}
                            >
                                Pay with Stripe (Mock)
                            </button>
                            <p className="text-xs text-center text-gray-500">
                                This is a simulation. No real charge will be made. Clicking will unlock the JSON.
                            </p>
                        </div>
                    ) : (
                        /* Unlocked State (Original Modal Content) */
                        <>
                            {/* Section 1 */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-300">Import to an n8n destination</h3>

                                <button
                                    onClick={handleCopy}
                                    className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/[0.02] transition-colors group text-left"
                                    style={{ backgroundColor: "#252533" }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-black/20 border border-white/5 group-hover:border-white/10">
                                            {copied ? (
                                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                            ) : (
                                                <Copy className="w-5 h-5 text-[#ff5000]" />
                                            )}
                                        </div>
                                        <span className="text-gray-200 font-medium">Copy template to clipboard (JSON)</span>
                                    </div>
                                </button>
                                <p className="text-xs text-gray-400">
                                    Automatically add your n8n instance(s) to this list by visiting the 'Templates' section within the instance.
                                </p>
                            </div>

                            <div className="h-px w-full bg-white/5" />

                            {/* Section 2 */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-300">Get started with n8n</h3>

                                <a
                                    href="https://n8n.cloud"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/[0.02] transition-colors group text-left"
                                    style={{ backgroundColor: "#252533" }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-black/20 border border-white/5 group-hover:border-white/10">
                                            <Cloud className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <span className="text-gray-200 font-medium">Get started free with n8n cloud</span>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#ff5000] to-[#ff7700]">
                                        Recommended
                                    </span>
                                </a>

                                <a
                                    href="https://docs.n8n.io/hosting/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/[0.02] transition-colors group text-left"
                                    style={{ backgroundColor: "#252533" }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-black/20 border border-white/5 group-hover:border-white/10">
                                            <BookOpen className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <span className="text-gray-200 font-medium">Open self-hosting installation docs</span>
                                    </div>
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
