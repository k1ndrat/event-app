import { useEffect, type FC } from "react";
import type { AxiosError } from "axios";
import type { TBackendErrorResponse, TEvent } from "@/types";
import { EventCard } from "./EventCard";
import { EventCardSkeleton } from "./EventCardSkeleton";
import { EmptyState } from "../EmptyState";
import { CalendarX, LoaderPinwheel } from "lucide-react";
import { ErrorState } from "../ErrorState";
import { useInView } from "react-intersection-observer";

type TProps = {
  data?: TEvent[];
  isLoading: boolean;
  error: AxiosError<TBackendErrorResponse> | null;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
};

export const EventList: FC<TProps> = ({
  data,
  isLoading,
  error,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!isLoading && data?.length === 0) {
    return (
      <EmptyState
        title="Events not found"
        description="No events available at the moment. Please refine your search or explore other categories."
        Icon={CalendarX}
      />
    );
  }

  if (error) {
    return <ErrorState error={error} reset={() => window.location.reload()} />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}

        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
      </div>

      <div ref={ref} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <LoaderPinwheel className="size-10 animate-spin text-primary" />
        )}
      </div>
    </div>
  );
};
