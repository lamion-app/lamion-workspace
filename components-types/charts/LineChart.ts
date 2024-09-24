export interface LineChartItem {
  number: number;
  name: string;
}

export interface LineChartTheme {
  strokeColor: string;
  pointColor: string;
}

export const defaultLineChartTheme = (
  color: string,
  brightness: string,
  strokeOpacity: string,
): LineChartTheme => {
  const style = getComputedStyle(document.documentElement);

  const pointColor = style.getPropertyValue(`--p-${color}-${brightness}`);
  const strokeColor =
    style.getPropertyValue(`--p-${color}-${brightness}`) + strokeOpacity;

  return {
    strokeColor: strokeColor,
    pointColor: pointColor,
  };
};
