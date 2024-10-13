<template>
  <Chart
    class="aspect-square"
    type="radar"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script setup lang="ts">
import { buildDefaultTheme } from "~/components-types/charts/Chart";
import type { ChartProps } from "~/components-types/charts/Chart";

const props = withDefaults(
  defineProps<
    ChartProps & {
      name: string;
      linesColor?: string;
      tension?: number;
    }
  >(),
  {
    ...ChartDefaults,
    strokeWidth: 1,
    tension: 0.08,
    linesColor: undefined,
  },
);

const chartData = computed(() => {
  const theme = props.theme ?? buildDefaultTheme(props.color, props.brightness);

  return {
    labels: props.items.map((p) => p.name),
    datasets: [
      {
        label: props.name,
        data: props.items.map((p) => p.number),
        backgroundColor: theme.pointColor + "90",
        borderColor: theme.strokeColor,
        borderWidth: props.strokeWidth,
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBorderColor: theme.pointColor,
        pointHoverBackgroundColor: theme.pointColor,
      },
    ],
  };
});

const chartOptions = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement);
  const linesColor = documentStyle.getPropertyValue("--p-text-muted-color");

  return {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: props.tension,
      },
    },
    scale: {
      ticks: {
        maxTicksLimit: 4,
      },
    },
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: {
          color: linesColor,
        },
        angleLines: {
          color: linesColor,
        },
        ticks: {
          color: linesColor,
          backdropColor: "transparent",
        },
      },
    },
  };
});

// onMounted(() => {
//   chartData.value = setChartData();
//   chartOptions.value = setChartOptions();
// });
//
// const chartData = ref();
// const chartOptions = ref();
//
// const setChartData = () => {
//   const documentStyle = getComputedStyle(document.documentElement);
//
//   return {
//     labels: ["Android", "IOS", "WEB/Desktop", "WEB/Mobile", "Desktop"],
//     datasets: [
//       {
//         label: "Devices",
//         data: [65, 59, 90, 81, 56],
//         backgroundColor:
//             documentStyle.getPropertyValue("--p-primary-500") + "90",
//         borderWidth: 1,
//         borderColor: documentStyle.getPropertyValue("--p-primary-400"),
//         pointBackgroundColor: "transparent",
//         pointBorderColor: "transparent",
//         pointHoverBackgroundColor:
//             documentStyle.getPropertyValue("--p-primary-500"),
//         pointHoverBorderColor:
//             documentStyle.getPropertyValue("--p-primary-400"),
//       },
//     ],
//   };
// };
// const setChartOptions = () => {
//   const documentStyle = getComputedStyle(document.documentElement);
//   const textColor = documentStyle.getPropertyValue("--p-text-color");
//   const textColorSecondary = documentStyle.getPropertyValue(
//       "--p-text-muted-color",
//   );
//
//   return {
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scale: {
//       ticks: {
//         maxTicksLimit: 4,
//       },
//     },
//     elements: {
//       line: {
//         tension: 0.08,
//       },
//     },
//     scales: {
//       r: {
//         grid: {
//           color: textColorSecondary,
//         },
//         angleLines: {
//           color: textColorSecondary,
//         },
//         ticks: {
//           color: textColor,
//           backdropColor: "transparent",
//         },
//       },
//     },
//   };
// };
</script>

<style scoped></style>
