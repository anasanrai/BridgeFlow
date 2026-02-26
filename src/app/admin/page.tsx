"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/admin/dashboard");
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-navy-950 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/[0.03] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

            <div className="relative w-full max-w-md mx-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-12 w-12 rounded-xl overflow-hidden">
                            <Image
                                src="/images/logo.png"
                                alt="B"
                                width={120}
                                height={120}
                                className="w-[200%] h-full object-cover object-left"
                                priority
                            />
                        </div>
                        <span className="text-2xl font-display font-bold text-gold-400" style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}>
                            BridgeFlow
                        </span>
                    </div>
                    <h1 className="text-2xl font-display font-bold text-white mb-1">
                        Admin Dashboard
                    </h1>
                    <p className="text-sm text-gray-500">
                        Enter your password to access the CMS
                    </p>
                </div>

                {/* Login Card */}
                <div className="glass rounded-2xl p-8 card-glow">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Admin Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    className="w-full pl-11 pr-11 py-3 bg-navy-900/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/25 transition-all"
                                    required
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="w-full flex items-center justify-center gap-2 py-3 gold-gradient text-navy-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-400/25 transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-6 text-xs text-gray-600">
                    Secured with JWT authentication • Session expires in 24h
                </p>
            </div>
        </div>
    );
}
