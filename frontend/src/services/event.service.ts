import { api } from "../lib/api";
import type {
  TEvent,
  TEventsResponse,
  TGetEventsParams,
  TCreateEventPayload,
  TUpdateEventPayload,
} from "../types";

export const eventService = {
  getAll: async (params: TGetEventsParams): Promise<TEventsResponse> => {
    const response = await api.get<TEventsResponse>("/event", { params });
    return response.data;
  },

  getById: async (id: string): Promise<TEvent> => {
    const response = await api.get<TEvent>(`/event/${id}`);
    return response.data;
  },

  create: async (data: TCreateEventPayload): Promise<TEvent> => {
    const response = await api.post<TEvent>("/event", data);
    return response.data;
  },

  update: async (id: string, data: TUpdateEventPayload): Promise<TEvent> => {
    const response = await api.patch<TEvent>(`/event/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/event/${id}`);
  },

  attend: async (id: string): Promise<TEvent> => {
    const response = await api.post<TEvent>(`/event/${id}/attend`);
    return response.data;
  },

  unattend: async (id: string): Promise<TEvent> => {
    const response = await api.post<TEvent>(`/event/${id}/unattend`);
    return response.data;
  },
};
