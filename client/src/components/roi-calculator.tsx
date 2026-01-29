import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    TrendingUp,
    Clock,
    DollarSign,
    ArrowRight,
    Zap,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { Link } from "wouter";

export function ROICalculator() {
    const [hoursPerWeek, setHoursPerWeek] = useState(10);
    const [hourlyRate, setHourlyRate] = useState(50);
    const [efficiencyGain, setEfficiencyGain] = useState(80);
    const [results, setResults] = useState({
        weeklySavings: 0,
        monthlySavings: 0,
        yearlySavings: 0,
        hoursReclaimed: 0
    });

    useEffect(() => {
        const weeklyHoursSaved = hoursPerWeek * (efficiencyGain / 100);
        const weeklyDollarSavings = weeklyHoursSaved * hourlyRate;

        setResults({
            weeklySavings: Math.round(weeklyDollarSavings),
            monthlySavings: Math.round(weeklyDollarSavings * 4.33),
            yearlySavings: Math.round(weeklyDollarSavings * 52),
            hoursReclaimed: Math.round(weeklyHoursSaved * 52)
        });
    }, [hoursPerWeek, hourlyRate, efficiencyGain]);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    return (
        <Card className="max-w-4xl mx-auto overflow-hidden bg-card border-card-border shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Input Column */}
                <div className="p-8 space-y-8 bg-muted/30">
                    <div>
                        <Badge variant="secondary" className="mb-2">BridgeFlow ROI Engine</Badge>
                        <h3 className="text-2xl font-bold">Calculate Your Savings</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            See how much time and money automation can reclaim for your business.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label className="text-sm font-medium">Manual Hours / Week</Label>
                                <span className="text-sm font-bold text-primary">{hoursPerWeek} hrs</span>
                            </div>
                            <Slider
                                value={[hoursPerWeek]}
                                onValueChange={(val) => setHoursPerWeek(val[0])}
                                max={60}
                                step={1}
                                className="py-2"
                            />
                            <p className="text-[10px] text-muted-foreground italic">
                                Time spent on lead follow-up, scheduling, and data entry.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label className="text-sm font-medium">Average Hourly Rate</Label>
                                <span className="text-sm font-bold text-primary">{formatCurrency(hourlyRate)}</span>
                            </div>
                            <Slider
                                value={[hourlyRate]}
                                onValueChange={(val) => setHourlyRate(val[0])}
                                max={250}
                                step={5}
                                className="py-2"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label className="text-sm font-medium">Desired Automation Coverage</Label>
                                <span className="text-sm font-bold text-accent">{efficiencyGain}%</span>
                            </div>
                            <Slider
                                value={[efficiencyGain]}
                                onValueChange={(val) => setEfficiencyGain(val[0])}
                                max={100}
                                min={20}
                                step={5}
                                className="py-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Column */}
                <div className="p-8 bg-card relative flex flex-col justify-center border-t md:border-t-0 md:border-l border-border/50">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <TrendingUp className="w-32 h-32" />
                    </div>

                    <div className="space-y-8 relative">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Estimated Annual Savings</p>
                            <div className="text-5xl font-black text-gradient-animated">
                                {formatCurrency(results.yearlySavings)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                    <Clock className="w-3 h-3 text-primary" />
                                    Time Reclaimed
                                </div>
                                <div className="text-xl font-bold">{results.hoursReclaimed}h<span className="text-xs font-normal text-muted-foreground ml-1">/yr</span></div>
                            </div>

                            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                    <DollarSign className="w-3 h-3 text-accent" />
                                    Monthly Recovery
                                </div>
                                <div className="text-xl font-bold">{formatCurrency(results.monthlySavings)}</div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                Covers infrastructure costs in ~14 days
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                Scales without adding payroll
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                Eliminates human error in data sync
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="pt-4"
                        >
                            <Link href="/contact">
                                <Button className="w-full gap-2 h-12 text-lg shadow-lg shadow-primary/20" data-testid="roi-cta">
                                    Reclaim Your Time
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
