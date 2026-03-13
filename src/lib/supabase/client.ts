import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

/**
 * For use in Client Components ONLY
 */
export function createClientSideClient<T = Database>() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-build.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key";
  return createBrowserClient<T>(url, key);
}
