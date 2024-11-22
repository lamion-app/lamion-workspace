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
