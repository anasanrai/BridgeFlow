import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

// Manually parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envConfig: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envConfig[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
  }
});

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const templates = [
  {
    name: "AI Lead Scoring & Qualification",
    slug: "ai-lead-scoring",
    description: "Automatically score and qualify leads based on intent and firmographics using AI.",
    difficulty: "Intermediate",
    node_count: 12,
    value: 497,
    featured: true,
    status: "published",
    image_url: "/images/n8n-Templates/ai-lead-scoring.png",
    tools: ["n8n", "OpenAI", "HubSpot", "Slack"]
  },
  {
    name: "AI Personalized Email Outreach",
    slug: "ai-personalized-email",
    description: "Send hyper-personalized cold emails that scale by using AI to reference LinkedIn and company data.",
    difficulty: "Advanced",
    node_count: 15,
    value: 697,
    featured: true,
    status: "published",
    image_url: "/images/n8n-Templates/ai-personalized-email.png",
    tools: ["n8n", "Instantly", "Smartlead", "Perplexity"]
  },
  {
    name: "Complete Lead Generation Machine",
    slug: "complete-lead-machine",
    description: "A full end-to-end system from scraping to lead capture and appointment booking.",
    difficulty: "Advanced",
    node_count: 24,
    value: 1297,
    featured: true,
    status: "published",
    image_url: "/images/n8n-Templates/complete-lead-machine.png",
    tools: ["n8n", "Make", "GoHighLevel", "OpenAI"]
  },
  {
    name: "Automated Follow-up Sequence",
    slug: "follow-up-email-sequence",
    description: "Never let a lead go cold with an intelligent follow-up system that stops on response.",
    difficulty: "Beginner",
    node_count: 8,
    value: 297,
    featured: false,
    status: "published",
    image_url: "/images/n8n-Templates/follow-up-email-sequence.png",
    tools: ["n8n", "Gmail", "Outlook", "Zoho"]
  },
  {
    name: "Smart Lead Routing System",
    slug: "lead-routing-system",
    description: "Route leads to the right sales rep based on territory, budget, or specialty automatically.",
    difficulty: "Intermediate",
    node_count: 10,
    value: 397,
    featured: false,
    status: "published",
    image_url: "/images/n8n-Templates/lead-routing-system.png",
    tools: ["n8n", "Salesforce", "Pipedrive", "Slack"]
  },
  {
    name: "Missed Call Text-Back (Standard)",
    slug: "missed-call-text-back",
    description: "Immediately text back customers who call and don't reach you, so you never lose a job again.",
    difficulty: "Beginner",
    node_count: 5,
    value: 197,
    featured: true,
    status: "published",
    image_url: "/images/n8n-Templates/missed-call-text-back.png",
    tools: ["n8n", "Twilio", "RingCentral"]
  },
  {
    name: "Missed Call Text-Back (Pro)",
    slug: "missed-call-text-back-pro",
    description: "Advanced text-back system with AI appointment booking and qualification.",
    difficulty: "Intermediate",
    node_count: 14,
    value: 497,
    featured: true,
    status: "published",
    image_url: "/images/n8n-Templates/missed-call-text-back2.png",
    tools: ["n8n", "Twilio", "OpenAI", "Calendly"]
  },
  {
    name: "Real Estate Lead Capture & Nurture",
    slug: "real-estate-lead-capture",
    description: "Capture Zillow/Facebook leads and automate the 2-year nurture cycle required for home buyers.",
    difficulty: "Intermediate",
    node_count: 18,
    value: 597,
    featured: true,
    status: "published",
    image_url: "/images/n8n-Templates/real-estate-lead-capture.png",
    tools: ["n8n", "Facebook Ads", "KVCore", "Chime"]
  }
];

async function seed() {
  console.log('Seeding templates...');
  for (const template of templates) {
    const { data, error } = await supabase
      .from('templates')
      .upsert(template, { onConflict: 'slug' });
    
    if (error) {
      console.error(`Error seeding ${template.slug}:`, error.message);
    } else {
      console.log(`Successfully seeded: ${template.name}`);
    }
  }
  console.log('Finished seeding.');
}

seed();
