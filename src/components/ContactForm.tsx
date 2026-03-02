"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui";

const serviceOptions = [
    "Free Automation Audit",
    "Quick Win Automation ($497)",
    "Starter Package ($997)",
    "GoHighLevel Pro Setup ($1,997)",
    "Custom Project",
    "Not sure yet",
];

const budgetRanges = [
    "< $1,000",
    "$1,000 – $5,000",
    "$5,000 – $15,000",
    "$15,000 – $50,000",
    "$50,000+",
    "Not sure yet",
];

const hearAboutOptions = [
    "Google Search",
    "LinkedIn",
    "Referral from someone",
    "YouTube",
    "Social Media",
    "Other",
];

const inputClass =
    "w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/25 transition-all outline-none";

const selectClass =
    "w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/25 transition-all appearance-none outline-none";

type FormData = {
    name: string;
    email: string;
    company: string;
    service: string;
    budget: string;
    hearAbout: string;
    message: string;
};

const INITIAL_FORM: FormData = {
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    hearAbout: "",
    message: "",
};

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const update = (field: keyof FormData, value: string) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json() as { error?: string };

            if (res.ok) {
                setStatus("success");
                setFormData(INITIAL_FORM);
                // Fire-and-forget telemetry
                try {
                    void fetch("/api/telemetry", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            event_type: "form_submit",
                            path: window.location.pathname,
                            session_id: sessionStorage.getItem("bf_session_id") || "unknown",
                            data: { type: "contact" },
                        }),
                    });
                } catch { /* telemetry failure is non-critical */ }
            } else {
                setStatus("error");
                setErrorMsg(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please check your connection and try again.");
        }
    };

    if (status === "success") {
        return (
            <div className="text-center py-12" role="status" aria-live="polite">
                <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-navy-950" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 text-white">
                    Message Sent!
                </h3>
                <p className="text-gray-400 mb-6 font-sans">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <Button variant="secondary" onClick={() => setStatus("idle")}>
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name <span aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="John Smith"
                        className={inputClass}
                        aria-required="true"
                    />
                </div>
                <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="john@company.com"
                        className={inputClass}
                        aria-required="true"
                    />
                </div>
            </div>

            {/* Company + Service Interest */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="contact-company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                    </label>
                    <input
                        id="contact-company"
                        type="text"
                        autoComplete="organization"
                        value={formData.company}
                        onChange={(e) => update("company", e.target.value)}
                        placeholder="Acme Inc."
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="contact-service" className="block text-sm font-medium text-gray-300 mb-2">
                        Service of Interest
                    </label>
                    <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => update("service", e.target.value)}
                        className={selectClass}
                    >
                        <option value="" className="bg-navy-900">Select a service</option>
                        {serviceOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-navy-900">{opt}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Budget + How did you hear */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="contact-budget" className="block text-sm font-medium text-gray-300 mb-2">
                        Budget Range
                    </label>
                    <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => update("budget", e.target.value)}
                        className={selectClass}
                    >
                        <option value="" className="bg-navy-900">Select budget range</option>
                        {budgetRanges.map((range) => (
                            <option key={range} value={range} className="bg-navy-900">{range}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="contact-hear-about" className="block text-sm font-medium text-gray-300 mb-2">
                        How did you hear about us?
                    </label>
                    <select
                        id="contact-hear-about"
                        value={formData.hearAbout}
                        onChange={(e) => update("hearAbout", e.target.value)}
                        className={selectClass}
                    >
                        <option value="" className="bg-navy-900">Select an option</option>
                        {hearAboutOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-navy-900">{opt}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                </label>
                <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your business and what you'd like to automate..."
                    className={`${inputClass} resize-none`}
                    aria-required="true"
                />
            </div>

            {/* Error message */}
            {status === "error" && (
                <div
                    role="alert"
                    aria-live="assertive"
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                    {errorMsg}
                </div>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                aria-disabled={status === "loading"}
                className="w-full px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm gold-gradient text-navy-950 hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Sending...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Send Message</span>
                    </>
                )}
            </button>
        </form>
    );
}
