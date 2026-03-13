"use client";

import { Card } from "@/components/ui/Card";
import { User, Bell, Shield, Globe, Cpu } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white">General Settings</h1>
        <p className="text-gray-400 mt-2">Personalize your workspace and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <nav className="flex flex-col gap-1">
            {[
              { icon: User, label: "Profile", active: true },
              { icon: Globe, label: "Organization", active: false },
              { icon: Bell, label: "Notifications", active: false },
              { icon: Shield, label: "Security", active: false },
              { icon: Cpu, label: "API Keys", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  item.active 
                    ? "bg-white/10 text-white border border-white/10 shadow-lg" 
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card className="p-8 bg-white/5 border-white/10">
            <h3 className="text-lg font-bold text-white mb-6">Profile Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-[#0a0f1d] flex items-center justify-center">
                    <User className="w-10 h-10 text-amber-400" />
                  </div>
                </div>
                <div>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-all">
                    Change Avatar
                  </button>
                  <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">First Name</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-400/50" defaultValue="Anas" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Last Name</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-400/50" defaultValue="Anrai" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email Address</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-400/50" defaultValue="hello@bridgeflow.agency" readOnly />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button className="px-6 py-2.5 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-all">
                Save Changes
              </button>
            </div>
          </Card>

          <Card className="p-8 bg-white/5 border-white/10">
            <h3 className="text-lg font-bold text-white mb-6">Danger Zone</h3>
            <p className="text-sm text-gray-500 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl border border-red-500/20 transition-all">
              Delete Account
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
