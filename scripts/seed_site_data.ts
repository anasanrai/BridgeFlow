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

const siteConfig = {
  site_name: "BridgeFlow",
  tagline: "Automate Everything. Launch in Days.",
  logo_url: "/images/logo-coral.png",
  contact_email: "hello@bridgeflow.agency",
  contact_phone: "+977 9800000000", // Placeholder
  address: "Kathmandu, Nepal",
  social_links: [
    { platform: "LinkedIn", href: "https://linkedin.com/in/anasanrai" },
    { platform: "X", href: "https://x.com/bridgeflowai" },
  ],
  seo_defaults: {
    title: "BridgeFlow - AI Automation Agency",
    description: "Enterprise-grade n8n workflows and AI integration."
  }
};

const siteSettings = {
  founder_image: "/images/anasan-rai.png",
  social_links: [
    { platform: "LinkedIn", href: "https://linkedin.com/in/anasanrai" },
    { platform: "X", href: "https://x.com/bridgeflowai" },
  ],
  live_demos: [
    { title: "Leads Dashboard", url: "#" },
  ]
};

const homeContent = {
  hero: {
    badge: 'AI Automation Agency · Built in Kathmandu',
    title: 'Automate Everything.',
    titleLine2: 'Launch in Days.',
    highlight: 'Everything',
    description: 'BridgeFlow builds custom n8n workflows that eliminate manual work from your business. We don\'t write reports — we build systems that save you 10+ hours every week.',
    ctaPrimary: { text: 'View Packages', href: '/pricing' },
    ctaSecondary: { text: 'Book Free Audit', href: '/audit' },
  },
  stats: [
    { label: 'Workflows Built', value: 7, suffix: '+', icon: 'zap' },
    { label: 'Client Satisfaction', value: 100, suffix: '%', icon: 'shield' },
    { label: 'Avg. Delivery', value: 5, suffix: ' Days', icon: 'clock' },
  ],
  services_overview: [
    { title: 'Custom n8n Workflows', description: 'Sophisticated multi-step automations.' },
    { title: 'AI Agent Integration', description: 'Liaising with LLMs for intelligence.' },
  ],
  process_steps: [
    { number: '01', title: 'Audit', description: 'Deep dive into bottlenecks.' },
    { number: '02', title: 'Design', description: 'Map custom architecture.' },
  ],
  testimonials: [
    { content: 'ROI was immediate.', author: 'Sarah Chen' },
  ],
  cta: {
    title: 'Your Business Runs on Manual Work.',
    description: 'It doesn\'t have to.',
    primaryCta: { text: 'Schedule Free Audit', href: '/audit' },
  }
};

async function seed() {
  console.log('Seeding site data...');
  
  const results = await Promise.all([
    supabase.from('site_config').upsert({ id: '00000000-0000-0000-0000-000000000001', ...siteConfig }),
    supabase.from('site_settings').upsert({ id: '00000000-0000-0000-0000-000000000001', ...siteSettings }),
    supabase.from('home_content').upsert({ id: '00000000-0000-0000-0000-000000000001', ...homeContent })
  ]);

  results.forEach((res, i) => {
    const tables = ['site_config', 'site_settings', 'home_content'];
    if (res.error) {
      console.error(`Error seeding ${tables[i]}:`, res.error.message);
    } else {
      console.log(`Successfully seeded ${tables[i]}`);
    }
  });

  console.log('Finished seeding.');
}

seed();
