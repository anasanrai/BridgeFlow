"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: "default" | "gold" | "glass";
}

export function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
    const variants = {
        default: "bg-white/5",
        gold: "bg-gold-400/10",
        glass: "glass bg-white/[0.02]",
    };

    return (
        <div
            className={cn(
                "animate-pulse rounded-md",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="glass rounded-3xl p-6 space-y-4 border border-white/5 overflow-hidden">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <div className="space-y-2 px-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="pt-4 px-2">
                <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
        </div>
    );
}

export function StatSkeleton() {
    return (
        <div className="glass rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between items-start mb-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
        </div>
    );
}

export function ServiceSkeleton() {
    return (
        <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                <div className="space-y-6">
                    <Skeleton className="w-14 h-14 rounded-2xl" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-12 w-40" />
                </div>
                <Skeleton className="h-[400px] w-full rounded-3xl" />
            </div>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                <Skeleton className="h-[400px] w-full rounded-3xl lg:order-2" />
                <div className="space-y-6 lg:order-1">
                    <Skeleton className="w-14 h-14 rounded-2xl" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-12 w-40" />
                </div>
            </div>
        </div>
    );
}

export function BlogSkeleton() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}
