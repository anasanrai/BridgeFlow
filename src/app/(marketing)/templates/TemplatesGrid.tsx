'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Template {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  level: string
  price: number
  is_free: boolean
  image_url: string | null
  nodes_used: string[]
  node_count: number
  download_count: number
  average_rating: number
  review_count: number
  is_featured: boolean
}

const CATEGORIES = [
  { id: 'all', label: '🏠 All' },
  { id: 'real-estate', label: '🏢 Real Estate' },
  { id: 'lead-generation', label: '🎯 Lead Generation' },
  { id: 'marketing', label: '📣 Marketing' },
  { id: 'sales-ops', label: '💰 Sales Ops' },
  { id: 'ai-agents', label: '🤖 AI & Agents' },
  { id: 'ecommerce', label: '🛒 E-Commerce' },
  { id: 'crm', label: '🤝 CRM' },
  { id: 'communication', label: '💬 Communication' },
  { id: 'operations', label: '⚙️ Operations' },
]

const LEVEL_COLORS: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-400 border-green-500/30',
  Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/30',
}

export default function TemplatesGrid({ initialTemplates }: { initialTemplates: Template[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return initialTemplates.filter((t) => {
      // Categories are not in the new schema at this level — just do search filter
      const matchSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())
      return matchSearch
    })
  }, [initialTemplates, activeCategory, search])

  return (
    <div>
      {/* Search + Filter */}
      <div className="mb-8 space-y-4">
        <input
          type="search"
          placeholder="Search workflows..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition"
        />

        {/* Category scroll pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          Showing {filtered.length} template{filtered.length !== 1 ? 's' : ''}
        </p>
        {(search || activeCategory !== 'all') && (
          <button
            onClick={() => { setSearch(''); setActiveCategory('all') }}
            className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 rounded-3xl border border-dashed border-white/10">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😕</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No templates found</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            Try a different search or browse all categories
          </p>
          <button
            onClick={() => { setActiveCategory('all'); setSearch('') }}
            className="px-8 py-3 bg-amber-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition-all active:scale-95"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template) => (
            <Link
              key={template.id}
              href={`/templates/${template.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-amber-500/30 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gray-900">
                <Image
                  src={template.image_url || '/images/placeholder.png'}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect fill="%231a1a2e" width="800" height="450"/><text x="400" y="225" text-anchor="middle" fill="%23f59e0b" font-size="48" font-family="sans-serif">⚡</text></svg>`
                  }}
                />
                {template.is_featured && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded-full">
                    ⭐ Featured
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      LEVEL_COLORS[template.level] || LEVEL_COLORS.Beginner
                    }`}
                  >
                    {template.level}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-base text-white mb-2 group-hover:text-amber-400 transition-colors leading-snug">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {template.tagline || template.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  {template.node_count > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="text-amber-400">⚡</span> {template.node_count} nodes
                    </span>
                  )}
                  {template.download_count > 0 && (
                    <span className="flex items-center gap-1">
                      <span>⬇</span> {template.download_count}
                    </span>
                  )}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  {template.is_free ? (
                    <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      FREE
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-amber-400">
                      ${template.price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-amber-400 transition-colors">
                    Get Template →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
