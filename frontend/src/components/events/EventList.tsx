import type { FC } from "react";
import type { AxiosError } from "axios";
import type { TBackendErrorResponse, TEventsResponse } from "@/types";
import { EventCard } from "./EventCard";
import { EventCardSkeleton } from "./EventCardSkeleton";
import { EmptyState } from "../EmptyState";
import { CalendarX } from "lucide-react";
import { ErrorState } from "../ErrorState";

type TProps = {
  data?: TEventsResponse;
  isLoading: boolean;
  error: AxiosError<TBackendErrorResponse> | null;
};

export const EventList: FC<TProps> = ({ data, isLoading, error }) => {
  if (data?.data.length === 0) {
    return (
      <EmptyState
        title="Events not found"
        description="It seems there are no active events at the moment."
        Icon={CalendarX}
      />
    );
  }

  if (error) {
    return <ErrorState error={error} reset={() => window.location.reload()} />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {!isLoading &&
        data?.data.map((event) => <EventCard key={event._id} event={event} />)}

      {isLoading &&
        Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
    </div>
  );
};
