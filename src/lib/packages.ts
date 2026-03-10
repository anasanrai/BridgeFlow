// Package definitions — source of truth for PayPal checkout
export const PACKAGES: Record<string, { name: string; price: number; description: string }> = {
    starter: { name: 'Starter Package', price: 497, description: '1 custom n8n workflow + 14 days support' },
    growth: { name: 'Growth Package', price: 797, description: '3 custom n8n workflows + CRM integration + 30 days monitoring' },
    pro: { name: 'Pro Package', price: 1497, description: '5 workflows + full CRM + AI integrations + 60 days monitoring' },
}
