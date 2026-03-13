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
    badge?: string;
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
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 ${plan.popular
                    ? "border border-gold-400/30 bg-gradient-to-b from-gold-400/5 to-navy-900/80 shadow-[0_0_40px_rgba(230,180,34,0.1)]"
                    : "border border-white/10 bg-navy-900/50 hover:border-white/20"
                    }`}
            >
                {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                )}

                <div className="p-6 flex-1 flex flex-col">
                    {/* Badge */}
                    {plan.badge && (
                        <div className="mb-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${plan.popular
                                ? "bg-gold-400/10 text-gold-400 border border-gold-400/20"
                                : "bg-white/5 text-gray-400 border border-white/10"
                                }`}>
                                {plan.popular && <Sparkles className="w-3 h-3" />}
                                {plan.badge}
                            </span>
                        </div>
                    )}

                    {/* Plan Name */}
                    <h3 className="text-lg font-display font-bold text-white mb-2">{plan.name}</h3>

                    {/* Price */}
                    <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                            <span className={`text-3xl font-display font-bold ${plan.popular ? "gold-text" : "text-white"}`}>
                                {plan.price}
                            </span>
                            {plan.period && (
                                <span className="text-sm text-gray-500">{plan.period}</span>
                            )}
                        </div>
                        {plan.originalPrice && (
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-600 line-through">{plan.originalPrice}</span>
                                {plan.savingsTag && (
                                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                        {plan.savingsTag}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">{plan.description}</p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-6 flex-1">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-300">
                                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? "text-gold-400" : "text-emerald-400"}`} />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {/* CTA Buttons */}
                    <div className="space-y-2">
                        {showBuyNow ? (
                            <>
                                <button
                                    onClick={() => setShowPayment(true)}
                                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${plan.popular
                                        ? "bg-gold-400 hover:bg-gold-300 text-navy-950 shadow-[0_0_20px_rgba(230,180,34,0.2)] hover:shadow-[0_0_30px_rgba(230,180,34,0.4)]"
                                        : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                                        }`}
                                >
                                    <Zap className="w-4 h-4" />
                                    Buy Now — {plan.price}
                                </button>
                                <Link
                                    href={plan.cta.href}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition-all"
                                >
                                    {plan.cta.text}
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </>
                        ) : (
                            <Link
                                href={plan.cta.href}
                                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${plan.popular
                                    ? "bg-gold-400 hover:bg-gold-300 text-navy-950"
                                    : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                                    }`}
                            >
                                {plan.cta.text}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>

                    {/* Spots remaining */}
                    {plan.spotsRemaining && (
                        <p className="text-center text-xs text-gold-400 mt-3 font-medium">
                            {plan.spotsRemaining}
                        </p>
                    )}
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
