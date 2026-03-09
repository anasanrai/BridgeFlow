/**
 * =============================================
 *  TEMPLATES CONFIG — Type definitions, color maps,
 *  and helper to load from templates.json.
 * =============================================
 */

import templatesData from "./templates.json";

export interface Template {
    id: string;
    name: string;
    slug: string;
    categories: string[];
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    nodes: string[];
    nodeCount: number;
    setupTime: string;
    value: number;
    description: string;
    longDescription?: string;
    whatItDoes: string[];
    featured: boolean;
    status: "published" | "draft";
    n8nWorkflowId: string;
    order: number;
    updatedAt?: string;
    /** Raw n8n workflow JSON — stored after admin upload */
    workflowJson?: Record<string, any> | null;
}

/** Load and sort templates from JSON (sorted by order field) */
export const templates: Template[] = (templatesData as Template[]).sort(
    (a, b) => (a.order || 0) - (b.order || 0)
);

/** Only published templates */
export const publishedTemplates: Template[] = templates.filter(
    (t) => t.status === "published"
);

/** All unique categories across all templates */
export const templateCategories = [
    "All",
    "Real Estate",
    "AI-Powered",
    "Lead Management",
    "CRM",
    "Communication",
    "Marketing",
    "Operations",
] as const;

export type TemplateCategory = (typeof templateCategories)[number];

/** Color map for category badges */
export const categoryColors: Record<string, string> = {
    "Real Estate": "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    "AI-Powered": "bg-purple-500/15 text-purple-400 border-purple-500/20",
    "Lead Management": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    "CRM": "bg-orange-500/15 text-orange-400 border-orange-500/20",
    "Communication": "bg-blue-500/15 text-blue-400 border-blue-500/20",
    "Marketing": "bg-pink-500/15 text-pink-400 border-pink-500/20",
    "Operations": "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

/** Color map for difficulty badges */
export const difficultyColors: Record<string, string> = {
    "Beginner": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    "Intermediate": "bg-amber-500/15 text-amber-400 border-amber-500/20",
    "Advanced": "bg-red-500/15 text-red-400 border-red-500/20",
};
