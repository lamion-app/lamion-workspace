<template>
  <custom-axis-line-chart
    class="min-w-[600px]"
    value-height="60px"
    color="primary"
    brightness="500"
    stroke-opacity="10"
    :point-border="3"
    :point-radius="2"
    :items="items"
  >
    <template #value="{ item }">
      <div class="col items-center">
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
const items = [
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
</script>
