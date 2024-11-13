interface Comparison {
  actual: number;
  past: number;
}

interface UserActivityTimeDto {
  key: string;
  value: number;
}

export interface CalendarItemDto {
  date: string;
  types: Record<string, number>;
}

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
  user_activity_time: UserActivityTimeDto[];
}
