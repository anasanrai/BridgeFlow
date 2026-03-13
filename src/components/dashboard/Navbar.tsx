"use client";
import React from 'react'
import { Search, Bell, User } from 'lucide-react'
import { useUser } from '@/hooks/useUser'

export function Navbar() {
  const { user } = useUser()

  return (
    <header className="h-16 border-b border-white/5 bg-navy-950/50 backdrop-blur-md flex items-center justify-between px-8">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-400/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-gold-400 rounded-full border-2 border-navy-950" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-white/5">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user?.email?.split('@')[0]}</p>
            <p className="text-xs text-gray-500 capitalize">Pro Plan</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center border border-gold-400/30">
            <User className="w-4 h-4 text-gold-400" />
          </div>
        </div>
      </div>
    </header>
  )
}
