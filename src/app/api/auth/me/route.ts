import { NextRequest } from 'next/server'
import { createServerSideClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/api-response'

export const dynamic = 'force-dynamic'

/**
 * GET /api/auth/me
 * Returns the currently authenticated user's session and profile.
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSideClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return apiError('Not authenticated', 401)
    }

    // Fetch profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles' as any)
      .select('*')
      .eq('id', user.id)
      .single()

    return apiSuccess({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      profile: profile || null,
    })
  } catch (error: any) {
    return apiError('Internal Server Error', 500, error.message)
  }
}
