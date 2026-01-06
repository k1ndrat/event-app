import { EventList } from "@/components/events/EventList";
import { useInfiniteEvents } from "@/hooks/useEvent";
import { Breadcrumbs } from "@/layouts/Breadcrumbs";

export const MainPage = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteEvents({ limit: 9 });

  return (
    <div
      style={{ padding: "2rem", fontFamily: "sans-serif" }}
      className="max-w-300 w-full"
    >
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
      </div>

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
