"use client";
import dynamic from "next/dynamic";

/**
 * WorkflowCanvasWrapper
 * ────────────────────────────────────────────────
 * Dynamically imports the React Flow WorkflowCanvas (live API-based).
 * Used on the template detail page /templates/[slug].
 *
 * For the listing page and admin table (compact SVG previews),
 * import N8nCanvas directly from ./N8nCanvas instead.
 */
const WorkflowCanvas = dynamic(() => import("@/components/WorkflowCanvas"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center rounded-xl" style={{ height: 500, background: "#0a0a0f" }}>
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-600 text-xs font-semibold">Loading live workflow...</p>
            </div>
        </div>
    ),
});

export default WorkflowCanvas;
