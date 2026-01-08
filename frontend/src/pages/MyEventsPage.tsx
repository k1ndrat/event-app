import { defaultEventFilters } from "@/common/constants";
import { EventFilters } from "@/components/events/EventFilters";
import { EventList } from "@/components/events/EventList";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteEvents } from "@/hooks/useEvent";
import { Breadcrumbs } from "@/layouts/Breadcrumbs";
import { AdminPaths } from "@/routes/AdminRoutes";
import { useAuthStore } from "@/store/auth.store";
import type { TEventFilters } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MyEventsPage = () => {
  const [filters, setFilters] = useState<TEventFilters>(defaultEventFilters);
  const debouncedSearch = useDebounce(filters.search, 500);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteEvents({
    organizerId: user?._id,
    limit: 9,
    search: debouncedSearch,
    type: filters.type === "all" ? undefined : filters.type,
    status: filters.status === "all" ? undefined : filters.status,
  });

  return (
    <div className="max-w-300 w-full p-8 font-[sans-serif]">
      <Breadcrumbs items={[{ title: "My Events" }]} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
        <Button onClick={() => navigate(AdminPaths.create_event)}>
          Create Event
        </Button>
      </div>

      <EventFilters filters={filters} onChange={setFilters} />

      <EventList
        data={data?.pages.flatMap((page) => page.data)}
        isLoading={isLoading}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};
