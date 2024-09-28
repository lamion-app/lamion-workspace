export interface LineChartItem {
  number: number;
  name: string;
}

export interface LineChartTheme {
  strokeColor: string;
  pointColor: string;
}

export interface LineChartProps {
  items: Array<LineChartItem>;
  color?: string;
  brightness?: string;
  strokeOpacity?: string;
  theme?: LineChartTheme;
  strokeWidth?: number;
  pointEnabled?: boolean;
  pointRadius?: number;
  pointBorder?: number;
}

export const LineChartDefaults = {
  theme: undefined,
  color: "primary",
  brightness: "400",
  strokeOpacity: "10",
  strokeWidth: 6,
  pointEnabled: (props: LineChartProps) =>
    !props.pointRadius || props.pointRadius > 0,
  pointRadius: 4,
  pointBorder: (props: LineChartProps) =>
    props.pointRadius ? props.pointRadius * 2 : 8,
};
