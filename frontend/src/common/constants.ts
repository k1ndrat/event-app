import type { TEventFilters } from "@/types";
import { EEventFilterStatus, EEventSortBy } from "./enums";

export const defaultEventFilters: TEventFilters = {
  search: "",
  type: "all",
  status: EEventFilterStatus.UPCOMING,
  desc: false,
  sortBy: EEventSortBy.EVENT_DATE,
};
