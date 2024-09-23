export interface BarChartItem {
  name: string;
  number: number;
}

export interface BarChartThemeItem {
  start: string;
  end: string;
}

export interface BarChartTheme {
  low: BarChartThemeItem;
  normal: BarChartThemeItem;
  high: BarChartThemeItem;
}

export const defaultBarChartTheme = (color: string) => {
  const baseColor = `--p-${color}-`;
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    low: {
      start: documentStyle.getPropertyValue(baseColor + "700"),
      end: documentStyle.getPropertyValue(baseColor + "900"),
    },
    normal: {
      start: documentStyle.getPropertyValue(baseColor + "500"),
      end: documentStyle.getPropertyValue(baseColor + "900"),
    },
    high: {
      start: documentStyle.getPropertyValue(baseColor + "300"),
      end: documentStyle.getPropertyValue(baseColor + "700"),
    },
  } as BarChartTheme;
};
