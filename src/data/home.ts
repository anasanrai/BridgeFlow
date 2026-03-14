/**
 * =============================================
 *  HOME PAGE DATA — Enterprise Edition
 *  Edit this file to update home page content.
 *  Admin dashboard can override these defaults.
 * =============================================
 */

export const defaultHomeContent = {
  hero: {
    badge: 'n8n Workflow Automation Agency',
    title: 'Automate Your Business. Launch in Days.',
    titleLine2: '',
    highlight: '',
    description:
      'BridgeFlow builds custom n8n automation workflows tailored to your business — from lead capture to AI-powered pipelines. Deploy in days, not months.',
    ctaPrimary: { text: 'View Packages', href: '/pricing' },
    ctaSecondary: { text: 'Free Audit', href: '/audit' },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
  },
  stats: [
    { label: 'Workflows Built', value: 7, suffix: '+', icon: 'zap' },
    { label: 'Client Satisfaction', value: 100, suffix: '%', icon: 'shield' },
    { label: 'Avg. Delivery', value: 5, suffix: ' Days', icon: 'clock' },
    { label: 'n8n Compatible', value: 100, suffix: '%', icon: 'building' },
  ],
  trustedBy: {
    title: 'Trusted by Industry Leaders',
    description: 'Join hundreds of enterprises automating their operations',
    companies: [
      { name: 'Acme Corp', logo: '/images/companies/acme.png' },
      { name: 'TechFlow', logo: '/images/companies/techflow.png' },
      { name: 'InnovateLabs', logo: '/images/companies/innovate.png' },
      { name: 'Digital First', logo: '/images/companies/digital-first.png' },
    ],
  },
  features: [
    {
      title: 'Visual Workflow Builder',
      description: 'Drag-and-drop interface to create complex workflows without coding',
      icon: 'workflow',
      color: 'bg-blue-500/20',
    },
    {
      title: '1000+ Integrations',
      description: 'Connect to your favorite business tools and applications',
      icon: 'connect',
      color: 'bg-purple-500/20',
    },
    {
      title: 'Real-Time Monitoring',
      description: 'Monitor all workflows with detailed logs and performance metrics',
      icon: 'chart',
      color: 'bg-green-500/20',
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA',
      icon: 'lock',
      color: 'bg-red-500/20',
    },
    {
      title: 'Advanced Automation',
      description: 'Conditional logic, data transformation, and AI-powered workflows',
      icon: 'zap',
      color: 'bg-yellow-500/20',
    },
    {
      title: '24/7 Support',
      description: 'Dedicated support team available round the clock',
      icon: 'support',
      color: 'bg-pink-500/20',
    },
  ],
  results: [
    {
      metric: '75%',
      description: 'Reduction in operational costs',
      improvement: 'Average client savings',
    },
    {
      metric: '90%',
      description: 'Faster process completion times',
      improvement: 'Time efficiency gained',
    },
    {
      metric: '99.99%',
      description: 'System uptime and reliability',
      improvement: 'Enterprise SLA guaranteed',
    },
  ],
  process: [
    {
      number: '1',
      title: 'Connect',
      description: 'Integrate your business systems with a few clicks',
      icon: 'plug',
    },
    {
      number: '2',
      title: 'Design',
      description: 'Build workflows visually without writing code',
      icon: 'pencil',
    },
    {
      number: '3',
      title: 'Deploy',
      description: 'Launch your automations in minutes',
      icon: 'rocket',
    },
    {
      number: '4',
      title: 'Optimize',
      description: 'Monitor and improve workflow performance continuously',
      icon: 'trending',
    },
  ],
  testimonials: [],
  cta: {
    title: 'Ready to Transform Your Business?',
    description:
      'Join hundreds of enterprises already automating their operations and saving thousands of hours every year.',
    primaryCta: { text: 'Start Your Free Trial', href: '/pricing' },
    secondaryCta: { text: 'Schedule a Demo', href: '/contact' },
  },
}

// Legacy exports for backward compatibility
export const hero = defaultHomeContent.hero
export const stats = defaultHomeContent.stats
export const servicesOverview = defaultHomeContent.features
export const processSteps = defaultHomeContent.process
export const demos: unknown[] = []
export const cta = defaultHomeContent.cta
export const offers = []
