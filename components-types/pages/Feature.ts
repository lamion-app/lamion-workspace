export interface FeatureFull {
  total_events: ProgressDto;
  total_features: number;
}

export interface FeatureDetailsFull {
  feature: FeatureSimpleDto;
  tags: Array<string>;
  events: ProgressDto;
  errors: ProgressDto;
}

export interface FeatureSimpleDto {
  id: Id;
  title: string;
  description: string | undefined;
}

export interface FunctionSimpleDto {
  id: Id;
  title: string;
  description: string | undefined;
}

export interface FeatureDetailedItem {
  id: number;
  title: string;
  description: string | undefined;
  functions_count: number;
  total_events: number;
  total_errors: number;
  top_function: TopFunction[];
}

export class DefaultSortVariant {
  public static readonly AllValues: DefaultSortVariant[] = [];

  public static readonly EVENTS = new DefaultSortVariant(
    "features.sort.requests",
    "EVENTS_COUNT",
  );
  public static readonly ERRORS = new DefaultSortVariant(
    "features.sort.errors",
    "ERRORS_COUNT",
  );
  public static readonly DATE_CREATED = new DefaultSortVariant(
    "features.sort.createdAt",
    "DATE_CREATED",
  );

  constructor(
    public readonly uiName: string,
    public readonly remoteName: string,
  ) {
    DefaultSortVariant.AllValues.push(this);
  }
}

interface TopFunction {
  id: number;
  title: string;
  total_events: number;
  percent: number;
}
