<template>
  <app-card
    class="report-card !justify-start"
    title="Activity report"
    subtitle="August 2024"
    title-class="text-3xl font-black"
    title-tag="h2"
  >
    <template #action>
      <nuxt-link :to="createProjectLink('activity')">
        <icon-button icon="open_in_new" />
      </nuxt-link>
    </template>

    <calendar-layout :weeks="3" gap="gap-2">
      <template #legend>
        <div class="flex flex-wrap gap-2 text-sm font-bold text-surface-100">
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
        <Button
          class="size-full aspect-square"
          :class="{
            'opacity-50': index < 3,
          }"
          :severity="
            index % 4 ? 'secondary' : index % 12 === 0 ? 'danger' : 'primary'
          "
          as="router-link"
          :to="createProjectLink('activity-date', { date: index })"
        >
          <div
            class="size-full text-2xl font-medium flex items-center justify-center"
            v-text="index < 3 ? 29 + index : index - 2"
          />
        </Button>
      </template>
    </calendar-layout>
  </app-card>
</template>

<style lang="scss" scoped>
.report-card {
  background: linear-gradient(
    135deg,
    var(--p-stone-300) 0%,
    var(--p-stone-300) 40%,
    var(--p-surface-300) 120%
  );

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      135deg,
      var(--p-stone-700) 0%,
      var(--p-stone-800) 40%,
      var(--p-surface-700) 120%
    );
  }
}
</style>
