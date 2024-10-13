<template>
  <custom-axis-line-chart
    value-height="60px"
    color="primary"
    brightness="500"
    stroke-opacity="10"
    :point-border="3"
    :point-radius="2"
    :items="items"
  >
    <template #value="{ item }">
      <div class="flex flex-col items-center">
        <span class="text-lg font-black"
          >{{ (Math.ceil(item.number / 500) * 500) / 1000 }}k</span
        >
        <span class="text-sm font-normal">users</span>
      </div>
    </template>

    <template #label="{ item }">
      <span class="text-sm font-bold pb-3">{{ item.name }}</span>
    </template>
  </custom-axis-line-chart>
</template>

<script setup lang="ts">
const viewport = useViewport();

const totalItems = [
  {
    name: "00:00",
    number: 2141,
  },
  {
    name: "02:00",
    number: 2341,
  },
  {
    name: "04:00",
    number: 1841,
  },
  {
    name: "06:00",
    number: 2141,
  },
  {
    name: "08:00",
    number: 2341,
  },
  {
    name: "10:00",
    number: 1532,
  },
  {
    name: "12:00",
    number: 5241,
  },
  {
    name: "14:00",
    number: 5712,
  },
  {
    name: "16:00",
    number: 4883,
  },
  {
    name: "18:00",
    number: 3651,
  },
  {
    name: "20:00",
    number: 2613,
  },
  {
    name: "22:00",
    number: 2334,
  },
];

const items = computed(() => {
  let maxItems: number;

  if (viewport.isLessThan("md")) {
    maxItems = 10;
  } else if (viewport.isLessThan("xl")) {
    maxItems = 7;
  } else {
    return totalItems;
  }

  const indent = totalItems.length - maxItems;

  if (indent <= 0) return totalItems;

  return totalItems.slice(indent / 2, totalItems.length - indent / 2);
});
</script>
