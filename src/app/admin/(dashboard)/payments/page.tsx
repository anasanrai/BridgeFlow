"use client";
import { useEffect, useState } from "react";
import {
    CreditCard, Save, Loader2, CheckCircle2, AlertTriangle,
    DollarSign, Building2, Wallet, Eye, EyeOff, Globe,
    RefreshCw, Shield, Zap, ExternalLink, Info,
} from "lucide-react";

interface PaymentSettings {
    paypal_enabled: boolean;
    paypal_client_id: string;
    paypal_client_secret: string;
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
    tax_rate: number;
    invoice_prefix: string;
    payment_terms: string;
}

const defaultSettings: PaymentSettings = {
    paypal_enabled: false,
    paypal_client_id: "",
    paypal_client_secret: "",
    paypal_mode: "sandbox",
    paypal_currency: "USD",
    bank_enabled: false,
    bank_name: "",
    bank_account_name: "BridgeFlow Agency",
    bank_account_number: "",
    bank_routing_number: "",
    bank_swift_code: "",
    bank_iban: "",
    bank_instructions: "Please include your invoice number as the payment reference.",
    wallets_enabled: false,
    wallet_payoneer_enabled: false,
    wallet_payoneer_email: "",
    wallet_wise_enabled: false,
    wallet_wise_email: "",
    wallet_usdt_enabled: false,
    wallet_usdt_address: "",
    wallet_esewa_enabled: false,
    wallet_esewa_id: "",
    wallet_khalti_enabled: false,
    wallet_khalti_id: "",
    currency: "USD",
    tax_rate: 0,
    invoice_prefix: "BF",
    payment_terms: "Payment due within 7 days of invoice",
};

type Tab = "paypal" | "bank" | "wallets" | "general";

export default function PaymentsPage() {
    const [settings, setSettings] = useState<PaymentSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>("paypal");
    const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetch("/api/admin/payments")
            .then((r) => r.json())
            .then((data) => {
                setSettings({ ...defaultSettings, ...data });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const update = (key: keyof PaymentSettings, value: any) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            const res = await fetch("/api/admin/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Save failed");
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setSaving(false);
        }
    };

    const toggleSecret = (key: string) => {
        setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const tabs: { id: Tab; label: string; icon: any; color: string }[] = [
        { id: "paypal", label: "PayPal", icon: Globe, color: "text-blue-400" },
        { id: "bank", label: "Bank Transfer", icon: Building2, color: "text-emerald-400" },
        { id: "wallets", label: "Digital Wallets", icon: Wallet, color: "text-purple-400" },
        { id: "general", label: "General", icon: DollarSign, color: "text-gold-400" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                        <CreditCard className="w-7 h-7 text-gold-400" />
                        Payment Gateway
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Configure payment methods displayed to clients on pricing and template pages.
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-navy-950 bg-gold-400 hover:bg-gold-300 transition-all disabled:opacity-50"
                >
                    {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : saved ? (
                        <CheckCircle2 className="w-4 h-4" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                </button>
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            {/* Status Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "PayPal", enabled: settings.paypal_enabled, color: "blue" },
                    { label: "Bank Transfer", enabled: settings.bank_enabled, color: "emerald" },
                    { label: "Digital Wallets", enabled: settings.wallets_enabled, color: "purple" },
                    {
                        label: "Active Methods",
                        enabled: true,
                        value: [settings.paypal_enabled, settings.bank_enabled, settings.wallets_enabled].filter(Boolean).length,
                        color: "gold",
                    },
                ].map((item) => (
                    <div key={item.label} className="glass rounded-xl p-4 border border-white/10">
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">{item.label}</div>
                        {item.value !== undefined ? (
                            <div className="text-2xl font-display font-bold text-gold-400">{item.value}</div>
                        ) : (
                            <div className={`flex items-center gap-2 ${item.enabled ? "text-emerald-400" : "text-gray-600"}`}>
                                <div className={`w-2 h-2 rounded-full ${item.enabled ? "bg-emerald-400 animate-pulse" : "bg-gray-600"}`} />
                                <span className="text-sm font-semibold">{item.enabled ? "Active" : "Inactive"}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-navy-900/50 rounded-xl border border-white/5">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab.id
                            ? "bg-white/10 text-white"
                            : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? tab.color : ""}`} />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* PayPal Tab */}
            {activeTab === "paypal" && (
                <div className="glass rounded-2xl p-6 border border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <Globe className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-display font-bold text-white">PayPal Integration</h2>
                                <p className="text-xs text-gray-400">Accept payments via PayPal, credit/debit cards</p>
                            </div>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-xs text-gray-400">{settings.paypal_enabled ? "Enabled" : "Disabled"}</span>
                            <div
                                onClick={() => update("paypal_enabled", !settings.paypal_enabled)}
                                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${settings.paypal_enabled ? "bg-blue-500" : "bg-gray-700"}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.paypal_enabled ? "translate-x-6" : "translate-x-1"}`} />
                            </div>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                PayPal Client ID
                            </label>
                            <input
                                type="text"
                                value={settings.paypal_client_id}
                                onChange={(e) => update("paypal_client_id", e.target.value)}
                                placeholder="AXxx...your-paypal-client-id"
                                className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50 font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                PayPal Client Secret
                            </label>
                            <div className="relative">
                                <input
                                    type={showSecrets["paypal_secret"] ? "text" : "password"}
                                    value={settings.paypal_client_secret}
                                    onChange={(e) => update("paypal_client_secret", e.target.value)}
                                    placeholder="••••••••••••••••"
                                    className="w-full px-4 py-3 pr-12 rounded-xl bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50 font-mono"
                                />
                                <button
                                    onClick={() => toggleSecret("paypal_secret")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showSecrets["paypal_secret"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Mode
                            </label>
                            <select
                                value={settings.paypal_mode}
                                onChange={(e) => update("paypal_mode", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50"
                            >
                                <option value="sandbox">Sandbox (Testing)</option>
                                <option value="live">Live (Production)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Currency
                            </label>
                            <select
                                value={settings.paypal_currency}
                                onChange={(e) => update("paypal_currency", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50"
                            >
                                <option value="USD">USD — US Dollar</option>
                                <option value="EUR">EUR — Euro</option>
                                <option value="GBP">GBP — British Pound</option>
                                <option value="AUD">AUD — Australian Dollar</option>
                                <option value="CAD">CAD — Canadian Dollar</option>
                                <option value="SGD">SGD — Singapore Dollar</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-400">
                            Get your PayPal API credentials from the{" "}
                            <a href="https://developer.paypal.com/dashboard/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">
                                PayPal Developer Dashboard <ExternalLink className="w-3 h-3" />
                            </a>
                            . Use Sandbox mode for testing and switch to Live when ready.
                        </p>
                    </div>
                </div>
            )}

            {/* Bank Transfer Tab */}
            {activeTab === "bank" && (
                <div className="glass rounded-2xl p-6 border border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <Building2 className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-display font-bold text-white">Bank Transfer</h2>
                                <p className="text-xs text-gray-400">Accept direct bank wire transfers and ACH payments</p>
                            </div>
                        </div>
                        <div
                            onClick={() => update("bank_enabled", !settings.bank_enabled)}
                            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${settings.bank_enabled ? "bg-emerald-500" : "bg-gray-700"}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.bank_enabled ? "translate-x-6" : "translate-x-1"}`} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { key: "bank_name", label: "Bank Name", placeholder: "e.g. Chase Bank, HSBC" },
                            { key: "bank_account_name", label: "Account Holder Name", placeholder: "BridgeFlow Agency" },
                            { key: "bank_account_number", label: "Account Number", placeholder: "••••••••", secret: true },
                            { key: "bank_routing_number", label: "Routing Number (ACH/ABA)", placeholder: "••••••••", secret: true },
                            { key: "bank_swift_code", label: "SWIFT / BIC Code", placeholder: "CHASUS33" },
                            { key: "bank_iban", label: "IBAN (International)", placeholder: "GB29NWBK60161331926819" },
                        ].map((field) => (
                            <div key={field.key}>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                    {field.label}
                                </label>
                                <div className="relative">
                                    <input
                                        type={field.secret && !showSecrets[field.key] ? "password" : "text"}
                                        value={(settings as any)[field.key] || ""}
                                        onChange={(e) => update(field.key as keyof PaymentSettings, e.target.value)}
                                        placeholder={field.placeholder}
                                        className="w-full px-4 py-3 pr-12 rounded-xl bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50 font-mono"
                                    />
                                    {field.secret && (
                                        <button
                                            onClick={() => toggleSecret(field.key)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                        >
                                            {showSecrets[field.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Payment Instructions (shown to clients)
                        </label>
                        <textarea
                            value={settings.bank_instructions}
                            onChange={(e) => update("bank_instructions", e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                        />
                    </div>
                </div>
            )}

            {/* Digital Wallets Tab */}
            {activeTab === "wallets" && (
                <div className="glass rounded-2xl p-6 border border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <Wallet className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-display font-bold text-white">Digital Wallets</h2>
                                <p className="text-xs text-gray-400">Accept payments via digital wallets and crypto</p>
                            </div>
                        </div>
                        <div
                            onClick={() => update("wallets_enabled", !settings.wallets_enabled)}
                            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${settings.wallets_enabled ? "bg-purple-500" : "bg-gray-700"}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.wallets_enabled ? "translate-x-6" : "translate-x-1"}`} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { enabledKey: "wallet_payoneer_enabled", valueKey: "wallet_payoneer_email", label: "Payoneer", placeholder: "your@payoneer.email", type: "email", color: "orange" },
                            { enabledKey: "wallet_wise_enabled", valueKey: "wallet_wise_email", label: "Wise (TransferWise)", placeholder: "your@wise.com", type: "email", color: "green" },
                            { enabledKey: "wallet_usdt_enabled", valueKey: "wallet_usdt_address", label: "USDT (TRC-20 / ERC-20)", placeholder: "TXxx...wallet-address", type: "text", color: "teal" },
                            { enabledKey: "wallet_esewa_enabled", valueKey: "wallet_esewa_id", label: "eSewa (Nepal)", placeholder: "9800000000", type: "text", color: "green" },
                            { enabledKey: "wallet_khalti_enabled", valueKey: "wallet_khalti_id", label: "Khalti (Nepal)", placeholder: "9800000000", type: "text", color: "purple" },
                        ].map((wallet) => (
                            <div key={wallet.enabledKey} className="p-4 rounded-xl border border-white/5 bg-navy-900/30">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-bold text-white">{wallet.label}</span>
                                    <div
                                        onClick={() => update(wallet.enabledKey as keyof PaymentSettings, !(settings as any)[wallet.enabledKey])}
                                        className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${(settings as any)[wallet.enabledKey] ? "bg-purple-500" : "bg-gray-700"}`}
                                    >
                                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${(settings as any)[wallet.enabledKey] ? "translate-x-5" : "translate-x-0.5"}`} />
                                    </div>
                                </div>
                                {(settings as any)[wallet.enabledKey] && (
                                    <input
                                        type={wallet.type}
                                        value={(settings as any)[wallet.valueKey] || ""}
                                        onChange={(e) => update(wallet.valueKey as keyof PaymentSettings, e.target.value)}
                                        placeholder={wallet.placeholder}
                                        className="w-full px-4 py-2.5 rounded-lg bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 font-mono"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* General Tab */}
            {activeTab === "general" && (
                <div className="glass rounded-2xl p-6 border border-white/10 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 rounded-xl bg-gold-400/10 border border-gold-400/20">
                            <DollarSign className="w-5 h-5 text-gold-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-display font-bold text-white">General Settings</h2>
                            <p className="text-xs text-gray-400">Currency, tax, and invoice configuration</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Default Currency
                            </label>
                            <select
                                value={settings.currency}
                                onChange={(e) => update("currency", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400/50"
                            >
                                <option value="USD">USD — US Dollar</option>
                                <option value="EUR">EUR — Euro</option>
                                <option value="GBP">GBP — British Pound</option>
                                <option value="AUD">AUD — Australian Dollar</option>
                                <option value="CAD">CAD — Canadian Dollar</option>
                                <option value="SGD">SGD — Singapore Dollar</option>
                                <option value="NPR">NPR — Nepalese Rupee</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Tax Rate (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                value={settings.tax_rate}
                                onChange={(e) => update("tax_rate", parseFloat(e.target.value) || 0)}
                                className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Invoice Prefix
                            </label>
                            <input
                                type="text"
                                value={settings.invoice_prefix}
                                onChange={(e) => update("invoice_prefix", e.target.value)}
                                placeholder="BF"
                                className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400/50 font-mono"
                            />
                            <p className="text-xs text-gray-500 mt-1">Invoices will be numbered: {settings.invoice_prefix}-001, {settings.invoice_prefix}-002...</p>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Payment Terms
                            </label>
                            <input
                                type="text"
                                value={settings.payment_terms}
                                onChange={(e) => update("payment_terms", e.target.value)}
                                placeholder="Payment due within 7 days of invoice"
                                className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400/50"
                            />
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gold-400/5 border border-gold-400/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4 text-gold-400" />
                            <span className="text-sm font-bold text-gold-400">Security Note</span>
                        </div>
                        <p className="text-xs text-gray-400">
                            All payment credentials are stored securely in your Supabase database and are never exposed in client-side code.
                            Always use environment variables for production deployments.
                        </p>
                    </div>
                </div>
            )}

            {/* Save Button (Bottom) */}
            <div className="flex justify-end pt-2">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-navy-950 bg-gold-400 hover:bg-gold-300 transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saving ? "Saving..." : saved ? "Saved!" : "Save Payment Settings"}
                </button>
            </div>
        </div>
    );
}
