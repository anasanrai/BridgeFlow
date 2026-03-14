'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, DollarSign, Zap } from 'lucide-react'

export default function ROICalculator() {
  const [tasksPerWeek, setTasksPerWeek] = useState(50)
  const [minutesPerTask, setMinutesPerTask] = useState(30)
  const [hourlyRate, setHourlyRate] = useState(45)

  const results = useMemo(() => {
    const hoursPerWeek = (tasksPerWeek * minutesPerTask) / 60
    const monthlyHours = hoursPerWeek * 4.33
    const monthlySavings = monthlyHours * hourlyRate
    const yearlySavings = monthlySavings * 12
    const efficiencyBoost = 85 // Fixed assumption for AI impact

    return {
      monthlyHours: Math.round(monthlyHours),
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      efficiencyBoost
    }
  }, [tasksPerWeek, minutesPerTask, hourlyRate])

  return (
    <div className="w-full max-w-5xl mx-auto p-1 lg:p-1 bg-gradient-to-br from-brand-coral/20 via-brand-purple/20 to-brand-teal/20 rounded-[40px]">
      <div className="bg-neutral-900 rounded-[38px] p-8 lg:p-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-coral/10 blur-[100px] rounded-full -z-10" />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Inputs */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">ROI Calculator</h2>
              <p className="text-neutral-400 font-medium">Quantify the impact of BridgeFlow automation on your operations.</p>
            </div>

            <div className="space-y-8">
              {/* Tasks per Week */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Manual Tasks / Week</label>
                  <span className="text-2xl font-black text-white">{tasksPerWeek}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={tasksPerWeek}
                  onChange={(e) => setTasksPerWeek(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-coral"
                />
              </div>

              {/* Minutes per Task */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Mins / Task</label>
                  <span className="text-2xl font-black text-white">{minutesPerTask}m</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={minutesPerTask}
                  onChange={(e) => setMinutesPerTask(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
              </div>

              {/* Staff Hourly Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Staff Hourly Rate ($)</label>
                  <span className="text-2xl font-black text-white">${hourlyRate}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="150"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-teal"
                />
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="grid sm:grid-cols-2 gap-6 relative">
            <div className="flex flex-col p-8 rounded-[32px] bg-white/5 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-coral/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <Clock className="w-6 h-6 text-brand-coral mb-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Hours Reclaimed / Mo</span>
              <span className="text-4xl font-black text-white italic">{results.monthlyHours}h</span>
            </div>

            <div className="flex flex-col p-8 rounded-[32px] bg-white/5 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <DollarSign className="w-6 h-6 text-brand-purple mb-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Monthly Saving</span>
              <span className="text-4xl font-black text-white italic">${results.monthlySavings.toLocaleString()}</span>
            </div>

            <div className="flex flex-col p-8 rounded-[32px] bg-white/5 border border-white/10 relative overflow-hidden group sm:col-span-2 border-brand-teal/30">
              <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <TrendingUp className="w-6 h-6 text-brand-teal mb-6" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Annualized Capital Efficiency</span>
              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-black text-white italic">${results.yearlySavings.toLocaleString()}</span>
                <span className="text-brand-teal font-black text-sm uppercase tracking-widest">Saved / Year</span>
              </div>
            </div>

            {/* Micro-CTA */}
            <div className="sm:col-span-2 pt-6 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">
                Calculated based on 85% automation efficacy standard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
