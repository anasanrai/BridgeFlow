import { NextRequest } from 'next/server'
import { createServerSideClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/api-response'

export const dynamic = 'force-dynamic'

/**
 * GET /api/automations
 * Returns list of automations for the authenticated user's organizations.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSideClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return apiError('Unauthorized', 401)
    }

    // Query automations through project -> org -> membership
    // RLS will handle the actual filtering, but we can be explicit
    const { data: automations, error } = await (supabase
      .from('automations' as any) as any)
      .select(`
        *,
        projects (
          name,
          organizations (
            name
          )
        )
      `)

    if (error) {
      return apiError(error.message, 500)
    }

    return apiSuccess(automations)
  } catch (error: any) {
    return apiError('Internal Server Error', 500, error.message)
  }
}
