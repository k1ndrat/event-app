import { EventEditForm } from "@/components/events/EventEditForm";
import { useEvent } from "@/hooks/useEvent";
import { Breadcrumbs } from "@/layouts/Breadcrumbs";
import { AdminPaths } from "@/routes/AdminRoutes";
import { useParams } from "react-router-dom";

export const EditEventPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useEvent(id!);

  return (
    <div className="max-w-300 w-full p-8 font-[sans-serif]">
      <Breadcrumbs
        items={[
          { title: "My Events", link: AdminPaths.my_events },
          { title: "Edit Event" },
        ]}
      />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Event</h1>
      </div>

      <EventEditForm event={event} isLoading={isLoading} error={error} />
    </div>
  );
};
