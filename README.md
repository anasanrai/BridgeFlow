# BridgeFlow — Unified SaaS Automation Platform

BridgeFlow is a production-ready, modular SaaS platform designed to power elite automation agencies and AI-driven products. Built with Next.js 14, Supabase, and n8n, it offers a secure, scalable, and multi-tenant environment for managing automations, AI agents, and client ecosystems.

## 🚀 Unified Product Suite

BridgeFlow serves as the core platform for a specialized product ecosystem:

- **BridgeFlow Agency**: Manage client automations and lead capture systems.
- **Cashpilot (AI CFO)**: Financial intelligence and real-time cash flow forecasting.
- **n8n Galaxy**: Enterprise-grade fleet management for n8n automations.
- **AI Agent Framework**: Multi-provider agent execution with tool-calling support.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, Server Actions, Standalone Output)
- **Database & Auth**: Supabase (PostgreSQL, RLS, Edge Auth)
- **Automation**: n8n (Custom Service Layer)
- **Payments**: Stripe (Subscriptions & One-off), PayPal, Moyasar
- **AI**: Unified Provider Chain (OpenAI, Gemini, Replicate)
- **Deployment**: Docker (Production-optimized), Vercel

## 🏗 Modular Architecture

The platform follows a strict modular structure to ensure maintainability and scalability:

```bash
src/
├── app/             # Next.js App Router (Products & Dashboard Groups)
├── components/      # Shared UI & Modular Dashboard Shell
├── hooks/           # Platform-wide state & Auth hooks
├── lib/             # Core utilities & API response helpers
├── modules/         # Domain-driven logic (Auth, Billing, AI)
├── services/        # Third-party integrations (Supabase, Stripe, n8n)
└── types/           # Centralized TypeScript definitions
```

## 🔒 Security First

- **Admin Hardening**: JWT-based auth guards on all sensitive routes.
- **Data Isolation**: Row Level Security (RLS) for multi-tenant workspace protection.
- **Secret Management**: Zero hardcoded secrets; strictly environment-managed.
- **Rate Limiting**: Integrated Upstash/MemoryStore rate limiting for API protection.

## 🔧 Getting Started

### Local Development

1. **Clone & Install**:
   ```bash
   git clone https://github.com/anasanrai/BridgeFlow
   npm install
   ```
2. **Setup Env**: Copy `.env.example` to `.env.local` and populate required keys.
3. **Run**:
   ```bash
   npm run dev
   ```

### Docker Production

1. **Build & Run**:
   ```bash
   docker-compose up --build
   ```
   The application will be available at `http://localhost:3000`.

## 📜 Database Schema

The core SaaS schema is defined in `supabase-schema.sql`. It includes:
- `organizations` & `memberships` (Multi-tenancy)
- `projects` & `automations` (Workflow Management)
- `subscriptions` & `purchases` (Monetization)
- `profiles` & `leads` (Identity & CRM)

## 🤝 Contributing

BridgeFlow is built for scale. When contributing, please follow the domain-driven modular patterns established in Phase 1 of the architecture refactor.
