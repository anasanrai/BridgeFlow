import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

/**
 * For use in Server Components, Server Actions, and Route Handlers
 */
export function createServerSideClient<T = Database>() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-build.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key";
  const cookieStore = cookies()

  return createServerClient<T>(url, key, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
          }
        },
      },
    }
  )
}

/**
 * For fetching public data in cached scopes (no cookies)
 */
export function createPublicClient<T = Database>() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-build.supabase.co";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key";
    return createServerClient<T>(url, key, {
        cookies: {
            get(name: string) { return undefined },
            set(name: string, value: string, options: any) { },
            remove(name: string, options: any) { },
        },
    }
    )
}

/**
 * For administrative tasks (node-side only)
 */
export function createAdminClient<T = Database>() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-build.supabase.co";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy-key";
  return createServerClient<T>(url, key, {
      cookies: {
        get(name: string) { return undefined },
        set(name: string, value: string, options: any) {},
        remove(name: string, options: any) {},
      },
    }
  )
}
