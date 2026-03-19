import { EEventType } from "@/common/enums";
import { useUpdateEvent } from "@/hooks/useEvent";
import { combineDateAndTime, getErrorMessage } from "@/lib/utils";
import { AdminPaths } from "@/routes/AdminRoutes";
import {
  eventFormSchema,
  type TEventFormValues,
} from "@/schemas/create-event.schema";
import type { TEvent } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useUpdateEventForm = (initialData?: TEvent) => {
  const navigate = useNavigate();
  const { mutate: updateEvent, isPending } = useUpdateEvent();

  const form = useForm<TEventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: EEventType.OFFLINE,
      maxAttendees: 10,
      location: "",
      link: "",
    },
  });

  const [eventType, selectedDate, selectedTime] = useWatch({
    control: form.control,
    name: ["type", "date", "time"],
  });

  useEffect(() => {
    if (!selectedDate || !selectedTime) return;

    form.trigger("time");
  }, [selectedDate, selectedDate]);

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        type: initialData.type,
        date: new Date(initialData.date),
        time: new Date(initialData.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }
  }, [initialData, form]);

  const onSubmit = (values: TEventFormValues) => {
    const combinedDate = combineDateAndTime(values.date, values.time);
    const payload = { ...values, date: combinedDate.toISOString() };

    console.log("payload", payload);

    updateEvent(
      { id: initialData?._id ?? "", data: payload },
      {
        onSuccess: (data) => {
          toast.success("Event updated successfully!");
          navigate(AdminPaths.event_details.replace(":id", data._id));
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
    eventType,
  };
};
