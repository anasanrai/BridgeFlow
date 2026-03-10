-- BridgeFlow Schema Enhancement
-- This migration adds categories, version control, and analytics tracking
-- Run this in your Supabase SQL editor or via CLI

-- 1. CREATE CATEGORIES TABLE (Normalized)
CREATE TABLE IF NOT EXISTS public.categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    icon TEXT DEFAULT 'folder',
    color TEXT DEFAULT '#6b7280',
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CREATE TEMPLATE_CATEGORIES JUNCTION TABLE (Many-to-Many)
CREATE TABLE IF NOT EXISTS public.template_categories (
    template_id BIGINT REFERENCES public.templates(id) ON DELETE CASCADE,
    category_id BIGINT REFERENCES public.categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (template_id, category_id)
);

-- 3. CREATE TEMPLATE_VERSIONS TABLE (Version Control)
CREATE TABLE IF NOT EXISTS public.template_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id BIGINT NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
    version_number TEXT NOT NULL,
    changelog TEXT DEFAULT '',
    workflow_json JSONB,
    nodes JSONB DEFAULT '[]'::jsonb,
    node_count INTEGER DEFAULT 0,
    created_by TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ADD ANALYTICS COLUMNS TO TEMPLATES
ALTER TABLE public.templates
ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_downloaded_at TIMESTAMPTZ;

-- 5. CREATE TEMPLATE ANALYTICS TABLE (Detailed tracking)
CREATE TABLE IF NOT EXISTS public.template_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id BIGINT REFERENCES public.templates(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('view', 'download', 'purchase', 'share')),
    user_email TEXT,
    user_ip TEXT,
    referrer TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ENABLE RLS ON NEW TABLES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_analytics ENABLE ROW LEVEL SECURITY;

-- 7. POLICIES FOR CATEGORIES
-- Public can read categories
CREATE POLICY "Public can read categories" ON public.categories
    FOR SELECT USING (true);

-- Only service role can modify
CREATE POLICY "Admin full access to categories" ON public.categories
    FOR ALL USING (auth.role() = 'service_role');

-- 8. POLICIES FOR TEMPLATE_CATEGORIES
CREATE POLICY "Public can read template_categories" ON public.template_categories
    FOR SELECT USING (true);

CREATE POLICY "Admin full access to template_categories" ON public.template_categories
    FOR ALL USING (auth.role() = 'service_role');

-- 9. POLICIES FOR TEMPLATE_VERSIONS
CREATE POLICY "Public can read template_versions" ON public.template_versions
    FOR SELECT USING (true);

CREATE POLICY "Admin full access to template_versions" ON public.template_versions
    FOR ALL USING (auth.role() = 'service_role');

-- 10. POLICIES FOR TEMPLATE_ANALYTICS
-- Anyone can insert analytics (for tracking)
CREATE POLICY "Anyone can insert template_analytics" ON public.template_analytics
    FOR INSERT WITH CHECK (true);

-- Only admin can read analytics
CREATE POLICY "Admin can read template_analytics" ON public.template_analytics
    FOR SELECT USING (auth.role() = 'service_role');

-- 11. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_order ON public.categories("order");
CREATE INDEX IF NOT EXISTS idx_template_versions_template_id ON public.template_versions(template_id);
CREATE INDEX IF NOT EXISTS idx_template_analytics_template_id ON public.template_analytics(template_id);
CREATE INDEX IF NOT EXISTS idx_template_analytics_created_at ON public.template_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_template_analytics_event_type ON public.template_analytics(event_type);

-- 12. SEED DEFAULT CATEGORIES
INSERT INTO public.categories (name, slug, description, icon, color, "order") VALUES
    ('Real Estate', 'real-estate', 'Real estate automation workflows', 'home', '#10b981', 1),
    ('Lead Management', 'lead-management', 'Lead capture and management', 'users', '#3b82f6', 2),
    ('Communication', 'communication', 'Email and messaging automation', 'mail', '#8b5cf6', 3),
    ('AI-Powered', 'ai-powered', 'Workflows with AI capabilities', 'brain', '#f59e0b', 4),
    ('CRM', 'crm', 'Customer relationship management', 'database', '#ef4444', 5),
    ('Marketing', 'marketing', 'Marketing automation', 'megaphone', '#ec4899', 6),
    ('Finance', 'finance', 'Financial automation', 'dollar-sign', '#14b8a6', 7)
ON CONFLICT (slug) DO NOTHING;

-- 13. MIGRATE EXISTING CATEGORIES TO NEW TABLE
-- This will populate template_categories from existing array data
INSERT INTO public.template_categories (template_id, category_id)
SELECT t.id, c.id
FROM public.templates t
CROSS JOIN LATERAL unnest(t.categories) AS cat_name
JOIN public.categories c ON c.slug = lower(replace(cat_name, ' ', '-'))
ON CONFLICT (template_id, category_id) DO NOTHING;

-- 14. CREATE FUNCTION TO TRACK DOWNLOADS
CREATE OR REPLACE FUNCTION increment_template_download(template_id BIGINT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.templates
    SET
        download_count = download_count + 1,
        last_downloaded_at = NOW()
    WHERE id = template_id;
END;
$$;

-- 15. CREATE FUNCTION TO TRACK VIEWS
CREATE OR REPLACE FUNCTION increment_template_view(template_id BIGINT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.templates
    SET view_count = view_count + 1
    WHERE id = template_id;
END;
$$;

-- 16. CREATE VIEW FOR TEMPLATE ANALYTICS SUMMARY
CREATE OR REPLACE VIEW public.template_analytics_summary AS
SELECT
    t.id AS template_id,
    t.name AS template_name,
    t.download_count,
    t.view_count,
    t.last_downloaded_at,
    COUNT(DISTINCT ta.id) FILTER (WHERE ta.event_type = 'view') AS total_events,
    COUNT(DISTINCT ta.user_email) FILTER (WHERE ta.user_email IS NOT NULL) AS unique_visitors
FROM public.templates t
LEFT JOIN public.template_analytics ta ON t.id = ta.template_id
GROUP BY t.id, t.name, t.download_count, t.view_count, t.last_downloaded_at;

-- 17. CREATE FUNCTION TO LOG ANALYTICS
CREATE OR REPLACE FUNCTION log_template_event(
    p_template_id BIGINT,
    p_event_type TEXT,
    p_user_email TEXT DEFAULT NULL,
    p_referrer TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.template_analytics (template_id, event_type, user_email, referrer, metadata)
    VALUES (p_template_id, p_event_type, p_user_email, p_referrer, p_metadata);

    -- Update counts on templates table
    IF p_event_type = 'view' THEN
        UPDATE public.templates SET view_count = view_count + 1 WHERE id = p_template_id;
    ELSIF p_event_type = 'download' THEN
        UPDATE public.templates SET download_count = download_count + 1, last_downloaded_at = NOW() WHERE id = p_template_id;
    END IF;
END;
$$;
