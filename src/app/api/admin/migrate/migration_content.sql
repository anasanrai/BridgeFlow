-- Clear existing demo items if necessary or update them
-- For this task, we will update the core sections with realistic info

-- Update Site Config
UPDATE site_config SET 
  tagline = 'Architecting the Future of Enterprise Automation',
  description = 'BridgeFlow is a premier AI automation agency specializing in building high-performance, enterprise-grade workflows and intelligent decision systems for the world''s most ambitious companies.',
  social_links = '[{"platform":"X","href":"https://x.com/bridgeflow"},{"platform":"LinkedIn","href":"https://linkedin.com/company/bridgeflow"},{"platform":"GitHub","href":"https://github.com/bridgeflow"},{"platform":"Instagram","href":"https://instagram.com/bridgeflow"}]'::jsonb
WHERE name = 'BridgeFlow';

-- Update Home Content Hero
UPDATE home_content SET 
  hero = '{
    "badge": "Enterprise AI Orchestration",
    "title": "Scale Your Operations with",
    "titleLine2": "Autonomous AI",
    "highlight": "Systems",
    "description": "We don''t just automate; we architect intelligent ecosystems that think, learn, and execute at the speed of light. Experience the 10x multiplier of true AI integration.",
    "ctaPrimary": {"text": "Book Discovery Call", "href": "/contact"},
    "ctaSecondary": {"text": "Explore AI Calculator", "href": "/calculator"}
  }'::jsonb,
  stats = '[
    {"end": 500, "suffix": "+", "label": "Enterprise Automations"},
    {"end": 15, "suffix": "M", "label": "Annual Client Savings"},
    {"end": 99, "suffix": ".9%", "label": "Automation Uptime"},
    {"end": 12, "suffix": "x", "label": "Average Client ROI"}
  ]'::jsonb
WHERE id IS NOT NULL;

-- Update Services with realistic info
DELETE FROM services;
INSERT INTO services (title, icon, description, features, color, sort_order) VALUES
('Autonomous Agent Architecture', 'Brain', 'We build self-correcting AI agents that manage complex cross-departmental workflows without human intervention.', '["Multi-agent system orchestration","Self-healing error protocols","LLM-powered decision trees","Real-time adaptive learning","Custom cognitive architectures"]'::jsonb, 'from-gold-600 to-amber-400', 0),
('Enterprise n8n Infrastructure', 'Zap', 'Scalable, high-availability n8n deployments hosted on private clouds with advanced security and compliance.', '["HA n8n Cluster Setup","SOC2/GDPR Compliant Infrastructure","Custom Node Development","Complex Hub & Spoke Architectures","Proactive 24/7 Monitoring"]'::jsonb, 'from-blue-600 to-cyan-400', 1),
('Intelligent Data Pipelines', 'Database', 'Transforming fragmented enterprise data into actionable intelligence through AI-driven ETL and RAG systems.', '["Vector Database Integration","RAG Pipeline Implementation","Automated Data Enrichment","Predictive Analytics Dashboards","Semantic Search Optimization"]'::jsonb, 'from-purple-600 to-indigo-400', 2),
('AI-Native Lead Orchestration', 'Users', 'Converting cold traffic into closed deals using hyper-personalized AI outreach and intelligent qualification.', '["AI Voice & Text Interaction","Speed-to-Lead Optimization (<1 min)","Hyper-Personalized Content Engines","Automated Appointment Setting","RevOps Stack Consolidation"]'::jsonb, 'from-emerald-600 to-teal-400', 3);

-- Update Process Steps
UPDATE home_content SET 
  process_steps = '[
    {"step": "01", "title": "Diagnostic Audit", "description": "We perform a deep-tissue scan of your current operational bottlenecks using our proprietary AI Brain engine."},
    {"step": "02", "title": "Strategic Blueprint", "description": "Our architects design a comprehensive automation roadmap focused on high-impact ROI and seamless integration."},
    {"step": "03", "title": "Precision Deployment", "description": "We deploy redundant, enterprise-grade systems with zero disruption to your existing business operations."},
    {"step": "04", "title": "Continuous Evolution", "description": "Your systems aren''t static. We provide ongoing optimization to ensure your AI stack stays ahead of the curve."}
  ]'::jsonb
WHERE id IS NOT NULL;
