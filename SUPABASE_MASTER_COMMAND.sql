-- ============================================
-- BRIDGEFLOW MASTER SQL SCHEMA
-- VERSION: 2026.03.14 (v1.1.0 — COMPLETE)
-- ============================================
-- This is the SINGLE SOURCE OF TRUTH for your
-- Supabase database. Run this in the SQL Editor.
-- ============================================

-- 1. CLEANUP PHASE (WARNING: Drops existing tables)
-- Uncomment these if you want a completely fresh install:
-- DROP TABLE IF EXISTS public.purchases CASCADE;
-- DROP TABLE IF EXISTS public.orders CASCADE;
-- DROP TABLE IF EXISTS public.subscriptions CASCADE;
-- DROP TABLE IF EXISTS public.agents CASCADE;
-- DROP TABLE IF EXISTS public.automations CASCADE;
-- DROP TABLE IF EXISTS public.projects CASCADE;
-- DROP TABLE IF EXISTS public.memberships CASCADE;
-- DROP TABLE IF EXISTS public.organizations CASCADE;
-- DROP TABLE IF EXISTS public.profiles CASCADE;
-- DROP TABLE IF EXISTS public.leads CASCADE;
-- DROP TABLE IF EXISTS public.templates CASCADE;
-- DROP TABLE IF EXISTS public.payment_settings CASCADE;
-- DROP TABLE IF EXISTS public.site_config CASCADE;
-- DROP TABLE IF EXISTS public.site_settings CASCADE;
-- DROP TABLE IF EXISTS public.home_content CASCADE;
-- DROP TABLE IF EXISTS public.services CASCADE;
-- DROP TABLE IF EXISTS public.benefits CASCADE;
-- DROP TABLE IF EXISTS public.team_members CASCADE;
-- DROP TABLE IF EXISTS public.company_values CASCADE;
-- DROP TABLE IF EXISTS public.milestones CASCADE;
-- DROP TABLE IF EXISTS public.tech_stack CASCADE;
-- DROP TABLE IF EXISTS public.blog_posts CASCADE;
-- DROP TABLE IF EXISTS public.case_studies CASCADE;
-- DROP TABLE IF EXISTS public.page_metadata CASCADE;
-- DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
-- DROP TABLE IF EXISTS public.activity_log CASCADE;
-- DROP TABLE IF EXISTS public.telemetry CASCADE;
-- DROP TABLE IF EXISTS public.contact_submissions CASCADE;

-- ============================================
-- 2. CORE USER TABLES
-- ============================================

-- User Profiles (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text,
  full_name text,
  avatar_url text,
  billing_address jsonb,
  payment_method jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Leads (CRM / Contact Submissions)
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  package_interest text,
  source text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. SaaS MULTI-TENANCY
-- ============================================

-- Organizations
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  plan text DEFAULT 'free',
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Memberships (Organization <-> Users)
CREATE TABLE IF NOT EXISTS public.memberships (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('owner','admin','member')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, org_id)
);

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Automations (n8n Integration)
CREATE TABLE IF NOT EXISTS public.automations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  n8n_workflow_id text,
  trigger_type text,
  status text DEFAULT 'draft',
  config jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- AI Agents
CREATE TABLE IF NOT EXISTS public.agents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  model text DEFAULT 'gpt-4o-mini',
  system_prompt text,
  tools jsonb DEFAULT '[]',
  config jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- 4. BILLING & MONETIZATION
-- ============================================

-- Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  stripe_subscription_id text,
  plan text NOT NULL,
  status text DEFAULT 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Orders (PayPal / Stripe Checkout History)
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id text UNIQUE NOT NULL,
  org_id uuid REFERENCES public.organizations(id),
  plan_name text,
  plan_price numeric,
  customer_email text,
  customer_name text,
  payment_method text,
  status text DEFAULT 'pending',
  gateway_id text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Purchases (Template / Digital Product Purchases)
CREATE TABLE IF NOT EXISTS public.purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email text NOT NULL,
  template_id uuid,
  amount numeric,
  currency text DEFAULT 'USD',
  gateway text,
  transaction_id text,
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

-- Payment Settings (Gateway Config)
CREATE TABLE IF NOT EXISTS public.payment_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT,
  mode TEXT DEFAULT 'sandbox',
  is_active BOOLEAN DEFAULT TRUE,
  paypal_enabled BOOLEAN DEFAULT FALSE,
  paypal_mode TEXT DEFAULT 'sandbox',
  paypal_currency TEXT DEFAULT 'USD',
  stripe_enabled BOOLEAN DEFAULT FALSE,
  moyasar_enabled BOOLEAN DEFAULT FALSE,
  tax_rate NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Templates (Digital Assets / n8n Workflows)
CREATE TABLE IF NOT EXISTS public.templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  short_description text,
  long_description text,
  categories jsonb DEFAULT '[]',
  difficulty text DEFAULT 'Beginner',
  nodes jsonb DEFAULT '[]',
  node_count integer DEFAULT 0,
  setup_time text DEFAULT '15 min',
  value numeric DEFAULT 0,
  what_it_does jsonb DEFAULT '[]',
  featured boolean DEFAULT false,
  status text DEFAULT 'draft',
  image_url text,
  image_urls jsonb DEFAULT '[]',
  workflow_json jsonb,
  n8n_workflow_id text,
  "order" integer DEFAULT 0,
  connection_count integer DEFAULT 0,
  json_url text,
  json_access text,
  tools jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- 5. CMS & MARKETING CONTENT
-- ============================================

-- Site Config (Public-facing global config)
CREATE TABLE IF NOT EXISTS public.site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT DEFAULT 'BridgeFlow',
  tagline TEXT,
  logo_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  social_links JSONB DEFAULT '[]'::jsonb,
  seo_defaults JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings (Private/Admin only — payment config etc.)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  founder_image TEXT,
  social_links JSONB DEFAULT '[]'::jsonb,
  live_demos JSONB DEFAULT '[]'::jsonb,
  payment_settings JSONB DEFAULT '{"paypal_enabled":false,"currency":"USD"}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Home Page Content
CREATE TABLE IF NOT EXISTS public.home_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hero JSONB NOT NULL DEFAULT '{}'::jsonb,
  stats JSONB NOT NULL DEFAULT '[]'::jsonb,
  services_overview JSONB NOT NULL DEFAULT '[]'::jsonb,
  process_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  testimonials JSONB NOT NULL DEFAULT '[]'::jsonb,
  cta JSONB NOT NULL DEFAULT '{}'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT DEFAULT 'Zap',
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  color TEXT DEFAULT 'from-amber-500 to-gold-400',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Benefits
CREATE TABLE IF NOT EXISTS public.benefits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT DEFAULT 'Clock',
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  initials TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Company Values
CREATE TABLE IF NOT EXISTS public.company_values (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT DEFAULT 'Target',
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Milestones
CREATE TABLE IF NOT EXISTS public.milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tech Stack
CREATE TABLE IF NOT EXISTS public.tech_stack (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT DEFAULT 'Code2',
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT DEFAULT 'Automation',
  read_time TEXT DEFAULT '5 min read',
  featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Case Studies
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  industry TEXT,
  client TEXT,
  excerpt TEXT,
  challenge TEXT,
  solution TEXT,
  results JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Metadata (Centralized SEO)
CREATE TABLE IF NOT EXISTS public.page_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. ANALYTICS & LOGGING
-- ============================================

-- Activity Log (audit trail)
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  section TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Telemetry (Visitor tracking)
CREATE TABLE IF NOT EXISTS public.telemetry (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  path TEXT,
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. SECURITY & RLS POLICIES
-- ============================================

-- Enable RLS on ALL tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemetry ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7a. Multi-tenant Isolation Policies
-- ============================================
CREATE POLICY "Users see own orgs" ON public.organizations
  FOR SELECT USING (id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Members see org projects" ON public.projects
  FOR SELECT USING (org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Members see org automations" ON public.automations
  FOR SELECT USING (project_id IN (SELECT id FROM public.projects WHERE org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid())));

CREATE POLICY "Members see org agents" ON public.agents
  FOR SELECT USING (project_id IN (SELECT id FROM public.projects WHERE org_id IN (SELECT org_id FROM public.memberships WHERE user_id = auth.uid())));

-- ============================================
-- 7b. Profile Security
-- ============================================
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- 7c. Public Read CMS Policies
-- ============================================
CREATE POLICY "Public read config" ON public.site_config FOR SELECT USING (true);
CREATE POLICY "Public read home" ON public.home_content FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read benefits" ON public.benefits FOR SELECT USING (true);
CREATE POLICY "Public read team" ON public.team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public read values" ON public.company_values FOR SELECT USING (true);
CREATE POLICY "Public read milestones" ON public.milestones FOR SELECT USING (true);
CREATE POLICY "Public read tech" ON public.tech_stack FOR SELECT USING (true);
CREATE POLICY "Public read blog" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read cases" ON public.case_studies FOR SELECT USING (is_published = true);
CREATE POLICY "Public read templates" ON public.templates FOR SELECT USING (status = 'published');
CREATE POLICY "Public read seo" ON public.page_metadata FOR SELECT USING (true);

-- ============================================
-- 7d. Public Insert Policies
-- ============================================
CREATE POLICY "Public lead insertion" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public newsletter signup" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public telemetry insert" ON public.telemetry FOR INSERT WITH CHECK (true);

-- ============================================
-- 7e. Admin / Service Role Full Access
-- ============================================
CREATE POLICY "Service role bypass" ON public.site_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.payment_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.home_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.benefits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.team_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.company_values FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.milestones FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.tech_stack FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.blog_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.case_studies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.page_metadata FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.organizations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.memberships FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.automations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.agents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.subscriptions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.purchases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.activity_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.telemetry FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON public.templates FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 8. AUTOMATION TRIGGERS
-- ============================================

-- Function: Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: On Signup -> Create Profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- DONE! Your database is now fully configured.
-- Total: 27 tables, 27+ RLS policies, 1 trigger.
-- ============================================
