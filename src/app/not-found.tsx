import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-coral/[0.03] rounded-full blur-[120px]" />

            <div className="relative z-10 text-center max-w-lg">
                {/* Large 404 */}
                <div className="relative mb-8">
                    <span className="text-[10rem] sm:text-[14rem] font-black uppercase tracking-tighter text-brand-coral opacity-10 select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-[30px] border border-white/5 bg-neutral-900/50 flex items-center justify-center">
                            <Search className="w-10 h-10 text-brand-coral" />
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white mb-4">
                    Target Not <span className="text-brand-coral">Found</span>
                </h1>
                <p className="text-neutral-400 text-lg mb-10 font-medium">
                    The requested asset does not exist or has been relocated within the ecosystem.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-coral text-white text-sm font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_40px_-10px_rgba(255,109,90,0.5)] transition-all transform hover:-translate-y-1"
                    >
                        Return Home
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 border border-white/10 text-white text-sm font-black uppercase tracking-widest rounded-full hover:bg-white/5 transition-all"
                    >
                        Contact Support
                    </Link>
                </div>

                {/* Quick nav */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { label: "Services", href: "/services" },
                        { label: "Pricing", href: "/pricing" },
                        { label: "Templates", href: "/templates" },
                        { label: "Blog", href: "/blog" },
                        { label: "About", href: "/about" },
                        { label: "Login", href: "/login" },
                    ].map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="px-4 py-3 text-[11px] font-black text-neutral-400 uppercase tracking-widest hover:text-white rounded-[20px] border border-white/5 bg-neutral-900/30 hover:border-brand-coral/20 transition-all"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
