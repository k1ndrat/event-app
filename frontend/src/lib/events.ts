import type { TEvent } from "@/types";

export const getEventStatuses = (event: TEvent, userId: string | null) => {
  const isOrganizer = userId === event.organizerId;
  const isAttending = event.attendeesIDs.includes(userId || "");
  const isFull = event.attendeesIDs.length >= event.maxAttendees;
  const isPast = new Date(event.date) < new Date();

  return { isPast, isFull, isAttending, isOrganizer };
};

export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
