import { Suspense } from 'react'
import { createClient } from '@supabase/supabase-js'
import TemplatesGrid from './TemplatesGrid'

// Server component — fetch on the server to avoid RLS anon key issues
async function getTemplates() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true })

  if (error) {
    console.error('[Templates] Fetch error:', error)
    return []
  }

  return data || []
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
            Automate your{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              business patterns.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Stop building from scratch. Every template includes the full n8n workflow JSON,
            setup documentation, and lifetime support — ready to deploy in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400">✓</span>
              {templates.length} templates available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400">✓</span>
              100% ready to deploy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400">✓</span>
              Lifetime support included
            </span>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <Suspense fallback={<TemplatesSkeleton />}>
          <TemplatesGrid initialTemplates={templates} />
        </Suspense>
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
