-- Create templates table for BridgeFlow admin panel
-- Run this in your Supabase SQL editor or via CLI

CREATE TABLE IF NOT EXISTS public.templates (
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    categories  TEXT[] DEFAULT '{}',
    difficulty  TEXT DEFAULT 'Beginner',
    nodes       TEXT[] DEFAULT '{}',
    node_count  INTEGER DEFAULT 0,
    setup_time  TEXT DEFAULT '30 min',
    value       INTEGER DEFAULT 0,
    description TEXT DEFAULT '',
    what_it_does TEXT[] DEFAULT '{}',
    featured    BOOLEAN DEFAULT false,
    status      TEXT DEFAULT 'draft',
    n8n_workflow_id TEXT DEFAULT '',
    "order"     INTEGER DEFAULT 0,
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for ordered listing
CREATE INDEX IF NOT EXISTS templates_order_idx ON public.templates ("order");

-- Enable RLS (Row Level Security)
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Public read access (published templates visible on the website)
CREATE POLICY "Public can read published templates"
    ON public.templates
    FOR SELECT
    USING (status = 'published');

-- Service role has full access (used by admin API with SUPABASE_SERVICE_ROLE_KEY)
CREATE POLICY "Service role has full access"
    ON public.templates
    FOR ALL
    USING (auth.role() = 'service_role');

-- ── Seed data: import existing templates from templates.json ─────────────────
-- You can run the seeding script or paste the inserts manually.
-- Example (replace values as needed):

INSERT INTO public.templates (id, name, slug, categories, difficulty, nodes, node_count, setup_time, value, description, what_it_does, featured, status, n8n_workflow_id, "order", updated_at)
VALUES
(1, 'Real Estate Lead Capture & Notification', 'real-estate-lead-capture',
 ARRAY['Real Estate','Lead Management'], 'Beginner',
 ARRAY['Webhook','Google Sheets','Telegram','Gmail'], 4, '20 min', 200,
 'Instantly capture leads from any source, save to Google Sheets, and notify your team via Telegram and email.',
 ARRAY['Receives leads via webhook from any website or form','Saves lead data to Google Sheets automatically','Sends instant Telegram alert to agent','Sends welcome email to lead within seconds'],
 false, 'published', 'wKBnBodZY46OaPoA', 1, '2026-03-06T00:00:00Z'),

(2, '3-Email Follow-Up Sequence', 'follow-up-email-sequence',
 ARRAY['Real Estate','Communication'], 'Beginner',
 ARRAY['Webhook','Wait','Gmail'], 5, '25 min', 150,
 'Automatically send a timed 3-email follow-up sequence to every lead without any manual work.',
 ARRAY['Sends instant welcome email on lead capture','Waits 24 hours then sends follow-up email','Waits 48 more hours then sends final check-in','Works 24/7 even while you sleep'],
 false, 'published', 'BWepF6rYUerOW3fh', 2, '2026-03-06T00:00:00Z'),

(3, 'Lead Routing by Area', 'lead-routing-system',
 ARRAY['Real Estate','Lead Management'], 'Intermediate',
 ARRAY['Webhook','Google Sheets','Edit Fields','Switch','Gmail','Telegram'], 10, '45 min', 300,
 'Automatically route incoming leads to the right agent based on their area preference using Switch node logic.',
 ARRAY['Normalizes area data automatically','Routes leads to correct agent (North/South/Downtown)','Sends area-specific email and Telegram notification','Logs all leads with assigned agent to Google Sheets'],
 false, 'published', 'dav9j1aEDKynzp0O', 3, '2026-03-06T00:00:00Z'),

(4, 'Missed Call Auto-Response System', 'missed-call-text-back',
 ARRAY['Real Estate','Communication'], 'Intermediate',
 ARRAY['Webhook','Google Sheets','Gmail','Telegram','Schedule'], 8, '35 min', 400,
 'Never lose a lead from a missed call again. Auto-sends email response and delivers daily missed call summary every morning.',
 ARRAY['Receives missed call webhook from GHL or any CRM','Instantly emails the caller with callback message','Sends Telegram alert to agent immediately','Delivers formatted daily summary every morning at 8am'],
 false, 'published', '2t0HPTKtNWo1y2OP', 4, '2026-03-06T00:00:00Z'),

(5, 'AI Personalized Email Generator', 'ai-personalized-email',
 ARRAY['Real Estate','AI-Powered'], 'Intermediate',
 ARRAY['Webhook','OpenAI/OpenRouter','Gmail','Google Sheets','Telegram'], 5, '30 min', 500,
 'GPT writes a unique personalized email for every single lead based on their specific interests, budget, and location.',
 ARRAY['Reads lead interest, budget, and location','GPT writes completely unique email for each lead','Sends personalized email automatically','Logs AI-generated content to Google Sheets','Telegram preview of email sent to agent'],
 false, 'published', 'J5BbDcr2qrz0poja', 5, '2026-03-06T00:00:00Z'),

(6, 'AI Lead Scoring System', 'ai-lead-scoring',
 ARRAY['Real Estate','AI-Powered','Lead Management'], 'Advanced',
 ARRAY['Webhook','OpenAI/OpenRouter','Code','IF','Gmail','Telegram','Google Sheets'], 12, '60 min', 800,
 'AI automatically scores every lead 1-10 and routes HOT leads to instant booking while filing cold leads for later.',
 ARRAY['AI analyzes budget, timeline, location, pre-approval status','Scores lead 1-10 with visual emoji score bar','HOT leads (7+) get urgent alert + booking email instantly','WARM leads get AI nurture email','COLD leads saved for future follow-up','All scores logged to Google Sheets'],
 false, 'published', 'Uca80DipBMoWBifX', 6, '2026-03-06T00:00:00Z'),

(7, 'Complete Real Estate Lead Machine', 'complete-lead-machine',
 ARRAY['Real Estate','AI-Powered','Lead Management','CRM'], 'Advanced',
 ARRAY['Webhook','Edit Fields','Google Sheets','OpenAI/OpenRouter','Code','Switch','IF','Gmail','Telegram','Basic LLM Chain'], 25, '3 hours', 1497,
 'The complete done-for-you lead automation system. AI scoring + area routing + personalized emails + instant alerts + daily summaries.',
 ARRAY['Captures and normalizes all lead data','AI scores every lead 1-10 automatically','Routes to correct agent by area (7 zones)','HOT leads: booking email + urgent Telegram alert','WARM leads: AI writes personalized follow-up email','COLD leads: saved for future without wasting agent time','All leads logged with score, category, agent, action taken','Final confirmation message for every processed lead'],
 true, 'published', 'bwr0OQ2lH5Ylq4hP', 7, '2026-03-06T00:00:00Z')

ON CONFLICT (slug) DO NOTHING;

-- Reset sequence to avoid id collision after manual inserts
SELECT setval('public.templates_id_seq', (SELECT MAX(id) FROM public.templates));
