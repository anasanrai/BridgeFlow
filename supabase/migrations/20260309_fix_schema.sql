-- 1. FIX TEMPLATES TABLE
-- We need to add missing columns and ensure they match the spec

ALTER TABLE public.templates 
ADD COLUMN IF NOT EXISTS short_description TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS long_description TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS connection_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS json_url TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS json_access TEXT DEFAULT 'free' CHECK (json_access IN ('free', 'paid')),
ADD COLUMN IF NOT EXISTS tools TEXT[] DEFAULT '{}';

-- 2. CREATE PAYMENT SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.payment_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    active_gateway TEXT DEFAULT 'paypal' CHECK (active_gateway IN ('paypal', 'stripe', 'moyasar')),
    paypal_enabled BOOLEAN DEFAULT false,
    paypal_mode TEXT DEFAULT 'sandbox' CHECK (paypal_mode IN ('sandbox', 'live')),
    paypal_client_id TEXT DEFAULT '',
    paypal_client_secret TEXT DEFAULT '',
    stripe_enabled BOOLEAN DEFAULT false,
    stripe_public_key TEXT DEFAULT '',
    stripe_secret_key TEXT DEFAULT '',
    stripe_webhook_secret TEXT DEFAULT '',
    moyasar_enabled BOOLEAN DEFAULT false,
    moyasar_api_key TEXT DEFAULT '',
    moyasar_publishable_key TEXT DEFAULT '',
    bank_enabled BOOLEAN DEFAULT false,
    bank_details JSONB DEFAULT '{}',
    wise_enabled BOOLEAN DEFAULT false,
    wise_email TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE PURCHASES TABLE
CREATE TABLE IF NOT EXISTS public.purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT NOT NULL,
    template_id BIGINT REFERENCES public.templates(id),
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    gateway TEXT NOT NULL,
    transaction_id TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ENABLE RLS
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- 5. POLICIES
-- payment_settings: Only service role (admin) can read/write
CREATE POLICY "Admin full access to payment_settings" ON public.payment_settings
    FOR ALL USING (auth.role() = 'service_role');

-- purchases: Users can read their own by email, admin full access
CREATE POLICY "Users can read own purchases" ON public.purchases
    FOR SELECT USING (user_email = auth.jwt() ->> 'email');

CREATE POLICY "Admin full access to purchases" ON public.purchases
    FOR ALL USING (auth.role() = 'service_role');
