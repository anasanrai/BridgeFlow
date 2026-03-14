"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Zap } from "lucide-react";
import PaymentModal from "@/components/payments/PaymentModal";

import Link from "next/link";

interface Plan {
    name: string;
    price: string;
    originalPrice?: string | null;
    period?: string;
    savingsTag?: string | null;
    spotsRemaining?: string | null;
    description: string;
    popular?: boolean;
    badge?: string | null;
    features: string[];
    cta: { text: string; href: string };
}

interface PricingCardProps {
    plan: Plan;
    index: number;
}

export default function PricingCard({ plan, index }: PricingCardProps) {
    const [showPayment, setShowPayment] = useState(false);

    // Extract numeric price for payment processing
    const priceNumeric = plan.price !== "Free"
        ? parseFloat(plan.price.replace(/[^0-9.]/g, ""))
        : 0;

    // Determine if this plan should show a "Buy Now" button
    const showBuyNow = plan.price !== "Free" && !plan.cta.href.includes("audit");

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-[40px] overflow-hidden flex flex-col h-full transition-all duration-500 ${plan.popular
                    ? "border-2 border-brand-coral bg-neutral-900 shadow-[0_0_80px_-20px_rgba(255,109,90,0.3)] scale-[1.02] z-10"
                    : "border border-white/5 bg-neutral-900/50 hover:bg-neutral-900 transition-colors"
                    }`}
            >
                {plan.popular && (
                    <div className="bg-brand-coral py-2 text-center text-[10px] font-black uppercase tracking-[0.3em] text-white">
                        Most Popular
                    </div>
                )}

                <div className="p-10 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="mb-10 text-center lg:text-left">
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">{plan.name}</h3>
                        <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest">{plan.badge}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-10 text-center lg:text-left">
                        <div className="flex items-baseline justify-center lg:justify-start gap-2">
                            <span className="text-6xl font-black tracking-tighter text-white">
                                {plan.price}
                            </span>
                            {plan.period && (
                                <span className="text-sm text-neutral-500 font-bold uppercase tracking-widest">{plan.period}</span>
                            )}
                        </div>
                        {plan.spotsRemaining && (
                            <div className="mt-4 inline-block px-4 py-1.5 bg-brand-coral/10 border border-brand-coral/20 rounded-full">
                                <span className="text-[10px] font-black text-brand-coral uppercase tracking-widest">{plan.spotsRemaining}</span>
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-12 flex-1">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-neutral-300 font-medium">
                                <div className={`mt-1 p-0.5 rounded-full ${plan.popular ? "bg-brand-coral" : "bg-brand-teal"}`}>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {/* Actions */}
                    <div className="space-y-4 mt-auto">
                        <button
                            onClick={() => setShowPayment(true)}
                            className={`w-full py-6 rounded-full text-sm font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${plan.popular
                                ? "bg-brand-coral text-white shadow-[0_0_40px_-10px_rgba(255,109,90,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,109,90,0.7)]"
                                : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                                }`}
                        >
                            Select Plan
                        </button>
                    </div>
                </div>
            </motion.div>


            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                planName={plan.name}
                planPrice={plan.price}
                planPriceNumeric={priceNumeric}
            />
        </>
    );
}
