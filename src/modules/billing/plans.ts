/**
 * SaaS Subscription Plans
 */

export interface Plan {
  id: string;
  name: string;
  priceId: string;
  paypalPlanId: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}


export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceId: process.env.STRIPE_PRICE_STARTER || 'price_starter_placeholder',
    paypalPlanId: process.env.PAYPAL_PLAN_STARTER || 'P-STARTER',
    price: 49,
    currency: 'USD',
    interval: 'month',
    features: ['3 Automations', '1 AI Agent', 'Community Support'],

  },
  {
    id: 'growth',
    name: 'Growth',
    priceId: process.env.STRIPE_PRICE_GROWTH || 'price_growth_placeholder',
    paypalPlanId: process.env.PAYPAL_PLAN_GROWTH || 'P-GROWTH',
    price: 149,
    currency: 'USD',
    interval: 'month',
    features: ['15 Automations', '5 AI Agents', 'Priority Support', 'Custom Tools'],

  },
  {
    id: 'agency',
    name: 'Agency',
    priceId: process.env.STRIPE_PRICE_AGENCY || 'price_agency_placeholder',
    paypalPlanId: process.env.PAYPAL_PLAN_AGENCY || 'P-AGENCY',
    price: 499,
    currency: 'USD',
    interval: 'month',
    features: ['Unlimited Automations', '20 AI Agents', 'Dedicated Success Manager', 'White-labeling'],

  },
];

export function getPlanById(id: string) {
  return PLANS.find(p => p.id === id);
}

export function getPlanByPriceId(priceId: string) {
  return PLANS.find(p => p.priceId === priceId);
}
