<template>
  <dashboard-layout>
    <app-card class="col-span-full !h-[400px]" title="Active users">
      <line-chart
        class="-mx-5 -mb-5 h-full"
        color="primary"
        brightness="500"
        stroke-opacity="ff"
        :stroke-width="3"
        :point-border="3"
        :point-radius="7"
        :prev-value="data[0].number"
        :next-value="data[data.length - 1].number"
        :items="data"
      >
        <template #tooltip="{ index }">
          <div class="bg-surface-800 rounded-xl p-5">
            <span>{{ data[index].name }}</span>
            <hr />
            <span>{{ data[index].number }}</span>
          </div>
        </template>

        <template #label="{ item }">
          <div class="py-2">
            <span>{{ item.name }}</span>
          </div>
        </template>
      </line-chart>
    </app-card>
  </dashboard-layout>
</template>

<script setup lang="ts">
const data = [...Array(15).keys()].map((_, index) => {
  return {
    name: `${1 + index}.06.24`,
    number: Math.floor(Math.random() * (index + 1) * 1000),
  };
});
</script>
