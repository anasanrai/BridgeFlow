import { Metadata } from "next";
import { ScrollReveal, Card } from "@/components/ui";
import { siteConfig } from "@/data/site";
import { 
    Code2, 
    Terminal, 
    Webhook, 
    Shield, 
    Zap, 
    Copy, 
    Check, 
    ChevronRight, 
    ArrowRight,
    Key,
    Users,
    Workflow,
    Lock
} from "lucide-react";

export const metadata: Metadata = {
    title: `API Reference | ${siteConfig.name}`,
    description: `Programmatic access to the ${siteConfig.name} automation platform.`,
};

const BASE_URL = "https://api.bridgeflow.agency/v1";

const ENDPOINTS = [
    {
        id: "auth",
        group: "Authentication",
        icon: Key,
        color: "text-gold-400",
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
            },
        ],
    },
];

export default function APIReferencePage() {
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="container-max px-4 sm:px-6">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-400/20 mb-6">
                            <Code2 className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Developer Hub</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            API <span className="gold-text">Reference</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Integrate BridgeFlow directly into your software stack with our powerful REST API.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="max-w-5xl mx-auto space-y-24">
                    {ENDPOINTS.map((section, idx) => (
                        <ScrollReveal key={section.id} delay={idx * 0.1}>
                            <div className="grid lg:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                            <section.icon className={`w-5 h-5 ${section.color}`} />
                                        </div>
                                        <h2 className="text-2xl font-display font-bold text-white">{section.group}</h2>
                                    </div>
                                    
                                    {section.endpoints.map((endpoint) => (
                                        <div key={endpoint.path} className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs font-bold px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20`}>
                                                    {endpoint.method}
                                                </span>
                                                <code className="text-sm font-mono text-gray-300">{endpoint.path}</code>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {endpoint.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="glass rounded-2xl overflow-hidden border border-white/10">
                                        <div className="bg-navy-900/50 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Request</span>
                                            <Terminal className="w-3.5 h-3.5 text-gray-500" />
                                        </div>
                                        <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto bg-navy-950/50">
                                            <code>{section.endpoints[0].request}</code>
                                        </pre>
                                    </div>
                                    
                                    <div className="glass rounded-2xl overflow-hidden border border-white/10">
                                        <div className="bg-navy-900/50 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Response</span>
                                            <div className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                            </div>
                                        </div>
                                        <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto bg-navy-950/50">
                                            <code>{section.endpoints[0].response}</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
