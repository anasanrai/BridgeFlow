import { ServiceSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="pt-32 pb-20 container-max px-4 sm:px-6">
            <div className="text-center mb-16 space-y-4">
                <Skeleton className="w-24 h-6 rounded-full mx-auto" />
                <Skeleton className="w-3/4 h-16 rounded-xl mx-auto" />
                <Skeleton className="w-1/2 h-8 rounded-lg mx-auto" />
            </div>
            <ServiceSkeleton />
        </div>
    );
}
