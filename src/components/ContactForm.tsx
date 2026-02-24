"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button, Card } from "@/components/ui";

const budgetRanges = [
    "< $1,000",
    "$1,000 – $5,000",
    "$5,000 – $15,000",
    "$15,000 – $50,000",
    "$50,000+",
    "Not sure yet",
];

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        budget: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

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
                setFormData({ name: "", email: "", company: "", budget: "", message: "" });
                // Log telemetry
                try {
                    fetch("/api/telemetry", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            event_type: "form_submit",
                            path: window.location.pathname,
                            session_id: sessionStorage.getItem("bf_session_id") || "unknown",
                            data: { type: "contact" }
                        }),
                    });
                } catch (err) { }
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
            <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-navy-950" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 text-white">
                    Message Sent!
                </h3>
                <p className="text-gray-400 mb-6 font-sans">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
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
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/25 transition-all outline-none"
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
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/25 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                    </label>
                    <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                company: e.target.value,
                            })
                        }
                        placeholder="Acme Inc."
                        className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/25 transition-all outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Budget Range
                    </label>
                    <select
                        value={formData.budget}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                budget: e.target.value,
                            })
                        }
                        className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/25 transition-all appearance-none outline-none"
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
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                </label>
                <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            message: e.target.value,
                        })
                    }
                    placeholder="Tell us about your business and what you'd like to automate..."
                    className="w-full px-4 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/25 transition-all resize-none outline-none"
                />
            </div>

            {status === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {errorMsg}
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === "loading"}
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
            </Button>
        </form>
    );
}
