import type { TBackendErrorResponse } from "@/types";
import type { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (
  error: AxiosError<TBackendErrorResponse> | null
) => {
  return error?.response?.data?.message
    ? Array.isArray(error.response.data.message)
      ? error.response.data.message.join(", ")
      : error.response.data.message
    : error?.message;
};

export const combineDateAndTime = (date: Date, time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
};

export const getTodayStart = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export const getCurrentTimeHHMM = (): string => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};
