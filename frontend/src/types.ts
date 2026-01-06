import type { JSX } from "react";
import type { EEventType } from "./common/enums";

export type TUser = {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAuthResponse = {
  accessToken: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};

export type TRegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type TRoute = {
  path: string;
  component: JSX.Element;
};

export type TBackendErrorResponse = {
  message: string | string[];
  error: string;
  statusCode: number;
};

export type TEvent = {
  _id: string;

  name: string;
  description: string;

  date: string;

  type: EEventType;

  location?: string;
  link?: string;

  organizerId: string;

  maxAttendees: number;
  attendeesIDs: string[];

  createdAt: string;
  updatedAt: string;
};

export type TGetEventsParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  desc?: boolean;
  status?: string;
  type?: string;
  search?: string;
  organizerId?: string;
  attendeeId?: string;
};

export type TEventsResponse = {
  data: TEvent[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};

export type TCreateEventPayload = Omit<
  TEvent,
  "_id" | "createdAt" | "updatedAt" | "attendeesIDs" | "organizerId"
>;
export type TUpdateEventPayload = Partial<TCreateEventPayload>;
