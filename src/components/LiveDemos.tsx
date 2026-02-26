"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const demos = [
    {
        image: "/images/workflow-1.png",
        loomId: "91bc462a0af645c5b2b73f540b5eb0cc",
        title: "Real Estate Lead Pipeline",
        description:
            "Full lead scoring engine with Hot/Warm/Cool/Cold routing, automated CRM assignment, Slack alerts, and drip email sequences — all triggered from a single webhook.",
        tags: ["n8n", "Google Sheets", "Gmail", "Slack", "AI Scoring"],
    },
    {
        image: "/images/workflow-2.png",
        loomId: "91bc462a0af645c5b2b73f540b5eb0cc",
        title: "Agency Client Onboarding",
        description:
            "Client intake webhook triggers Google Drive folder creation, CRM entry, tiered welcome emails (VIP/Standard/Starter), Slack notifications, and weekly digest reports — fully automated.",
        tags: ["n8n", "Google Drive", "Gmail", "Slack", "AI Profiling"],
    },
    {
        image: "/images/workflow-3.png",
        loomId: "91bc462a0af645c5b2b73f540b5eb0cc",
        title: "E-commerce Review Automation",
        description:
            "Post-purchase review requests, AI sentiment analysis, content moderation, positive/negative routing, Slack alerts for bad reviews, and weekly analytics digest — 4 automated flows in one system.",
        tags: ["n8n", "Gmail", "Slack", "AI Sentiment", "Google Sheets"],
    },
];

export default function LiveDemos() {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    return (
        <>
            {/* Banner */}
            <div className="mb-10">
                <div className="relative rounded-xl border-l-4 border-gold-400 bg-gold-400/[0.04] backdrop-blur-sm px-6 py-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        These are{" "}
                        <span className="text-white font-semibold">
                            real workflows we&apos;ve built
                        </span>{" "}
                        — not templates. Every node is functional.
                    </p>
                </div>
            </div>

            {/* Demo Cards */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {demos.map((demo) => (
                    <div
                        key={demo.title}
                        className="group glass rounded-2xl border border-white/10 hover:border-gold-400/20 transition-all duration-500 overflow-hidden flex flex-col"
                    >
                        {/* Clickable Workflow Image */}
                        <button
                            onClick={() => setLightboxImage(demo.image)}
                            className="relative aspect-[16/10] overflow-hidden cursor-zoom-in"
                        >
                            <Image
                                src={demo.image}
                                alt={`${demo.title} workflow screenshot`}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-navy-950/30 group-hover:bg-navy-950/10 transition-colors duration-300" />
                            <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-navy-950/60 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                <ZoomIn className="w-4 h-4 text-gold-400" />
                            </div>
                        </button>

                        {/* Loom Video Embed */}
                        <div className="aspect-video">
                            <iframe
                                src={`https://www.loom.com/embed/${demo.loomId}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
                                frameBorder="0"
                                allowFullScreen
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-display font-bold mb-2 text-white">
                                {demo.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                                {demo.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {demo.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-gold-400 bg-gold-400/5 border border-gold-400/10 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-[9999] bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div
                        className="relative w-full max-w-6xl max-h-[90vh] animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={lightboxImage}
                            alt="Workflow screenshot full size"
                            width={1920}
                            height={1080}
                            className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
