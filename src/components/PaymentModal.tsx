"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, CreditCard, Building2, Wallet, Globe, CheckCircle2,
    Loader2, Copy, ExternalLink, ArrowRight, Shield, Info,
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
}

type Step = "method" | "details" | "confirm" | "success";

export default function PaymentModal({
    isOpen,
    onClose,
    planName,
    planPrice,
    planPriceNumeric,
}: PaymentModalProps) {
    const [step, setStep] = useState<Step>("method");
    const [paymentSettings, setPaymentSettings] = useState<PaymentSettings | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [copied, setCopied] = useState<string>("");

    useEffect(() => {
        if (isOpen) {
            fetch("/api/admin/payments")
                .then((r) => r.json())
                .then(setPaymentSettings)
                .catch(() => setPaymentSettings(null));
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setStep("method");
            setSelectedMethod("");
            setCustomerName("");
            setCustomerEmail("");
            setOrderId("");
        }
    }, [isOpen]);

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(""), 2000);
    };

    const handleProceed = async () => {
        if (!customerName || !customerEmail) return;
        setLoading(true);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planName,
                    planPrice: planPriceNumeric || planPrice,
                    customerEmail,
                    customerName,
                    paymentMethod: selectedMethod,
                    currency: paymentSettings?.currency || "USD",
                }),
            });
            const data = await res.json();
            if (data.success) {
                setOrderId(data.orderId);
                if (selectedMethod === "paypal" && data.redirectUrl) {
                    // For PayPal, redirect to PayPal checkout
                    window.open(`https://www.paypal.com/checkoutnow?token=${data.orderId}`, "_blank");
                }
                setStep("success");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const availableMethods = paymentSettings
        ? [
            paymentSettings.paypal_enabled && {
                id: "paypal",
                label: "PayPal",
                description: "Pay securely via PayPal or credit/debit card",
                icon: Globe,
                color: "blue",
            },
            paymentSettings.bank_enabled && {
                id: "bank_transfer",
                label: "Bank Transfer",
                description: "Direct wire transfer or ACH payment",
                icon: Building2,
                color: "emerald",
            },
            paymentSettings.wallets_enabled && paymentSettings.wallet_payoneer_enabled && {
                id: "wallet_payoneer",
                label: "Payoneer",
                description: "Pay via Payoneer",
                icon: Wallet,
                color: "orange",
            },
            paymentSettings.wallets_enabled && paymentSettings.wallet_wise_enabled && {
                id: "wallet_wise",
                label: "Wise (TransferWise)",
                description: "Pay via Wise",
                icon: Wallet,
                color: "green",
            },
            paymentSettings.wallets_enabled && paymentSettings.wallet_usdt_enabled && {
                id: "wallet_usdt",
                label: "USDT (Crypto)",
                description: "Pay with USDT stablecoin",
                icon: Wallet,
                color: "teal",
            },
            paymentSettings.wallets_enabled && paymentSettings.wallet_esewa_enabled && {
                id: "wallet_esewa",
                label: "eSewa",
                description: "Pay via eSewa (Nepal)",
                icon: Wallet,
                color: "green",
            },
            paymentSettings.wallets_enabled && paymentSettings.wallet_khalti_enabled && {
                id: "wallet_khalti",
                label: "Khalti",
                description: "Pay via Khalti (Nepal)",
                icon: Wallet,
                color: "purple",
            },
        ].filter(Boolean)
        : [];

    // Fallback: always show contact option
    const showContactFallback = availableMethods.length === 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full max-w-lg bg-navy-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <div>
                                <h2 className="text-lg font-display font-bold text-white">
                                    {step === "success" ? "Order Confirmed!" : "Complete Your Purchase"}
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {planName} — {planPrice}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Step 1: Select Method */}
                            {step === "method" && (
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-400 mb-4">Select your preferred payment method:</p>

                                    {showContactFallback ? (
                                        <div className="text-center py-8">
                                            <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                            <p className="text-gray-400 text-sm mb-4">Payment gateway is being configured.</p>
                                            <a
                                                href="/contact"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-navy-950 bg-gold-400 hover:bg-gold-300 transition-all"
                                            >
                                                Contact Us to Purchase
                                                <ArrowRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    ) : (
                                        availableMethods.map((method: any) => (
                                            <button
                                                key={method.id}
                                                onClick={() => {
                                                    setSelectedMethod(method.id);
                                                    setStep("details");
                                                }}
                                                className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-gold-400/30 hover:bg-white/5 transition-all text-left group"
                                            >
                                                <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-gold-400/10 transition-colors">
                                                    <method.icon className="w-5 h-5 text-gray-400 group-hover:text-gold-400 transition-colors" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-white">{method.label}</div>
                                                    <div className="text-xs text-gray-500">{method.description}</div>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gold-400 transition-colors" />
                                            </button>
                                        ))
                                    )}

                                    <div className="flex items-center gap-2 pt-2 text-xs text-gray-600">
                                        <Shield className="w-3.5 h-3.5" />
                                        <span>All transactions are secure and encrypted</span>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Customer Details */}
                            {step === "details" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="Your full name"
                                            className="w-full px-4 py-3 rounded-xl bg-navy-950/50 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full px-4 py-3 rounded-xl bg-navy-950/50 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400/50"
                                        />
                                    </div>

                                    {/* Order Summary */}
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">{planName}</span>
                                            <span className="text-white font-bold">{planPrice}</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Payment via</span>
                                            <span className="capitalize">{selectedMethod.replace(/_/g, " ")}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setStep("method")}
                                            className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-400 border border-white/10 hover:bg-white/5 transition-all"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleProceed}
                                            disabled={!customerName || !customerEmail || loading}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-navy-950 bg-gold-400 hover:bg-gold-300 transition-all disabled:opacity-50"
                                        >
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                            {loading ? "Processing..." : "Confirm Order"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Success */}
                            {step === "success" && (
                                <div className="text-center py-4 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-display font-bold text-white mb-1">Order Received!</h3>
                                        <p className="text-sm text-gray-400">
                                            Your order <span className="text-gold-400 font-mono">{orderId}</span> has been created.
                                        </p>
                                    </div>

                                    {/* Payment Instructions */}
                                    {selectedMethod === "bank_transfer" && paymentSettings?.bank_enabled && (
                                        <div className="text-left p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bank Transfer Details</p>
                                            {[
                                                { label: "Bank", value: paymentSettings.bank_name },
                                                { label: "Account Name", value: paymentSettings.bank_account_name },
                                                { label: "Account Number", value: paymentSettings.bank_account_number },
                                                { label: "SWIFT/BIC", value: paymentSettings.bank_swift_code },
                                                { label: "IBAN", value: paymentSettings.bank_iban },
                                                { label: "Reference", value: orderId },
                                            ].filter((f) => f.value).map((field) => (
                                                <div key={field.label} className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">{field.label}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-white font-mono">{field.value}</span>
                                                        <button
                                                            onClick={() => copyToClipboard(field.value!, field.label)}
                                                            className="text-gray-600 hover:text-gold-400 transition-colors"
                                                        >
                                                            {copied === field.label ? (
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                                            ) : (
                                                                <Copy className="w-3.5 h-3.5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {paymentSettings.bank_instructions && (
                                                <p className="text-xs text-gray-400 pt-2 border-t border-white/5">
                                                    {paymentSettings.bank_instructions}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {selectedMethod.startsWith("wallet_") && (
                                        <div className="text-left p-4 rounded-xl bg-white/5 border border-white/5">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Wallet Payment Details</p>
                                            {selectedMethod === "wallet_payoneer" && paymentSettings?.wallet_payoneer_email && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">Payoneer Email</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-white font-mono">{paymentSettings.wallet_payoneer_email}</span>
                                                        <button onClick={() => copyToClipboard(paymentSettings.wallet_payoneer_email, "payoneer")}>
                                                            {copied === "payoneer" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-600 hover:text-gold-400" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedMethod === "wallet_wise" && paymentSettings?.wallet_wise_email && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">Wise Email</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-white font-mono">{paymentSettings.wallet_wise_email}</span>
                                                        <button onClick={() => copyToClipboard(paymentSettings.wallet_wise_email, "wise")}>
                                                            {copied === "wise" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-600 hover:text-gold-400" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedMethod === "wallet_usdt" && paymentSettings?.wallet_usdt_address && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">USDT Address</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-white font-mono truncate max-w-[150px]">{paymentSettings.wallet_usdt_address}</span>
                                                        <button onClick={() => copyToClipboard(paymentSettings.wallet_usdt_address, "usdt")}>
                                                            {copied === "usdt" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-600 hover:text-gold-400" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            <p className="text-xs text-gray-500 mt-3">
                                                Please include your order ID <span className="text-gold-400 font-mono">{orderId}</span> as the payment reference.
                                            </p>
                                        </div>
                                    )}

                                    <p className="text-xs text-gray-500">
                                        A confirmation email will be sent to <span className="text-white">{customerEmail}</span> once payment is verified.
                                    </p>

                                    <button
                                        onClick={onClose}
                                        className="w-full py-3 rounded-xl text-sm font-bold text-navy-950 bg-gold-400 hover:bg-gold-300 transition-all"
                                    >
                                        Done
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
