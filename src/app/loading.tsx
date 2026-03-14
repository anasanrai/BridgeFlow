export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950">
            <div className="text-center">
                {/* Animated logo pulse */}
                <div className="relative w-16 h-16 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-2xl bg-brand-coral animate-pulse opacity-20 blur-md" />
                    <div className="absolute inset-1 rounded-[14px] bg-neutral-900 border border-white/5 flex items-center justify-center">
                        <span className="text-lg font-black tracking-tighter text-brand-coral">BF</span>
                    </div>
                </div>

                {/* Shimmer bars */}
                <div className="space-y-3 max-w-xs mx-auto">
                    <div className="h-3 bg-white/5 rounded-full animate-shimmer" />
                    <div className="h-3 bg-white/5 rounded-full animate-shimmer w-3/4 mx-auto" style={{ animationDelay: '0.15s' }} />
                    <div className="h-3 bg-white/5 rounded-full animate-shimmer w-1/2 mx-auto" style={{ animationDelay: '0.3s' }} />
                </div>

                <p className="text-[11px] text-neutral-500 font-black uppercase tracking-[0.2em] mt-8">Establishing Connection</p>
            </div>
        </div>
    );
}
