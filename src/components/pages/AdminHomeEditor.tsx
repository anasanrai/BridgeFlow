'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Eye, EyeOff, Plus, Trash2, Check, AlertCircle } from 'lucide-react'
import EnterpriseHomePage from '@/components/pages/EnterpriseHomePage'
import { defaultHomeContent } from '@/data/home'

export default function AdminHomeEditor() {
  const [content, setContent] = useState(defaultHomeContent)
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState('hero')
  const saveTimeoutRef = useRef<NodeJS.Timeout>()

  // Auto-save functionality
  const saveContent = useCallback(async () => {
    setIsSaving(true)
    setSaveStatus('saving')

    try {
      const response = await fetch('/api/admin/content/home_content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })

      if (response.ok) {
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Save error:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setIsSaving(false)
    }
  }, [content])

  // Debounce save
  useEffect(() => {
    clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(saveContent, 1000)

    return () => clearTimeout(saveTimeoutRef.current)
  }, [content, saveContent])

  const updateHero = (field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }))
  }

  const updateStats = (index: number, field: string, value: any) => {
    const newStats = [...content.stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setContent(prev => ({ ...prev, stats: newStats }))
  }

  const updateFeatures = (index: number, field: string, value: any) => {
    const newFeatures = [...content.features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    setContent(prev => ({ ...prev, features: newFeatures }))
  }

  const updateCTA = (field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      cta: { ...prev.cta, [field]: value }
    }))
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'stats', label: 'Stats' },
    { id: 'features', label: 'Features' },
    { id: 'cta', label: 'CTA' },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-brand-coral/30">
      <div className="flex h-screen">
        {/* Editor Panel */}
        <div className="w-1/2 overflow-y-auto bg-neutral-900 border-r border-white/5">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-black uppercase tracking-tighter text-white italic">Home Page Editor</h1>
              <div className="flex items-center gap-4">
                {saveStatus === 'saving' && (
                  <div className="flex items-center gap-2 text-brand-teal">
                    <div className="animate-spin h-4 w-4 border-2 border-brand-teal border-r-transparent rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Saving...</span>
                  </div>
                )}
                {saveStatus === 'success' && (
                  <div className="flex items-center gap-2 text-brand-teal">
                    <Check className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Saved</span>
                  </div>
                )}
                {saveStatus === 'error' && (
                  <div className="flex items-center gap-2 text-brand-coral">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Error saving</span>
                  </div>
                )}

                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-white/5">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-brand-coral text-brand-coral'
                      : 'border-transparent text-neutral-500 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Hero Section Tab */}
            {activeTab === 'hero' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Badge</label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={e => updateHero('badge', e.target.value)}
                    className="w-full px-4 py-2 border border-white/10 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Title Line 1</label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={e => updateHero('title', e.target.value)}
                    className="w-full px-4 py-2 border border-white/10 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Title Line 2</label>
                  <input
                    type="text"
                    value={content.hero.titleLine2}
                    onChange={e => updateHero('titleLine2', e.target.value)}
                    className="w-full px-4 py-2 border border-white/10 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Highlight</label>
                  <input
                    type="text"
                    value={content.hero.highlight}
                    onChange={e => updateHero('highlight', e.target.value)}
                    className="w-full px-4 py-2 border border-white/10 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                  <textarea
                    value={content.hero.description}
                    onChange={e => updateHero('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-white/10 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Primary CTA Text</label>
                    <input
                      type="text"
                      value={content.hero.ctaPrimary.text}
                      onChange={e => updateHero('ctaPrimary', {
                        ...content.hero.ctaPrimary,
                        text: e.target.value
                      })}
                      className="w-full px-4 py-2 border border-white/10 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Primary CTA URL</label>
                    <input
                      type="text"
                      value={content.hero.ctaPrimary.href}
                      onChange={e => updateHero('ctaPrimary', {
                        ...content.hero.ctaPrimary,
                        href: e.target.value
                      })}
                      className="w-full px-4 py-2 border border-white/10 rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {content.stats.map((stat, index) => (
                  <div key={index} className="p-4 border border-white/10 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-neutral-400">Stat #{index + 1}</h3>
                      <button
                        onClick={() => {
                          setContent(prev => ({
                            ...prev,
                            stats: prev.stats.filter((_, i) => i !== index)
                          }))
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Label"
                        value={stat.label}
                        onChange={e => updateStats(index, 'label', e.target.value)}
                        className="w-full px-4 py-2 border border-white/10 rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Value"
                        value={stat.value}
                        onChange={e => updateStats(index, 'value', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 border border-white/10 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Suffix (%, +, etc)"
                        value={stat.suffix}
                        onChange={e => updateStats(index, 'suffix', e.target.value)}
                        className="w-full px-4 py-2 border border-white/10 rounded-lg"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setContent(prev => ({
                      ...prev,
                      stats: [...prev.stats, { label: 'New Stat', value: 0, suffix: '+', icon: 'zap' }]
                    }))
                  }}
                  className="w-full py-2 border-2 border-dashed border-gray-400 rounded-lg text-gray-600 hover:border-gray-600 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Stat
                </button>
              </motion.div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {content.features.map((feature, index) => (
                  <div key={index} className="p-4 border border-white/10 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-neutral-400">Feature #{index + 1}</h3>
                      <button
                        onClick={() => {
                          setContent(prev => ({
                            ...prev,
                            features: prev.features.filter((_, i) => i !== index)
                          }))
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Title"
                        value={feature.title}
                        onChange={e => updateFeatures(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-white/10 rounded-lg"
                      />
                      <textarea
                        placeholder="Description"
                        value={feature.description}
                        onChange={e => updateFeatures(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border border-white/10 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Color (bg-blue-500/20)"
                        value={feature.color}
                        onChange={e => updateFeatures(index, 'color', e.target.value)}
                        className="w-full px-4 py-2 border border-white/10 rounded-lg"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setContent(prev => ({
                      ...prev,
                      features: [...prev.features, {
                        title: 'New Feature',
                        description: 'Feature description',
                        icon: 'zap',
                        color: 'bg-blue-500/20'
                      }]
                    }))
                  }}
                  className="w-full py-2 border-2 border-dashed border-gray-400 rounded-lg text-gray-600 hover:border-gray-600 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </motion.div>
            )}

            {/* CTA Tab */}
            {activeTab === 'cta' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                  <input
                    type="text"
                    value={content.cta.title}
                    onChange={e => updateCTA('title', e.target.value)}
                    className="w-full px-4 py-2 border border-white/10 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                  <textarea
                    value={content.cta.description}
                    onChange={e => updateCTA('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-white/10 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Primary CTA Text</label>
                    <input
                      type="text"
                      value={content.cta.primaryCta.text}
                      onChange={e => updateCTA('primaryCta', {
                        ...content.cta.primaryCta,
                        text: e.target.value
                      })}
                      className="w-full px-4 py-2 border border-white/10 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Primary CTA URL</label>
                    <input
                      type="text"
                      value={content.cta.primaryCta.href}
                      onChange={e => updateCTA('primaryCta', {
                        ...content.cta.primaryCta,
                        href: e.target.value
                      })}
                      className="w-full px-4 py-2 border border-white/10 rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 overflow-y-auto border-l border-white/5 bg-neutral-950">
            <div className="scale-90 origin-top transform">
              <EnterpriseHomePage content={content} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
