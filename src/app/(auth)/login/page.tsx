"use client";

import { signIn, signInWithOAuth } from "@/modules/auth/actions";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Loader2, Mail, Lock, Github, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOAuthLoading] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address";
    }
    
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    
    const result = await signIn(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  const handleOAuthSignIn = async (provider: "github" | "google") => {
    setOAuthLoading(provider);
    setError(null);
    try {
      await signInWithOAuth(provider);
    } catch (err) {
      setError(`Failed to sign in with ${provider}`);
      setOAuthLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-950 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-brand-coral/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-brand-purple/5 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Back to home */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] mb-10 transition-all group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform text-brand-coral" />
          Abort to Main Protocol
        </Link>

        <div className="glass-strong p-10 rounded-[2rem] shadow-2xl border border-white/5 relative overflow-hidden">
          {/* Decorative Border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-coral via-brand-purple to-brand-teal" />
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-3 uppercase">
              Operational <span className="text-brand-coral">Access</span>
            </h1>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
              Awaiting credentials for protocol entry
            </p>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-brand-coral transition-colors pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationErrors.email) setValidationErrors({ ...validationErrors, email: undefined });
                }}
                placeholder="OPERATOR@BRIDGEFLOW.AGENCY"
                className={`w-full pl-12 pr-5 py-4 rounded-xl bg-white/[0.03] border ${
                  validationErrors.email ? "border-red-500/50 focus:border-red-500/50" : "border-white/5 focus:border-brand-coral/50"
                } text-white placeholder-neutral-700 focus:outline-none focus:ring-1 ${
                  validationErrors.email ? "focus:ring-red-500/30" : "focus:ring-brand-coral/20"
                } transition-all font-bold text-sm`}
              />
              {validationErrors.email && (
                <p className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-brand-coral transition-colors pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationErrors.password) setValidationErrors({ ...validationErrors, password: undefined });
                }}
                placeholder="••••••••"
                className={`w-full pl-12 pr-12 py-4 rounded-xl bg-white/[0.03] border ${
                  validationErrors.password ? "border-red-500/50 focus:border-red-500/50" : "border-white/5 focus:border-brand-coral/50"
                } text-white placeholder-neutral-700 focus:outline-none focus:ring-1 ${
                  validationErrors.password ? "focus:ring-red-500/30" : "focus:ring-brand-coral/20"
                } transition-all font-bold text-sm`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-brand-coral transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {validationErrors.password && (
                <p className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {validationErrors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-[10px] text-neutral-500 hover:text-brand-coral transition-colors font-black uppercase tracking-widest"
              >
                Reset Credentials
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest p-4 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Sign In Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full relative coral-gradient text-white rounded-xl py-5 font-black uppercase tracking-widest hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] transition-all flex items-center justify-center gap-3 group/btn overflow-hidden shadow-xl shadow-brand-coral/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="relative z-10">Authenticating...</span>
                </>
              ) : (
                <span className="relative z-10 flex items-center gap-3">
                  Initiate Session
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-10 mb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em]">
                <span className="bg-neutral-900 px-4 text-neutral-600">Secondary Link</span>
              </div>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleOAuthSignIn("github")}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-3 px-6 py-4 border border-white/5 rounded-xl hover:bg-white/5 hover:border-brand-purple/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white text-[11px] font-black uppercase tracking-widest group"
            >
              {oauthLoading === "github" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Github className="w-4 h-4 group-hover:text-brand-purple transition-colors" />
                  <span>GitHub</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => handleOAuthSignIn("google")}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-3 px-6 py-4 border border-white/5 rounded-xl hover:bg-white/5 hover:border-brand-teal/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white text-[11px] font-black uppercase tracking-widest group"
            >
              {oauthLoading === "google" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <svg className="w-4 h-4 group-hover:text-brand-teal transition-colors" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Google</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="mt-10 text-center text-neutral-600 text-[11px] font-bold uppercase tracking-widest">
          New Operator?{" "}
          <Link href="/signup" className="text-brand-coral font-black hover:text-white transition-colors ml-1">
            Request Registry
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
