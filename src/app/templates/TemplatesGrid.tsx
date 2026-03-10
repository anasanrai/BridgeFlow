'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Template {
  id: number | string
  name: string
  slug: string
  categories: string[]
  difficulty: string
  nodes: string[]
  node_count: number
  setup_time: string
  value: number
  description: string
  what_it_does: string[]
  featured: boolean
  image_url: string | null
}

const CATEGORIES = [
  { id: 'all', label: '🏠 All Templates' },
  { id: 'Real Estate', label: '🏢 Real Estate' },
  { id: 'Lead Generation', label: '🎯 Lead Generation' },
  { id: 'Lead Management', label: '📋 Lead Management' },
  { id: 'AI-Powered', label: '🤖 AI & Agents' },
  { id: 'Communication', label: '💬 Communication' },
  { id: 'Marketing', label: '📣 Marketing' },
]

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-400 border-green-500/30',
  Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/30',
}

// Fallback gradient images when no image_url is set
const FALLBACK_IMAGES = [
  '/images/workflow-1.png',
  '/images/workflow-2.png',
  '/images/workflow-3.png',
  '/images/workflow-4.png',
  '/images/workflow-5.png',
  '/images/workflow-6.png',
  '/images/workflow-7.png',
]

export default function TemplatesGrid({ initialTemplates }: { initialTemplates: Template[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return initialTemplates.filter((t) => {
      const matchCat =
        activeCategory === 'all' || t.categories?.includes(activeCategory)
      const matchSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [initialTemplates, activeCategory, search])

  return (
    <div>
      {/* Search + Filter */}
      <div className="mb-8 space-y-4">
        <input
          type="search"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition"
        />

        {/* Category scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
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
      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} template{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">No templates found for this filter.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearch('') }}
            className="mt-4 text-amber-400 hover:underline text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template, idx) => {
            const imgSrc =
              template.image_url ||
              FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]

            return (
              <Link
                key={template.id}
                href={`/templates/${template.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-amber-500/30 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-900">
                  <Image
                    src={imgSrc}
                    alt={template.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      ; (e.target as HTMLImageElement).src =
                        `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect fill="%231a1a2e" width="800" height="450"/><text x="400" y="225" text-anchor="middle" fill="%23f59e0b" font-size="48" font-family="sans-serif">⚡</text></svg>`
                    }}
                  />
                  {template.featured && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded-full">
                      ⭐ Featured
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${DIFFICULTY_COLORS[template.difficulty] || DIFFICULTY_COLORS.Beginner
                        }`}
                    >
                      {template.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors leading-snug">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.categories?.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                    <span>{template.node_count} nodes</span>
                    <span>{template.setup_time} setup</span>
                    {template.value > 0 && (
                      <span className="text-amber-400 font-semibold">
                        ${template.value} value
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
