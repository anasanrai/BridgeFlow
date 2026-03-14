"use client";

import { signUp, signInWithOAuth } from "@/modules/auth/actions";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Loader2, Mail, Lock, User, Github } from "lucide-react";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await signUp(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      setSuccess(result.message || "Account created! Please check your email.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-navy-950 relative overflow-hidden">
      {/* Background Orbs — gold brand */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-gold-400/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-gold-400/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Back to home */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 text-sm font-medium mb-6 transition-colors">
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to BridgeFlow
        </Link>

        <div className="glass-strong p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Join the BridgeFlow SaaS platform</p>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="relative group block">
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder=" "
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-gold-400/50 focus:ring-0 transition-all peer"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gold-400 peer-focus:bg-navy-950 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-navy-950 peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
                  Full Name
                </span>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold-400/0 to-transparent group-focus-within:via-gold-400 transition-all duration-500" />
              </label>

              <label className="relative group block">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder=" "
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-gold-400/50 focus:ring-0 transition-all peer"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gold-400 peer-focus:bg-navy-950 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-navy-950 peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
                  Email Address
                </span>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold-400/0 to-transparent group-focus-within:via-gold-400 transition-all duration-500" />
              </label>

              <label className="relative group block">
                <input
                  name="password"
                  type="password"
                  required
                  placeholder=" "
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-gold-400/50 focus:ring-0 transition-all peer"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gold-400 peer-focus:bg-navy-950 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-navy-950 peer-[:not(:placeholder-shown)]:px-2 pointer-events-none">
                  Password
                </span>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold-400/0 to-transparent group-focus-within:via-gold-400 transition-all duration-500" />
              </label>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

               <button
                disabled={loading}
                type="submit"
                className="w-full relative gold-gradient text-navy-950 rounded-xl py-4 font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn overflow-hidden shadow-lg shadow-gold-400/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer-btn transition-transform" />
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    Sign Up
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-semibold text-white">Check your email</h2>
              <p className="text-gray-400">{success}</p>
              <Link 
                href="/login" 
                className="inline-block text-gold-400 hover:text-gold-300 font-medium transition-colors mt-4"
              >
                Return to Login
              </Link>
            </div>
          )}

          {!success && (
            <div className="mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-navy-900 px-3 text-gray-500">Or join with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => signInWithOAuth('github')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 rounded-xl hover:bg-white/5 hover:border-gold-400/20 transition-all text-white text-sm font-medium"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </button>
                <button
                  type="button"
                  onClick={() => signInWithOAuth('google')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 rounded-xl hover:bg-white/5 hover:border-gold-400/20 transition-all text-white text-sm font-medium"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
              </div>
            </div>
          )}

          {!success && (
            <p className="mt-6 text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-gold-400 font-bold hover:underline">
                Log In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
