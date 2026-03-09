"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import TemplatePaymentModal from "./TemplatePaymentModal";

interface TemplateActionsProps {
    templateId: string;
    templateValue?: number;
}

export default function TemplateActions({ templateId, templateValue }: TemplateActionsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,80,0,0.4)] hover:scale-105"
                style={{ background: "linear-gradient(135deg, #ff5000 0%, #ff7700 100%)" }}
            >
                Buy This Template
                <ArrowRight className="w-4 h-4" />
            </button>

            <TemplatePaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                templateId={templateId}
            />
        </>
    );
}
