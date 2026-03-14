"use client";

import { useState, useEffect } from "react";
import { X, Check, Copy, Loader2, CreditCard, Building2, Shield, Search, CheckCircle, Globe, Wallet, ChevronRight, Zap, AlertCircle, Lock } from "lucide-react";
import Script from "next/script";
import PayPalButton from "./PayPalButton";

interface PaymentSettings {
    paypal_enabled: boolean;
    paypal_client_id: string;
    paypal_mode: string;
    paypal_currency: string;
    bank_enabled: boolean;
    bank_name: string;
    bank_account_name: string;
    bank_account_number: string;
    bank_routing_number: string;
    bank_swift_code: string;
    bank_iban: string;
    bank_instructions: string;
    wallets_enabled: boolean;
    wallet_payoneer_enabled: boolean;
    wallet_payoneer_email: string;
    wallet_wise_enabled: boolean;
    wallet_wise_email: string;
    wallet_usdt_enabled: boolean;
    wallet_usdt_address: string;
    wallet_esewa_enabled: boolean;
    wallet_esewa_id: string;
    wallet_khalti_enabled: boolean;
    wallet_khalti_id: string;
    currency: string;
    payment_terms: string;
    stripe_enabled: boolean;
    stripe_publishable_key: string;
    moyasar_enabled: boolean;
    moyasar_publishable_key: string;
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    planPrice: string;
    planPriceNumeric?: number;
    templateSlug?: string;
    templateId?: number | string;
}

type TabId = "stripe" | "moyasar" | "paypal" | "bank" | "wallet" | "card";
type WalletId = "payoneer" | "wise" | "usdt" | "esewa" | "khalti";

const WALLETS: { id: WalletId; label: string; color: string }[] = [
    { id: "payoneer", label: "Payoneer", color: "orange" },
    { id: "wise", label: "Wise", color: "green" },
    { id: "usdt", label: "USDT", color: "teal" },
    { id: "esewa", label: "eSewa", color: "emerald" },
    { id: "khalti", label: "Khalti", color: "purple" },
];

export default function PaymentModal({ isOpen, onClose, planName, planPrice,
    planPriceNumeric,
    templateSlug,
    templateId,
}: PaymentModalProps) {
    const [settings, setSettings] = useState<PaymentSettings | null>(null);
    const [activeTab, setActiveTab] = useState("card");
    const [moyasarEnabled, setMoyasarEnabled] = useState(false);
    const [moyasarInitData, setMoyasarInitData] = useState<any>(null);
    const [tab, setTab] = useState<TabId>("stripe");
    const [wallet, setWallet] = useState<WalletId>("payoneer");
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState<string | null>(null);

    // Card form (for generic or integration)
    const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "", email: "" });

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setSuccess(false);
            setError("");
            setCard({ name: "", number: "", expiry: "", cvv: "", email: "" });
            fetch("/api/admin/payments")
                .then(r => r.json())
                .then(d => {
                    setSettings(d);
                    setLoading(false);
                    // Select initial tab based on priority
                    if (d.stripe_enabled) setTab("stripe");
                    else if (d.moyasar_enabled) setTab("moyasar");
                    else if (d.paypal_enabled) setTab("paypal");
                    else setTab("card");
                })
                .catch(() => { setSettings(null); setLoading(false); });
        }
    }, [isOpen]);

    const copy = async (text: string, key: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const downloadTemplate = async () => {
        if (!templateSlug) return;
        try {
            const res = await fetch(`/api/templates/${templateSlug}/download`);
            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${templateSlug}-workflow.json`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (err) {
            console.error('Download failed:', err);
        }
    };

    const fmtCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    const fmtExp = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; };

    const handleStripePayment = async () => {
        setProcessing(true);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planName, planPrice: planPriceNumeric || planPrice,
                    customerEmail: card.email || "customer@example.com",
                    paymentMethod: "stripe",
                    currency: settings?.currency || "USD",
                    metadata: {
                        template_id: templateId,
                        template_slug: templateSlug,
                    }
                }),
            });
            const data = await res.json();
            if (data.success && data.url) {
                window.location.href = data.url;
            } else if (data.success) {
                setTimeout(() => { setSuccess(true); setProcessing(false); }, 1500);
            } else {
                setError(data.error || "Failed to initiate Stripe payment.");
                setProcessing(false);
            }
        } catch { setError("Network error."); setProcessing(false); }
    };

    // Moyasar payment handler
    const handleMoyasarPayment = async () => {
        setProcessing(true);
        setError("");
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planName,
                    planPrice: planPriceNumeric || planPrice,
                    customerEmail: card.email || "customer@example.com",
                    paymentMethod: "moyasar",
                    currency: settings?.currency || "SAR", // Moyasar often uses SAR
                    metadata: {
                        template_id: templateId,
                        template_slug: templateSlug,
                    }
                }),
            });
            const data = await res.json();

            if (data.success && data.publishableKey) {
                // For Moyasar, we'll use their Hosted Page redirection instead of manual mounting for reliability
                // But since they often use a form, let's look for a hosted URL or provide one.
                // Actually, if we want an embedded experience:

                // Let's assume Moyasar's current implementation is best as a redirect or their hosted form.
                // For production quality, we'll try to find a hosted URL or initialize their form if needed.
                // Moyasar's common way is initializing a form in a specific div.

                // I'll add logic to redirect them to a common Moyasar hosted checkout if possible.
                // However, our API doesn't have a hosted URL from Moyasar yet.

                // Let's stick to their Payment Form script and provide a mount point.
                // I'll update the UI to show the mount point.

                setMoyasarEnabled(true);
                setMoyasarInitData(data);
                setProcessing(false);
            } else {
                throw new Error(data.error || "Failed to initiate Moyasar payment.");
            }
        } catch (err: any) {
            setError(err.message || "Network error.");
            setProcessing(false);
        }
    };

    const submitOther = async (method: string) => {
        setProcessing(true);
        try {
            await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planName,
                    planPrice: planPriceNumeric || planPrice,
                    paymentMethod: method,
                    customerEmail: card.email || "manual@payment.com",
                    currency: settings?.currency || "USD"
                }),
            });
            setSuccess(true);
        } catch { setError("Error recording order. Please contact us."); }
        finally { setProcessing(false); }
    };

    if (!isOpen) return null;

    const currency = settings?.currency || "USD";
    const price = planPriceNumeric || 0;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div className="w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
                    <div>
                        <h2 className="text-base font-bold text-white">
                            {success ? "🎉 Order Confirmed!" : "Complete Your Purchase"}
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {planName} — <span className="text-brand-coral font-semibold">{planPrice}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 p-6">
                    {/* Loading */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-6 h-6 text-brand-coral animate-spin" />
                        </div>
                    )}

                    {/* Success */}
                    {!loading && success && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Thank You!</h3>
                            <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
                                {tab === "stripe" || tab === "moyasar" || tab === "card"
                                    ? "Your payment is being processed. You'll receive a confirmation email shortly."
                                    : tab === "bank"
                                        ? "Please complete the bank transfer. We'll activate your order within 24 hours of receiving payment."
                                        : "Please complete the wallet payment. We'll activate your order within 24 hours of confirmation."}
                            </p>
                            <div className="flex gap-3">
                                {templateSlug && (
                                    <button onClick={downloadTemplate} className="flex-1 px-6 py-3 bg-brand-coral text-neutral-950 font-bold text-neutral-950 font-bold rounded-xl text-sm">
                                        Download Template
                                    </button>
                                )}
                                <button onClick={onClose} className="flex-1 px-6 py-3 bg-brand-coral text-neutral-950 font-bold text-neutral-950 font-bold rounded-xl text-sm">
                                    Done
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Payment Form */}
                    {!loading && !success && (
                        <>
                            {/* Tabs */}
                            <div className="flex overflow-x-auto gap-1 mb-6 p-1 bg-white/5 rounded-xl no-scrollbar">
                                {settings?.stripe_enabled && (
                                    <button
                                        onClick={() => { setTab("stripe"); setError(""); }}
                                        className={`flex-shrink-0 flex flex-col items-center gap-1 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${tab === "stripe" ? "bg-gold-400/15 text-brand-coral border border-gold-400/25" : "text-gray-500 hover:text-gray-300"}`}
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        <span>Credit Card</span>
                                    </button>
                                )}

                                {settings?.moyasar_enabled && !settings?.stripe_enabled && (
                                    <button
                                        onClick={() => { setTab("moyasar"); setError(""); }}
                                        className={`flex-shrink-0 flex flex-col items-center gap-1 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${tab === "moyasar" ? "bg-gold-400/15 text-brand-coral border border-gold-400/25" : "text-gray-500 hover:text-gray-300"}`}
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        <span>Card (MENA)</span>
                                    </button>
                                )}

                                {settings?.paypal_enabled && (
                                    <button
                                        onClick={() => { setTab("paypal"); setError(""); }}
                                        className={`flex-shrink-0 flex flex-col items-center gap-1 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${tab === "paypal" ? "bg-gold-400/15 text-brand-coral border border-gold-400/25" : "text-gray-500 hover:text-gray-300"}`}
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" /></svg>
                                        <span>PayPal</span>
                                    </button>
                                )}

                                {settings?.bank_enabled && (
                                    <button
                                        onClick={() => { setTab("bank"); setError(""); }}
                                        className={`flex-shrink-0 flex flex-col items-center gap-1 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${tab === "bank" ? "bg-gold-400/15 text-brand-coral border border-gold-400/25" : "text-gray-500 hover:text-gray-300"}`}
                                    >
                                        <Building2 className="w-4 h-4" />
                                        <span>Bank Transfer</span>
                                    </button>
                                )}

                                {settings?.wallets_enabled && (
                                    <button
                                        onClick={() => { setTab("wallet"); setError(""); }}
                                        className={`flex-shrink-0 flex flex-col items-center gap-1 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${tab === "wallet" ? "bg-gold-400/15 text-brand-coral border border-gold-400/25" : "text-gray-500 hover:text-gray-300"}`}
                                    >
                                        <Wallet className="w-4 h-4" />
                                        <span>Digital Wallets</span>
                                    </button>
                                )}

                                {!settings?.stripe_enabled && !settings?.moyasar_enabled && !settings?.paypal_enabled && (
                                    <button
                                        onClick={() => { setTab("card"); setError(""); }}
                                        className={`flex-shrink-0 flex flex-col items-center gap-1 py-2.5 px-4 rounded-lg text-xs font-medium transition-all ${tab === "card" ? "bg-gold-400/15 text-brand-coral border border-gold-400/25" : "text-gray-500 hover:text-gray-300"}`}
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        <span>Manual Card</span>
                                    </button>
                                )}
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* ─── STRIPE TAB ─── */}
                            {tab === "stripe" && (
                                <div className="space-y-6">
                                    <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl text-center">
                                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <Zap className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <h3 className="text-white font-bold mb-1">Secure Card Payment</h3>
                                        <p className="text-sm text-gray-400 mb-6">Powered by Stripe. All major cards accepted.</p>

                                        <div className="mb-6">
                                            <label className="block text-xs font-medium text-left text-gray-400 mb-1.5 pl-1">Email Address</label>
                                            <input type="email" required value={card.email}
                                                onChange={e => setCard(p => ({ ...p, email: e.target.value }))}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/50 transition-colors"
                                                placeholder="you@company.com" />
                                        </div>

                                        <button
                                            onClick={handleStripePayment}
                                            disabled={processing}
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                                        >
                                            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                                            {processing ? "Launching Secure Portal..." : `Pay ${currency} ${price.toLocaleString()}`}
                                        </button>
                                    </div>
                                    <div className="flex justify-center gap-6 opacity-40">
                                        <div className="text-[10px] font-bold text-gray-500">VISA</div>
                                        <div className="text-[10px] font-bold text-gray-500">MASTERCARD</div>
                                        <div className="text-[10px] font-bold text-gray-500">AMEX</div>
                                        <div className="text-[10px] font-bold text-gray-500">APPLE PAY</div>
                                    </div>
                                </div>
                            )}

                            {/* ─── MOYASAR TAB ─── */}
                            {tab === "moyasar" && (
                                <div className="space-y-6">
                                    <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-center">
                                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <Shield className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <h3 className="text-white font-bold mb-1">Instant Card Payment</h3>
                                        <p className="text-sm text-gray-400 mb-6">Mada, Apple Pay, and Credit Cards accepted.</p>

                                        <div className="mb-6">
                                            <label className="block text-xs font-medium text-left text-gray-400 mb-1.5 pl-1">Email Address</label>
                                            <input type="email" required value={card.email}
                                                onChange={e => setCard(p => ({ ...p, email: e.target.value }))}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/50 transition-colors"
                                                placeholder="you@company.com" />
                                        </div>

                                        <button
                                            onClick={handleMoyasarPayment}
                                            disabled={processing}
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                                        >
                                            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                                            {processing ? "Connecting..." : `Pay ${currency} ${price.toLocaleString()}`}
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 opacity-60">
                                        <div className="h-8 bg-white/5 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase">Mada</div>
                                        <div className="h-8 bg-white/5 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase">Apple Pay</div>
                                        <div className="h-8 bg-white/5 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase">STC Pay</div>
                                    </div>
                                </div>
                            )}

                            {/* ─── PAYPAL TAB ─── */}
                            {tab === "paypal" && (
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-center">
                                        <p className="text-sm text-gray-400 mb-1">Pay securely via PayPal</p>
                                        <p className="text-2xl font-bold text-white mb-4">{currency} {price.toLocaleString()}</p>

                                        <div className="w-full">
                                            <PayPalButton
                                                itemId={templateId || planName.toLowerCase()}
                                                type={templateSlug ? "template" : "package"}
                                                templateSlug={templateSlug}
                                                amount={price}
                                                clientId={settings?.paypal_client_id}
                                                currency={settings?.paypal_currency || settings?.currency}
                                                onSuccess={() => {
                                                    setSuccess(true);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 text-center uppercase tracking-widest font-bold">Secure Global Payment</p>
                                </div>
                            )}

                            {/* ─── BANK TAB ─── */}
                            {tab === "bank" && (
                                <div className="space-y-4">
                                    {settings?.bank_enabled ? (
                                        <>
                                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">Bank Transfer Details</p>
                                                <div className="space-y-2.5">
                                                    {[
                                                        { label: "Bank Name", value: settings.bank_name, key: "bname" },
                                                        { label: "Account Name", value: settings.bank_account_name, key: "aname" },
                                                        { label: "Account Number", value: settings.bank_account_number, key: "anum" },
                                                        { label: "Routing Number", value: settings.bank_routing_number, key: "rnum" },
                                                        { label: "IBAN", value: settings.bank_iban, key: "iban" },
                                                        { label: "SWIFT/BIC", value: settings.bank_swift_code, key: "swift" },
                                                    ].filter(f => f.value).map(field => (
                                                        <div key={field.key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                                            <span className="text-xs text-gray-500">{field.label}</span>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-mono text-white">{field.value}</span>
                                                                <button onClick={() => copy(field.value!, field.key)} className="p-1 text-gray-500 hover:text-brand-coral transition-colors">
                                                                    {copied === field.key ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gold-400/5 border border-gold-400/20 rounded-xl text-xs text-brand-coral">
                                                <strong>Reference:</strong> Use &quot;{planName}&quot; as your payment reference. Email proof to <a href="mailto:hello@bridgeflow.agency" className="underline">hello@bridgeflow.agency</a>
                                            </div>
                                            <button onClick={() => submitOther("bank_transfer")} disabled={processing}
                                                className="w-full flex items-center justify-center gap-2 py-4 bg-brand-coral text-neutral-950 font-bold text-neutral-950 font-bold rounded-xl text-sm disabled:opacity-50">
                                                {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                                {processing ? "Recording..." : "I've Initiated the Transfer"}
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Building2 className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                                            <p className="text-sm text-gray-400 mb-4">Bank transfer not configured yet.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ─── WALLETS TAB ─── */}
                            {tab === "wallet" && (
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {WALLETS.map(w => (
                                            <button key={w.id} onClick={() => setWallet(w.id)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${wallet === w.id ? "border-gold-400/40 bg-gold-400/10 text-brand-coral" : "border-white/10 text-gray-500 hover:text-gray-300"}`}>
                                                {w.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl h-24 flex items-center justify-center">
                                        <p className="text-xs text-gray-500">
                                            {wallet === "payoneer" && (settings?.wallet_payoneer_enabled ? settings.wallet_payoneer_email : "Payoneer not configured")}
                                            {wallet === "wise" && (settings?.wallet_wise_enabled ? settings.wallet_wise_email : "Wise not configured")}
                                            {wallet === "usdt" && (settings?.wallet_usdt_enabled ? settings.wallet_usdt_address : "USDT not configured")}
                                            {wallet === "esewa" && (settings?.wallet_esewa_enabled ? settings.wallet_esewa_id : "eSewa not configured")}
                                            {wallet === "khalti" && (settings?.wallet_khalti_enabled ? settings.wallet_khalti_id : "Khalti not configured")}
                                        </p>
                                    </div>

                                    <button onClick={() => submitOther(`wallet_${wallet}`)} disabled={processing}
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-brand-coral text-neutral-950 font-bold text-neutral-950 font-bold rounded-xl text-sm disabled:opacity-50">
                                        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                        {processing ? "Recording..." : "I've Sent the Payment"}
                                    </button>
                                </div>
                            )}

                            {/* ─── MANUAL CARD (Backward Compatibility) ─── */}
                            {tab === "card" && (
                                <form onSubmit={(e) => { e.preventDefault(); submitOther("manual_card"); }} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
                                        <input type="email" required value={card.email}
                                            onChange={e => setCard(p => ({ ...p, email: e.target.value }))}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/50 transition-colors"
                                            placeholder="you@company.com" />
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center text-xs text-gray-400">
                                        Standard card input for offline processing.
                                    </div>
                                    <button type="submit" disabled={processing}
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-brand-coral text-neutral-950 font-bold text-neutral-950 font-bold rounded-xl text-sm disabled:opacity-50">
                                        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                                        Pay {currency} {price.toLocaleString()}
                                    </button>
                                </form>
                            )}

                            {/* Security footer */}
                            <div className="flex items-center justify-center gap-5 mt-6 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    <Shield className="w-3.5 h-3.5" /> SSL Encrypted
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                    <Lock className="w-3.5 h-3.5" /> Secure Checkout
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
