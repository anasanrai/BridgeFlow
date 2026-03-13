import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  Network, 
  Activity, 
  Terminal, 
  Zap,
  Play,
  Settings,
  Cpu,
  RefreshCw
} from "lucide-react";

export default function N8nGalaxyPage() {
  const workflows = [
    { name: "Lead Capture Sync", status: "active", executions: 1240, uptime: "100%", lastRun: "2m ago" },
    { name: "Stripe to Supabase", status: "active", executions: 8421, uptime: "99.9%", lastRun: "12m ago" },
    { name: "AI Content Engine", status: "active", executions: 124, uptime: "100%", lastRun: "1h ago" },
    { name: "Support Ticket Router", status: "paused", executions: 0, uptime: "0%", lastRun: "Never" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">n8n Galaxy</h1>
          <p className="text-gray-400">Enterprise fleet management for your automations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync Instance
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
            <Zap className="w-4 h-4" />
            New Workflow
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 backdrop-blur-xl bg-white/5 border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
              <Activity className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 uppercase tracking-wider">Total Executions</p>
              <h3 className="text-2xl font-bold text-white">42,852</h3>
            </div>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-blue-500" />
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-xl bg-white/5 border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 uppercase tracking-wider">Active Nodes</p>
              <h3 className="text-2xl font-bold text-white">128</h3>
            </div>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-purple-500" />
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-xl bg-white/5 border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-green-500/10 text-green-400">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 uppercase tracking-wider">Fleet Health</p>
              <h3 className="text-2xl font-bold text-white">100% Online</h3>
            </div>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-full bg-green-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="p-0 backdrop-blur-xl bg-white/5 border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Network className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Active Workflows</h2>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">v1.4.2 Production</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] text-gray-500 text-sm">
                  <th className="px-6 py-4 font-medium">Workflow Name</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Executions</th>
                  <th className="px-6 py-4 font-medium">Uptime</th>
                  <th className="px-6 py-4 font-medium">Last Run</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {workflows.map((wf, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-cyan-400 transition-colors">
                          <Network className="w-4 h-4" />
                        </div>
                        <span className="text-white font-medium">{wf.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={wf.status === 'active' ? 'success' : 'danger'}>
                        {wf.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-gray-400 font-mono text-sm">{wf.executions}</td>
                    <td className="px-6 py-4 text-gray-400">{wf.uptime}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{wf.lastRun}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
