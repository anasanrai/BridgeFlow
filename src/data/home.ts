/**
 * =============================================
 *  HOME PAGE DATA — Enterprise Edition
 *  Edit this file to update home page content.
 *  Admin dashboard can override these defaults.
 * =============================================
 */

export const defaultHomeContent = {
  hero: {
    badge: 'Enterprise Automation Platform',
    title: 'Automate Your Business',
    titleLine2: 'With Zero Code Required',
    highlight: 'Enterprise-Grade Workflow Automation',
    description:
      'BridgeFlow connects your business systems and automates complex workflows without writing a single line of code. Save thousands of hours and eliminate human error.',
    ctaPrimary: { text: 'Start Free Trial', href: '/pricing' },
    ctaSecondary: { text: 'Watch Demo', href: '#demo' },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
  },
  stats: [
    { label: 'Enterprises Automated', value: 500, suffix: '+', icon: 'building' },
    { label: 'Hours Saved', value: 2, suffix: 'M+', icon: 'clock' },
    { label: 'Workflows Active', value: 50, suffix: 'K+', icon: 'zap' },
    { label: 'Uptime', value: 99, suffix: '.99%', icon: 'shield' },
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
  testimonials: [
    {
      content:
        'BridgeFlow has transformed how we handle our business processes. Weve saved thousands of hours and reduced errors significantly.',
      author: 'Sarah Johnson',
      role: 'Operations Director',
      company: 'Tech Innovations Inc',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
      rating: 5,
    },
    {
      content:
        'The ease of use combined with powerful features makes BridgeFlow a game-changer for enterprise automation.',
      author: 'Michael Chen',
      role: 'CTO',
      company: 'Digital Solutions Ltd',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
      rating: 5,
    },
    {
      content:
        'Best decision weve made for our automation strategy. The ROI is incredible and the support is exceptional.',
      author: 'Emma Davis',
      role: 'VP of Technology',
      company: 'Enterprise Systems Group',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
      rating: 5,
    },
  ],
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
