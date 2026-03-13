import { createServerSideClient } from '@/lib/supabase/server'
import { Database } from '@/types/database'

export type Role = 'owner' | 'admin' | 'member';

/**
 * Get the user's role for a specific organization
 */
export async function getUserRole(userId: string, orgId: string): Promise<Role | null> {
  const supabase = createServerSideClient()
  
  const { data, error } = await supabase
    .from('memberships' as any)
    .select('role')
    .eq('user_id', userId)
    .eq('org_id', orgId)
    .single()

  if (error || !data) return null
  return (data as any).role as Role
}

/**
 * Check if a user has sufficient permissions for billing
 */
export function canManageBilling(role: Role): boolean {
  return role === 'owner' || role === 'admin'
}

/**
 * Check if a user can manage organization settings
 */
export function canManageOrg(role: Role): boolean {
  return role === 'owner'
}
