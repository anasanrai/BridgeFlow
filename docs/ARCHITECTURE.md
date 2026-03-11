# BridgeFlow Architecture & Design Patterns

**Last Updated:** March 11, 2026  
**Version:** 1.0

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Components](#core-components)
5. [Data Flow](#data-flow)
6. [Authentication & Authorization](#authentication--authorization)
7. [Database Schema](#database-schema)
8. [API Architecture](#api-architecture)
9. [Payment Processing](#payment-processing)
10. [Integration Points](#integration-points)

---

## System Overview

BridgeFlow is a **Next.js 14-based SaaS platform** for workflow automation services. It provides:

- **Public Landing Site** - Marketing pages showcasing services, case studies, and templates
- **Admin Dashboard** - Content and configuration management
- **Template Marketplace** - Downloadable automation templates with payment processing
- **Payment Processing** - Support for PayPal, Stripe, and Bank Transfers
- **Integration Hub** - Connections to n8n, Telegram, and other services

### Key Features
- Dark-mode premium UI with Framer Motion animations
- Real-time template discovery with search
- Multi-currency payment support
- Admin dashboard with SQLite-backed content management
- Webhook handling for payment confirmations
- Rate-limited API endpoints

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14.2.35
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.19 + PostCSS
- **Animations**: Framer Motion 12.34.3
- **Icons**: Lucide React 0.575.0
- **Forms**: React Hook Form 7.71.2
- **Search**: Fuse.js 7.1.0
- **Visualization**: Recharts 3.7.0, React Flow 11.11.4

### Backend
- **Runtime**: Next.js API Routes (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (CNAME: vercel CDN)
- **Auth**: Supabase + Jose JWT (6.1.3)
- **Rate Limiting**: Upstash Redis

### External Services
- **Payments**: PayPal, Stripe
- **Email**: Nodemailer 8.0.1
- **AI**: Replicate (for image enhancement)
- **Automation**: n8n (workflow cloud)
- **Webhooks**: Moyasar, Stripe payment confirmations

### DevOps
- **Deployment**: Vercel (Edge Functions)
- **Containerization**: Docker + docker-compose
- **Package Manager**: pnpm
- **Build Tool**: Next.js built-in
- **Linting**: ESLint 8.57.0
- **TypeScript**: 5.9.3

---

## Project Structure

```
BridgeFlow/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (routes)/
│   │   │   ├── page.tsx              # Home page
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── pricing/
│   │   │   ├── templates/
│   │   │   ├── blog/
│   │   │   ├── case-studies/
│   │   │   ├── contact/
│   │   │   ├── audit/                # Free audit page
│   │   │   ├── how-it-works/
│   │   │   ├── careers/              # Career opportunities
│   │   │   ├── calculator/           # ROI calculator
│   │   │   ├── docs/                 # Documentation
│   │   │   └── legal/                # Privacy, Terms, etc.
│   │   │
│   │   ├── api/                      # API Routes
│   │   │   ├── admin/                # Admin-only endpoints
│   │   │   │   ├── auth/             # Admin authentication
│   │   │   │   ├── ai/               # AI image enhancement
│   │   │   │   ├── content/          # Dynamic content management
│   │   │   │   ├── settings/         # Site settings
│   │   │   │   ├── templates/        # Template CRUD
│   │   │   │   ├── payments/         # Payment data
│   │   │   │   ├── purchases/        # Purchase history
│   │   │   │   └── upload/           # File uploads
│   │   │   ├── public/
│   │   │   │   ├── contact/          # Contact form handler
│   │   │   │   ├── careers/          # Career applications
│   │   │   │   ├── newsletter/       # Newsletter signup
│   │   │   │   ├── audit/            # Audit request handler
│   │   │   │   ├── chat/             # Chat widget backend
│   │   │   │   ├── templates/        # Template data endpoint
│   │   │   │   ├── checkout/         # Checkout initiation
│   │   │   │   └── telemetry/        # Analytics tracking
│   │   │   └── webhooks/             # Payment webhooks
│   │   │       ├── stripe/
│   │   │       └── moyasar/
│   │   │
│   │   ├── admin/                    # Admin section
│   │   │   ├── (dashboard)/          # Admin dashboard routes
│   │   │   │   ├── dashboard/        # Overview
│   │   │   │   ├── templates/        # Template management
│   │   │   │   ├── blog/             # Blog management
│   │   │   │   ├── case-studies/
│   │   │   │   ├── payments/         # Payment history
│   │   │   │   ├── subscribers/      # Newsletter subs
│   │   │   │   ├── contacts/         # Lead management
│   │   │   │   ├── media/            # Asset management
│   │   │   │   ├── activity/         # Audit logs
│   │   │   │   ├── settings/         # Site config
│   │   │   │   └── seo/              # SEO management
│   │   │   └── page.tsx              # Admin login
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   ├── error.tsx                 # Error boundary
│   │   ├── not-found.tsx             # 404 handler
│   │   ├── globals.css               # Global styles
│   │   ├── animations.css            # Reusable animations
│   │   ├── sitemap.ts                # Dynamic sitemap
│   │   └── robots.ts                 # SEO robots.txt
│   │
│   ├── components/                   # Reusable React components
│   │   ├── admin/                    # Admin-specific components
│   │   ├── blog/                     # Blog components
│   │   ├── templates/                # Template marketplace components
│   │   ├── payments/                 # Payment widgets (consolidated)
│   │   ├── ui/                       # Shared UI library
│   │   └── [shared components]       # Root-level shared components
│   │
│   ├── data/                         # Static & config data
│   │   ├── home.ts                   # Homepage data & copy
│   │   ├── services.ts               # Services overview
│   │   ├── pricing.ts                # Pricing data
│   │   ├── blog.ts                   # Blog metadata
│   │   ├── case-studies.ts           # Case study data
│   │   ├── templates.ts              # Template type definitions
│   │   ├── templates.json            # Template catalog (367 lines)
│   │   └── site.ts                   # Site-wide config
│   │
│   ├── lib/                          # Utility libraries & services
│   │   ├── supabase.ts               # Supabase client
│   │   ├── supabase-data.ts          # Database queries
│   │   ├── n8n.ts                    # n8n API integration
│   │   ├── logger.ts                 # Structured logging
│   │   ├── rate-limit.ts             # Upstash rate limiting
│   │   ├── webhooks.ts               # Webhook handlers
│   │   ├── telegram.ts               # Telegram notifications
│   │   └── packages.ts               # Package calculations
│   │
│   ├── utils/                        # Helper utilities
│   │   └── supabase/
│   │       ├── client.ts             # Client-side Supabase
│   │       └── server.ts             # Server-side Supabase
│   │
│   └── middleware.ts                 # Next.js middleware
│
├── public/
│   └── images/                       # Static assets
│       ├── templates/                # Template screenshots
│       ├── workflows/                # Workflow diagrams
│       └── [og images]
│
├── supabase/
│   ├── migrations/                   # Database migrations
│   │   ├── 20260306_create_templates.sql
│   │   ├── 20260309_create_orders.sql
│   │   ├── 20260309_fix_schema.sql
│   │   └── 20260310_enhance_schema.sql
│   └── backups/                      # Schema backups (archived)
│
├── docs/                             # Documentation (NEW)
│   ├── ARCHITECTURE.md               # This file
│   ├── API.md                        # API reference
│   ├── DEPLOYMENT.md                 # Deployment guide
│   ├── CONTRIBUTING.md               # Contribution guidelines
│   ├── TROUBLESHOOTING.md            # Common issues
│   └── archived/
│       ├── HANDOVER_NOTES.md
│       └── IMPROVEMENT_REPORT.md
│
├── next.config.js                    # Next.js configuration
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind configuration
├── postcss.config.js                 # PostCSS config
├── package.json                      # Dependencies
├── pnpm-lock.yaml                    # Dependency lock file
├── .env.example                      # Environment variables template
├── .eslintrc.json                    # ESLint configuration
├── CHANGELOG.md                      # Version history (NEW)
├── README.md                         # Project overview
└── Dockerfile                        # Container configuration
```

---

## Core Components

### Layout Components
- **LayoutShell.tsx** - Main page wrapper with navbar, footer, chat widget
- **Navbar.tsx** - Navigation header with theme toggle
- **Footer.tsx** - Site footer with links and info
- **BackToTop.tsx** - Scroll-to-top button

### Page-Specific Components

#### Marketing Pages
- **ParticleBackground.tsx** - Animated background effect
- **TestimonialsSection.tsx** - Client testimonials
- **RotatingHeadline.tsx** - Dynamic headline animation
- **LiveDemos.tsx** - Embedded demo showcase
- **CalendlyEmbed.tsx** - Calendar booking widget

#### Templates Marketplace
- **TemplateCard.tsx** - Single template card with purchase button
- **FilterBar.tsx** - Search and filter controls
- **WorkflowDiagram.tsx** - Visual workflow representation
- **N8nCanvas.tsx** - Embedded workflow canvas display
- **TemplateActions.tsx** - Download/purchase action buttons

#### Admin Dashboard
- **AdminSidebar.tsx** - Navigation menu
- **AdminAI.tsx** - AI integration panel
- **AnalyticsCharts.tsx** - Dashboard metrics
- **AdminTemplateForm.tsx** - Template editor

#### Forms & Input
- **ContactForm.tsx** - Contact request form
- **ChatWidget.tsx** - AI chat interface
- **Search.tsx** - Global search component

#### Payment & Checkout
- **PaymentModal.tsx** - Multi-method payment modal (572 lines)
  - PayPal integration
  - Stripe support
  - Bank transfer details
  - Crypto wallet options
  - Multiple currency support
- **PayPalButton.tsx** - PayPal button wrapper
- **TemplatePurchaseButton.tsx** - Template purchase trigger
- **PricingCard.tsx** - Pricing plan display

---

## Data Flow

### Frontend → Backend
```
User Action
    ↓
React Component (state update)
    ↓
API Call to /api/[resource]
    ↓
Route Handler (src/app/api/[route]/route.ts)
    ↓
Business Logic (lib/, utils/)
    ↓
Supabase Query or External Service
    ↓
Response JSON
    ↓
Component State Update + UI Render
```

### Example: Template Purchase
```
1. User clicks purchase in TemplateCard
2. TemplatePaymentModal opens
3. User selects payment method & submits
4. POST /api/admin/templates/process-image
   → Validates purchase
   → Creates order in Supabase
   → Triggers payment processing
5. Webhook response (Stripe/Moyasar)
   → Updates order status
   → Sends confirmation email
6. Client-side notified via callback
7. Template marked as purchased
```

---

## Authentication & Authorization

### Admin Panel
- **Method**: Session-based with JWT tokens (Jose)
- **Storage**: Supabase Auth + `supabase_service_role_key`
- **Protection**: Middleware checks admin middleware.ts
- **Routes**: `/admin` requires valid authentication
- **Session**: Stored in secure HTTP-only cookies

### Public API Endpoints
- **Rate Limiting**: Upstash Redis (see lib/rate-limit.ts)
- **Default Limits**:
  - Contact form: 5 per hour per IP
  - Newsletter signup: 10 per day per IP
  - Chat: 30 per hour per user
- **Webhook Verification**: HMAC signatures for payment webhooks

---

## Database Schema

### Main Tables (Supabase PostgreSQL)

**templates**
```sql
id (UUID)
name (text)
slug (text, unique)
description (text)
image_url (text)
price (integer, cents)
difficulty (enum: beginner/intermediate/advanced)
categories (array)
nodes (array)
setup_time (text)
value (integer)
created_at (timestamp)
updated_at (timestamp)
```

**orders**
```sql
id (UUID)
user_email (text)
template_id (UUID, foreign key)
payment_method (enum: paypal/stripe/bank/crypto)
amount (integer, cents)
currency (text)
status (enum: pending/completed/failed/refunded)
transaction_id (text)
metadata (jsonb)
created_at (timestamp)
completed_at (timestamp)
```

**subscribers**
```sql
id (UUID)
email (text, unique)
subscribed_at (timestamp)
verified (boolean)
```

**site_config**
```sql
key (text, primary key)
value (jsonb)
updated_at (timestamp)
```

### Storage
- **Supabase Storage Bucket**: `template-images`
  - Stores template preview images
  - Public read-only access
  - CDN: Vercel edge network

---

## API Architecture

### Route Organization

**Admin Routes** (`/api/admin/*`, requires auth)
- `POST /api/admin/auth` - Login/logout
- `GET/POST /api/admin/content/[section]` - Content management
- `GET/POST /api/admin/settings` - Site configuration
- `GET/POST /api/admin/templates` - Template CRUD
- `POST /api/admin/templates/process-image` - Image processing
- `POST /api/admin/templates/save-workflow` - Workflow storage
- `POST /api/admin/upload` - File upload handling
- `POST /api/admin/payments` - Payment data retrieval
- `POST /api/admin/ai` - AI-powered features

**Public Routes** (`/api/*`, rate-limited)
- `POST /api/contact` - Contact form handler
- `POST /api/careers` - Job application handler
- `POST /api/newsletter` - Newsletter signup
- `POST /api/audit` - Free audit request
- `POST /api/chat` - Chat widget messages
- `GET /api/templates` - Template catalog listing
- `GET /api/templates/[slug]/download` - Template download
- `POST /api/checkout` - Checkout initialization

**Payment Routes**
- `POST /api/paypal/create-order` - PayPal order creation
- `POST /api/paypal/capture-order` - PayPal payment capture
- `POST /api/webhooks/stripe` - Stripe webhook handler
- `POST /api/webhooks/moyasar` - Moyasar webhook handler

**Integration Routes**
- `GET /api/n8n/workflow/[id]` - n8n workflow data
- `POST /api/telemetry` - Analytics events

### Error Handling Pattern
```typescript
// Standard response format
{
  success: boolean
  data?: T
  error?: string
  code?: string
  timestamp: number
}

// Error codes
- AUTH_REQUIRED
- RATE_LIMITED
- VALIDATION_ERROR
- PAYMENT_FAILED
- INTERNAL_ERROR
```

---

## Payment Processing

### Supported Methods
1. **PayPal** - Primary payment processor
2. **Stripe** - Credit card payments
3. **Bank Transfer** - Wire transfers (manual)
4. **Crypto Wallets** - USDT, others
5. **Regional Services** - Moyasar, etc.

### Flow
```
1. User selects payment method
2. PaymentModal opens payment interface
3. User completes payment
4. Payment service returns order ID
5. Webhook received & order status updated
6. Email confirmation sent
7. Admin dashboard updated in real-time
```

### Webhook Security
- Supabase as webhook receiver (configured in payment provider)
- HMAC signature verification
- Idempotent processing (check existing order IDs)
- Retry logic for failed updates

---

## Integration Points

### External Services
- **Supabase** - Database & Auth
- **Vercel** - Deployment & Edge Functions
- **PayPal SDK** - Payment processing
- **Stripe API** - Credit card payments
- **n8n Cloud** - Workflow automation templates
- **Replicate API** - Image enhancement (AI)
- **Telegram Bot API** - Admin notifications
- **Nodemailer** - Email delivery
- **Upstash Redis** - Rate limiting & caching

### Environment Configuration
See `.env.example` for all required variables.

---

## Performance Optimizations

### Frontend
- **Image Optimization**: Next.js Image component with optimization
- **Code Splitting**: Dynamic imports for large components
- **Caching**: Static generation where possible
- **Animations**: GPU-accelerated with Framer Motion

### Backend
- **Rate Limiting**: Prevent abuse on public endpoints
- **Database Indexing**: Optimized Supabase indexes
- **Connection Pooling**: Supabase manages pooling
- **Webhooks**: Async processing to prevent blocking

---

## Development Workflow

### Local Setup
1. Clone repository
2. Copy `.env.example` to `.env.local`
3. Fill in Supabase & payment credentials
4. Run `pnpm install`
5. Run `pnpm dev` for local dev server
6. Visit `http://localhost:3000`

### Code Standards
- **TypeScript**: Full type safety required
- **ESLint**: Enforced via npm scripts
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Comments**: JSDoc for public functions/components

### Testing
- Manual testing in dev environment
- Staging environment prior to production
- Payment tests use sandbox credentials

---

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Hosted On
- **Platform**: Vercel (serverless)
- **Database**: Supabase (PostgreSQL)
- **CDN**: Vercel Edge Network
- **Custom Domain**: bridgeflow.agency

---

## Security Considerations

- **Environment Variables**: Never commit `.env.local`
- **API Keys**: Rotate regularly, use Vercel secrets
- **Database**: Row-level security (RLS) enabled
- **CORS**: Restricted to bridgeflow.agency
- **Headers**: Security headers configured
- **Rate Limits**: Prevent brute-force attacks
- **Webhooks**: HMAC verification required

---

## Future Enhancements

- [ ] GraphQL API layer
- [ ] Advanced analytics dashboard
- [ ] Multi-vendor support
- [ ] Affiliate program system
- [ ] API documentation portal
- [ ] Mobile app
- [ ] Internationalization (i18n)

---

**For questions or updates, contact:** [dev@bridgeflow.agency](mailto:dev@bridgeflow.agency)
