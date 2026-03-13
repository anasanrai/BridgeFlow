/**
 * Agent Tool Registry
 * Definitions for tools that AI agents can use.
 */

export interface Tool {
  name: string;
  description: string;
  parameters: Record<string, any>;
  execute: (args: any) => Promise<any>;
}

export const toolRegistry: Record<string, Tool> = {
  "send_email": {
    name: "send_email",
    description: "Send an email to a recipient",
    parameters: {
      to: { type: "string", description: "Email address of the recipient" },
      subject: { type: "string", description: "Subject line of the email" },
      body: { type: "string", description: "Content of the email" },
    },
    execute: async (args) => {
      // Implementation placeholder linked to SMTP service
      console.log("TOOL: Sending email", args);
      return { success: true, message: "Email sent" };
    }
  },
  "trigger_automation": {
    name: "trigger_automation",
    description: "Trigger an n8n automation workflow",
    parameters: {
      workflow_id: { type: "string", description: "The ID of the workflow to trigger" },
      data: { type: "object", description: "Data to pass to the workflow" },
    },
    execute: async (args) => {
      // Implementation linked to n8n service
      console.log("TOOL: Triggering n8n", args);
      return { success: true, status: "triggered" };
    }
  }
};
