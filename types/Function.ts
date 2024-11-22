export interface FeatureFilter {
  name: string;
}

export interface FunctionWithEventsDto {
  id: Id;
  title: string;
  events: number;
}

export interface FunctionTag {
  id: Id;
  name: string;
}

export interface FunctionDetailedDto {
  id: Id;
  title: string;
  events: number;
  features: Array<FeatureSimpleDto>;
  tags: FunctionTag[];
}
