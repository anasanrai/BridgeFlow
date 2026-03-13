"use client";

import { Card } from "@/components/ui/Card";
import { CreditCard, Zap, CheckCircle2, ShieldCheck } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
        <p className="text-gray-400 mt-2">Manage your plan, payment methods, and billing history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-amber-400/5 border-amber-400/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-12 h-12 text-amber-400" />
          </div>
          <h3 className="text-sm font-medium text-amber-400 uppercase tracking-wider mb-2">Current Plan</h3>
          <p className="text-3xl font-bold text-white mb-4">Agency 🚀</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Active until Oct 12, 2026</span>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Usage Limit</h3>
          <p className="text-3xl font-bold text-white mb-4">84%</p>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-400 w-[84%] h-full rounded-full shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Member Seats</h3>
            <p className="text-3xl font-bold text-white mb-4">8 / 20</p>
          </div>
          <button className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium">
            Manage Seats →
          </button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 space-y-6 border-white/10 bg-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Payment Method</h2>
              <button className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
                Change Card
              </button>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-[10px] text-white">
                VISA
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-gray-500">Expires 12/28</p>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
          </Card>

          <Card className="p-8 space-y-6 border-white/10 bg-white/5">
            <h2 className="text-xl font-bold text-white">Invoices</h2>
            <div className="space-y-4">
              {[
                { id: "#INV-2024-001", date: "Sep 12, 2024", amount: "$299.00", status: "Paid" },
                { id: "#INV-2024-002", date: "Aug 12, 2024", amount: "$299.00", status: "Paid" },
                { id: "#INV-2024-003", date: "Jul 12, 2024", amount: "$299.00", status: "Paid" },
              ].map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-all group">
                  <div>
                    <p className="text-white font-medium">{inv.id}</p>
                    <p className="text-xs text-gray-500">{inv.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-white font-bold">{inv.amount}</span>
                    <button className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10">
                      <CreditCard className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-8 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Enterprise Upgrade</h2>
            <p className="text-gray-400 text-sm mb-6">Need more seats, white-labeling, or dedicated support?</p>
            <ul className="space-y-3 mb-8">
              {["Unlimited Seats", "White-label Portal", "24/7 Priority Support", "Custom API Limits"].map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">
              Talk to Sales
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
