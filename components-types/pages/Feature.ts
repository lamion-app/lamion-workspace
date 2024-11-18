export interface FeatureFull {
  total_events: ProgressDto;
  total_features: number;
}

export interface FunctionSimpleDto {
  id: Id;
  title: string;
  description: string | unknown;
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

export class FeatureSortVariant {
  public static readonly AllValues: FeatureSortVariant[] = [];

  public static readonly EVENTS = new FeatureSortVariant(
    "features.sort.requests",
    "EVENTS_COUNT",
  );
  public static readonly ERRORS = new FeatureSortVariant(
    "features.sort.errors",
    "ERRORS_COUNT",
  );
  public static readonly DATE_CREATED = new FeatureSortVariant(
    "features.sort.createdAt",
    "DATE_CREATED",
  );

  constructor(
    public readonly uiName: string,
    public readonly remoteName: string,
  ) {
    FeatureSortVariant.AllValues.push(this);
  }
}

interface TopFunction {
  id: number;
  title: string;
  total_events: number;
  percent: number;
}
