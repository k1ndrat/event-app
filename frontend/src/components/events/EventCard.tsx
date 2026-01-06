import type { TEvent } from "@/types";
import type { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Link as LinkIcon, Clock } from "lucide-react";

type TProps = {
  event: TEvent;
};

export const EventCard: FC<TProps> = ({ event }) => {
  const date = new Date(event.date).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isFull = event.attendeesIDs.length >= event.maxAttendees;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-muted-foreground/20 pt-6 pb-0 gap-6">
      <div className="h-2 bg-primary/80" />

      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="capitalize">
            {event.type.toLowerCase()}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {new Date(event.createdAt).toLocaleDateString()}
          </div>
        </div>
        <CardTitle className="text-xl font-bold leading-tight uppercase tracking-tight">
          {event.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            <span>{date}</span>
          </div>

          {event.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4 text-primary" />
              <span className="truncate">{event.location}</span>
            </div>
          )}

          {event.link && (
            <div className="flex items-center text-sm text-blue-500 hover:underline">
              <LinkIcon className="mr-2 h-4 w-4" />
              <a
                href={event.link}
                target="_blank"
                rel="noreferrer"
                className="truncate"
              >
                Link to the event
              </a>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/30 py-6 flex justify-between items-center">
        <div className="flex items-center text-sm font-medium">
          <Users className="mr-2 h-4 w-4 opacity-70" />
          <span className={isFull ? "text-destructive" : "text-foreground"}>
            {event.attendeesIDs.length} / {event.maxAttendees}
          </span>
        </div>

        {isFull ? (
          <span className="text-xs font-bold uppercase text-destructive">
            Event Full
          </span>
        ) : (
          <span className="text-xs font-bold uppercase text-green-600">
            Spots Available
          </span>
        )}
      </CardFooter>
    </Card>
  );
};
