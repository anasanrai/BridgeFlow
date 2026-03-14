import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Zap, Bot, Users, TrendingUp } from 'lucide-react'

const stats = [
  { label: 'Active Automations', value: '12', icon: Zap, trend: '+2 this week' },
  { label: 'AI Agents Live', value: '4', icon: Bot, trend: 'Stable' },
  { label: 'Total Clients', value: '28', icon: Users, trend: '+5 this month' },
  { label: 'Cost Savings', value: '$1,240', icon: TrendingUp, trend: '+12%' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Anas</h1>
        <p className="text-gray-400 mt-2">Here's what's happening with your BridgeFlow ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-start justify-between">
              <div className="p-2 bg-gold-400/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-brand-coral" />
              </div>
              <Badge variant="gold">{stat.trend}</Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-gold-400" />
                <div>
                  <p className="font-medium">Automation "Invoice Processor" triggered</p>
                  <p className="text-sm text-gray-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-xl font-bold mb-6">System Status</h2>
          <div className="space-y-6">
            {[
              { name: 'Supabase DB', status: 'Healthy' },
              { name: 'AI Engine', status: 'Healthy' },
              { name: 'Webhooks', status: 'Stable' },
            ].map((system) => (
              <div key={system.name} className="flex items-center justify-between">
                <span className="text-gray-400">{system.name}</span>
                <Badge variant="success">{system.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
