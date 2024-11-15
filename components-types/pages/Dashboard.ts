import type {
  CalendarItemDto,
  ChartItemDto,
  Comparison,
} from "@/components-types/pages/common";

export interface TopFeature {
  id: number;
  title: string;
  description: string;
  total_events: number;
  total_events_percent: number;
}

export interface DashboardScaling {
  total_users: Comparison;
  active_users: Comparison;
  total_crashes: Comparison;
  triggered_events: Comparison;
}

export interface DashboardFull {
  title: string;
  scaling: DashboardScaling;
  top_features: TopFeature[];
  calendar: CalendarItemDto[];
  user_activity_time: ChartItemDto[];
}
