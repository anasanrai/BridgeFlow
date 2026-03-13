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
  LogOut
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Zap, label: 'Automations', href: '/dashboard/automations' },
  { icon: Bot, label: 'AI Agents', href: '/dashboard/ai-agents' },
  { icon: GitBranch, label: 'Workflows', href: '/dashboard/workflows' },
  { icon: Users, label: 'Clients', href: '/dashboard/clients' },
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
    <aside className="w-64 bg-navy-950 border-r border-white/5 flex flex-col h-full">
      <div className="p-6">
        <Link href="/" className="text-xl font-bold gold-text">
          BridgeFlow
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gold-400/10 text-gold-400' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
