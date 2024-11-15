<script setup lang="ts">
import {
  CalendarActivityVariant,
  type CalendarItem,
} from "@/types/CalendarItem";

const props = defineProps<{
  items: Array<CalendarItem>;
}>();

const severityMap = new Map([
  [CalendarActivityVariant.USERS, "primary"],
  [CalendarActivityVariant.EVENTS, "warning"],
  [CalendarActivityVariant.ERRORS, "danger"],
]);

const getItemSeverity = computed(() => (date: Date) => {
  const item = props.items.find((x) => isSameDate(x.date, date));

  if (!item || item.types.size == 0) {
    return "secondary";
  }

  const variant = new Array(...item.types.entries()).sort(
    (x1, x2) => x1[1] - x2[1],
  )[0][0];

  return severityMap.get(variant) ?? "secondary";
});

const dateRange = computed(() => {
  const inputDate = new Date();
  inputDate.setHours(0);
  inputDate.setMinutes(0);
  inputDate.setSeconds(0);
  inputDate.setMilliseconds(0);

  const startDate = new Date(inputDate);

  // Go back to start of month or 3 weeks
  startDate.setDate(Math.min(1, inputDate.getDate() - 7 * 3));

  // Go to start of week
  const day = startDate.getDay();
  const diff = startDate.getDate() - day + (day == 0 ? -6 : 1);
  startDate.setDate(diff);

  return {
    inputDate: inputDate,
    startDate: startDate,
    endDate: inputDate,
  };
});
</script>

<template>
  <!-- TODO: extract month name -->
  <app-card
    class="report-card !justify-start"
    :title="$locale('activity.title')"
    subtitle="Август 2024"
    title-class="text-3xl font-black"
    title-tag="h2"
  >
    <template #action>
      <nuxt-link :to="createProjectLink('activity')">
        <icon-button icon="open_in_new" />
      </nuxt-link>
    </template>

    <calendar-layout
      :start-date="dateRange.startDate"
      :end-date="dateRange.endDate"
      gap="gap-2"
    >
      <template #legend>
        <div class="flex flex-wrap gap-2 text-sm font-bold text-surface-100">
          <span class="select-none bg-primary-500 rounded-lg px-3 py-1">{{
            $locale("activity.users")
          }}</span>
          <span class="select-none bg-red-700 rounded-lg px-3 py-1">{{
            $locale("activity.errors")
          }}</span>
          <span class="select-none bg-surface-700 rounded-lg px-3 py-1">{{
            $locale("activity.noExtraActivity")
          }}</span>
        </div>
      </template>

      <template #default="{ date, inRange }">
        <Button
          class="size-full aspect-square"
          :class="{
            'opacity-50': !inRange,
          }"
          :severity="getItemSeverity(date)"
          as="router-link"
          :to="
            createProjectLink('activity-date', {
              date: date.toISOString().substring(0, 10),
            })
          "
        >
          <div
            class="size-full text-2xl font-medium flex items-center justify-center"
            v-text="date.getDate()"
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
