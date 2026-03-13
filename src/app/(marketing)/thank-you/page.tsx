"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Download, Mail, Zap, Calendar, Loader2, PackageCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const sessionId = searchParams.get("session_id"); // Stripe style
    const orderIdParam = searchParams.get("orderId");

    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const id = orderIdParam || sessionId;
        if (!id) return;

        async function fetchOrder() {
            setLoading(true);
            try {
                const url = `/api/checkout?${orderIdParam ? `orderId=${orderIdParam}` : `sessionId=${sessionId}`}`;
                const res = await fetch(url);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setOrder(data);
            } catch (err: any) {
                console.error("Failed to fetch order info:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [sessionId, orderIdParam]);

    return (
        <div className="min-h-screen pt-32 pb-20 aurora-glow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-navy-800/40 via-navy-950 to-navy-950" />

            <div className="relative z-10 container-max px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 animate-bounce">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                        Thank You for Your <span className="gold-text">Purchase!</span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-8">
                        Your order has been confirmed successfully.
                    </p>

                    {loading ? (
                        <div className="flex items-center justify-center gap-2 text-gold-400 mb-8">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-sm font-bold uppercase tracking-widest">Retrieving order details...</span>
                        </div>
                    ) : order ? (
                        <div className="glass rounded-2xl p-6 border border-white/10 mb-12 text-left relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <PackageCheck className="w-24 h-24 text-gold-400" />
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Order ID</p>
                                    <p className="text-sm font-mono text-cyan-400">{order.order_id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</p>
                                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase">
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Plan / Item</p>
                                    <p className="text-white font-bold">{order.plan_name || order.metadata?.template_name || "Custom Automation"}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Total Paid</p>
                                    <p className="text-2xl font-display font-bold gold-text">${(order.amount || 0).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                    {[
                        {
                            icon: Mail,
                            title: "Check Email",
                            desc: "We've sent your receipt and access instructions to your email."
                        },
                        {
                            icon: (type === "template" || order?.metadata?.type === "template") ? Download : Zap,
                            title: (type === "template" || order?.metadata?.type === "template") ? "Unlock Content" : "Quick Onboarding",
                            desc: (type === "template" || order?.metadata?.type === "template")
                                ? "Visit the template page to claim your downloads."
                                : "Our team will reach out within 24 hours to begin."
                        },
                        {
                            icon: Calendar,
                            title: "Human Support",
                            desc: "Need help? Email our founders directly at hello@bridgeflow.agency"
                        }
                    ].map((step, i) => (
                        <div key={i} className="glass rounded-2xl p-6 border border-white/5 text-center transition-all hover:border-white/10 group">
                            <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <step.icon className="w-6 h-6 text-gold-400" />
                            </div>
                            <h3 className="text-white font-bold mb-2 uppercase tracking-wider text-xs">{step.title}</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={order?.metadata?.template_slug ? `/templates/${order.metadata.template_slug}` : "/templates"}
                        className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-gold-400 text-navy-950 hover:bg-gold-300 transition-all hover:shadow-[0_0_30px_rgba(230,180,34,0.4)]"
                    >
                        {order?.metadata?.template_slug ? "Download Template" : "Return to Templates"}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold glass border border-white/10 text-white hover:bg-white/5 transition-all"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
