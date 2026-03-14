"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ScrollReveal,
    Card,
} from "@/components/ui";
import {
    Code2,
    Terminal,
    Webhook,
    Shield,
    Zap,
    Copy,
    Check,
    ChevronDown,
    ArrowRight,
    ExternalLink,
    Key,
    Users,
    Workflow,
    Bell,
    Globe,
    Lock,
    AlertCircle,
} from "lucide-react";

const BASE_URL = "https://api.bridgeflow.agency/v1";

const ENDPOINTS = [
    {
        id: "auth",
        group: "Authentication",
        icon: Key,
        color: "text-brand-coral",
        endpoints: [
            {
                method: "POST",
                path: "/auth/token",
                description: "Exchange your API key for a short-lived access token.",
                request: `curl -X POST ${BASE_URL}/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"api_key": "bf_live_your_api_key"}'`,
                response: `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}`,
                params: [
                    { name: "api_key", type: "string", required: true, description: "Your BridgeFlow API key (starts with bf_live_ or bf_test_)" },
                ],
            },
        ],
    },
    {
        id: "workflows",
        group: "Workflows",
        icon: Workflow,
        color: "text-blue-400",
        endpoints: [
            {
                method: "GET",
                path: "/workflows",
                description: "List all workflows in your account.",
                request: `curl ${BASE_URL}/workflows \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`,
                response: `{
  "data": [
    {
      "id": "wf_01H8X2K9M3N4P5Q6R7S8T9U0V",
      "name": "Lead Qualification Pipeline",
      "status": "active",
      "trigger": "webhook",
      "executions_today": 47,
      "last_run": "2026-03-08T09:32:11Z",
      "created_at": "2026-01-15T14:22:00Z"
    }
  ],
  "total": 12,
  "page": 1,
  "per_page": 20
}`,
                params: [
                    { name: "status", type: "string", required: false, description: "Filter by status: active, paused, draft" },
                    { name: "page", type: "integer", required: false, description: "Page number (default: 1)" },
                    { name: "per_page", type: "integer", required: false, description: "Results per page (max: 100, default: 20)" },
                ],
            },
            {
                method: "POST",
                path: "/workflows/:id/trigger",
                description: "Manually trigger a workflow with custom payload data.",
                request: `curl -X POST ${BASE_URL}/workflows/wf_01H8X2K9/trigger \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "payload": {
      "name": "John Smith",
      "email": "john@example.com",
      "source": "api"
    }
  }'`,
                response: `{
  "execution_id": "ex_01H8X2K9M3N4P5Q6R7S8T9U0V",
  "workflow_id": "wf_01H8X2K9",
  "status": "running",
  "started_at": "2026-03-08T10:15:33Z"
}`,
                params: [
                    { name: "payload", type: "object", required: false, description: "Custom data to pass to the workflow" },
                    { name: "async", type: "boolean", required: false, description: "If false, waits for completion (max 30s). Default: true" },
                ],
            },
        ],
    },
    {
        id: "contacts",
        group: "Contacts",
        icon: Users,
        color: "text-emerald-400",
        endpoints: [
            {
                method: "POST",
                path: "/contacts",
                description: "Create or update a contact in BridgeFlow's CRM.",
                request: `curl -X POST ${BASE_URL}/contacts \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "jane@company.com",
    "name": "Jane Doe",
    "company": "Acme Corp",
    "tags": ["lead", "enterprise"],
    "custom_fields": {
      "budget": "$10k+",
      "source": "webinar"
    }
  }'`,
                response: `{
  "id": "ct_01H8X2K9M3N4P5Q6R7S8T9U0V",
  "email": "jane@company.com",
  "name": "Jane Doe",
  "company": "Acme Corp",
  "tags": ["lead", "enterprise"],
  "created_at": "2026-03-08T10:15:33Z",
  "updated_at": "2026-03-08T10:15:33Z"
}`,
                params: [
                    { name: "email", type: "string", required: true, description: "Contact's email address (used as unique identifier)" },
                    { name: "name", type: "string", required: false, description: "Full name" },
                    { name: "company", type: "string", required: false, description: "Company name" },
                    { name: "tags", type: "string[]", required: false, description: "Array of tag strings" },
                    { name: "custom_fields", type: "object", required: false, description: "Key-value pairs for custom data" },
                ],
            },
            {
                method: "GET",
                path: "/contacts/:id",
                description: "Retrieve a contact by ID or email address.",
                request: `curl ${BASE_URL}/contacts/ct_01H8X2K9 \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`,
                response: `{
  "id": "ct_01H8X2K9M3N4P5Q6R7S8T9U0V",
  "email": "jane@company.com",
  "name": "Jane Doe",
  "company": "Acme Corp",
  "tags": ["lead", "enterprise"],
  "workflow_history": [
    { "workflow": "Lead Qualification", "run_at": "2026-03-08T10:15:33Z", "result": "qualified" }
  ]
}`,
                params: [],
            },
        ],
    },
    {
        id: "webhooks-api",
        group: "Webhooks",
        icon: Webhook,
        color: "text-purple-400",
        endpoints: [
            {
                method: "POST",
                path: "/webhooks",
                description: "Register a webhook endpoint to receive real-time event notifications.",
                request: `curl -X POST ${BASE_URL}/webhooks \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks/bridgeflow",
    "events": ["contact.created", "workflow.completed", "workflow.failed"],
    "secret": "your-webhook-signing-secret"
  }'`,
                response: `{
  "id": "wh_01H8X2K9M3N4P5Q6R7S8T9U0V",
  "url": "https://your-app.com/webhooks/bridgeflow",
  "events": ["contact.created", "workflow.completed", "workflow.failed"],
  "status": "active",
  "created_at": "2026-03-08T10:15:33Z"
}`,
                params: [
                    { name: "url", type: "string", required: true, description: "HTTPS endpoint to receive webhook payloads" },
                    { name: "events", type: "string[]", required: true, description: "Event types to subscribe to (see Events Reference)" },
                    { name: "secret", type: "string", required: false, description: "Used to sign webhook payloads for verification" },
                ],
            },
        ],
    },
];

const EVENTS = [
    { event: "contact.created", description: "A new contact was added to the system" },
    { event: "contact.updated", description: "A contact's data was modified" },
    { event: "workflow.started", description: "A workflow execution began" },
    { event: "workflow.completed", description: "A workflow execution finished successfully" },
    { event: "workflow.failed", description: "A workflow execution encountered an error" },
    { event: "form.submitted", description: "A contact form was submitted on the website" },
];

const ERROR_CODES = [
    { code: "400", title: "Bad Request", description: "Invalid request parameters or missing required fields" },
    { code: "401", title: "Unauthorized", description: "Missing or invalid API key / access token" },
    { code: "403", title: "Forbidden", description: "Valid credentials but insufficient permissions" },
    { code: "404", title: "Not Found", description: "The requested resource does not exist" },
    { code: "429", title: "Rate Limited", description: "Too many requests — slow down and retry after the indicated delay" },
    { code: "500", title: "Server Error", description: "An unexpected error occurred on our end — we're notified automatically" },
];

const METHOD_COLORS: Record<string, string> = {
    GET: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    POST: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    PUT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    PATCH: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
};

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-xl overflow-hidden border border-white/10">
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/80 border-b border-white/10">
                <span className="text-xs text-gray-500 font-mono">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <pre className="p-4 bg-neutral-950/80 text-sm font-mono text-gray-300 overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    );
}

function EndpointCard({ endpoint }: { endpoint: any }) {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"request" | "response">("request");

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors text-left"
            >
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${METHOD_COLORS[endpoint.method]}`}>
                    {endpoint.method}
                </span>
                <code className="text-sm font-mono text-white flex-1">{endpoint.path}</code>
                <span className="text-xs text-gray-500 hidden sm:block mr-2">{endpoint.description}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="border-t border-white/10 p-4 space-y-4 bg-neutral-950/20">
                    <p className="text-sm text-gray-400">{endpoint.description}</p>

                    {endpoint.params && endpoint.params.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Parameters</h4>
                            <div className="space-y-2">
                                {endpoint.params.map((param: any) => (
                                    <div key={param.name} className="flex items-start gap-3 text-sm">
                                        <code className="text-gold-300 font-mono text-xs bg-white/5 px-2 py-0.5 rounded flex-shrink-0">{param.name}</code>
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0 ${param.required ? "bg-red-500/10 text-red-400" : "bg-gray-500/10 text-gray-500"}`}>
                                            {param.required ? "required" : "optional"}
                                        </span>
                                        <span className="text-xs text-blue-400 flex-shrink-0">{param.type}</span>
                                        <span className="text-xs text-gray-500">{param.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <div className="flex gap-2 mb-3">
                            {(["request", "response"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors capitalize ${activeTab === tab ? "bg-gold-400/10 text-brand-coral border border-gold-400/20" : "text-gray-500 hover:text-gray-300"}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <CodeBlock
                            code={activeTab === "request" ? endpoint.request : endpoint.response}
                            language={activeTab === "request" ? "bash" : "json"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ApiReferenceClient() {
    const [activeGroup, setActiveGroup] = useState<string | null>("auth");

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 aurora-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-neutral-800/50 via-neutral-950 to-neutral-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.04] rounded-full blur-3xl" />
                <div className="relative z-10 container-max text-center px-4 sm:px-6">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-brand-coral border border-gold-400/20 rounded-full bg-gold-400/5">
                            <Code2 className="w-3.5 h-3.5" />
                            Developer API
                        </span>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            BridgeFlow{" "}
                            <span className="text-brand-coral font-bold">API Reference</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed mb-8">
                            Programmatic access to BridgeFlow's automation platform. Build integrations, trigger workflows, and manage contacts via REST API.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Globe className="w-4 h-4 text-brand-coral" />
                                Base URL: <code className="text-gold-300 font-mono bg-white/5 px-2 py-0.5 rounded ml-1">{BASE_URL}</code>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Lock className="w-4 h-4 text-emerald-400" />
                                HTTPS only
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Zap className="w-4 h-4 text-blue-400" />
                                JSON responses
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Authentication Notice */}
            <section className="border-y border-white/5 bg-neutral-900/20">
                <div className="container-max px-4 sm:px-6 py-5">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-400">
                            <strong className="text-white">Authentication required.</strong> All API requests must include an{" "}
                            <code className="text-gold-300 font-mono bg-white/5 px-1.5 py-0.5 rounded text-xs">Authorization: Bearer YOUR_TOKEN</code>{" "}
                            header. Get your API key from the{" "}
                            <Link href="/admin/integrations" className="text-brand-coral hover:underline">admin dashboard</Link>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding">
                <div className="container-max px-4 sm:px-6">
                    <div className="lg:grid lg:grid-cols-[240px_1fr] gap-12">
                        {/* Sidebar */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24 space-y-1">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-3">Endpoints</h3>
                                {ENDPOINTS.map((group) => (
                                    <button
                                        key={group.id}
                                        onClick={() => setActiveGroup(group.id)}
                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${activeGroup === group.id ? "bg-gold-400/10 text-brand-coral" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        <group.icon className={`w-4 h-4 flex-shrink-0 ${activeGroup === group.id ? "text-brand-coral" : group.color}`} />
                                        {group.group}
                                    </button>
                                ))}
                                <div className="pt-4 border-t border-white/5 mt-4 space-y-1">
                                    <button
                                        onClick={() => setActiveGroup("events")}
                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${activeGroup === "events" ? "bg-gold-400/10 text-brand-coral" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        <Bell className="w-4 h-4 flex-shrink-0" />
                                        Events Reference
                                    </button>
                                    <button
                                        onClick={() => setActiveGroup("errors")}
                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${activeGroup === "errors" ? "bg-gold-400/10 text-brand-coral" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        Error Codes
                                    </button>
                                </div>
                                <div className="pt-4 border-t border-white/5 mt-4">
                                    <Link
                                        href="/docs"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Full Documentation
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* API Content */}
                        <main className="min-w-0 space-y-12">
                            {/* Quick Start */}
                            <section id="quickstart">
                                <h2 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-1 h-6 bg-gradient-to-b from-gold-400 to-amber-600 rounded-full" />
                                    Quick Start
                                </h2>
                                <p className="text-gray-400 text-sm mb-4">Make your first API call in under 60 seconds:</p>
                                <CodeBlock
                                    code={`# 1. Get your API key from the admin dashboard
# 2. Exchange it for an access token
curl -X POST ${BASE_URL}/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"api_key": "bf_live_your_api_key_here"}'

# 3. Use the token to make authenticated requests
curl ${BASE_URL}/workflows \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`}
                                    language="bash"
                                />
                            </section>

                            {/* Endpoint Groups */}
                            {ENDPOINTS.map((group) => (
                                <section key={group.id} id={group.id}>
                                    <h2 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-3">
                                        <span className="w-1 h-6 bg-gradient-to-b from-gold-400 to-amber-600 rounded-full" />
                                        {group.group}
                                    </h2>
                                    <p className="text-gray-500 text-sm mb-6">
                                        {group.id === "auth" && "Authenticate your API requests using API keys and access tokens."}
                                        {group.id === "workflows" && "List, trigger, and manage your automation workflows programmatically."}
                                        {group.id === "contacts" && "Create, read, update, and delete contacts in BridgeFlow's CRM."}
                                        {group.id === "webhooks-api" && "Register endpoints to receive real-time event notifications from BridgeFlow."}
                                    </p>
                                    <div className="space-y-3">
                                        {group.endpoints.map((endpoint, i) => (
                                            <EndpointCard key={i} endpoint={endpoint} />
                                        ))}
                                    </div>
                                </section>
                            ))}

                            {/* Events Reference */}
                            <section id="events">
                                <h2 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-3">
                                    <span className="w-1 h-6 bg-gradient-to-b from-gold-400 to-amber-600 rounded-full" />
                                    Events Reference
                                </h2>
                                <p className="text-gray-500 text-sm mb-6">Subscribe to these events when registering a webhook endpoint.</p>
                                <div className="border border-white/10 rounded-xl overflow-hidden">
                                    <div className="grid grid-cols-[1fr_2fr] text-xs font-bold uppercase tracking-wider text-gray-500 px-4 py-3 bg-neutral-900/50 border-b border-white/10">
                                        <span>Event</span>
                                        <span>Description</span>
                                    </div>
                                    {EVENTS.map((event, i) => (
                                        <div key={event.event} className={`grid grid-cols-[1fr_2fr] px-4 py-3 text-sm ${i % 2 === 0 ? "" : "bg-white/[0.01]"} border-b border-white/5 last:border-b-0`}>
                                            <code className="text-gold-300 font-mono text-xs">{event.event}</code>
                                            <span className="text-gray-400">{event.description}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Error Codes */}
                            <section id="errors">
                                <h2 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-3">
                                    <span className="w-1 h-6 bg-gradient-to-b from-gold-400 to-amber-600 rounded-full" />
                                    Error Codes
                                </h2>
                                <p className="text-gray-500 text-sm mb-6">All errors return a JSON body with <code className="text-gold-300 font-mono bg-white/5 px-1.5 py-0.5 rounded text-xs">error</code> and <code className="text-gold-300 font-mono bg-white/5 px-1.5 py-0.5 rounded text-xs">message</code> fields.</p>
                                <div className="space-y-3">
                                    {ERROR_CODES.map((err) => (
                                        <div key={err.code} className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.01]">
                                            <span className={`text-sm font-bold font-mono px-2.5 py-1 rounded-lg flex-shrink-0 ${parseInt(err.code) >= 500 ? "bg-red-500/10 text-red-400" : parseInt(err.code) >= 400 ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                                                {err.code}
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{err.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{err.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Rate Limits */}
                            <section id="rate-limits">
                                <h2 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-1 h-6 bg-gradient-to-b from-gold-400 to-amber-600 rounded-full" />
                                    Rate Limits
                                </h2>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {[
                                        { plan: "Starter", limit: "100 req/min", color: "border-gray-500/20" },
                                        { plan: "Growth", limit: "500 req/min", color: "border-blue-500/20" },
                                        { plan: "Enterprise", limit: "Unlimited", color: "border-gold-400/20" },
                                    ].map((tier) => (
                                        <div key={tier.plan} className={`p-4 rounded-xl border ${tier.color} bg-white/[0.01] text-center`}>
                                            <p className="text-sm font-semibold text-white mb-1">{tier.plan}</p>
                                            <p className="text-xs text-gray-400">{tier.limit}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-4">
                                    Rate limit headers are included in every response: <code className="text-gold-300 font-mono bg-white/5 px-1.5 py-0.5 rounded">X-RateLimit-Limit</code>, <code className="text-gold-300 font-mono bg-white/5 px-1.5 py-0.5 rounded">X-RateLimit-Remaining</code>, <code className="text-gold-300 font-mono bg-white/5 px-1.5 py-0.5 rounded">X-RateLimit-Reset</code>.
                                </p>
                            </section>

                            {/* CTA */}
                            <div className="p-8 rounded-2xl glass border border-white/10 text-center">
                                <Shield className="w-8 h-8 text-brand-coral mx-auto mb-4" />
                                <h3 className="text-xl font-display font-bold text-white mb-2">Need API access?</h3>
                                <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                                    API access is available for BridgeFlow clients. Get your API key from the admin dashboard or contact our team.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider bg-brand-coral text-neutral-950 font-bold text-neutral-950 rounded-xl hover:shadow-[0_0_25px_rgba(230,180,34,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                                    >
                                        Request API Access
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="/docs"
                                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
                                    >
                                        View Full Docs
                                    </Link>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
}
