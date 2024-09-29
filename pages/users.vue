<template>
  <div class="flex items-center justify-center">
    <app-card class="w-full h-[400px]" title="Active users">
      <line-chart
        class="-mx-5 h-full"
        color="primary"
        brightness="500"
        stroke-opacity="ff"
        :stroke-width="3"
        :point-border="3"
        :point-radius="7"
        :prev-value="3900"
        :next-value="3900"
        :items="data"
      >
        <template #tooltip="{ index }">
          <div class="w-20 bg-surface-800 rounded-xl p-5">
            <span>{{ data[index].name }}</span>
            <hr />
            <span>{{ data[index].number }}</span>
          </div>
        </template>

        <template #label="{ item }">
          <span>{{ item.name }}</span>
        </template>
      </line-chart>

      <!--      <div class="container h-full -mx-5 -mb-5">
              <div class="data flex size-full">
                <div class="flex-1 bg-red-500">1</div>
                <div class="flex-1 bg-yellow-500">2</div>
                <div class="flex-1 bg-red-500">3</div>
                <div class="flex-1 bg-sky-500">4</div>
                <div class="flex-1 bg-red-500">5</div>
                <div class="flex-1 bg-blue-500">6</div>
              </div>
            </div>-->
    </app-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const data = [
  {
    name: "04:00",
    number: 3941,
  },
  // {
  //   name: "06:00",
  //   number: 4141,
  // },
  // {
  //   name: "08:00",
  //   number: 3841,
  // },
  // {
  //   name: "10:00",
  //   number: 4532,
  // },
  // {
  //   name: "12:00",
  //   number: 5241,
  // },
  // {
  //   name: "14:00",
  //   number: 4712,
  // },
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
    number: 3413,
  },
];
</script>

<style scoped lang="scss">
.data {
  width: 100%;
}
</style>
