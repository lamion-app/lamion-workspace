<template>
  <line-chart
    color="primary"
    brightness="500"
    stroke-opacity="ff"
    hide-labels
    :stroke-width="3"
    :point-radius="0"
    :prev-value="data[0].number"
    :next-value="data[data.length - 1].number"
    :items="data"
  >
    <template #tooltip>tooltip</template>

    <template #label="{ item }">
      <div class="py-2">
        <span>{{ item.name }}</span>
      </div>
    </template>
  </line-chart>
</template>

<script setup lang="ts">
const items = 20;

const data = [...Array(items).keys()].map((_, index) => {
  return {
    name: `${1 + index}.06.24`,
    number: Math.pow(index ^ (2 - items / 2), 2),
  };
});
</script>
