import { defaultEventFilters } from "@/common/constants";
import { EEventFilterStatus, EEventSortBy, EEventType } from "@/common/enums";
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
import type { FC } from "react";
import { Button } from "../ui/button";
import { TabsTrigger } from "../ui/tabs";

type TProps = {
  filters: TEventFilters;
  onChange: (filters: TEventFilters) => void;
};

export const EventFilters: FC<TProps> = ({ filters, onChange }) => {
  const handleClear = () => onChange(defaultEventFilters);

  const isFiltersApplied =
    filters.search !== "" ||
    filters.type !== "all" ||
    filters.status !== EEventFilterStatus.UPCOMING ||
    filters.sortBy !== EEventSortBy.EVENT_DATE ||
    filters.desc !== false;

  return (
    <div className="flex flex-col gap-4 mb-8 w-full">
      <div className="flex flex-col md:flex-row gap-4 flex-wrap">
        <div className="relative grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events by name..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="w-full md:w-48">
            <Select
              value={filters.sortBy || "date"}
              onValueChange={(value) =>
                onChange({
                  ...filters,
                  sortBy: value as EEventSortBy,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={EEventSortBy.EVENT_DATE}>
                  Event Date
                </SelectItem>
                <SelectItem value={EEventSortBy.CREATED_AT}>
                  Created At
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-32">
            <Select
              value={filters.desc ? "desc" : "asc"}
              onValueChange={(value) =>
                onChange({
                  ...filters,
                  desc: value === "desc",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

      <div className="flex items-center justify-between flex-wrap gap-4">
        <Tabs
          value={filters.status}
          onValueChange={(value) =>
            onChange({
              ...filters,
              status: value as EEventFilterStatus | "all",
            })
          }
          className="w-full md:w-[unset]"
        >
          <TabsList className="grid w-full grid-cols-3 md:w-100 h-9">
            <TabsTrigger value={EEventFilterStatus.UPCOMING}>
              Upcoming
            </TabsTrigger>
            <TabsTrigger value={EEventFilterStatus.PAST}>Past</TabsTrigger>
            <TabsTrigger value="all">All Events</TabsTrigger>
          </TabsList>
        </Tabs>

        {isFiltersApplied && (
          <Button
            variant="default"
            onClick={handleClear}
            className="gap-2 w-full md:w-[unset]"
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};
