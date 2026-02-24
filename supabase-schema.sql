-- ============================================
-- BridgeFlow CMS Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Site Configuration (single row)
CREATE TABLE IF NOT EXISTS site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'BridgeFlow',
  tagline TEXT DEFAULT 'AI-Powered Automation Agency',
  description TEXT,
  url TEXT DEFAULT 'https://www.bridgeflow.agency',
  email TEXT DEFAULT 'hello@bridgeflow.agency',
  location TEXT DEFAULT 'Remote-first, Global',
  copyright TEXT DEFAULT '© 2026 BridgeFlow. All rights reserved.',
  logo TEXT DEFAULT '/images/logo.png',
  nav_links JSONB DEFAULT '[{"href":"/","label":"Home"},{"href":"/services","label":"Services"},{"href":"/about","label":"About"},{"href":"/case-studies","label":"Case Studies"},{"href":"/blog","label":"Blog"},{"href":"/contact","label":"Contact"}]'::jsonb,
  footer_links JSONB DEFAULT '{}'::jsonb,
  social_links JSONB DEFAULT '[{"platform":"Twitter","href":"#"},{"platform":"LinkedIn","href":"#"},{"platform":"GitHub","href":"#"}]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
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

-- Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
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

-- Service role has full access (used by admin API)
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

-- Insert policy for public contact/newsletter/telemetry
CREATE POLICY "Public insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON telemetry FOR INSERT WITH CHECK (true);
