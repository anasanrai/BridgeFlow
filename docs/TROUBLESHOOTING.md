# BridgeFlow Troubleshooting Guide

**Last Updated:** March 11, 2026

---

## Table of Contents
1. [Development Issues](#development-issues)
2. [Build & Deployment Issues](#build--deployment-issues)
3. [Database Issues](#database-issues)
4. [Payment Processing](#payment-processing)
5. [Authentication Errors](#authentication-errors)
6. [Performance Issues](#performance-issues)
7. [API Errors](#api-errors)
8. [Frontend Issues](#frontend-issues)
9. [Getting Additional Help](#getting-additional-help)

---

## Development Issues

### Issue: `next dev` won't start / Port 3000 already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**
```bash
# Option 1: Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Option 2: Use different port
next dev -p 3001

# Option 3: On macOS
sudo lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

---

### Issue: Cannot find module or import errors

**Symptoms:**
```
Module not found: Can't resolve '@/components/Button'
```

**Solutions:**
```bash
# Problem: tsconfig.json paths misconfigured or wrong import
# Check tsconfig.json has:
# "baseUrl": ".",
# "paths": { "@/*": ["src/*"] }

# Clean install dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Next.js cache
rm -rf .next
pnpm build
```

---

### Issue: TypeScript errors not showing in IDE

**Symptoms:**
- Editor shows code is fine
- `pnpm build` fails with TypeScript errors

**Solutions:**
```bash
# Restart TypeScript server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"

# Or manually rebuild
rm -rf .next
pnpm build

# Check tsconfig.json is valid
```

---

### Issue: `.env.local` variables not being recognized

**Symptoms:**
```
undefined process.env.NEXT_PUBLIC_SUPABASE_URL
```

**Solutions:**
1. Variables must start with `NEXT_PUBLIC_` to be available in browser
2. Check `.env.local` file exists and has correct syntax
3. Restart dev server after changing `.env.local`
4. Check variable is directly used (not in conditionals during build)

```bash
# Restart dev server
# Ctrl+C
pnpm dev
```

---

## Build & Deployment Issues

### Issue: Build fails with "Cannot find module"

**Symptoms:**
```
error TS2307: Cannot find module 'X' or its corresponding type declarations
Failed to compile
```

**Root Causes & Solutions:**
1. **Missing dependency**
   ```bash
   # Check if package is installed
   pnpm list package-name
   
   # Install if missing
   pnpm add package-name
   ```

2. **Wrong import path**
   ```tsx
   // Wrong
   import { Button } from 'components/Button'   // Missing @ alias
   
   // Correct
   import { Button } from '@/components/Button'
   ```

3. **Circular dependencies**
   - Check import order in component files
   - Reorganize exports to break cycles

---

### Issue: Build succeeds locally but fails on Vercel

**Symptoms:**
- `pnpm build` works on local machine
- Vercel build fails

**Debug Steps:**
```bash
# Clean build to simulate Vercel
rm -rf node_modules .next
pnpm install --frozen-lockfile
pnpm build

# Check for missing env vars
# All env vars used in build must be in Vercel project settings
```

**Common Causes:**
1. **Missing environment variables**
   - Check Vercel project settings
   - Add missing variables for both Dev and Prod
   - Verify variable names match exactly

2. **Node version mismatch**
   - Local: `node --version` (should be 18.x+)
   - Vercel: Set in vercel.json or project settings to match

3. **Package version differences**
   - Use `pnpm-lock.yaml` (committed to repo)
   - Don't use `npm` (use `pnpm` for consistency)

---

### Issue: Deployment times out (build > 45 seconds)

**Symptoms:**
```
Build timed out after 600 seconds
```

**Solutions:**
1. **Reduce build size**
   ```bash
   # Analyze bundle
   npm run analyze
   
   # Check for large dependencies
   pnpm ls --depth=0
   ```

2. **Use dynamic imports**
   ```tsx
   import dynamic from 'next/dynamic'
   const HeavyComponent = dynamic(() => import('./HeavyComponent'))
   ```

3. **Enable build caching**
   - Vercel automatically caches `.next` folder
   - Check Vercel hasn't cache disabled

---

## Database Issues

### Issue: "relation 'templates' does not exist"

**Symptoms:**
```
Error: relation "public.templates" does not exist at character 16
```

**Solutions:**
```bash
# Migrations haven't been applied

# Option 1: Apply migrations via Supabase CLI
supabase db push

# Option 2: Check Supabase dashboard
# - Go to SQL Editor
# - Run migrations manually from supabase/migrations/*.sql

# Option 3: Verify migration files exist
# Check: supabase/migrations/20260306_create_templates.sql
```

---

### Issue: Supabase connection errors

**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
FetchError: request to https://[project].supabase.co failed, reason: getaddrinfo ENOTFOUND
```

**Solutions:**
1. **Check Supabase project is active**
   - Go to Supabase dashboard
   - Verify project status is "Running"

2. **Verify credentials**
   ```bash
   # Check .env.local has:
   # NEXT_PUBLIC_SUPABASE_URL (correct project URL)
   # SUPABASE_SERVICE_ROLE_KEY (not ANON key)
   
   # Test connection
   curl https://[project].supabase.co/rest/v1/templates?select=id,name
   ```

3. **Check IP whitelist**
   - Supabase dashboard → Settings → Database → Connections
   - Verify your IP is whitelist (or IP restriction disabled)

---

### Issue: 403 Forbidden / Permission Denied

**Symptoms:**
```
Error: new row violates row-level security (RLS) policy
```

**Root Cause:** Row-level security policies blocking operation

**Solutions:**
1. **Check RLS policies**
   - Supabase dashboard → SQL Editor
   - Query: `SELECT * FROM pg_policies WHERE tablename = 'templates'`

2. **Verify service role key is used** (for admin operations)
   ```typescript
   // Should use SUPABASE_SERVICE_ROLE_KEY not ANON key
   import { createClient } from '@supabase/supabase-js'
   
   const admin = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL,
     process.env.SUPABASE_SERVICE_ROLE_KEY
   )
   ```

3. **Temporarily disable RLS for debugging**
   - ⚠️ SECURITY RISK - only in development
   - Re-enable before production

---

### Issue: Connection pool limits exceeded

**Symptoms:**
```
Error: too many connections for role
```

**Solutions:**
1. **Reduce concurrent connections**
   - Implement connection pooling
   - Use Supabase connection pooling feature

2. **Close unused connections**
   - Implement proper cleanup in API routes
   - Use try/finally for cleanup

---

## Payment Processing

### Issue: PayPal orders failing to create

**Symptoms:**
```
Error: Failed to create PayPal order
Unable to create order. Empty merchant data.
```

**Solutions:**
1. **Verify credentials**
   ```bash
   # Check .env.local
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=AQc...
   PAYPAL_CLIENT_SECRET=EE...
   ```

2. **Check PayPal account status**
   - Log into PayPal Developer Dashboard
   - Verify sandbox/live mode matches environment
   - Check account active and not suspended

3. **Verify webhook setup**
   - PayPal Dashboard → Settings → Integration → Webhooks
   - Update webhook URL if hosting changed

---

### Issue: Webhook events not received

**Symptoms:**
- Stripe/PayPal payment completed but order not created
- No webhook calls in logs

**Solutions:**
1. **Verify webhook URL**
   ```bash
   # Stripe: Dashboard → Webhooks → Edit
   # Should be: https://bridgeflow.agency/api/webhooks/stripe
   
   # PayPal: Account Settings → Webhooks
   # Should be: https://bridgeflow.agency/api/webhooks/paypal
   ```

2. **Check for signature verification errors**
   - Verify WEBHOOK_SECRET is set
   - Log raw webhook body for debugging

3. **Test webhook manually**
   ```bash
   # Stripe webhook test
   curl -X POST https://bridgeflow.agency/api/webhooks/stripe \
     -H "Content-Type: application/json" \
     -d '{
       "type": "payment_intent.succeeded",
       "data": { "object": { "id": "test-123" } }
     }'
   ```

---

### Issue: Payment method not appearing in checkout

**Symptoms:**
- Only some payment methods show in PaymentModal
- Missing Stripe/PayPal option

**Solutions:**
1. **Check payment method is enabled**
   - Admin dashboard → Settings
   - Verify payment method is toggled ON

2. **Check credentials configured**
   ```bash
   # All needed API keys must be in environment
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   STRIPE_SECRET_KEY
   NEXT_PUBLIC_PAYPAL_CLIENT_ID
   PAYPAL_CLIENT_SECRET
   ```

---

## Authentication Errors

### Issue: Admin login not working

**Symptoms:**
```
Invalid credentials
Cannot authenticate user
```

**Solutions:**
1. **Verify admin user exists in Supabase**
   ```sql
   -- Supabase SQL Editor
   SELECT email, created_at FROM auth.users WHERE email = 'admin@bridgeflow.agency'
   ```

2. **Reset admin password**
   ```sql
   -- Supabase will handle password reset
   -- Use password reset link instead
   ```

3. **Check auth configuration**
   - Supabase dashboard → Authentication → Settings
   - Enable email/password authentication
   - Check email templates configured

---

### Issue: JWT token expired / invalid

**Symptoms:**
```
Error: Invalid or expired token
401 Unauthorized
```

**Solutions:**
1. **Clear cookies and retry login**
   ```javascript
   // In browser console
   document.cookie = 'sb-auth-token=; max-age=0'
   // Then reload page and login again
   ```

2. **Check token expiration**
   - Admin tokens expire after configured duration
   - Need to refresh or re-login

---

## Performance Issues

### Issue: Slow page load times

**Symptoms:**
- Page takes 5+ seconds to load
- TTFB (Time to First Byte) is high

**Debug Steps:**
```bash
# Check Vercel Analytics
curl -I https://bridgeflow.agency
# Check response time in headers

# Check database query performance
# Supabase dashboard → Database → Indexes
```

**Solutions:**
1. **Optimize database queries**
   - Add indexes on frequently queried columns
   - Use `EXPLAIN ANALYZE` to find slow queries

2. **Enable image optimization**
   - Use `next/image` component
   - Supabase storage includes CDN

3. **Reduce bundle size**
   - Use dynamic imports for large components
   - Remove unused dependencies

---

### Issue: High CPU usage during deployment

**Symptoms:**
- Build takes very long (>1 minute)
- Vercel builds timeout

**Solutions:**
```bash
# Check for memory leaks
pnpm build --profile

# Look for slow operations in output

# Clear caches
rm -rf node_modules .next
pnpm install
pnpm build
```

---

## API Errors

### Issue: Rate limit exceeded (429)

**Symptoms:**
```
Error: Too many requests
429 Too Many Requests
```

**Solutions:**
1. **Implement request retry logic**
   ```typescript
   async function fetchWithRetry(url, options, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         const res = await fetch(url, options)
         if (res.status !== 429) return res
       } catch (e) {
         if (i === maxRetries - 1) throw e
       }
       // Exponential backoff
       await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)))
     }
   }
   ```

2. **Increase rate limit thresholds**
   - Modify `lib/rate-limit.ts`
   - Update Redis configuration in Upstash

---

### Issue: CORS errors (Cross-Origin)

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
1. **Check API is from same origin**
   - Request to `/api/*` should work
   - External APIs need correct CORS headers

2. **Verify CORS headers in response**
   ```bash
   curl -H "Origin: https://bridgeflow.agency" \
     https://api.external-service.com \
     -H "Access-Control-Request-Method: POST"
   ```

---

## Frontend Issues

### Issue: Dark mode / theme toggle not working

**Symptoms:**
- Theme doesn't persist
- Components don't follow theme

**Solutions:**
1. **Check theme provider**
   - Verify `TelemetryProvider` wraps app in layout
   - Check localStorage is enabled

2. **Verify Tailwind dark mode**
   ```typescript
   // tailwind.config.ts should have
   darkMode: 'class'  // or 'media'
   ```

---

### Issue: Images not loading / showing broken

**Symptoms:**
- Template images blank or 404
- Logo not displaying

**Solutions:**
1. **Check image URL**
   ```bash
   # Verify image exists in Supabase Storage
   # Supabase dashboard → Storage → template-images
   
   # Check public read access enabled
   ```

2. **Verify Next.js Image optimization**
   ```tsx
   // Use next/image for optimization
   import Image from 'next/image'
   
   <Image 
     src="/images/logo.png"
     alt="Logo"
     width={200}
     height={200}
   />
   ```

---

### Issue: Form submissions not working

**Symptoms:**
- Form appears to submit but nothing happens
- No error messages

**Solutions:**
1. **Check form validation**
   ```typescript
   // Use react-hook-form with proper error handling
   const { register, handleSubmit, formState: { errors } } = useForm()
   ```

2. **Check API endpoint is reachable**
   ```bash
   curl -X POST https://bridgeflow.agency/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com"}'
   ```

3. **Check browser console for errors**
   - F12 → Console tab
   - Look for JavaScript errors or network failures

---

## Getting Additional Help

### Resources
- **GitHub Issues**: https://github.com/anasanrai/BridgeFlow/issues
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs

### Reporting a Bug
When reporting, include:
1. **What happened**: Clear description
2. **Steps to reproduce**: Step-by-step instructions
3. **Expected vs actual**: What should happen vs what actually happened
4. **Environment**: OS, browser, Node version
5. **Logs**: Error messages from console/server
6. **Screenshots**: If UI-related

### Contact Support
- **Email**: [support@bridgeflow.agency](mailto:support@bridgeflow.agency)
- **Security Issues**: [security@bridgeflow.agency](mailto:security@bridgeflow.agency)
- **Deployment Issues**: Check status at https://www.vercel-status.com

---

**Last Updated:** March 11, 2026
