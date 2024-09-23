import type { Chart, ChartOptions, Plugin } from "chart.js";

export interface ThemePluginOptions {
  backgroundColor: string;
}

export interface ThemeChartOptions extends ChartOptions {
  chartTheme: ThemePluginOptions;
}

export const ThemePlugin: Plugin = {
  id: "canvasTheme",
  beforeDraw: (chart: Chart) => {
    const ctx = chart.ctx;
    const theme = chart.options as ThemeChartOptions;

    ctx.save();
    ctx.fillStyle = theme.chartTheme.backgroundColor ?? "#fff";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
