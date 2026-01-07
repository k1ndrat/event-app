import { defaultEventFilters } from "@/common/constants";
import { EventFilters } from "@/components/events/EventFilters";
import { EventList } from "@/components/events/EventList";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteEvents } from "@/hooks/useEvent";
import { Breadcrumbs } from "@/layouts/Breadcrumbs";
import type { TEventFilters } from "@/types";
import { useState } from "react";

export const MainPage = () => {
  const [filters, setFilters] = useState<TEventFilters>(defaultEventFilters);

  const debouncedSearch = useDebounce(filters.search, 500);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteEvents({
    limit: 9,
    search: debouncedSearch,
    type: filters.type === "all" ? undefined : filters.type,
    status: filters.status === "all" ? undefined : filters.status,
    desc: filters.desc,
    sortBy: filters.sortBy,
  });

  return (
    <div className="max-w-300 w-full p-8 font-[sans-serif]">
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
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
