interface Item {
  key: FeatureSimpleDto;
  value: number;
}

export interface TopFeaturesResponse {
  items: Array<Item>;
  total_events: number;
  avg_events_per_day: number;
}
