import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Zap,
  ArrowRight,
  Brain,
  History,
  Calendar
} from "lucide-react";

export default function CashpilotPage() {
  const stats = [
    {
      label: "Monthly Revenue",
      value: "$124,500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      label: "Cash on Hand",
      value: "$842,000",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-400"
    },
    {
      label: "Monthly Burn",
      value: "$42,000",
      change: "-2.1%",
      trend: "down",
      icon: TrendingDown,
      color: "text-red-400"
    },
    {
      label: "AI Efficiency",
      value: "94%",
      change: "+8%",
      trend: "up",
      icon: Zap,
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Cashpilot Dashboard</h1>
          <p className="text-gray-400">AI-driven financial intelligence for your business.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 backdrop-blur-xl bg-white/5 border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <Badge variant={stat.trend === 'up' ? 'success' : 'danger'}>
                {stat.change}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 backdrop-blur-xl bg-white/5 border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">AI Cashflow Insight</h2>
            </div>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 group">
              View Analysis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
              <p className="text-gray-300 leading-relaxed">
                "Based on current revenue trajectories and projected operational expenses, BridgeFlow is expected to reach a 
                <span className="text-purple-400 font-bold"> $1.2M </span> cash reserve by Q3. We recommend re-allocating 
                <span className="text-blue-400 font-bold"> 15% </span> of surplus to R&D for the new agent framework."
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-1">PROJECTION SCORE</p>
                <p className="text-lg font-bold text-white">98.2% Accurate</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-1">DATA SOURCES</p>
                <p className="text-lg font-bold text-white">12 API Integrations</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 backdrop-blur-xl bg-white/5 border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <History className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
          </div>
          <div className="space-y-6">
            {[
              { label: "Stripe Payout", amount: "+$12,400", time: "2 hours ago" },
              { label: "Vercel Enterprise", amount: "-$2,500", time: "5 hours ago" },
              { label: "OpenAI API", amount: "-$842", time: "1 day ago" },
              { label: "AWS Lambda", amount: "-$124", time: "2 days ago" }
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-white">{tx.label}</p>
                  <p className="text-xs text-gray-500">{tx.time}</p>
                </div>
                <p className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}>
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
