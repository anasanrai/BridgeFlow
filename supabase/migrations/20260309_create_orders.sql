-- 1. CREATE ORDERS TABLE
-- Tracks all payment attempts (pending, completed, failed)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT UNIQUE NOT NULL,
    plan_name TEXT NOT NULL,
    plan_price NUMERIC(10, 2) NOT NULL,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    payment_method TEXT NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ENABLE RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. POLICIES
-- Only service role (admin) can read/write everything
CREATE POLICY "Admin full access to orders" ON public.orders
    FOR ALL USING (auth.role() = 'service_role');

-- Users can read their own by email (if authenticated/matching email)
CREATE POLICY "Users can read own orders" ON public.orders
    FOR SELECT USING (customer_email = auth.jwt() ->> 'email');
