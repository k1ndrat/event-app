import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { eventService } from "../services/event.service";
import type {
  TGetEventsParams,
  TCreateEventPayload,
  TBackendErrorResponse,
  TEventsResponse,
  TEvent,
} from "../types";
import type { AxiosError } from "axios";

export const useInfiniteEvents = (params: TGetEventsParams) => {
  return useInfiniteQuery<TEventsResponse, AxiosError<TBackendErrorResponse>>({
    queryKey: ["events", "infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      eventService.getAll({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useEvents = (params: TGetEventsParams) => {
  return useQuery<TEventsResponse, AxiosError<TBackendErrorResponse>>({
    queryKey: ["events", params],
    queryFn: () => eventService.getAll(params),
  });
};

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => eventService.getById(id),
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TEvent,
    AxiosError<TBackendErrorResponse>,
    TCreateEventPayload
  >({
    mutationFn: (data) => eventService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useAttendEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<TEvent, AxiosError<TBackendErrorResponse>, string>({
    mutationFn: (id) => eventService.attend(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<TBackendErrorResponse>, string>({
    mutationFn: (id) => eventService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
