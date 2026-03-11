# BridgeFlow Deployment Guide

**Last Updated:** March 11, 2026  
**Current Environment:** Production on Vercel

---

## Table of Contents
1. [Deployment Overview](#deployment-overview)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Deployment Process](#deployment-process)
5. [Production Configuration](#production-configuration)
6. [Monitoring & Logs](#monitoring--logs)
7. [Rollback Procedures](#rollback-procedures)
8. [Database Migrations](#database-migrations)
9. [Troubleshooting](#troubleshooting)

---

## Deployment Overview

BridgeFlow is deployed on **Vercel** with the following architecture:

```
┌─────────────────────────────────────────────────────┐
│  GitHub Repository (anasanrai/BridgeFlow)           │
│  Configured for automatic deployments on push       │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│  Vercel Build Pipeline                              │
│  - Next.js build optimization                       │
│  - Environment variable injection                   │
│  - Edge function deployment                         │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────┐
│  Vercel Global Edge Network                         │
│  - Static assets (images, CSS, JS)                  │
│  - API routes (serverless functions)                │
│  - Edge middleware                                  │
└──────────────────┬──────────────────────────────────┘
                   │
                   ↓
┌──────────────────┬──────────────────┬───────────────┐
│ Supabase DB     │ Payment APIs     │ External APIs  │
│ (PostgreSQL)    │ (PayPal/Stripe)  │ (n8n, AI)     │
└─────────────────┴──────────────────┴───────────────┘
```

### Infrastructure Components
- **Domain**: `bridgeflow.agency` (Custom domain on Vercel)
- **DNS**: Configured via domain registrar
- **Database**: Supabase (PostgreSQL) - project ID: `bwpzqvwgqvvwxdwiobsz`
- **Storage**: Supabase Storage + Vercel CDN
- **Deployment**: Push-to-deploy via GitHub integration
- **SSL**: Automatic via Vercel (Let's Encrypt)

---

## Prerequisites

### Required Tools
- **Node.js** 18.x or later
- **pnpm** (or npm)
- **Git** with SSH keys configured for GitHub
- **Vercel CLI** (optional but recommended)

### Accounts & Access
- GitHub account with `anasanrai/BridgeFlow` access
- Vercel account connected to GitHub repo
- Supabase project access
- PayPal & Stripe merchant accounts
- Upstash Redis instance

### Environment Credentials
You'll need access to:
- Supabase API keys
- PayPal client IDs and secrets
- Stripe API keys
- Upstash Redis credentials
- Email service credentials (Nodemailer)

---

## Environment Setup

### 1. Local Development Environment

```bash
# Clone the repository
git clone git@github.com:anasanrai/BridgeFlow.git
cd BridgeFlow

# Install dependencies
pnpm install

# Create .env.local from template
cp .env.example .env.local

# Edit .env.local with your credentials
# (See section below for required variables)

# Run development server
pnpm dev
```

### 2. Environment Variables

Create `.env.local` with all required variables:

```env
# ============================================================
# SUPABASE
# ============================================================
NEXT_PUBLIC_SUPABASE_URL=https://bwpzqvwgqvvwxdwiobsz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# ============================================================
# PAYPAL
# ============================================================
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AQc...
PAYPAL_CLIENT_SECRET=EE...

# ============================================================
# STRIPE
# ============================================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ============================================================
# EMAIL (NODEMAILER)
# ============================================================
EMAIL_FROM=noreply@bridgeflow.agency
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# ============================================================
# UPSTASH REDIS (Rate Limiting)
# ============================================================
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# ============================================================
# EXTERNAL SERVICES
# ============================================================
N8N_API_KEY=...  # For n8n workflow integration
TELEGRAM_BOT_TOKEN=... # For admin notifications
REPLICATE_API_TOKEN=... # For AI image enhancement

# ============================================================
# ADMIN CREDENTIALS (Dev only)
# ============================================================
ADMIN_EMAIL=admin@bridgeflow.agency
ADMIN_PASSWORD=... # Should be in Supabase, not here

# ============================================================
# ANALYTICS
# ============================================================
NEXT_PUBLIC_GA_ID=G-... # Google Analytics
```

### 3. Vercel Environment Variables

Set the same variables in Vercel project settings:

```bash
# Via Vercel CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... etc for all variables
```

Or via Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable for both Development and Production
3. Redeploy after adding new variables

---

## Deployment Process

### Automatic Deployment (Recommended)

BridgeFlow is configured for automatic deployment on every push to `main` branch.

#### Workflow
```
1. Developer pushes to GitHub (main branch)
2. Vercel webhook triggered
3. Vercel builds the project
   - Runs `pnpm install`
   - Runs `pnpm build`
   - Optimizes Next.js
4. Build succeeds or fails
5. If success: deployed to production
6. If failure: deployment blocked, developer notified
```

#### Pre-Push Checklist
- [ ] Code passes ESLint (`pnpm lint`)
- [ ] No TypeScript errors (`pnpm build` locally)
- [ ] All env vars available in Vercel
- [ ] Database migrations applied
- [ ] Tested in local dev environment

### Manual Deployment

If needed for urgent fixes:

```bash
# Via Vercel CLI
vercel deploy --prod

# Via GitHub (if automatic trigger fails)
# Push to main branch and Vercel will auto-deploy
```

### Rollback

If deployment fails or causes issues:

```bash
# Via Vercel Dashboard
# 1. Go to Deployments tab
# 2. Find the previous stable deployment
# 3. Click three dots → Promote to Production

# Via Vercel CLI
vercel alias remove bridgeflow.agency  # Remove current
vercel alias [previous-deployment-url] bridgeflow.agency
```

---

## Production Configuration

### Vercel Settings

**Project Settings**
- **Framework**: Next.js ✓
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install --frozen-lockfile`

**Serverless Functions**
- **Max Duration**: 60 seconds (default)
- **Memory**: 1024 MB (default)
- **Concurrency**: Default (high)

**Edge Functions**
- **Middleware** (`src/middleware.ts`) runs on every request
- Used for admin authentication checks

### Custom Headers & Redirects

(Configured in `next.config.js`)

**Security Headers**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

**Redirects**
```
/ai-calculator → /calculator (301 permanent)
```

### Build Optimization

**Next.js Optimization**
- Image optimization: Enabled
- Static generation where possible
- Incremental static regeneration (ISR)
- API routes as serverless functions

---

## Monitoring & Logs

### Vercel Dashboard

1. **Activity Tab**
   - View all deployments
   - Check build logs
   - See error details

2. **Logs Tab**
   - Real-time function logs
   - Request/response data
   - Error stack traces

3. **Monitor Tab**
   - Response times
   - Error rates
   - Usage statistics

### View Logs

```bash
# Real-time logs from production
vercel logs [--prod]

# Specific function logs
vercel logs /api/checkout
```

### Application Logging

BridgeFlow uses structured logging via `lib/logger.ts`:

```typescript
import { logger } from '@/lib/logger'

logger.info('Template purchased', { templateId, userId })
logger.error('Payment failed', error)
logger.warn('High latency detected', { duration: 5000 })
```

Logs are sent to Supabase (if configured) and Vercel logs.

---

## Database Migrations

### Applying Migrations

Migrations are stored in `supabase/migrations/` and applied automatically by Supabase on push.

**Manual migration (if needed)**

```bash
# Install Supabase CLI
npm install -g supabase

# Authenticate with Supabase
supabase login

# Apply migrations to production
supabase db push --db-url postgresql://[credentials]
```

### Creating New Migrations

```bash
# Generate migration file
supabase migration new create_new_table

# Edit the generated file in supabase/migrations/
# Then push to production
supabase db push
```

### Backup Before Migration

```bash
# Backup current database
pg_dump [connection-string] > backup-$(date +%Y%m%d-%H%M%S).sql

# Restore if needed
psql [connection-string] < backup-20260311-123000.sql
```

---

## Deployment Checklist

Before deploying:

- [ ] All tests pass locally
- [ ] No lint errors (`pnpm lint`)
- [ ] TypeScript builds successfully
- [ ] Environment variables set in Vercel
- [ ] Database migrations reviewed
- [ ] Breaking changes documented
- [ ] Performance impact assessed
- [ ] Security review completed
- [ ] Change log updated (CHANGELOG.md)

After deployment:

- [ ] Verify site loads at https://bridgeflow.agency
- [ ] Test key user flows (purchase, contact form, etc.)
- [ ] Check Vercel logs for errors
- [ ] Monitor Supabase for database issues
- [ ] Verify webhooks receiving payments
- [ ] Test email notifications
- [ ] Monitor error tracking (if configured)

---

## Troubleshooting

### Build Fails

**Common Issues:**

1. **Missing environment variable**
   ```
   Error: Cannot find module or environment variable X
   ```
   → Add variable to Vercel project settings

2. **TypeScript errors**
   ```
   error TS2307: Cannot find module
   ```
   → Run `pnpm install` and check imports

3. **Module version conflict**
   ```
   npm ERR! peer dep missing
   ```
   → Delete `pnpm-lock.yaml` and run `pnpm install` again

**Debug Build Locally:**
```bash
# Build locally to catch issues early
pnpm build

# Check for TypeScript errors
npx tsc --noEmit
```

### Runtime Errors

1. **Database connection fails**
   - Check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
   - Verify IP whitelist in Supabase
   - Check database status in Supabase dashboard

2. **Payment API errors**
   - Verify PayPal/Stripe API keys are correct
   - Check API keys are in correct environment (sandbox vs live)
   - Review payment provider webhook configuration

3. **Rate limiting errors**
   - Verify Upstash Redis credentials
   - Check Redis connection status
   - Review rate limit thresholds

### Performance Issues

1. **Slow API response**
   ```bash
   # Check function duration in Vercel logs
   vercel logs --prod
   
   # Add performance monitoring
   console.time('operation')
   // ... code ...
   console.timeEnd('operation')
   ```

2. **High build time**
   - Review `next.config.js` for optimization
   - Check for unnecessary dependencies
   - Enable incremental static regeneration (ISR)

### 503 Service Unavailable

- Check Vercel status page: https://www.vercel-status.com
- Verify all environment variables are set
- Check serverless function limits (60s timeout)
- Review error logs in Vercel dashboard

---

## Rollback Plan

### Immediate Rollback (< 5 minutes)

1. Open Vercel Dashboard
2. Go to Deployments tab
3. Find the last working deployment
4. Click three dots → Promote to Production
5. Confirm the rollback

### Detailed Rollback (Planned)

```bash
# List deployments
vercel ls --prod

# Get specific deployment URL
# Then promote it
vercel alias add [old-deployment-url] bridgeflow.agency
```

### Post-Rollback

1. Notify team of rollback
2. Investigate root cause
3. Fix issue locally with tests
4. Create new GitHub PR for review
5. Deploy fix through normal process

---

## Continuous Deployment Best Practices

1. **Commit Early & Often**
   - Small commits easier to rollback
   - Clear commit messages help debugging

2. **Protected Main Branch**
   - Require PR reviews before merge
   - Run automated checks on PRs
   - Require passing tests before merge

3. **Staging Environment**
   - Use preview deployments for major changes
   - Test in preview before merging to main

4. **Monitoring & Alerts**
   - Set up error tracking (Sentry, etc.)
   - Configure uptime monitoring
   - Review logs regularly

5. **Documentation**
   - Keep CHANGELOG.md updated
   - Document breaking changes
   - Update runbooks for common issues

---

## Contact & Support

For deployment questions or issues:
- **Tech Lead**: [contact@bridgeflow.agency](mailto:contact@bridgeflow.agency)
- **GitHub Issues**: https://github.com/anasanrai/BridgeFlow/issues
- **Vercel Support**: https://vercel.com/support

---

**Last Deployment**: Check Vercel dashboard
**Next Scheduled Maintenance**: None scheduled
