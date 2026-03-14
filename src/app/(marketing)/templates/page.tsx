import { Suspense } from 'react'
import { ScrollReveal } from '@/components/ui'
import { createServerSideClient } from '@/lib/supabase/server'
import TemplatesGrid from './TemplatesGrid'

// Server component — fetch on the server to avoid RLS anon key issues
async function getTemplates() {
  const supabase = createServerSideClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('templates')
    .select(`
      id, slug, name, description,
      difficulty, value, image_url,
      nodes, node_count,
      featured, status
    `)
    .eq('status', 'published')
    .order('featured', { ascending: false })

  if (error) {
    console.error('[Templates] Fetch error:', error)
    return []
  }

  // Normalize field names safely
  return (data || []).map((t: any) => ({
    id: String(t.id || ''),
    name: t.name || 'Untitled Template',
    slug: t.slug || '',
    tagline: t.tagline || '',
    description: t.description || '',
    level: t.difficulty || 'Beginner',
    price: Number(t.value || 0),
    is_free: Number(t.value || 0) === 0,
    image_url: t.image_url || '/images/placeholder.png',
    nodes_used: Array.isArray(t.nodes) ? t.nodes : [],
    node_count: Number(t.node_count || 0),
    download_count: 0,
    average_rating: 5,
    review_count: 0,
    is_featured: Boolean(t.featured),
  }));
}

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-coral/5 blur-[120px] rounded-full -z-10" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-10">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-coral animate-ping" />
              n8n Marketplace
            </div>
          </ScrollReveal>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
            Pre-Built <span className="text-brand-coral">Workflows</span>
          </h1>
          
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12 font-medium">
            Ready-to-deploy enterprise automations. Every template includes full JSON, technical setup guides, and human support.
          </p>

          <div className="flex flex-wrap justify-center gap-10">
            {[
              { label: "Templates", value: templates.length },
              { label: "Standard", value: "Enterprise" },
              { label: "Support", value: "Lifetime" },
              { label: "Builds", value: "Tested" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-white mb-1 uppercase tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <TemplatesGrid initialTemplates={templates} />
      </section>
    </main>
  )
}

function TemplatesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden animate-pulse"
        >
          <div className="aspect-video bg-white/10" />
          <div className="p-6 space-y-3">
            <div className="h-5 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-2/3" />
            <div className="flex gap-2 mt-4">
              <div className="h-6 w-16 bg-white/10 rounded-full" />
              <div className="h-6 w-20 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
