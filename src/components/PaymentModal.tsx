"use client";

import { useState, useEffect } from "react";
import {
    X, CreditCard, Building2, Wallet, CheckCircle,
    Loader2, Copy, Check, Shield, Lock, AlertCircle, ChevronRight,
} from "lucide-react";

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
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    planPrice: string;
    planPriceNumeric?: number;
    templateSlug?: string;
}

type TabId = "card" | "paypal" | "bank" | "wallet";
type WalletId = "payoneer" | "wise" | "usdt" | "esewa" | "khalti";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "card", label: "Card", icon: <CreditCard className="w-4 h-4" /> },
    {
        id: "paypal", label: "PayPal", icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
            </svg>
        )
    },
    { id: "bank", label: "Bank", icon: <Building2 className="w-4 h-4" /> },
    { id: "wallet", label: "Wallets", icon: <Wallet className="w-4 h-4" /> },
];

const WALLETS: { id: WalletId; label: string; color: string }[] = [
    { id: "payoneer", label: "Payoneer", color: "orange" },
    { id: "wise", label: "Wise", color: "green" },
    { id: "usdt", label: "USDT", color: "teal" },
    { id: "esewa", label: "eSewa", color: "emerald" },
    { id: "khalti", label: "Khalti", color: "purple" },
];

export default function PaymentModal({ isOpen, onClose, planName, planPrice, planPriceNumeric, templateSlug }: PaymentModalProps) {
    const [settings, setSettings] = useState<PaymentSettings | null>(null);
    const [tab, setTab] = useState<TabId>("card");
    const [wallet, setWallet] = useState<WalletId>("payoneer");
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState<string | null>(null);

    // Card form
    const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "", email: "" });

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setSuccess(false);
            setError("");
            setTab("card");
            setCard({ name: "", number: "", expiry: "", cvv: "", email: "" });
            fetch("/api/admin/payments")
                .then(r => r.json())
                .then(d => { setSettings(d); setLoading(false); })
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

    const submitCard = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setError("");
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planName, planPrice: planPriceNumeric || planPrice,
                    customerName: card.name, customerEmail: card.email,
                    paymentMethod: "card",
                    currency: settings?.currency || "USD",
                }),
            });
            const data = await res.json();
            if (data.success) setSuccess(true);
            else setError(data.error || "Payment failed. Please try again.");
        } catch { setError("Network error. Please try again."); }
        finally { setProcessing(false); }
    };

    const submitOther = async (method: string) => {
        setProcessing(true);
        try {
            await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planName, planPrice: planPriceNumeric || planPrice, paymentMethod: method, currency: settings?.currency || "USD" }),
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
                            {planName} — <span className="text-gold-400 font-semibold">{planPrice}</span>
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
                            <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
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
                                {tab === "card"
                                    ? "Your payment is being processed. You'll receive a confirmation email shortly."
                                    : tab === "bank"
                                        ? "Please complete the bank transfer. We'll activate your order within 24 hours of receiving payment."
                                        : "Please complete the wallet payment. We'll activate your order within 24 hours of confirmation."}
                            </p>
                            <div className="flex gap-3">
                                {templateSlug && (
                                    <button onClick={downloadTemplate} className="flex-1 px-6 py-3 gold-gradient text-navy-950 font-bold rounded-xl text-sm">
                                        Download Template
                                    </button>
                                )}
                                <button onClick={onClose} className="flex-1 px-6 py-3 gold-gradient text-navy-950 font-bold rounded-xl text-sm">
                                    Done
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Payment Form */}
                    {!loading && !success && (
                        <>
                            {/* Tabs */}
                            <div className="grid grid-cols-4 gap-1 mb-6 p-1 bg-white/5 rounded-xl">
                                {TABS.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => { setTab(t.id); setError(""); }}
                                        className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg text-xs font-medium transition-all ${tab === t.id ? "bg-gold-400/15 text-gold-400 border border-gold-400/25" : "text-gray-500 hover:text-gray-300"}`}
                                    >
                                        {t.icon}
                                        <span>{t.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* ─── CARD TAB ─── */}
                            {tab === "card" && (
                                <form onSubmit={submitCard} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
                                        <input type="email" required value={card.email}
                                            onChange={e => setCard(p => ({ ...p, email: e.target.value }))}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/50 transition-colors"
                                            placeholder="you@company.com" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Cardholder Name</label>
                                        <input type="text" required value={card.name}
                                            onChange={e => setCard(p => ({ ...p, name: e.target.value }))}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/50 transition-colors"
                                            placeholder="John Smith" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Card Number</label>
                                        <div className="relative">
                                            <input type="text" required value={card.number}
                                                onChange={e => setCard(p => ({ ...p, number: fmtCard(e.target.value) }))}
                                                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/50 transition-colors font-mono tracking-wider"
                                                placeholder="1234 5678 9012 3456" maxLength={19} />
                                            <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1.5">Expiry</label>
                                            <input type="text" required value={card.expiry}
                                                onChange={e => setCard(p => ({ ...p, expiry: fmtExp(e.target.value) }))}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/50 transition-colors font-mono"
                                                placeholder="MM/YY" maxLength={5} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1.5">CVV / CVC</label>
                                            <input type="text" required value={card.cvv}
                                                onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/50 transition-colors font-mono"
                                                placeholder="123" maxLength={4} />
                                        </div>
                                    </div>
                                    {/* Card brands */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-600">Accepted:</span>
                                        {["VISA", "MC", "AMEX", "DISC"].map(c => (
                                            <span key={c} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-gray-400">{c}</span>
                                        ))}
                                    </div>
                                    <button type="submit" disabled={processing}
                                        className="w-full flex items-center justify-center gap-2 py-4 gold-gradient text-navy-950 font-bold rounded-xl text-sm disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-gold-400/20">
                                        {processing
                                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                                            : <><Lock className="w-4 h-4" /> Pay {currency} {price.toLocaleString()} Securely</>}
                                    </button>
                                </form>
                            )}

                            {/* ─── PAYPAL TAB ─── */}
                            {tab === "paypal" && (
                                <div className="space-y-4">
                                    {settings?.paypal_enabled && settings.paypal_client_id ? (
                                        <>
                                            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-center">
                                                <p className="text-sm text-gray-400 mb-1">You will be redirected to PayPal to complete your payment of</p>
                                                <p className="text-2xl font-bold text-white">{currency} {price.toLocaleString()}</p>
                                            </div>
                                            <button
                                                onClick={() => submitOther("paypal")}
                                                disabled={processing}
                                                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-50"
                                                style={{ background: "#0070BA" }}
                                            >
                                                {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                                                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
                                                    </svg>
                                                )}
                                                {processing ? "Processing..." : "Pay with PayPal"}
                                            </button>
                                            <p className="text-xs text-gray-600 text-center">You&apos;ll be redirected to PayPal&apos;s secure checkout.</p>
                                        </>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                                                <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-1">PayPal not configured yet</p>
                                            <p className="text-xs text-gray-600 mb-4">Configure it in Admin → Payment Gateway</p>
                                            <a href="/contact" className="inline-flex items-center gap-1.5 px-4 py-2 gold-gradient text-navy-950 font-semibold rounded-lg text-sm">
                                                Contact Us <ChevronRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
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
                                                                <button onClick={() => copy(field.value!, field.key)} className="p-1 text-gray-500 hover:text-gold-400 transition-colors">
                                                                    {copied === field.key ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {settings.bank_instructions && (
                                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400">
                                                    {settings.bank_instructions}
                                                </div>
                                            )}
                                            <div className="p-3 bg-gold-400/5 border border-gold-400/20 rounded-xl text-xs text-gold-400">
                                                <strong>Reference:</strong> Use &quot;{planName}&quot; as your payment reference. Email proof to <a href="mailto:hello@bridgeflow.agency" className="underline">hello@bridgeflow.agency</a>
                                            </div>
                                            <button onClick={() => submitOther("bank_transfer")} disabled={processing}
                                                className="w-full flex items-center justify-center gap-2 py-4 gold-gradient text-navy-950 font-bold rounded-xl text-sm disabled:opacity-50">
                                                {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                                {processing ? "Recording..." : "I've Initiated the Transfer"}
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Building2 className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                                            <p className="text-sm text-gray-400 mb-4">Bank transfer not configured yet.</p>
                                            <a href="/contact" className="inline-flex items-center gap-1.5 px-4 py-2 gold-gradient text-navy-950 font-semibold rounded-lg text-sm">
                                                Contact Us <ChevronRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ─── WALLETS TAB ─── */}
                            {tab === "wallet" && (
                                <div className="space-y-4">
                                    {/* Wallet selector pills */}
                                    <div className="flex flex-wrap gap-2">
                                        {WALLETS.map(w => (
                                            <button key={w.id} onClick={() => setWallet(w.id)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${wallet === w.id ? "border-gold-400/40 bg-gold-400/10 text-gold-400" : "border-white/10 text-gray-500 hover:text-gray-300"}`}>
                                                {w.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Wallet detail */}
                                    {wallet === "payoneer" && (
                                        settings?.wallet_payoneer_enabled ? (
                                            <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                                                <p className="text-xs font-semibold text-orange-400 mb-2">Payoneer Email</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-white">{settings.wallet_payoneer_email}</span>
                                                    <button onClick={() => copy(settings.wallet_payoneer_email, "payoneer")} className="p-1 text-gray-500 hover:text-orange-400">
                                                        {copied === "payoneer" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : <div className="text-center py-6 text-sm text-gray-500">Payoneer not configured. <a href="/contact" className="text-gold-400 underline">Contact us</a></div>
                                    )}
                                    {wallet === "wise" && (
                                        settings?.wallet_wise_enabled ? (
                                            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                                                <p className="text-xs font-semibold text-green-400 mb-2">Wise (TransferWise) Email</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-white">{settings.wallet_wise_email}</span>
                                                    <button onClick={() => copy(settings.wallet_wise_email, "wise")} className="p-1 text-gray-500 hover:text-green-400">
                                                        {copied === "wise" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : <div className="text-center py-6 text-sm text-gray-500">Wise not configured. <a href="/contact" className="text-gold-400 underline">Contact us</a></div>
                                    )}
                                    {wallet === "usdt" && (
                                        settings?.wallet_usdt_enabled ? (
                                            <div className="p-4 bg-teal-500/5 border border-teal-500/20 rounded-xl">
                                                <p className="text-xs font-semibold text-teal-400 mb-2">USDT Address (TRC-20)</p>
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-xs font-mono text-white break-all">{settings.wallet_usdt_address}</span>
                                                    <button onClick={() => copy(settings.wallet_usdt_address, "usdt")} className="p-1 text-gray-500 hover:text-teal-400 flex-shrink-0">
                                                        {copied === "usdt" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : <div className="text-center py-6 text-sm text-gray-500">USDT not configured. <a href="/contact" className="text-gold-400 underline">Contact us</a></div>
                                    )}
                                    {wallet === "esewa" && (
                                        settings?.wallet_esewa_enabled ? (
                                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                                <p className="text-xs font-semibold text-emerald-400 mb-2">eSewa ID</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-white">{settings.wallet_esewa_id}</span>
                                                    <button onClick={() => copy(settings.wallet_esewa_id, "esewa")} className="p-1 text-gray-500 hover:text-emerald-400">
                                                        {copied === "esewa" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : <div className="text-center py-6 text-sm text-gray-500">eSewa not configured. <a href="/contact" className="text-gold-400 underline">Contact us</a></div>
                                    )}
                                    {wallet === "khalti" && (
                                        settings?.wallet_khalti_enabled ? (
                                            <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                                                <p className="text-xs font-semibold text-purple-400 mb-2">Khalti ID</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-white">{settings.wallet_khalti_id}</span>
                                                    <button onClick={() => copy(settings.wallet_khalti_id, "khalti")} className="p-1 text-gray-500 hover:text-purple-400">
                                                        {copied === "khalti" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : <div className="text-center py-6 text-sm text-gray-500">Khalti not configured. <a href="/contact" className="text-gold-400 underline">Contact us</a></div>
                                    )}

                                    {/* Confirm button for enabled wallets */}
                                    {((wallet === "payoneer" && settings?.wallet_payoneer_enabled) ||
                                        (wallet === "wise" && settings?.wallet_wise_enabled) ||
                                        (wallet === "usdt" && settings?.wallet_usdt_enabled) ||
                                        (wallet === "esewa" && settings?.wallet_esewa_enabled) ||
                                        (wallet === "khalti" && settings?.wallet_khalti_enabled)) && (
                                            <>
                                                <div className="p-3 bg-gold-400/5 border border-gold-400/20 rounded-xl text-xs text-gold-400">
                                                    Send exactly <strong>{currency} {price.toLocaleString()}</strong> and email proof to <a href="mailto:hello@bridgeflow.agency" className="underline">hello@bridgeflow.agency</a> with subject &quot;{planName} Payment&quot;
                                                </div>
                                                <button onClick={() => submitOther(`wallet_${wallet}`)} disabled={processing}
                                                    className="w-full flex items-center justify-center gap-2 py-4 gold-gradient text-navy-950 font-bold rounded-xl text-sm disabled:opacity-50">
                                                    {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                                    {processing ? "Recording..." : "I've Sent the Payment"}
                                                </button>
                                            </>
                                        )}
                                </div>
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
