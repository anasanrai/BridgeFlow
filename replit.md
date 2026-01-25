# BridgeFlow Agency Website

## Overview
A professional agency website for BridgeFlow Agency, an AI Automation & Workflow Engineering company. Built with React, Express, and Tailwind CSS featuring a premium dark theme design with light mode support.

## Current State
The website is fully functional with:
- Homepage with hero section, problem articulation, methodology, and solutions overview
- Solutions page with four service categories (Foundation, Implementation, Productized, Retainers)
- How It Works page with 6-step delivery process
- About page with founder story, values, and differentiators
- Contact page with lead qualification form
- Dark/Light theme toggle with localStorage persistence
- BridgeFlow logo integrated in navigation and footer

## Project Architecture

### Frontend (client/)
- **Framework**: React with Vite
- **Routing**: Wouter for client-side navigation
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn/ui components
- **State Management**: TanStack React Query for server state
- **Theme**: Dark/Light mode with ThemeProvider and localStorage sync

### Backend (server/)
- **Framework**: Express.js
- **Storage**: In-memory storage (MemStorage)
- **API**: RESTful endpoints for contact form

### Key Files
- `client/src/App.tsx` - Main app component with routing and ThemeProvider
- `client/src/index.css` - Design system tokens (colors, spacing)
- `client/src/components/` - Shared components (Navigation, Footer, ThemeProvider, ThemeToggle)
- `client/src/pages/` - Page components (Home, Solutions, HowItWorks, About, Contact)
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
  "name": "string",
  "email": "string",
  "company": "string (optional)",
  "businessSize": "solo" | "2-10" | "11-50" | "50+",
  "operationalPain": "string",
  "goals": "string",
  "message": "string (optional)"
}
```

### GET /api/contact
Retrieve all contact submissions (for admin use).

## Recent Changes
- January 2026: Initial implementation with all 5 pages
- January 2026: Dark/light theme toggle with ThemeProvider and localStorage persistence
- January 2026: Contact form with validation and submission handling
- January 2026: Integrated BridgeFlow logo (gold B mark with text)

## User Preferences
- Premium, execution-focused design (no AI hype)
- Dark professional palette with light mode option
- Clean typography and system diagram visuals
- Direct, non-hype tone of voice
- BridgeFlow logo with gold B mark
