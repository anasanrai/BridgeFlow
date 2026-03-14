"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Zap, 
  Bot, 
  GitBranch, 
  Users, 
  Settings,
  LogOut,
  CreditCard,
  Rocket,
  ChevronDown
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const mainNav = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Zap, label: 'Automations', href: '/dashboard/automations' },
  { icon: Bot, label: 'AI Agents', href: '/dashboard/ai-agents' },
  { icon: GitBranch, label: 'Workflows', href: '/dashboard/workflows' },
  { icon: Users, label: 'Clients', href: '/dashboard/clients' },
]

const productNav = [
  { icon: Rocket, label: 'Cashpilot', href: '/cashpilot', color: 'text-emerald-400' },
  { icon: GitBranch, label: 'n8n Galaxy', href: '/n8n-galaxy', color: 'text-purple-400' },
]

const footerNav = [
  { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { supabase } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-white/5 flex flex-col h-full overflow-hidden">
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
          BridgeFlow
        </Link>
      </div>

      <div className="px-4 mb-6">
        <button className="w-full flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
              BA
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">BridgeFlow Agency</p>
              <p className="text-[10px] text-gray-500">Workspace</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        </button>
      </div>
      
      <div className="flex-1 px-4 space-y-8 overflow-y-auto no-scrollbar pb-8">
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">Platform</p>
          <nav className="space-y-1">
            {mainNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${
                    isActive 
                      ? 'bg-amber-400/10 text-amber-400' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'group-hover:text-white'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">My Products</p>
          <nav className="space-y-1">
            {productNav.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? item.color : 'group-hover:text-white'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 space-y-1 border-t border-white/5 bg-neutral-950/50">
        {footerNav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                isActive 
                  ? 'bg-white/5 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-left text-gray-500 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  )
}

