import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useDeleteEvent,
  useAttendEvent,
  useLeaveEvent,
} from "@/hooks/useEvent";
import { AdminPaths } from "@/routes/AdminRoutes";

export const useEventActions = (eventId: string) => {
  const navigate = useNavigate();

  const deleteEventMutation = useDeleteEvent();
  const attendEventMutation = useAttendEvent();
  const leaveEventMutation = useLeaveEvent();

  const handleDelete = () => {
    deleteEventMutation.mutate(eventId, {
      onSuccess: () => {
        toast.success("Event deleted successfully");
        navigate(AdminPaths.main);
      },
      onError: () => toast.error("Failed to delete event"),
    });
  };

  const handleAttend = () => {
    attendEventMutation.mutate(eventId, {
      onSuccess: () => toast.success("You have joined the event!"),
      onError: (err) =>
        toast.error(err.response?.data.message || "Error joining"),
    });
  };

  const handleLeave = () => {
    leaveEventMutation.mutate(eventId, {
      onSuccess: () => toast.info("You left the event"),
      onError: (err) =>
        toast.error(err.response?.data.message || "Error leaving"),
    });
  };

  return {
    handleDelete,
    handleAttend,
    handleLeave,
    isActionLoading:
      deleteEventMutation.isPending ||
      attendEventMutation.isPending ||
      leaveEventMutation.isPending,
  };
};
