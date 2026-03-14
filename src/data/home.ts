/**
 * =============================================
 *  HOME PAGE CONTENT — Authentic Narrative
 *  Edit this file to update home page content.
 * =============================================
 */

export const defaultHomeContent = {
  hero: {
    badge: 'AI Automation Agency · Built in Kathmandu',
    title: 'Automate Everything.',
    titleLine2: 'Launch in Days.',
    highlight: 'Everything',
    description:
      'BridgeFlow builds custom n8n workflows that eliminate manual work from your business. We don\'t write reports — we build systems that save you 10+ hours every week.',
    ctaPrimary: { text: 'View Packages', href: '/pricing' },
    ctaSecondary: { text: 'Book Free Audit', href: '/audit' },
    image: '/images/hero-fallback.png',
  },
  stats: [
    { label: 'Workflows Built', value: 7, suffix: '+', icon: 'zap' },
    { label: 'Client Satisfaction', value: 100, suffix: '%', icon: 'shield' },
    { label: 'Avg. Delivery', value: 5, suffix: ' Days', icon: 'clock' },
    { label: 'Operating Globally', value: 24, suffix: '/7', icon: 'globe' },
  ],
  features: [
    {
      title: 'Custom n8n Workflows',
      description: 'Sophisticated multi-step automations that connect your entire tool stack seamlessly.',
      icon: 'workflow',
      color: 'bg-brand-coral/10',
    },
    {
      title: 'AI Agent Integration',
      description: 'Liaising with LLMs to bring intelligence to your workflows — scoring leads and drafting replies.',
      icon: 'brain',
      color: 'bg-brand-purple/10',
    },
    {
      title: 'CRM & Sales Ops',
      description: 'Automate your entire sales pipeline from lead capture to final contract signature.',
      icon: 'zap',
      color: 'bg-brand-teal/10',
    },
    {
      title: 'Rapid Deployment',
      description: 'First production-ready workflow live in as little as 5 business days. We move as fast as you do.',
      icon: 'rocket',
      color: 'bg-orange-500/10',
    },
    {
      title: 'Radical Honesty',
      description: 'We will tell you when automation is NOT the right answer. No fluff, just results.',
      icon: 'shield-check',
      color: 'bg-emerald-500/10',
    },
    {
      title: 'Global Engineering',
      description: 'Silicon Valley precision with a Nepali work ethic born from building everything from zero.',
      icon: 'globe',
      color: 'bg-blue-500/10',
    },
  ],
  results: [
    {
      metric: '10+',
      description: 'Hours saved per week',
      improvement: 'Average per workflow',
    },
    {
      metric: '0',
      description: 'Leads lost to manual errors',
      improvement: 'After automation',
    },
    {
      metric: 'ROI',
      description: 'Calculated before we start',
      improvement: 'Transparency first',
    },
  ],
  process: [
    { number: '01', title: 'Audit', description: 'Deep dive into your manual bottlenecks.', icon: 'search' },
    { number: '02', title: 'Design', description: 'Map out the custom architecture.', icon: 'layout' },
    { number: '03', title: 'Build', description: 'Rapid development and internal testing.', icon: 'code' },
    { number: '04', title: 'Launch', description: 'Production deployment and training.', icon: 'rocket' },
  ],
  testimonials: [
    {
      content: 'BridgeFlow transformed our lead response time from hours to seconds. The ROI was immediate.',
      author: 'Sarah Chen',
      role: 'Operations Director',
      company: 'GrowthScale',
      image: '/images/testimonials/sarah.jpg',
      rating: 5,
    },
    {
      content: 'The most honest agency we\'ve worked with. They built systems we didn\'t even know we needed.',
      author: 'Marcus Thorne',
      role: 'Founder',
      company: 'Thorne Logistics',
      image: '/images/testimonials/marcus.jpg',
      rating: 5,
    },
  ],
  trustedBy: {
    title: 'Trusted by Revenue Teams Globally',
    description: 'We help growing companies operate with the precision of an enterprise.',
    companies: [
      { name: 'Company One', logo: '/images/logos/one.svg' },
      { name: 'Company Two', logo: '/images/logos/two.svg' },
    ],
  },
  cta: {
    title: 'Your Business Runs on Manual Work.',
    description:
      'It doesn\'t have to. Let\'s calculate exactly how many hours we can save you this month.',
    primaryCta: { text: 'Schedule Free Audit', href: '/audit' },
    secondaryCta: { text: 'View Pricing', href: '/pricing' },
  },
};

export const hero = defaultHomeContent.hero
export const stats = defaultHomeContent.stats
export const features = defaultHomeContent.features
export const cta = defaultHomeContent.cta
