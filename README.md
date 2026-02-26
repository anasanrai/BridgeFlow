# BridgeFlow — Enterprise AI Automation Agency

BridgeFlow is a high-performance web application built with Next.js 14, Tailwind CSS, and Supabase. It features a professional landing page and a secure admin dashboard for managing site content.

## Features

- **Enterprise Design**: Premium dark-mode UI with Framer Motion animations.
- **Dynamic Content**: Fully manageable via a secure Admin Dashboard.
- **AI-Powered**: Integrated AI models (Modal, Ollama, Gemini) for intelligent interactions.
- **Edge Ready**: Built for deployment on Vercel or similar edge platforms.
- **SEO Optimized**: Dynamic metadata, sitemaps, and robots.txt generation.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- Supabase Project

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd BridgeFlow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in your credentials.
   ```bash
   cp .env.example .env.local
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel.
2. Add all environment variables from `.env.local` to the Vercel project settings.
3. Deploy!

### Database Setup

1. Run the SQL scripts in `supabase-schema.sql` and `seed-data.sql` in your Supabase SQL Editor.
2. Use the admin dashboard to manage content.

## License

All rights reserved — BridgeFlow Agency.
