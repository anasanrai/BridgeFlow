# BridgeFlow - Enterprise SaaS Foundation

BridgeFlow is a high-performance, scalable SaaS ecosystem built with Next.js 14, Supabase, and TypeScript. This repository serves as the production-ready foundation for AI automation tools, internal dashboards, and micro-SaaS products.

## 🏗 Architecture Overview

The project follows a modular, enterprise-grade directory structure:

- **`src/app/(marketing)`**: SEO-optimized marketing pages (Home, Pricing, About, etc.)
- **`src/app/dashboard`**: Protected user dashboard with layout shell.
- **`src/app/api`**: Structured API routes (Auth, Billing, Automation, Webhooks).
- **`src/components/ui`**: Atomic design system components (Button, Card, Modal, etc.)
- **`src/components/marketing`**: Domain-specific marketing components.
- **`src/components/dashboard`**: Dashboard-specific UI (Sidebar, Navbar).
- **`src/modules`**: Domain-specific logic and business services.
- **`src/lib`**: Shared services (Supabase, Auth, Logger).
- **`src/hooks & src/utils`**: Reusable logic and helper functions.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Auth & Database**: Supabase (@supabase/ssr)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Infrastructure**: Docker & Docker Compose

## 🛠 Getting Started

### 1. Prerequisites
- Node.js 18+
- pnpm / npm
- Supabase Account

### 2. Environment Setup
Copy the example environment file and fill in your credentials:
```bash
cp .env.example .env.local
```

### 3. Installation
```bash
pnpm install
```

### 4. Development
```bash
pnpm dev
```

## 🐳 Docker Production Setup

Build and run the production container:
```bash
docker-compose up --build
```
The application will be available at `http://localhost:3000`.

## 📜 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run typecheck`: Run TypeScript compiler check
- `npm run format`: Format code with Prettier

## 🔒 Security
- **Auth**: sessions are handled via Supabase Auth with PKCE flow.
- **Middleware**: Routes under `/dashboard` and API routes under `/api/private` are protected.
- **Environment**: Sensitive keys are kept on the server and never exposed to the client.

---
Built by [BridgeFlow Team](https://bridgeflow.com)
