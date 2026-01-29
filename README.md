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

## Animation System
The website includes a comprehensive animation system for a "live" feel:

### CSS Animations (index.css)
- `.text-gradient-animated`: Shimmer effect on gradient text headings
- `.text-gradient-gold`: Golden shimmer effect for key metrics (60 Seconds, 24/7)
- `.card-glow`: Subtle box-shadow glow on hover (no layout shift)
- `.animate-float`: Floating animation for background orbs
- `.animate-pulse-glow`: Pulsing glow using pseudo-element with opacity/transform
- `.animate-breathe`: Slow breathing scale animation
- `.clip-triangle`: Triangle clip path for parallax shapes

### Animation Components (client/src/components/animated-text.tsx)
- `TypewriterText`: Rotating tagline with typing effect and blinking cursor
- `AnimatedCounter`: Count-up animation from 0 to target value, triggers when in view
- `InfiniteMarquee`: Horizontal scrolling text/logo banner (infinite loop)
- `GlowingText`: Text with animated glow effect (supports gold variant)
- `ParallaxShape`: Floating decorative shapes with opacity/transform animations
- `TiltCard`: 3D tilt effect on hover (available but not used for simplicity)

### Other Components
- `LiveStatus`: Pulsing green dot with status text (client/src/components/live-status.tsx)
- `FloatingOrb`: Framer Motion animated background decorative elements
- `AnimatedSection`/`AnimatedCard`: Fade-in animations on scroll

### Applied Locations
- Hero section: TypewriterText cycles through service names, ParallaxShape floating orbs
- Stats section: AnimatedCounter for 500+ clients, 60s response, 99% uptime, 24/7 availability
- Integration section: InfiniteMarquee with Salesforce, HubSpot, Zapier, etc.
- Hero highlights: GlowingText with gold variant for "60 Seconds" and "24/7"
- All hero headings use `.text-gradient-animated` 
- Service/pricing cards use `.card-glow`
- Contact page has LiveStatus and FloatingOrb on form card
- Icon containers use Framer Motion spring-based hover effects

## Recent Changes
- January 2026: Enhanced animation system with TypewriterText, AnimatedCounter, InfiniteMarquee, GlowingText, ParallaxShape
- January 2026: Added interactive animation system (text shimmer, card glow, floating orbs, LiveStatus)
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

## Local Development

### Prerequisites
- Node.js 20+

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Copy `.env.example` to `.env` and update if needed.
   ```bash
   cp .env.example .env
   ```
   
   Optional: Configure SMTP settings in `.env` to enable email notifications for contact form submissions.

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5001`

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```


## BridgeFlow Agency Identity
- **Logo**: Gold 'B' mark with BridgeFlow Logotype
- **Primary Color**: Sky Blue (`#0ea5e9`)
- **Accent Color**: Emerald (`#10b981`)
- **Tone**: Professional, execution-focused, technical authority

## License
MIT
