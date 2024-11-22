export interface Comparison {
    actual: number;
    past: number;
}

export interface CalendarItemDto {
    date: string;
    types: Record<string, number>;
}

export interface ChartItemDto {
    key: string;
    value: number;
}

export interface ProgressDto {
    from: string;
    to: string;
    comparison: Comparison;
    chart: Array<ChartItemDto>
}

export interface TopFeature {
    id: number;
    title: string;
    description: string;
    total_events: number;
    total_events_percent: number;
}
