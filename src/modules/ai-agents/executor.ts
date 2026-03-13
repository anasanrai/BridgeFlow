import { chatCompletion, ChatMessage } from '@/services/ai/provider'
import { toolRegistry } from './tools'

/**
 * Agent Execution Engine
 * Handles the ReAct loop: Thinking -> Action -> Observation -> Response
 */

export interface AgentConfig {
  systemPrompt: string;
  tools?: string[];
  maxLoops?: number;
}

export async function executeAgent(
  input: string,
  config: AgentConfig,
  history: ChatMessage[] = []
) {
  const messages: ChatMessage[] = [
    { role: 'system', content: config.systemPrompt },
    ...history,
    { role: 'user', content: input }
  ];

  let loops = 0;
  const maxLoops = config.maxLoops || 5;

  while (loops < maxLoops) {
    loops++;
    
    // 1. Initial completion or NEXT thinking step
    const response = await chatCompletion(messages, {
      temperature: 0, // Agents need precision
    });

    const content = response.content;
    messages.push({ role: 'assistant', content });

    // 2. Parse for tool calls (simple regex for now or specific format)
    // In a real prod app, use proper OpenAI Function Calling or Anthropic Tool Use
    const toolCallMatch = content.match(/\[TOOL: (\w+)\](\{.*\})?/);
    
    if (toolCallMatch) {
      const toolName = toolCallMatch[1];
      const toolArgs = JSON.parse(toolCallMatch[2] || '{}');

      const tool = toolRegistry[toolName];
      if (tool) {
        const observation = await tool.execute(toolArgs);
        messages.push({ 
          role: 'user', 
          content: `Observation from ${toolName}: ${JSON.stringify(observation)}` 
        });
        continue; // Go back to thinking
      }
    }

    // 3. No tool call found, return the final response
    return response;
  }

  throw new Error("Agent exceeded maximum execution loops");
}
