import type { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const EventCardSkeleton: FC = () => {
  return (
    <Card className="overflow-hidden border-muted-foreground/20 pt-6 pb-0 gap-6">
      <div className="h-2 bg-muted" />

      <CardHeader>
        <div className="flex justify-between items-start">
          <Skeleton className="h-5.5 w-14 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6.25 w-3/4 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-4">
        <Skeleton className="h-5 w-full" />

        <div className="space-y-2">
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/30 py-6 flex justify-between items-center">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-28 rounded-full" />
      </CardFooter>
    </Card>
  );
};
