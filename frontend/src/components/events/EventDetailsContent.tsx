import { DeleteDialog } from "@/components/DeleteDialog";
import { ErrorState } from "@/components/ErrorState";
import { EventPageSkeleton } from "@/components/events/EventPageSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEventActions } from "@/hooks/useEventActions";
import { getEventStatuses, getFormattedDate } from "@/lib/events";
import { useAuthStore } from "@/store/auth.store";
import {
  Archive,
  Calendar,
  Clock,
  Edit,
  Link as LinkIcon,
  LogOut,
  MapPin,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import { AdminPaths } from "@/routes/AdminRoutes";
import type { TBackendErrorResponse, TEvent } from "@/types";
import type { AxiosError } from "axios";
import type { FC } from "react";

type TProps = {
  event?: TEvent;
  isLoading: boolean;
  error: AxiosError<TBackendErrorResponse> | null;
};

export const EventDetailsContent: FC<TProps> = ({
  event,
  isLoading,
  error,
}) => {
  const { user } = useAuthStore();

  const { handleDelete, handleAttend, handleLeave, isActionLoading } =
    useEventActions(event?._id ?? "");

  if (isLoading) return <EventPageSkeleton />;
  if (error) return <ErrorState error={error} />;
  if (!event) return <p>Error</p>;

  const { isPast, isFull, isAttending, isOrganizer } = getEventStatuses(
    event,
    user?._id ?? null
  );
  const formattedDate = getFormattedDate(event.date);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className={isPast ? "bg-muted/40" : ""}>
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div className="flex gap-2">
                <Badge
                  variant={isPast ? "outline" : "secondary"}
                  className="capitalize px-3 py-1 text-sm"
                >
                  {event.type.toLowerCase()}
                </Badge>
                {isPast && (
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1 opacity-70"
                  >
                    <Archive className="h-3 w-3" /> Ended
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                Created: {new Date(event.createdAt).toLocaleDateString()}
              </div>
            </div>

            <CardTitle className="text-3xl font-bold uppercase tracking-tight">
              {event.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4 text-sm md:text-base">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <span
                  className={`font-medium ${
                    isPast ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {formattedDate}
                </span>
              </div>

              {event.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span>{event.location}</span>
                </div>
              )}

              {event.link && (
                <div className="flex items-start gap-3">
                  <LinkIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline break-all"
                  >
                    {event.link}
                  </a>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">About Event</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="pb-0">
          <CardHeader>
            <CardTitle className="text-lg">Registration</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" /> Attendees
                </div>
                <span className={isFull && !isPast ? "text-destructive" : ""}>
                  {event.attendeesIDs.length} / {event.maxAttendees}
                </span>
              </div>

              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isFull ? "bg-destructive" : "bg-primary"
                  }`}
                  style={{
                    width: `${Math.min(
                      (event.attendeesIDs.length / event.maxAttendees) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {isOrganizer && (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={AdminPaths.edit_event.replace(":id", event._id)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit Event
                    </Link>
                  </Button>

                  <DeleteDialog
                    title="Are you absolutely sure?"
                    cancelText="Cancel"
                    confirmText="Delete"
                    description={`This action cannot be undone. This will permanently delete the event "${event.name}".`}
                    onConfirm={handleDelete}
                    isLoading={isActionLoading}
                    trigger={
                      <Button
                        variant="destructive"
                        className="w-full"
                        disabled={isActionLoading}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Event
                      </Button>
                    }
                  />
                </>
              )}

              {isAttending && (
                <Button
                  variant="outline"
                  className="w-full border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleLeave}
                  disabled={isActionLoading || isPast}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Leave Event
                </Button>
              )}

              {!isOrganizer && !isAttending && (
                <Button
                  className="w-full"
                  onClick={handleAttend}
                  disabled={isActionLoading || isPast || isFull}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {isPast ? "Event Ended" : isFull ? "Full" : "Attend Event"}
                </Button>
              )}
            </div>
          </CardContent>

          <CardFooter className="bg-muted/20 border-t justify-center p-6">
            {isPast ? (
              <span className="text-sm font-medium text-muted-foreground">
                This event has ended
              </span>
            ) : isAttending ? (
              <span className="text-sm font-medium text-green-600">
                ✓ You are going
              </span>
            ) : (
              <span className="text-sm font-medium text-muted-foreground">
                {isOrganizer ? "You are organizing this event" : "Join us!"}
              </span>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
