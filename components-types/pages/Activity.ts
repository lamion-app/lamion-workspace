export interface ActivityFull {
  calendar: CalendarItemDto[];
}

export interface ActivityDetails {
  date: string;
  active_users: number;
  total_events: number;
  crashes: number;
  top_features: TopFeature[];
  user_activity_time: ChartItemDto[];
}

export interface TopFeature {
  id: number;
  title: string;
  description: string;
  total_events: number;
  total_events_percent: number;
}
