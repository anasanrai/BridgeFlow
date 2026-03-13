/**
 * n8n Service Client
 * Handles communication with the n8n automation engine.
 */

interface TriggerOptions {
  async?: boolean;
  webhookUrl?: string;
}

/**
 * Trigger an n8n workflow via webhook
 */
export async function triggerWorkflow(
  workflowIdOrUrl: string,
  payload: Record<string, any>,
  options: TriggerOptions = {}
) {
  try {
    // If it's a slug, we might want to look it up, but usually we pass the full URL or ID
    const url = workflowIdOrUrl.startsWith('http') 
      ? workflowIdOrUrl 
      : `${process.env.N8N_WEBHOOK_URL}/${workflowIdOrUrl}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add header-based auth if configured in n8n
        ...(process.env.N8N_API_KEY ? { "X-N8N-API-KEY": process.env.N8N_API_KEY } : {}),
      },
      body: JSON.stringify({
        ...payload,
        _metadata: {
          source: "bridgeflow_platform",
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`n8n Trigger Error (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("n8n Service Error:", error);
    throw error;
  }
}

/**
 * Get workflow execution status (if n8n API enabled)
 */
export async function getExecutionStatus(executionId: string) {
  // requires n8n API access which is separate from webhooks
  const baseUrl = process.env.N8N_API_BASE_URL;
  if (!baseUrl || !process.env.N8N_API_KEY) return null;

  const response = await fetch(`${baseUrl}/executions/${executionId}`, {
    headers: {
      "X-N8N-API-KEY": process.env.N8N_API_KEY,
    },
  });

  return response.json();
}
