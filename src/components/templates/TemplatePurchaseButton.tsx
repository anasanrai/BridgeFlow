"use client";
import { useState } from "react";
import { Zap, ArrowRight } from "lucide-react";
import PaymentModal from "@/components/PaymentModal";

interface TemplatePurchaseButtonProps {
    templateName: string;
    templateValue: number;
    templateSlug: string;
    className?: string;
    variant?: "primary" | "outline";
}

export default function TemplatePurchaseButton({
    templateName,
    templateValue,
    templateSlug,
    className = "",
    variant = "primary",
}: TemplatePurchaseButtonProps) {
    const [showPayment, setShowPayment] = useState(false);

    const priceStr = templateValue > 0 ? `$${templateValue.toLocaleString()}` : "Free";

    return (
        <>
            <button
                onClick={() => setShowPayment(true)}
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${variant === "primary"
                    ? "text-navy-950 hover:shadow-[0_0_20px_rgba(230,180,34,0.4)] hover:scale-[1.02]"
                    : "text-white glass border border-white/10 hover:bg-white/10"
                    } ${className}`}
                style={variant === "primary" ? { background: "linear-gradient(135deg, #e6b422 0%, #c9a227 100%)" } : {}}
            >
                <Zap className="w-4 h-4" />
                Get This Template — {priceStr}
                <ArrowRight className="w-4 h-4" />
            </button>

            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                planName={`Template: ${templateName}`}
                planPrice={priceStr}
                planPriceNumeric={templateValue}
                templateSlug={templateSlug}
            />
        </>
    );
}
