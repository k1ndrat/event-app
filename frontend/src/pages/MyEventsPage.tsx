import { EventFilters } from "@/components/events/EventFilters";
import { EventList } from "@/components/events/EventList";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteEvents } from "@/hooks/useEvent";
import { Breadcrumbs } from "@/layouts/Breadcrumbs";
import { useAuthStore } from "@/store/auth.store";
import type { TEventFilters } from "@/types";
import { useState } from "react";

export const MyEventsPage = () => {
  const [filters, setFilters] = useState<TEventFilters>({
    search: "",
    type: "all",
    status: "all",
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const { user } = useAuthStore();

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
    <div
      style={{ padding: "2rem", fontFamily: "sans-serif" }}
      className="max-w-300 w-full"
    >
      <Breadcrumbs items={[{ title: "My Events" }]} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
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
