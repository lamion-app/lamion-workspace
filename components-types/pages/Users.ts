export interface UsersFull {
  total_users: ProgressDto;
  active_users: ProgressDto;
  growth_rate: Comparison;
  user_activity_time: ChartItemDto[];
  platforms: ChartItemDto[];
  top_devices: TopDevice[];
}

export interface TopDevice {
  title: string;
  activity: Comparison;
  platform: string;
}
