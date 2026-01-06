import { EventList } from "@/components/events/EventList";
import { useEvents } from "@/hooks/useEvent";
import { Breadcrumbs } from "@/layouts/Breadcrumbs";
import { Loader2 } from "lucide-react";

export const MainPage = () => {
  const { data, isLoading, error } = useEvents({
    page: 1,
    limit: 10,
  });

  return (
    <div
      style={{ padding: "2rem", fontFamily: "sans-serif" }}
      className="max-w-300 w-full"
    >
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <span className="text-sm text-muted-foreground flex items-center gap-2">
          {!error && "Found: "}
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            data?.data.length
          )}
        </span>
      </div>

      <EventList data={data} isLoading={isLoading} error={error} />
    </div>
  );
};
