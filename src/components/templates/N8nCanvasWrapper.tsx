"use client";
import dynamic from "next/dynamic";

const N8nCanvas = dynamic(() => import("./N8nCanvas"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center bg-navy-950/60 rounded-xl" style={{ height: 500 }}>
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-600 text-xs">Loading workflow canvas...</p>
            </div>
        </div>
    ),
});

export default N8nCanvas;
