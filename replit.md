# BridgeFlow Agency Website

## Overview
A professional agency website for BridgeFlow Agency, an AI Automation & Workflow Engineering company. Built with React, Express, and Tailwind CSS featuring a premium dark theme design with light mode support.

## Current State
The website is production-ready with:
- Homepage with hero section, dashboard mockup, "60-second lead response" messaging
- Solutions page with four service categories (Foundation, Implementation, Productized, Retainers)
- How It Works page with 6-step delivery process
- About page with founder story, values, and differentiators
- Pricing page with transparent tier pricing
- Contact page with comprehensive lead qualification form
- Dark/Light theme toggle with localStorage persistence
- BridgeFlow logo integrated in navigation and footer
- SEO meta tags on all pages
- Custom favicon
- Error boundary for graceful error handling
- Enhanced 404 page with navigation

## Project Architecture

### Frontend (client/)
- **Framework**: React with Vite
- **Routing**: Wouter for client-side navigation
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: TanStack React Query for server state
- **Theme**: Dark/Light mode with ThemeProvider and localStorage sync

### Backend (server/)
- **Framework**: Express.js
- **Storage**: In-memory storage (MemStorage)
- **API**: RESTful endpoints for contact form

### Key Files
- `client/src/App.tsx` - Main app component with routing, ThemeProvider, and ErrorBoundary
- `client/src/index.css` - Design system tokens (colors, spacing)
- `client/src/hooks/use-seo.ts` - SEO hook for page meta tags
- `client/src/components/` - Shared components (Navigation, Footer, ThemeProvider, ErrorBoundary, skeleton-loader)
- `client/src/pages/` - Page components (Home, Solutions, Pricing, HowItWorks, About, Contact, NotFound)
- `server/routes.ts` - API endpoints
- `server/storage.ts` - In-memory storage with contact submissions
- `shared/schema.ts` - Data schemas and Zod validation

## Design System

### Colors (Dark Theme Primary)
- Background: Deep navy (`222 25% 8%`)
- Primary: Sky blue (`203 89% 53%`)
- Accent: Emerald green (`165 82% 40%`)
- Cards: Slightly elevated navy (`222 22% 11%`)

### Colors (Light Theme)
- Background: Light gray (`220 16% 96%`)
- Primary: Sky blue (`203 89% 53%`)
- Accent: Emerald green (`165 82% 40%`)
- Cards: White (`0 0% 100%`)

### Typography
- Sans: Inter, Plus Jakarta Sans
- Mono: JetBrains Mono, Fira Code

## API Endpoints

### POST /api/contact
Submit a contact/consultation request.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "email": "string",
  "interest": "lead-automation" | "ai-agents" | "crm-automation" | "full-system" | "consultation",
  "budgetRange": "under-1k" | "1k-3k" | "3k-5k" | "5k-10k" | "10k-plus",
  "contactMethod": "email" | "phone" | "sms" | "whatsapp",
  "bestTime": "morning" | "afternoon" | "evening" | "anytime"
}
```

### GET /api/contact
Retrieve all contact submissions (for admin use).

## Recent Changes
- January 2026: Initial implementation with all 6 pages
- January 2026: Dark/light theme toggle with ThemeProvider and localStorage persistence
- January 2026: Homepage redesign with dashboard mockup and "60-second response" messaging
- January 2026: Contact form redesign with firstName, lastName, phone, interest, budget, contact method, best time fields
- January 2026: Integrated BridgeFlow logo (gold B mark with text)
- January 2026: Added SEO meta tags (useSEO hook) to all pages
- January 2026: Custom favicon from BridgeFlow logo
- January 2026: Enhanced 404 page with navigation links
- January 2026: Global ErrorBoundary component
- January 2026: Skeleton loading components
- January 2026: Image optimization (eager loading for above-fold hero, async decoding)

## User Preferences
- Premium, execution-focused design (no AI hype)
- Dark professional palette with light mode option
- Clean typography and system diagram visuals
- Direct, non-hype tone of voice
- BridgeFlow logo with gold B mark
