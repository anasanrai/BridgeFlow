"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calculator,
    Clock,
    DollarSign,
    TrendingUp,
    Users,
    Zap,
    ArrowRight,
    Bot,
    UserCheck,
    BarChart3,
    Sparkles,
    ChevronDown,
} from "lucide-react";

/* ── Predefined task categories ──────────────────────────── */
const TASK_PRESETS = [
    {
        label: "Strategic Lead Orchestration",
        icon: UserCheck,
        manualMins: 45,
        aiMins: 3,
        description: "Intelligent lead scoring, hyper-personalized CRM updates, and cross-channel follow-up orchestration.",
    },
    {
        label: "Cognitive Document Analysis",
        icon: Users,
        manualMins: 60,
        aiMins: 5,
        description: "AI-driven parsing of multi-page contracts, data extraction, and automated downstream processing.",
    },
    {
        label: "Predictive Analytics & n8n ETL",
        icon: BarChart3,
        manualMins: 90,
        aiMins: 10,
        description: "Complex data transformation across fragmented SaaS stacks and automated board-level reporting.",
    },
    {
        label: "Multi-Agent System Oversight",
        icon: TrendingUp,
        manualMins: 120,
        aiMins: 15,
        description: "Manual oversight of autonomous workflows, exception handling, and model performance auditing.",
    },
    {
        label: "Enterprise Billing Reconciliation",
        icon: DollarSign,
        manualMins: 40,
        aiMins: 4,
        description: "Cross-referencing global invoices with multi-currency vendor systems and automated ledger updates.",
    },
    {
        label: "Smart Customer Lifecycle Mgmt",
        icon: Sparkles,
        manualMins: 75,
        aiMins: 8,
        description: "AI-powered customer success triggers, health-score monitoring, and automated expansion playbooks.",
    },
];

/* ── Helpers ─────────────────────────────────────────────── */
function formatHours(minutes: number) {
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

/* ── Main page ───────────────────────────────────────────── */
export default function AICalculator() {
    const [selectedTasks, setSelectedTasks] = useState<number[]>([0, 1, 2]);
    const [frequency, setFrequency] = useState<number>(20); // times per day
    const [hourlyRate, setHourlyRate] = useState<number>(35);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleTask = (idx: number) => {
        setSelectedTasks((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
        );
    };

    /* computed results */
    const results = useMemo(() => {
        const activeTasks = selectedTasks.map((i) => TASK_PRESETS[i]);

        const dailyManualMins = activeTasks.reduce(
            (acc, t) => acc + (t.manualMins / 20) * frequency,
            0
        );
        const dailyAiMins = activeTasks.reduce(
            (acc, t) => acc + (t.aiMins / 20) * frequency,
            0
        );

        const monthlyManualHrs = (dailyManualMins * 22) / 60;
        const monthlyAiHrs = (dailyAiMins * 22) / 60;
        const savedHrsMonth = monthlyManualHrs - monthlyAiHrs;
        const savedCostMonth = savedHrsMonth * hourlyRate;
        const savedCostYear = savedCostMonth * 12;
        const efficiencyGain =
            monthlyManualHrs > 0
                ? ((savedHrsMonth / monthlyManualHrs) * 100)
                : 0;

        return {
            dailyManualMins,
            dailyAiMins,
            monthlyManualHrs,
            monthlyAiHrs,
            savedHrsMonth,
            savedCostMonth,
            savedCostYear,
            efficiencyGain,
        };
    }, [selectedTasks, frequency, hourlyRate]);

    return (
        <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
            {/* Hero Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/calculator-bg.png"
                    alt=""
                    fill
                    className="object-cover object-center opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-navy-950/70 to-navy-950" />
            </div>
            {/* Soft glows layered on top */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/8 blur-[120px] -z-[5] animate-pulse" />
            <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-purple-500/6 blur-[120px] -z-[5] animate-pulse" />

            <div className="container-max px-4">
                {/* ─── Hero Section ─── */}
                <div className="relative max-w-5xl mx-auto text-center mb-20">
                    {/* Floating stat badges */}
                    <motion.div
                        initial={{ opacity: 0, x: -40, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="hidden lg:flex absolute -left-8 top-12 glass border border-emerald-500/20 rounded-2xl px-4 py-3 items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="text-left">
                            <div className="text-lg font-bold text-emerald-400">90%</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Time Saved</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40, y: -20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="hidden lg:flex absolute -right-4 top-8 glass border border-gold-400/20 rounded-2xl px-4 py-3 items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-gold-400" />
                        </div>
                        <div className="text-left">
                            <div className="text-lg font-bold text-gold-400">$130K+</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Avg Yearly ROI</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="hidden lg:flex absolute right-16 bottom-4 glass border border-purple-500/20 rounded-2xl px-4 py-3 items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="text-left">
                            <div className="text-lg font-bold text-purple-400">10×</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Output Scale</div>
                        </div>
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-gold-400/20 mb-8"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-60" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-400" />
                        </span>
                        <span className="text-sm font-semibold text-gold-400 uppercase tracking-wider">
                            AI ROI Calculator
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-[1.1]"
                    >
                        Stop Paying for
                        <br />
                        <span className="gold-text">Work AI Can Do</span>
                        <br />
                        <span className="text-3xl sm:text-4xl md:text-5xl text-gray-400 font-semibold">
                            in Seconds
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed"
                    >
                        Your competitors are already automating. Calculate exactly how much
                        time and money you&apos;re leaving on the table — then{" "}
                        <span className="text-white font-semibold">let us fix it</span>.
                    </motion.p>

                    {/* Quick stats row on mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex lg:hidden items-center justify-center gap-6 mb-8"
                    >
                        <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-400">90%</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Time Saved</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gold-400">$130K+</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Yearly ROI</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">10×</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Output Scale</div>
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex flex-col items-center gap-2 text-gray-600"
                    >
                        <span className="text-xs uppercase tracking-widest font-medium">
                            Customize below
                        </span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <ChevronDown className="w-5 h-5" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* ─── Calculator body ─── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* ─── Left: Inputs ─── */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Task selector */}
                            <div className="glass rounded-3xl p-6 md:p-8 card-glow">
                                <h3 className="text-lg font-display font-bold mb-1 flex items-center gap-2">
                                    <Bot className="w-5 h-5 text-gold-400" />
                                    Select Tasks to Automate
                                </h3>
                                <p className="text-sm text-gray-500 mb-5">
                                    Pick the workflows you want AI to handle for you.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    {TASK_PRESETS.map((task, idx) => {
                                        const active = selectedTasks.includes(idx);
                                        const IconComp = task.icon;
                                        return (
                                            <button
                                                key={task.label}
                                                onClick={() => toggleTask(idx)}
                                                className={`group relative flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 ${active
                                                    ? "border-gold-400/40 bg-gold-400/[0.06] shadow-[0_0_20px_rgba(230,180,34,0.08)]"
                                                    : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                                                    }`}
                                            >
                                                <div
                                                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${active
                                                        ? "gold-gradient text-navy-950"
                                                        : "bg-white/5 text-gray-400 group-hover:text-gold-400"
                                                        }`}
                                                >
                                                    <IconComp className="w-5 h-5" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-semibold text-sm text-white leading-tight">
                                                        {task.label}
                                                    </div>
                                                    <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                                        {task.description}
                                                    </div>
                                                </div>
                                                {/* Check indicator */}
                                                <div
                                                    className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${active
                                                        ? "border-gold-400 bg-gold-400"
                                                        : "border-white/20"
                                                        }`}
                                                >
                                                    {active && (
                                                        <svg className="w-3 h-3 text-navy-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Sliders */}
                            <div className="glass rounded-3xl p-6 md:p-8 card-glow space-y-8">
                                {/* Frequency slider */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gold-400" />
                                            Daily Task Frequency
                                        </label>
                                        <span className="text-sm font-bold text-gold-400 tabular-nums bg-gold-400/10 px-3 py-1 rounded-lg">
                                            {frequency} tasks/day
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={100}
                                        value={frequency}
                                        onChange={(e) => setFrequency(Number(e.target.value))}
                                        className="w-full accent-[#e6b422] h-2 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e6b422] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(230,180,34,0.4)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-navy-950 [&::-webkit-slider-thumb]:cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                                        <span>1</span>
                                        <span>25</span>
                                        <span>50</span>
                                        <span>75</span>
                                        <span>100</span>
                                    </div>
                                </div>

                                {/* Hourly rate slider */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-gold-400" />
                                            Average Hourly Rate (Employee Cost)
                                        </label>
                                        <span className="text-sm font-bold text-gold-400 tabular-nums bg-gold-400/10 px-3 py-1 rounded-lg">
                                            ${hourlyRate}/hr
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={10}
                                        max={200}
                                        step={5}
                                        value={hourlyRate}
                                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                                        className="w-full accent-[#e6b422] h-2 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e6b422] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(230,180,34,0.4)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-navy-950 [&::-webkit-slider-thumb]:cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                                        <span>$10</span>
                                        <span>$50</span>
                                        <span>$100</span>
                                        <span>$150</span>
                                        <span>$200</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─── Right: Results Panel ─── */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Big savings card */}
                            <div className="glass rounded-3xl p-6 md:p-8 card-glow relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/[0.06] via-transparent to-purple-500/[0.04]" />
                                <div className="relative z-10">
                                    <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">
                                        Your Monthly Savings
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`${results.savedCostMonth}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="text-4xl md:text-5xl font-display font-bold gold-text text-glow mb-1">
                                                {formatCurrency(results.savedCostMonth)}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                saved per month
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className="mt-6 pt-6 border-t border-white/8 grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-2xl font-display font-bold text-white">
                                                {formatCurrency(results.savedCostYear)}
                                            </div>
                                            <div className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
                                                Annual Savings
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-display font-bold text-white">
                                                {Math.round(results.savedHrsMonth)}h
                                            </div>
                                            <div className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
                                                Hours Saved/Mo
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comparison bars */}
                            <div className="glass rounded-3xl p-6 md:p-8 card-glow">
                                <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-5">
                                    Daily Time Comparison
                                </div>

                                {/* Manual bar */}
                                <div className="mb-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-red-400 flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5" />
                                            Manual Work
                                        </span>
                                        <span className="text-sm font-bold text-red-400 tabular-nums">
                                            {formatHours(results.dailyManualMins)}
                                        </span>
                                    </div>
                                    <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${Math.min(
                                                    (results.dailyManualMins /
                                                        Math.max(results.dailyManualMins, 1)) *
                                                    100,
                                                    100
                                                )}%`,
                                            }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>

                                {/* AI bar */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                                            <Bot className="w-3.5 h-3.5" />
                                            AI-Assisted
                                        </span>
                                        <span className="text-sm font-bold text-emerald-400 tabular-nums">
                                            {formatHours(results.dailyAiMins)}
                                        </span>
                                    </div>
                                    <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${Math.min(
                                                    (results.dailyAiMins /
                                                        Math.max(results.dailyManualMins, 1)) *
                                                    100,
                                                    100
                                                )}%`,
                                            }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>

                                {/* Efficiency badge */}
                                <div className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06]">
                                    <Zap className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm font-bold text-emerald-400">
                                        {Math.round(results.efficiencyGain)}% faster with AI
                                    </span>
                                </div>
                            </div>

                            {/* CTA */}
                            <a
                                href="/contact"
                                className="group flex items-center justify-center gap-3 w-full py-4 gold-gradient text-navy-950 font-bold rounded-2xl hover:shadow-lg hover:shadow-gold-400/20 transition-all duration-200 active:scale-95"
                            >
                                Start Saving with AI
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* ─── Bottom info cards ─── */}
                <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
                    {[
                        {
                            icon: Clock,
                            title: "80% Less Repetitive Work",
                            desc: "AI handles the mundane — your team focuses on strategy, creativity, and closing deals.",
                        },
                        {
                            icon: DollarSign,
                            title: "Cut Operating Costs",
                            desc: "Automate tasks that would otherwise require multiple full-time employees. Save substantially every year.",
                        },
                        {
                            icon: TrendingUp,
                            title: "Scale Without Hiring",
                            desc: "Grow your output 10× without adding headcount. AI workflows run 24/7, never call in sick.",
                        },
                    ].map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="glass p-8 rounded-3xl text-center card-glow"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                                <item.icon className="w-6 h-6 text-gold-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
