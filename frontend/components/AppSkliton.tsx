import { Skeleton } from "@/components/ui/skeleton";


type TProps = {
    variant: "card" | "table" | "avatar" | "text",
    rows: number,
    cls?: string
}

const AppSkeleton = ({ variant = "text", rows = 3 }: TProps) => {
    if (variant === "avatar") {
        return <Skeleton className="h-12 w-12 rounded-full" />;
    }

    if (variant === "card") {
        return (
            <div className="space-y-3">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
            </div>
        );
    }

    if (variant === "table") {
        return (
            <div className="space-y-2">
                {Array.from({ length: rows }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
            </div>
        );
    }

    // default text skeleton
    return (
        <div className="space-y-5 p-3">
            {Array.from({ length: rows }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
            ))}
        </div>
    );
};

export default AppSkeleton;
