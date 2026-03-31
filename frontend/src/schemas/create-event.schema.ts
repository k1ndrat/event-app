import { EEventType } from "@/common/enums";
import { getCurrentTimeHHMM, isToday } from "@/lib/utils";
import { z } from "zod";

export const eventFormSchema = z
  .object({
    name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
    description: z
      .string()
      .min(2, "Description is too short")
      .max(500, "Description is too long"),
    date: z.date("Event date is required"),
    time: z.iso.time("Event time is required"),
    type: z.enum(EEventType),
    location: z.string().optional(),
    link: z.url("Invalid URL").optional(),
    maxAttendees: z.number().positive("Must be a positive number"),
  })
  .superRefine((data, ctx) => {
    if (
      data.type === EEventType.OFFLINE &&
      (!data.location || data.location.trim() === "")
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Location is required for offline events",
        path: ["location"],
      });
    }
    if (
      data.type === EEventType.ONLINE &&
      (!data.link || data.link.trim() === "")
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Link is required for online events",
        path: ["link"],
      });
    }
    if (isToday(data.date) && data.time < getCurrentTimeHHMM()) {
      ctx.addIssue({
        code: "custom",
        message: "Start time cannot be earlier than the current time",
        path: ["time"],
      });
    }
  });

export type TEventFormValues = z.infer<typeof eventFormSchema>;
