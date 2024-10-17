export interface FeatureFilter {
  name: string;
}

export interface ScreenFilter {
  name: string;
}

export interface FunctionTag {
  name: string;
  color?: string;
}

export interface FunctionItem {
  name: string;
  totalActivityNumber: number;
  activityNumber: number;
  activityQuantity: string;
  feature: FeatureFilter;
  screen: ScreenFilter;
  tags: FunctionTag[];
}
