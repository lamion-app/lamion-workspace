<template>
  <app-card
    class="report-card !justify-start"
    title="Activity report"
    subtitle="8 august 2024"
    title-class="text-3xl font-black"
  >
    <div class="legend flex flex-wrap gap-2 text-sm font-bold">
      <span
        class="cursor-pointer select-none bg-primary-500 rounded-lg px-3 py-1"
        >Users</span
      >
      <span class="cursor-pointer select-none bg-red-700 rounded-lg px-3 py-1"
        >Errors</span
      >
      <span
        class="cursor-pointer select-none bg-surface-700 rounded-lg px-3 py-1"
        >No extra activity</span
      >
    </div>

    <div class="grid grid-cols-7 gap-2">
      <span class="col-span-1 text-sm font-black text-center">mon</span>
      <span class="col-span-1 text-sm font-black text-center">tue</span>
      <span class="col-span-1 text-sm font-black text-center">wed</span>
      <span class="col-span-1 text-sm font-black text-center">thu</span>
      <span class="col-span-1 text-sm font-black text-center">fri</span>
      <span class="col-span-1 text-sm font-black text-center">sat</span>
      <span class="col-span-1 text-sm font-black text-center">sun</span>

      <div
        v-for="(_, index) in Array(21)"
        :key="index"
        :class="{
          'opacity-50': index < 3,
          '!bg-primary-500': index % 4 === 0,
          '!bg-red-700': index % 12 === 0 && index > 0,
        }"
        class="col-span-1 bg-surface-700 rounded aspect-square px-2 pt-1 pb-2"
      >
        <div
          class="size-full text-2xl font-medium flex items-center justify-center"
          v-text="index < 3 ? 29 + index : index - 2"
        />
      </div>
    </div>
  </app-card>
</template>

<style lang="scss" scoped>
.report-card {
  background: linear-gradient(
    135deg,
    var(--p-stone-700) 0%,
    var(--p-stone-800) 40%,
    var(--p-surface-700) 120%
  );
}
</style>
