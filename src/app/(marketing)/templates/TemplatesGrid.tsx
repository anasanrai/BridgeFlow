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
  Beginner: 'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
  Intermediate: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
  Advanced: 'bg-brand-coral/10 text-brand-coral border-brand-coral/20',
}

export default function TemplatesGrid({ initialTemplates }: { initialTemplates: Template[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return initialTemplates.filter((t) => {
      const matchSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())
      return matchSearch
    })
  }, [initialTemplates, search])

  return (
    <div>
      {/* Search + Filter Header */}
      <div className="mb-16 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="relative w-full md:w-[450px] group">
          <input
            type="search"
            placeholder="Search enterprise workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-8 py-5 rounded-full bg-neutral-900 border border-white/5 text-white placeholder-neutral-600 focus:outline-none focus:border-brand-coral/50 transition-all font-medium"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-brand-coral transition-colors">
            🔍
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat.id
                  ? 'bg-brand-coral text-white shadow-[0_0_30px_-5px_rgba(255,109,90,0.4)]'
                  : 'bg-white/5 text-neutral-500 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-32 rounded-[60px] border border-dashed border-white/10 bg-neutral-900/30">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">No builds found</h3>
          <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs mb-8">Refine your search parameters</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearch('') }}
            className="px-12 py-5 bg-brand-coral text-white font-black uppercase tracking-widest rounded-full"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((template) => (
            <Link
              key={template.id}
              href={`/templates/${template.slug}`}
              className="group rounded-[40px] border border-white/5 bg-neutral-900/30 hover:bg-neutral-900/60 transition-all duration-500 hover:border-brand-coral/30"
            >
              <div className="p-4">
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-[30px] overflow-hidden bg-neutral-950">
                  <Image
                    src={template.image_url || '/images/placeholder.png'}
                    alt={template.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {template.is_featured && (
                    <div className="absolute top-4 left-4 bg-brand-coral text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                      Featured Build
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border backdrop-blur-md ${LEVEL_COLORS[template.level] || LEVEL_COLORS.Beginner}`}>
                      {template.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 pb-8 pt-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-brand-coral transition-colors">
                  {template.name}
                </h3>
                <p className="text-neutral-500 font-medium line-clamp-2 text-sm mb-8 leading-relaxed">
                  {template.tagline || template.description}
                </p>

                {/* Meta + Price */}
                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full">
                      {template.node_count} Nodes
                    </span>
                  </div>
                  {template.is_free ? (
                    <span className="text-sm font-black text-brand-teal uppercase tracking-widest">Free</span>
                  ) : (
                    <span className="text-xl font-black text-white uppercase tracking-tighter">
                      ${template.price}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
