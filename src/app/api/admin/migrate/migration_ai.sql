-- AI Models
CREATE TABLE IF NOT EXISTS ai_models (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  provider TEXT NOT NULL, -- e.g., 'Modal', 'Ollama', 'Gemini', 'OpenAI'
  model_id TEXT NOT NULL, -- e.g., 'glm-4', 'llama3'
  api_key_env TEXT, -- Name of the env variable
  is_primary BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- API Tokens for external integrations
CREATE TABLE IF NOT EXISTS api_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  scopes JSONB DEFAULT '["read", "write"]'::jsonb,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhooks (e.g., for n8n)
CREATE TABLE IF NOT EXISTS webhooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  secret TEXT,
  events JSONB DEFAULT '["*"]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Settings & AI Brain Control
CREATE TABLE IF NOT EXISTS audit_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ai_brain_enabled BOOLEAN DEFAULT TRUE,
  background_audit_interval INT DEFAULT 60, -- minutes
  notification_email TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_settings ENABLE ROW LEVEL SECURITY;

-- Service role full access
CREATE POLICY "Service role full access" ON ai_models FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON api_tokens FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON webhooks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON audit_settings FOR ALL USING (true) WITH CHECK (true);

-- Insert default audit settings
INSERT INTO audit_settings (ai_brain_enabled) VALUES (true) ON CONFLICT DO NOTHING;

-- Insert default models based on .env
INSERT INTO ai_models (name, provider, model_id, api_key_env, is_primary) 
VALUES 
('Modal GLM-5', 'Modal', 'glm-5', 'MODAL_API_KEY', true),
('Ollama Cloud', 'Ollama', 'llama3', 'OLLAMA_API_KEY', false),
('Gemini Pro', 'Google', 'gemini-1.5-pro', 'GEMINI_API_KEY', false)
ON CONFLICT DO NOTHING;
