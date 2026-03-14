import { Suspense } from 'react'
import { createServerSideClient } from '@/lib/supabase/server'
import TemplatesGrid from './TemplatesGrid'

// Server component — fetch on the server to avoid RLS anon key issues
async function getTemplates() {
  const supabase = createServerSideClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('templates')
    .select(`
      id, slug, name, tagline, description,
      level, price, is_free, image_url,
      nodes_used, node_count, download_count,
      average_rating, review_count, is_featured,
      is_active
    `)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })

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
    level: t.level || 'Beginner',
    price: Number(t.price || 0),
    is_free: Boolean(t.is_free),
    image_url: t.image_url || '/images/placeholder.png',
    nodes_used: Array.isArray(t.nodes_used) ? t.nodes_used : [],
    node_count: Number(t.node_count || 0),
    download_count: Number(t.download_count || 0),
    average_rating: Number(t.average_rating || 0),
    review_count: Number(t.review_count || 0),
    is_featured: Boolean(t.is_featured),
  }));
}

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 text-sm text-amber-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            n8n Workflow Marketplace
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            n8n Workflow{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Templates
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Ready-to-deploy automations for every business. Every template includes the full n8n
            workflow JSON, setup documentation, and lifetime support.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400">✓</span>
              {templates.length} templates available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400">✓</span>
              Free &amp; Paid
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400">✓</span>
              Instant download
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400">✓</span>
              n8n compatible
            </span>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
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
