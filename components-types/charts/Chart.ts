export interface ChartItem {
  number: number;
  name: string;
}

export interface ChartTheme {
  strokeColor: string;
  pointColor: string;
}

export interface ChartProps {
  items: Array<ChartItem>;
  color?: string;
  brightness?: string;
  theme?: ChartTheme;
  strokeWidth?: number;
  pointEnabled?: boolean;
  pointRadius?: number;
  pointBorder?: number;
}

export const ChartDefaults = {
  theme: undefined,
  color: "primary",
  brightness: "400",
  strokeWidth: 6,
  pointEnabled: (props: ChartProps) =>
    !props.pointRadius || props.pointRadius > 0,
  pointRadius: 4,
  pointBorder: (props: ChartProps) =>
    props.pointRadius ? props.pointRadius * 2 : 8,
};

export const buildDefaultTheme = (
  color: string,
  brightness: string,
): ChartTheme => {
  const style = getComputedStyle(document.documentElement);

  const pointColor = style.getPropertyValue(`--p-${color}-${brightness}`);
  const strokeColor = style.getPropertyValue(`--p-${color}-${brightness}`);

  return {
    strokeColor: strokeColor,
    pointColor: pointColor,
  };
};
