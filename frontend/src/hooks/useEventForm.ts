import { EEventType } from "@/common/enums";
import { useCreateEvent } from "@/hooks/useEvent";
import { combineDateAndTime, getErrorMessage } from "@/lib/utils";
import { AdminPaths } from "@/routes/AdminRoutes";
import {
  eventFormSchema,
  type TEventFormValues,
} from "@/schemas/create-event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useEventForm = () => {
  const navigate = useNavigate();
  const { mutate: createEvent, isPending } = useCreateEvent();

  const form = useForm<TEventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: EEventType.OFFLINE,
      maxAttendees: 10,
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

  const onSubmit = (values: TEventFormValues) => {
    const combinedDate = combineDateAndTime(values.date, values.time);

    createEvent(
      { ...values, date: combinedDate.toISOString() },
      {
        onSuccess: (data) => {
          toast.success("Event created successfully!");
          navigate(AdminPaths.event_details.replace(":id", data._id));
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
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
