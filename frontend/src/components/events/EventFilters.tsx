import { EEventFilterStatus, EEventType } from "@/common/enums";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TEventFilters } from "@/types";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { TabsTrigger } from "../ui/tabs";

type TProps = {
  filters: TEventFilters;
  onChange: (filters: TEventFilters) => void;
};

export const EventFilters = ({ filters, onChange }: TProps) => {
  const handleClear = () =>
    onChange({ search: "", type: "all", status: EEventFilterStatus.UPCOMING });

  return (
    <div className="flex flex-col gap-4 mb-8 w-full">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="relative grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events by name..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        <div className="w-full md:w-48">
          <Select
            value={filters.type}
            onValueChange={(value) =>
              onChange({ ...filters, type: value as EEventType | "all" })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Formats</SelectItem>
              <SelectItem value={EEventType.ONLINE}>Online</SelectItem>
              <SelectItem value={EEventType.OFFLINE}>Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs
          value={filters.status}
          onValueChange={(value) =>
            onChange({
              ...filters,
              status: value as EEventFilterStatus | "all",
            })
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 md:w-100 h-9">
            <TabsTrigger value={EEventFilterStatus.UPCOMING}>
              Upcoming
            </TabsTrigger>
            <TabsTrigger value={EEventFilterStatus.PAST}>Past</TabsTrigger>
            <TabsTrigger value="all">All Events</TabsTrigger>
          </TabsList>
        </Tabs>

        {(filters.search ||
          filters.type !== "all" ||
          filters.status !== EEventFilterStatus.UPCOMING) && (
          <Button variant="ghost" onClick={handleClear} className="gap-2">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};
