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

  const handleOAuthSignIn = async (provider: string) => {
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-navy-950 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-gold-400/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-gold-400/5 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Back to home */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 text-sm font-medium mb-8 transition-colors group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to BridgeFlow
        </Link>

        <div className="glass-strong p-8 rounded-3xl shadow-2xl border border-white/5">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to your BridgeFlow account
            </p>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-400 transition-colors pointer-events-none">
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
                placeholder="your@email.com"
                className={`w-full pl-12 pr-5 py-4 rounded-xl bg-white/5 border ${
                  validationErrors.email ? "border-red-500/50 focus:border-red-500/50" : "border-white/10 focus:border-gold-400/50"
                } text-white placeholder-gray-600 focus:outline-none focus:ring-1 ${
                  validationErrors.email ? "focus:ring-red-500/30" : "focus:ring-gold-400/20"
                } transition-all`}
              />
              {validationErrors.email && (
                <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-400 transition-colors pointer-events-none">
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
                className={`w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border ${
                  validationErrors.password ? "border-red-500/50 focus:border-red-500/50" : "border-white/10 focus:border-gold-400/50"
                } text-white placeholder-gray-600 focus:outline-none focus:ring-1 ${
                  validationErrors.password ? "focus:ring-red-500/30" : "focus:ring-gold-400/20"
                } transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold-400 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {validationErrors.password && (
                <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {validationErrors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-xs text-gray-400 hover:text-gold-400 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-lg flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Sign In Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full relative gold-gradient text-navy-950 rounded-xl py-4 font-bold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn overflow-hidden shadow-lg shadow-gold-400/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="relative z-10">Signing in...</span>
                </>
              ) : (
                <span className="relative z-10 flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-navy-900 px-3 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleOAuthSignIn("github")}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded-xl hover:bg-white/5 hover:border-gold-400/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-white text-sm font-medium group"
            >
              {oauthLoading === "github" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Github className="w-4 h-4 group-hover:text-gold-400 transition-colors" />
                  <span>GitHub</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => handleOAuthSignIn("google")}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded-xl hover:bg-white/5 hover:border-gold-400/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-white text-sm font-medium group"
            >
              {oauthLoading === "google" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <svg className="w-4 h-4 group-hover:text-gold-400 transition-colors" viewBox="0 0 24 24">
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
        <p className="mt-8 text-center text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-gold-400 font-bold hover:text-gold-300 transition-colors">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
