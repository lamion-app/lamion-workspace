<template>
  <app-card
    class="report-card !justify-start"
    title="Activity report"
    subtitle="August 2024"
    action="&#xe89e;"
    title-class="text-3xl font-black"
    @click:action="navigateTo({ name: 'activity' })"
  >
    <calendar-layout :weeks="3" gap="gap-2">
      <template #legend>
        <div class="flex flex-wrap gap-2 text-sm font-bold">
          <span class="select-none bg-primary-500 rounded-lg px-3 py-1"
            >Users</span
          >
          <span class="select-none bg-red-700 rounded-lg px-3 py-1"
            >Errors</span
          >
          <span class="select-none bg-surface-700 rounded-lg px-3 py-1"
            >No extra activity</span
          >
        </div>
      </template>

      <template #default="{ index }">
        <div
          :class="{
            'opacity-50': index < 3,
            '!bg-primary-500': index % 4 === 0,
            '!bg-red-700': index % 12 === 0 && index > 0,
          }"
          class="size-full bg-surface-700 rounded aspect-square px-2 pt-1 pb-2"
        >
          <div
            class="size-full text-2xl font-medium flex items-center justify-center"
            v-text="index < 3 ? 29 + index : index - 2"
          />
        </div>
      </template>
    </calendar-layout>
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
