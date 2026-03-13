import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_build_time";

export const stripe = new Stripe(stripeKey, {
  apiVersion: "2026-02-25.clover" as any, // Match exact package version
  appInfo: {
    name: "BridgeFlow SaaS",
    version: "0.1.0",
  },
});
