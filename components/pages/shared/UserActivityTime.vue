<script setup lang="ts">
const props = defineProps<{
  items: Array<TimeChartItem>;
}>();

const chartItems = computed(() => {
  return [...Array(24).keys()]
    .map((x) => {
      return (
        props.items.find((y) => y.key.hour == x) ?? {
          key: {
            hour: x,
            minute: 0,
            second: 0,
          },
          value: 0,
        }
      );
    })
    .map((x) => ({
      number: x.value,
      name: formatTime(x.key),
    }));
});
</script>

<template>
  <custom-axis-line-chart
    class="min-w-[600px]"
    value-height="60px"
    color="primary"
    brightness="500"
    stroke-opacity="10"
    :point-border="3"
    :point-radius="2"
    :items="chartItems"
  >
    <template #value="{ item }">
      <div class="col center px-2">
        <value-quantity class="text-lg font-black" :value="item.number" />
        <span class="text-sm font-normal">{{
          $locale("userActivityTime.sessions")
        }}</span>
      </div>
    </template>

    <template #label="{ item }">
      <span class="text-sm font-bold pb-3">{{ item.name }}</span>
    </template>
  </custom-axis-line-chart>
</template>
