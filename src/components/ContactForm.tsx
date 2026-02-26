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

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        hearAbout: "",
        message: "",
    });
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const update = (field: string, value: string) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    company: "",
                    service: "",
                    budget: "",
                    hearAbout: "",
                    message: "",
                });
                try {
                    fetch("/api/telemetry", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            event_type: "form_submit",
                            path: window.location.pathname,
                            session_id:
                                sessionStorage.getItem("bf_session_id") ||
                                "unknown",
                            data: { type: "contact" },
                        }),
                    });
                } catch { }
            } else {
                setStatus("error");
                setErrorMsg(
                    data.error ||
                    "Something went wrong. Please try again."
                );
            }
        } catch {
            setStatus("error");
            setErrorMsg(
                "Network error. Please check your connection and try again."
            );
        }
    };

    if (status === "success") {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-navy-950" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 text-white">
                    Message Sent!
                </h3>
                <p className="text-gray-400 mb-6 font-sans">
                    Thanks for reaching out. We&apos;ll get back to you
                    within 24 hours.
                </p>
                <Button
                    variant="secondary"
                    onClick={() => setStatus("idle")}
                >
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="John Smith"
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="john@company.com"
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Company + Service Interest */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                    </label>
                    <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                            update("company", e.target.value)
                        }
                        placeholder="Acme Inc."
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        What service are you interested in?
                    </label>
                    <select
                        value={formData.service}
                        onChange={(e) =>
                            update("service", e.target.value)
                        }
                        className={selectClass}
                    >
                        <option value="" className="bg-navy-900">
                            Select a service
                        </option>
                        {serviceOptions.map((opt) => (
                            <option
                                key={opt}
                                value={opt}
                                className="bg-navy-900"
                            >
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Budget + How did you hear */}
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Budget Range
                    </label>
                    <select
                        value={formData.budget}
                        onChange={(e) =>
                            update("budget", e.target.value)
                        }
                        className={selectClass}
                    >
                        <option value="" className="bg-navy-900">
                            Select budget range
                        </option>
                        {budgetRanges.map((range) => (
                            <option
                                key={range}
                                value={range}
                                className="bg-navy-900"
                            >
                                {range}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        How did you hear about us?
                    </label>
                    <select
                        value={formData.hearAbout}
                        onChange={(e) =>
                            update("hearAbout", e.target.value)
                        }
                        className={selectClass}
                    >
                        <option value="" className="bg-navy-900">
                            Select an option
                        </option>
                        {hearAboutOptions.map((opt) => (
                            <option
                                key={opt}
                                value={opt}
                                className="bg-navy-900"
                            >
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Message */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                </label>
                <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your business and what you'd like to automate..."
                    className={`${inputClass} resize-none`}
                />
            </div>

            {status === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {errorMsg}
                </div>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm gold-gradient text-navy-950 hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        Send Message
                    </>
                )}
            </button>
        </form>
    );
}
