import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <main
      className={cn(
        "bg-neutral-50 dark:bg-neutral-900",
        "print:!mx-auto print:!px-12 print:!py-8",
        "-mx-4 px-6 py-8 rounded-sm  max-w-3xl",
        "md:max-w-4xl md:px-16 lg:px-24 md:py-12 md:rounded-xl md:mx-auto"
      )}
    >
      <div>
        <Skeleton className="h-6 w-1/6" />

        <Skeleton className="h-6 w-1/4 mt-4" />

        <Skeleton className="h-6 w-1/5 mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div>
          <Skeleton className="h-6 w-1/5 mt-4" />
          <Skeleton className="h-6 w-1/4 mt-4" />
        </div>

        <div>
          <Skeleton className="h-6 w-1/5 mt-4" />
          <Skeleton className="h-6 w-1/4 mt-4" />
        </div>

        <div>
          <Skeleton className="h-6 w-1/5 mt-4" />
          <Skeleton className="h-6 w-1/4 mt-4" />
        </div>

        <div>
          <Skeleton className="h-6 w-1/5 mt-4" />
          <Skeleton className="h-6 w-1/4 mt-4" />
        </div>
      </div>

      <Skeleton className="h-3 w-full mt-12 mb-4" />

      <Skeleton className="h-4 w-1/2 mt-4" />
      <Skeleton className="h-4 w-1/4 mt-2" />
    </main>
  );
}
