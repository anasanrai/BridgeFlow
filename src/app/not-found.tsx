import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/[0.03] rounded-full blur-[120px]" />

            <div className="relative z-10 text-center max-w-lg">
                {/* Large 404 */}
                <div className="relative mb-8">
                    <span className="text-[10rem] sm:text-[14rem] font-display font-black leading-none gold-text opacity-10 select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-3xl glass border border-white/10 flex items-center justify-center">
                            <Search className="w-10 h-10 text-gold-400" />
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                    Page not <span className="gold-text">found</span>
                </h1>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-widest gold-gradient text-navy-950 rounded-full hover:shadow-[0_0_30px_rgba(230,180,34,0.4)] hover:scale-105 active:scale-95 transition-all duration-500"
                    >
                        Back to Home
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-widest border border-white/10 text-gray-300 hover:text-white rounded-full hover:bg-white/5 transition-all duration-300"
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Quick nav */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: "Services", href: "/services" },
                        { label: "Pricing", href: "/pricing" },
                        { label: "Blog", href: "/blog" },
                        { label: "About", href: "/about" },
                    ].map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="px-4 py-2.5 text-xs font-medium text-gray-400 hover:text-white glass rounded-xl border border-white/5 hover:border-gold-400/20 transition-all duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
