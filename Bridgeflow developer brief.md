# BridgeFlow — Complete Developer Brief
# Repo: https://github.com/anasanrai/BridgeFlow
# Live site: https://bridgeflow.agency
# Stack: Next.js 14 (App Router) + Supabase + Vercel
# Owner: anasan@bridgeflow.agency

---

## SECTION 1 — WHAT I FOUND (Live Site Audit)

I audited the live site at bridgeflow.agency. Here is exactly what is
broken, messy, or missing right now.

### ❌ CONFIRMED BROKEN

1. /templates page is EMPTY
   - Hero renders fine
   - Category pills render
   - "... templates available" (no number — fetching zero)
   - Zero template cards below the filters
   - The grid section is completely blank
   - This is the most important revenue page and it shows nothing

2. Pricing packages are mismatched vs business reality
   - Live site shows: Quick Win $497 / Starter $997 / GHL Pro $1,997
   - Correct packages are: Starter $497 / Growth $797 / Pro $1,497
   - "Buy Now" buttons exist visually but DO NOT process payment
   - Clicking "Buy Now — $497" does nothing / goes to contact page
   - PayPal is NOT integrated anywhere

3. Location inconsistency
   - Homepage footer: "Remote-first, Global"
   - Pricing page footer: "Kathmandu, Nepal · Remote-first, Global"
   - About page: "Kathmandu, Nepal · Remote-first, Global"
   - Templates page footer: "Kathmandu, Nepal · Remote-first, Global"
   - CORRECT location: Riyadh, KSA
   - Fix ALL footers to: "Riyadh, KSA · Remote-first, Global"

4. /templates page admin — needs full replacement (see Section 3)

### ⚠️ MESSY / INCONSISTENT

5. Nav has 9 links (Home, Services, Templates, Pricing, AI Calculator,
   About, Case Studies, Blog, Contact) — too many for mobile
   - On mobile this collapses but is cluttered
   - Suggested clean nav: Home | Services | Templates | Pricing | About | Contact
   - Remove: AI Calculator, Case Studies, Blog from top nav
   - Keep them in footer only

6. Homepage hero copy says "Enterprise Automation Platform" and
   "Automate Your Business With Zero Code Required Enterprise-Grade
   Workflow Automation" — awkward double description on h1
   - Should be one clean headline only

7. Homepage stats (500+ Enterprises, 2M+ Hours Saved, 50K+ Workflows)
   — these are fake/inflated for a brand new agency. Replace with
   honest numbers or remove entirely.

8. Testimonials (Sarah Johnson, Michael Chen, Emma Davis) are clearly
   placeholder/fake. Either replace with real ones or remove section.

9. About page says "Kathmandu, Nepal" — should be Riyadh, KSA

---

## SECTION 2 — FIXES REQUIRED (Priority Order)

### FIX 1 — /templates page (CRITICAL)
See Section 3 for full spec — this is a complete rebuild.

### FIX 2 — Pricing packages (CRITICAL)

Delete existing 3 packages. Replace with exactly:

Package 1: Starter — $497
  - 1 custom n8n workflow
  - Up to 5 integrations
  - 14-day support
  - Delivered in 5 business days
  - Full documentation
  - [Buy Now — $497] → PayPal checkout

Package 2: Growth — $797  ← MOST POPULAR badge
  - 3 custom n8n workflows
  - Up to 10 integrations
  - CRM integration included
  - Email automation setup
  - 30-day monitoring
  - 2 revision rounds
  - [Buy Now — $797] → PayPal checkout

Package 3: Pro — $1,497  ← BEST VALUE badge
  - 5+ custom n8n workflows
  - Unlimited integrations
  - Full CRM + pipeline setup
  - AI agent integration
  - 60-day monitoring + support
  - Priority response
  - Monthly strategy call
  - [Buy Now — $1,497] → PayPal checkout

PayPal integration requirements:
  - Use @paypal/react-paypal-js
  - VITE_PAYPAL_CLIENT_ID in .env (or NEXT_PUBLIC_PAYPAL_CLIENT_ID)
  - On successful payment:
      1. Record purchase in Supabase purchases table
      2. Send Telegram notification to Anasan
      3. Send confirmation email to buyer
  - purchases table schema:
    id, buyer_name, buyer_email, package_name, amount, currency,
    paypal_order_id, transaction_id, status, created_at

### FIX 3 — Location (QUICK)
Find and replace ALL instances of:
  "Kathmandu, Nepal" → "Riyadh, KSA"
  "Kathmandu, Nepal · Remote-first, Global" → "Riyadh, KSA · Remote-first, Global"
Files affected: layout, footer component, about page, pricing page

### FIX 4 — Contact form → Supabase → Telegram

Contact form must:
  1. Submit fields (name, email, phone, message, package interest) to
     Supabase leads table
  2. Trigger Telegram message to Anasan immediately:
     ```
     🔔 NEW LEAD — BridgeFlow
     Name: [name]
     Email: [email]
     Phone: [phone]
     Package Interest: [package]
     Message: [message]
     Time: [timestamp Asia/Riyadh]
     ```
  3. Show success state on form (not just redirect)
  4. Auto-reply email to lead within 60 seconds (via Resend or
     Supabase Edge Function)

  leads table schema:
    id, name, email, phone, message, package_interest,
    source (default 'contact-form'), status (default 'new'),
    created_at

### FIX 5 — Homepage cleanup (POLISH)

a. Fix h1: change to single clean line:
   "Automate Your Business. Launch in Days."

b. Fix stats — replace fake numbers with honest ones:
   "7+ Workflows Built" / "100% Client Satisfaction" / "5-Day Delivery"
   OR remove the stats row entirely if no real numbers yet

c. Remove fake testimonials section entirely OR replace with a simple
   text CTA: "Be our first featured client story →"

d. Fix footer location (see FIX 3)

### FIX 6 — Nav cleanup (POLISH)

Desktop nav links (keep in this order):
  Home | Services | Templates | Pricing | About | Contact

CTA buttons (keep both):
  [Free Audit] [Get Started]

Remove from nav (keep only in footer):
  AI Calculator, Case Studies, Blog

---

## SECTION 3 — NEW TEMPLATES PAGE (Main Task)

### What to DELETE first:
Delete completely:
  - src/app/(public)/templates/page.tsx (or wherever current templates page lives)
  - src/app/(public)/templates/ — entire folder
  - Any admin template management page that exists currently
  - Any template-related components tied to the old page

### What to BUILD:

Build a new /templates page inspired by https://n8n.io/templates

Reference the n8n.io templates page design pattern:
  - Clean white/light background
  - Search bar prominent at top
  - Category filter pills (horizontal scroll on mobile)
  - Grid of template cards (3 cols desktop, 2 tablet, 1 mobile)
  - Each card: screenshot/image, title, description snippet,
    node count badge, category badge, price/free badge, CTA button
  - Clicking card → /templates/[slug] detail page

---

### TEMPLATES PAGE LAYOUT SPEC

#### Header section:
```
[BIG HEADLINE]
  "n8n Workflow Templates"
  "Ready-to-deploy automations for every business"

[SEARCH BAR — full width on mobile, 60% centered on desktop]
  placeholder: "Search workflows..."
  real-time filter as user types

[STATS ROW]
  7 templates  |  Free & Paid  |  Instant download  |  n8n compatible
```

#### Category filter pills (horizontal scrollable row):
```
🏠 All  |  🏢 Real Estate  |  🎯 Lead Generation  |  📣 Marketing
💰 Sales Ops  |  🤖 AI & Agents  |  🛒 E-Commerce  |  🤝 CRM
💬 Communication  |  ⚙️ Operations
```
Active pill: filled coral/brand color
Inactive pill: outlined/ghost style
On click: filter grid in real-time (no page reload)

#### Template card design (per card):
```
┌─────────────────────────────┐
│  [SCREENSHOT IMAGE]         │  ← 16:9 ratio, object-fit: cover
│                             │     from Supabase Storage or placeholder
├─────────────────────────────┤
│  [Category Badge] [Level]   │  ← small pills top-left
│                             │
│  Template Name              │  ← font-semibold, 16px
│  Short description...       │  ← text-muted, 14px, 2 lines max
│                             │
│  ⚡ 8 nodes  ⬇ 124 DL      │  ← icon + count
│                             │
│  [$200]  [Get Template →]   │  ← price left, CTA right
│  or [FREE] badge if free    │
└─────────────────────────────┘
```

Hover state: card lifts (translateY -4px), shadow deepens, image
slightly zooms (scale 1.03), transition 200ms

#### Grid below filters:
```
Results count: "Showing 7 templates"
[Clear filters] button (appears only when filter active)

3-column grid on desktop
2-column on tablet
1-column on mobile
```

Empty state (when search returns nothing):
```
😕 No templates found
Try a different search or browse all categories
[Clear Search] button
```

---

### TEMPLATE DETAIL PAGE (/templates/[slug])

Build this if it doesn't exist or rebuild if broken.

Layout: 2 columns on desktop (content left 65%, purchase card right 35%)

Left column:
  - Breadcrumb: Home > Templates > [Template Name]
  - Category badge + Level badge
  - Template name (h1)
  - Short tagline
  - ⭐ Rating | ⬇ Downloads | ⚡ Nodes
  - Large screenshot (with zoom capability — react-zoom-pan-pinch)
  - Tabs: Overview | What's Included | Reviews
    - Overview: full description
    - What's Included: nodes list, integrations list, what you get
    - Reviews: rating summary + review cards

Right column (sticky):
  - Price (large, bold)
  - [Buy Now — $200] button → PayPal
  - or [Download Free] if is_free = true
  - Trust items:
    ✅ Instant delivery
    ✅ Full n8n workflow JSON
    ✅ Setup documentation
    ✅ Lifetime updates
    ✅ Email support

---

### DATA SOURCE

Templates come from Supabase templates table.

The 7 templates already seeded:
```
1. Lead Capture & Notification         — $200  — Real Estate
2. Follow-Up Email Sequence            — $150  — Lead Generation
3. Lead Routing by Area                — $300  — Real Estate
4. Missed Call Auto-Response           — $400  — Lead Generation
5. AI Personalized Email               — $500  — AI & Agents
6. AI Lead Scoring System              — $800  — AI & Agents
7. Complete Lead Machine               — $1,497 — All Industries
```

Supabase query for templates page:
```typescript
const { data: templates } = await supabase
  .from('templates')
  .select(`
    id, slug, name, tagline, description,
    level, price, is_free, image_url,
    nodes_used, node_count, download_count,
    average_rating, review_count, is_featured,
    categories (name, slug, icon, color)
  `)
  .eq('is_active', true)
  .order('is_featured', { ascending: false })
```

For filtering by category:
```typescript
.eq('categories.slug', selectedCategory)
```

For search:
```typescript
.ilike('name', `%${searchTerm}%`)
// or client-side filter the fetched array
```

---

### ADMIN TEMPLATES MANAGEMENT

Delete the old admin templates page.

Build new admin page at: /admin/templates

Requirements:

LIST VIEW:
```
[+ Add Template] button top-right

Table columns:
Image | Name | Category | Level | Price | Sales | Status | Actions

Status toggle: Active / Paused (inline toggle)
Featured toggle: Yes / No (inline toggle)

Actions per row:
  [Edit] → opens edit form
  [Delete] → confirm dialog → soft delete (set is_active = false)
```

ADD / EDIT FORM (/admin/templates/new and /admin/templates/[id]/edit):

Group fields into sections:

SECTION: Basic Info
  - Template Name (required)
  - Slug (auto-generated from name, editable)
  - Category (dropdown — fetch from categories table)
  - Level: Beginner / Intermediate / Advanced (radio or select)
  - Tagline (short — 1 line)
  - Description (textarea — supports markdown preview)

SECTION: Pricing
  - Price (number input — USD)
  - Is Free (toggle — overrides price to $0)

SECTION: Workflow Details
  - n8n Workflow ID (text — the actual n8n ID from n8n.n8ngalaxy.com)
  - Nodes Used (tag input — type node name + press Enter to add)
  - Node Count (auto-calculated from nodes array length)

SECTION: Media
  - Screenshot 1 (drag & drop upload)
    → upload to Supabase Storage bucket: template-images
    → save URL to image_url
    → show preview after upload
  - Screenshot 2 optional (drag & drop upload)
    → save to image_url_2

SECTION: Workflow File
  - JSON File (drag & drop upload)
    → upload to Supabase Storage bucket: template-json (PRIVATE)
    → save URL to json_file_url
    → show filename after upload

SECTION: Settings
  - Is Active (toggle — default: true)
  - Is Featured (toggle — appears first on templates page)
  - Is Verified (toggle — shows verified badge)
  - Tags (tag input — freeform)

[Save Template] button — saves to Supabase
[Cancel] button — back to list

Validation:
  - Name required
  - Category required
  - Price required (unless is_free = true)
  - At least 1 screenshot required

---

## SECTION 4 — SUPABASE TABLES NEEDED

These must exist. Create via migration if not already present.

### templates (may already exist — verify columns match)
```sql
CREATE TABLE IF NOT EXISTS templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  tagline text,
  description text,
  category_id uuid REFERENCES categories(id),
  level text DEFAULT 'Beginner'
    CHECK (level IN ('Beginner','Intermediate','Advanced')),
  price decimal(10,2) DEFAULT 0,
  is_free boolean DEFAULT false,
  image_url text,
  image_url_2 text,
  json_file_url text,
  nodes_used text[] DEFAULT '{}',
  node_count integer DEFAULT 0,
  n8n_workflow_id text,
  download_count integer DEFAULT 0,
  sales_count integer DEFAULT 0,
  average_rating decimal(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### categories
```sql
CREATE TABLE IF NOT EXISTS categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text,
  color text DEFAULT '#ff6d5a',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true
);

INSERT INTO categories (name, slug, icon, sort_order) VALUES
('Real Estate',    'real-estate',      '🏢', 1),
('Lead Generation','lead-generation',  '🎯', 2),
('Marketing',      'marketing',        '📣', 3),
('Sales Ops',      'sales-ops',        '💰', 4),
('AI & Agents',    'ai-agents',        '🤖', 5),
('E-Commerce',     'ecommerce',        '🛒', 6),
('CRM',            'crm',              '🤝', 7),
('Communication',  'communication',    '💬', 8),
('Operations',     'operations',       '⚙️', 9),
('All Industries', 'all-industries',   '🌐', 10)
ON CONFLICT (slug) DO NOTHING;
```

### leads (for contact form)
```sql
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  package_interest text,
  source text DEFAULT 'contact-form',
  status text DEFAULT 'new'
    CHECK (status IN ('new','contacted','proposal','closed','lost')),
  created_at timestamptz DEFAULT now()
);
```

### purchases (for PayPal)
```sql
CREATE TABLE IF NOT EXISTS purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_name text,
  buyer_email text NOT NULL,
  package_name text,
  template_id uuid REFERENCES templates(id),
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  paypal_order_id text,
  transaction_id text UNIQUE,
  status text DEFAULT 'completed'
    CHECK (status IN ('pending','completed','refunded','failed')),
  created_at timestamptz DEFAULT now()
);
```

### RLS Policies
```sql
-- Templates: public read
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active templates"
  ON templates FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access"
  ON templates FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Leads: public insert, admin read
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit lead"
  ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin reads leads"
  ON leads FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Purchases: public insert, admin read
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert purchase"
  ON purchases FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin reads purchases"
  ON purchases FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

### Storage buckets
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('template-images', 'template-images', true),
  ('template-json',   'template-json',   false)
ON CONFLICT (id) DO NOTHING;

-- Public read for images
CREATE POLICY "Public read template images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'template-images');

-- Admin upload
CREATE POLICY "Admin upload template files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    (bucket_id IN ('template-images','template-json')) AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

## SECTION 5 — ENVIRONMENT VARIABLES

Verify .env.local has all of these:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
NEXT_PUBLIC_PAYPAL_MODE=sandbox

# Telegram (for EZRA notifications)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Resend (email)
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@bridgeflow.agency

# Site
NEXT_PUBLIC_SITE_URL=https://bridgeflow.agency
NEXT_PUBLIC_ADMIN_EMAIL=anasan@bridgeflow.agency
```

---

## SECTION 6 — FILE STRUCTURE (what to create / modify)

```
src/
├── app/
│   ├── (public)/
│   │   ├── templates/
│   │   │   ├── page.tsx              ← DELETE old, build new
│   │   │   └── [slug]/
│   │   │       └── page.tsx          ← build/fix detail page
│   │   ├── pricing/
│   │   │   └── page.tsx              ← fix packages + add PayPal
│   │   ├── contact/
│   │   │   └── page.tsx              ← fix form → Supabase + Telegram
│   │   └── about/
│   │       └── page.tsx              ← fix location
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       └── templates/
│   │           ├── page.tsx          ← DELETE old, build new list
│   │           ├── new/
│   │           │   └── page.tsx      ← new template form
│   │           └── [id]/
│   │               └── edit/
│   │                   └── page.tsx  ← edit template form
│   │
│   └── api/
│       ├── paypal/
│       │   ├── create-order/
│       │   │   └── route.ts          ← create PayPal order
│       │   └── capture-order/
│       │       └── route.ts          ← capture + record purchase
│       └── contact/
│           └── route.ts              ← contact form handler
│
├── components/
│   ├── templates/
│   │   ├── template-card.tsx         ← new card component
│   │   ├── template-grid.tsx         ← grid + filter logic
│   │   ├── template-filters.tsx      ← search + category pills
│   │   └── template-detail.tsx       ← detail page layout
│   └── payment/
│       └── paypal-button.tsx         ← PayPal button component
│
└── lib/
    ├── supabase/
    │   ├── client.ts                 ← browser client
    │   └── server.ts                 ← server component client
    └── paypal.ts                     ← PayPal API helpers
```

---

## SECTION 7 — DEFINITION OF DONE

Do not mark any task complete until ALL tests below pass:

| # | Test | Pass Criteria |
|---|------|--------------|
| 1 | /templates loads | Shows all 7 template cards with images |
| 2 | Search works | Typing filters cards in real time |
| 3 | Category filter | Clicking pill filters to that category |
| 4 | Template detail | /templates/lead-capture-notification loads |
| 5 | Pricing packages | Shows Starter $497 / Growth $797 / Pro $1,497 |
| 6 | PayPal Starter | $497 checkout flow opens and completes |
| 7 | PayPal records | Purchase saved in Supabase after payment |
| 8 | Telegram fires | Message received on new lead |
| 9 | Telegram fires | Message received on new purchase |
| 10 | Contact form | Submits → saved in Supabase leads |
| 11 | Location fixed | ALL pages show Riyadh, KSA (no Kathmandu) |
| 12 | Mobile nav | Works on 375px, hamburger opens/closes |
| 13 | Admin list | /admin/templates shows all templates |
| 14 | Admin add | Can add new template with image upload |
| 15 | Admin edit | Can edit existing template |
| 16 | Build passes | pnpm run build — zero errors |
| 17 | No 404s | Zero broken links anywhere |

---

## SECTION 8 — DO NOT TOUCH

These pages are working and should NOT be changed:

- /about (except FIX 3: location only)
- /services and /services/ai
- /calculator
- /audit
- /blog
- /case-studies
- /privacy-policy, /terms-of-service, /refund-policy
- Navigation structure (except FIX 6: remove 3 links)
- Footer links
- Logo and brand colors
- Authentication system (if it exists and works)

---

Repo: https://github.com/anasanrai/BridgeFlow
Owner: anasan@bridgeflow.agency
Date: March 2026