import { NextRequest } from 'next/server'
import { createServerSideClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/api-response'
import { triggerWorkflow } from '@/services/n8n/client'

/**
 * POST /api/automations/[id]/trigger
 * Triggers a specific automation for the user
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await req.json()
    const supabase = createServerSideClient()

    // 1. Verify access to automation
    const { data: automation, error: fetchError } = await (supabase
      .from('automations' as any) as any)
      .select('*, projects(*)')
      .eq('id', id)
      .single()

    if (fetchError || !automation) {
      return apiError('Automation not found or access denied', 404)
    }

    // 2. Trigger n8n
    if (!automation.n8n_workflow_id) {
      return apiError('Automation has no n8n workflow ID configured', 400)
    }

    const result = await triggerWorkflow(automation.n8n_workflow_id, {
      ...body,
      automation_id: id,
      project_id: automation.project_id,
      org_id: automation.projects?.org_id,
    })

    // 3. Log activity
    await (supabase.from('activity_log' as any) as any).insert({
      action: 'automation_triggered',
      section: 'Automation',
      details: `Triggered "${automation.name}"`
    })

    return apiSuccess({
      message: 'Automation triggered successfully',
      result
    })

  } catch (error: any) {
    return apiError('Internal Server Error', 500, error.message)
  }
}
