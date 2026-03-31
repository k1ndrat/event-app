import { EventDetailsContent } from "@/components/events/EventDetailsContent";
import { useEvent } from "@/hooks/useEvent";
import { Breadcrumbs } from "@/layouts/Breadcrumbs";
import { useParams } from "react-router-dom";

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useEvent(id!);

  return (
    <div className="max-w-300 w-full p-8 font-[sans-serif]">
      <Breadcrumbs items={[{ title: event?.name || "..." }]} />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {event?.name || "..."}
        </h1>
      </div>

      <EventDetailsContent event={event} isLoading={isLoading} error={error} />
    </div>
  );
};
