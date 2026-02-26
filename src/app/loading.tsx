export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-navy-950">
            <div className="text-center">
                {/* Animated logo pulse */}
                <div className="relative w-16 h-16 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-2xl gold-gradient animate-pulse opacity-30" />
                    <div className="absolute inset-1 rounded-xl bg-navy-950 flex items-center justify-center">
                        <span className="text-lg font-display font-bold gold-text">BF</span>
                    </div>
                </div>

                {/* Shimmer bars */}
                <div className="space-y-3 max-w-xs mx-auto">
                    <div className="h-3 bg-white/5 rounded-full animate-shimmer" />
                    <div className="h-3 bg-white/5 rounded-full animate-shimmer w-3/4 mx-auto" style={{ animationDelay: '0.15s' }} />
                    <div className="h-3 bg-white/5 rounded-full animate-shimmer w-1/2 mx-auto" style={{ animationDelay: '0.3s' }} />
                </div>

                <p className="text-xs text-gray-600 uppercase tracking-widest mt-8 font-medium">Loading</p>
            </div>
        </div>
    );
}
