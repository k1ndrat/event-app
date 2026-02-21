import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { eventService } from "../services/event.service";
import type {
  TBackendErrorResponse,
  TCreateEventPayload,
  TEvent,
  TEventsResponse,
  TGetEventsParams,
  TUpdateEventPayload,
} from "../types";

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
  return useQuery<TEvent, AxiosError<TBackendErrorResponse>>({
    queryKey: ["events", id],
    queryFn: () => eventService.getById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
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

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TEvent,
    AxiosError<TBackendErrorResponse>,
    { id: string; data: TUpdateEventPayload }
  >({
    mutationFn: ({ id, data }) => eventService.update(id, data),
    onSuccess: (updatedEvent) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["events", updatedEvent._id] });
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

export const useLeaveEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<TEvent, AxiosError<TBackendErrorResponse>, string>({
    mutationFn: (id) => eventService.unattend(id),
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
