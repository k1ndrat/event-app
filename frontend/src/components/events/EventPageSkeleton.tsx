import { Skeleton } from "../ui/skeleton";

export const EventPageSkeleton = () => (
  <div className=" mx-auto space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-91.75 bg-muted rounded-xl animate-pulse" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-68.75 bg-muted rounded-xl animate-pulse" />
      </div>
    </div>
  </div>
);
