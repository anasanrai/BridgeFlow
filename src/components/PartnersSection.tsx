import LucideIcon from "./LucideIcon";
import Image from "next/image";
import { ArrowRight, Tag } from "lucide-react";

interface Partner {
    name?: string;
    title?: string;
    badge: string;
    description: string;
    href: string;
    logo: string;
    logo_url?: string;
}

interface PartnersSectionProps {
    partners?: Partner[];
}

export default function PartnersSection({ partners: initialPartners }: PartnersSectionProps) {
    const list = initialPartners || [];

    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {list.map((partner, idx) => {
                    const name = partner.name || partner.title;
                    const badgeClasses = getBadgeClasses(partner.badge);

                    return (
                        <a
                            key={idx}
                            href={partner.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block rounded-2xl glass border border-white/10 hover:border-gold-400/30 transition-all duration-500 overflow-hidden h-full"
                        >
                            {/* Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full border ${badgeClasses}`}
                                >
                                    <Tag className="w-2.5 h-2.5" />
                                    {partner.badge}
                                </span>
                            </div>

                            <div className="p-6 lg:p-8 flex flex-col h-full">
                                {/* Logo */}
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400/10 to-purple-500/10 border border-white/10 flex items-center justify-center mb-5 mx-auto group-hover:scale-110 group-hover:from-gold-400/20 group-hover:to-purple-500/20 transition-all duration-500 overflow-hidden">
                                    {partner.logo_url ? (
                                        <div className="relative w-full h-full p-3">
                                            <Image
                                                src={partner.logo_url}
                                                alt={name || "Partner"}
                                                fill
                                                className="object-contain filter group-hover:brightness-110 transition-all"
                                            />
                                        </div>
                                    ) : (
                                        <LucideIcon name={partner.logo} className="w-8 h-8 text-gold-400" />
                                    )}
                                </div>

                                {/* Name */}
                                <h3 className="text-lg font-display font-bold text-white text-center mb-2">
                                    {name}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed text-center mb-5 flex-1 line-clamp-3">
                                    {partner.description}
                                </p>

                                {/* CTA Button */}
                                <div className="flex justify-center">
                                    <span className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold-400 border border-gold-400/20 rounded-full bg-gold-400/5 group-hover:bg-gold-400/10 group-hover:border-gold-400/30 transition-all duration-300">
                                        Learn More
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>

            {/* Disclaimer */}
            <p className="text-center text-xs text-gray-500 italic mt-8">
                * Some links are affiliate links. We only recommend tools we actively use and trust.
            </p>
        </>
    );
}

function getBadgeClasses(badge: string) {
    const b = badge.toLowerCase();
    if (b.includes("recommended")) return "text-gold-400 bg-gold-400/10 border-gold-400/20";
    if (b.includes("partner")) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (b.includes("hosting")) return "text-purple-400 bg-purple-400/10 border-purple-400/20";
    if (b.includes("ai")) return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
    if (b.includes("gateway")) return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    if (b.includes("integration")) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    return "text-gray-400 bg-gray-400/10 border-gray-400/20";
}
