-- ============================================
-- BridgeFlow CMS Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings (Private/Service Role only)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  founder_image TEXT,
  social_links JSONB DEFAULT '[]'::jsonb,
  live_demos JSONB DEFAULT '[]'::jsonb,
  payment_settings JSONB DEFAULT '{"paypal_enabled":false,"currency":"USD"}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Home Page Content (single row)
CREATE TABLE IF NOT EXISTS home_content (
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
CREATE TABLE IF NOT EXISTS services (
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
CREATE TABLE IF NOT EXISTS benefits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT DEFAULT 'Clock',
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
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
CREATE TABLE IF NOT EXISTS company_values (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT DEFAULT 'Target',
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Milestones
CREATE TABLE IF NOT EXISTS milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tech Stack
CREATE TABLE IF NOT EXISTS tech_stack (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT DEFAULT 'Code2',
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
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
CREATE TABLE IF NOT EXISTS case_studies (
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
CREATE TABLE IF NOT EXISTS page_metadata (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT UNIQUE NOT NULL, -- e.g., '/', '/about', '/contact'
  title TEXT,
  description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text,
  full_name text,
  avatar_url text,
  billing_address jsonb,
  payment_method jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Leads (Standardized Contact Submissions)
CREATE TABLE IF NOT EXISTS leads (
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
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Log (audit trail)
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  section TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Telemetry (Visitor tracking)
CREATE TABLE IF NOT EXISTS telemetry (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'page_view', 'click', 'scroll_depth'
  path TEXT,
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_metadata ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write site_settings
CREATE POLICY "Service role full access" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Public read policies (for frontend)
CREATE POLICY "Public read" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read" ON home_content FOR SELECT USING (true);
CREATE POLICY "Public read" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read" ON benefits FOR SELECT USING (true);
CREATE POLICY "Public read" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public read" ON company_values FOR SELECT USING (true);
CREATE POLICY "Public read" ON milestones FOR SELECT USING (true);
CREATE POLICY "Public read" ON tech_stack FOR SELECT USING (true);
CREATE POLICY "Public read" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read" ON case_studies FOR SELECT USING (is_published = true);
CREATE POLICY "Public read" ON page_metadata FOR SELECT USING (true);

-- Generic Service role access for other tables
CREATE POLICY "Service role full access" ON site_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON home_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON benefits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON team_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON company_values FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON milestones FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON tech_stack FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON blog_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON case_studies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON activity_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON telemetry FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON page_metadata FOR ALL USING (true) WITH CHECK (true);


-- ============================================
-- SaaS PLATFORM SCHEMA (Phase 2)
-- ============================================

-- Multi-tenant SaaS core
CREATE TABLE IF NOT EXISTS organizations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  plan text DEFAULT 'free',
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS memberships (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('owner','admin','member')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, org_id)
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS automations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  n8n_workflow_id text,
  trigger_type text,
  status text DEFAULT 'draft',
  config jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  model text DEFAULT 'gpt-4.1-mini',
  system_prompt text,
  tools jsonb DEFAULT '[]',
  config jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  stripe_subscription_id text,
  plan text NOT NULL,
  status text DEFAULT 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id text UNIQUE NOT NULL,
  org_id uuid REFERENCES organizations(id),
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

CREATE TABLE IF NOT EXISTS purchases (
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

CREATE TABLE IF NOT EXISTS templates (
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
-- SaaS PLATFORM SCHEMA (Phase 2 Consolidated)
-- ============================================

-- Multi-tenant SaaS core
CREATE TABLE IF NOT EXISTS organizations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  plan text DEFAULT 'free',
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS memberships (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('owner','admin','member')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, org_id)
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS automations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  n8n_workflow_id text,
  trigger_type text,
  status text DEFAULT 'draft',
  config jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  model text DEFAULT 'gpt-4.1-mini',
  system_prompt text,
  tools jsonb DEFAULT '[]',
  config jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  stripe_subscription_id text,
  plan text NOT NULL,
  status text DEFAULT 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id text UNIQUE NOT NULL,
  org_id uuid REFERENCES organizations(id),
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

CREATE TABLE IF NOT EXISTS purchases (
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

CREATE TABLE IF NOT EXISTS payment_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider TEXT,
    mode TEXT,
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

-- ============================================
-- RLS POLICIES (Consolidated)
-- ============================================

-- Enable RLS for ALL tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_settings ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policies
CREATE POLICY "Users see own orgs" ON organizations
  FOR SELECT USING (id IN (SELECT org_id FROM memberships WHERE user_id = auth.uid()));

CREATE POLICY "Members see org projects" ON projects
  FOR SELECT USING (org_id IN (SELECT org_id FROM memberships WHERE user_id = auth.uid()));

CREATE POLICY "Members see org automations" ON automations
  FOR SELECT USING (project_id IN (SELECT id FROM projects WHERE org_id IN (SELECT org_id FROM memberships WHERE user_id = auth.uid())));

CREATE POLICY "Members see org agents" ON agents
  FOR SELECT USING (project_id IN (SELECT id FROM projects WHERE org_id IN (SELECT org_id FROM memberships WHERE user_id = auth.uid())));

-- Template Public Read
CREATE POLICY "Public read templates" ON templates 
  FOR SELECT USING (status = 'published');

-- Profiles Protection
CREATE POLICY "Users can view own profile" ON profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Universal Service Role Access (for internal APIs)
CREATE POLICY "Service role full access on organizations" ON organizations FOR ALL USING (true);
CREATE POLICY "Service role full access on memberships" ON memberships FOR ALL USING (true);
CREATE POLICY "Service role full access on projects" ON projects FOR ALL USING (true);
CREATE POLICY "Service role full access on automations" ON automations FOR ALL USING (true);
CREATE POLICY "Service role full access on agents" ON agents FOR ALL USING (true);
CREATE POLICY "Service role full access on subscriptions" ON subscriptions FOR ALL USING (true);
CREATE POLICY "Service role full access on orders" ON orders FOR ALL USING (true);
CREATE POLICY "Service role full access on purchases" ON purchases FOR ALL USING (true);
CREATE POLICY "Service role full access on templates" ON templates FOR ALL USING (true);
CREATE POLICY "Service role full access on payment_settings" ON payment_settings FOR ALL USING (true);
CREATE POLICY "Service role full access on profiles" ON profiles FOR ALL USING (true);
CREATE POLICY "Service role full access on leads" ON leads FOR ALL USING (true);

-- Public Insert for Leads
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);



