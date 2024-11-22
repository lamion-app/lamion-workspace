<script setup lang="ts">
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    startDate: Date;
    endDate: Date;
    gap?: string;
    grid?: boolean;
  }>(),
  {
    gap: "",
    grid: false,
  },
);

const items = computed(() => {
  const rangeStart = new Date(props.startDate);
  const day = rangeStart.getDay();
  const diff = rangeStart.getDate() - day + (day == 0 ? -6 : 1);
  rangeStart.setDate(diff);

  const rangeEnd = new Date(props.endDate);
  rangeEnd.setDate(props.endDate.getDate() - props.endDate.getDay() + 7);

  const totalDays = dateDiffDays(rangeStart, rangeEnd);

  return [...new Array(totalDays).keys()].map((x) => {
    const date = new Date(rangeStart);
    date.setDate(date.getDate() + x);

    return {
      index: x,
      date: date,
      inRange:
        props.startDate.getTime() <= date.getTime() &&
        props.endDate.getTime() >= date.getTime(),
    };
  });
});

const monthNames = computed(() => [
  t("datetime.months.short.mon"),
  t("datetime.months.short.tue"),
  t("datetime.months.short.wed"),
  t("datetime.months.short.thu"),
  t("datetime.months.short.fri"),
  t("datetime.months.short.sat"),
  t("datetime.months.short.sun"),
]);
</script>

<template>
  <div class="calendar">
    <div v-if="$slots.legend" class="mb-4">
      <slot name="legend" />
    </div>

    <div
      class="table"
      :class="{
        'show-grid': grid,
      }"
    >
      <div class="page-content" :class="[gap]">
        <div v-for="(_, i) in Array(7)" :key="i" class="cell">
          <slot name="dayOfWeek" :index="i">
            <span
              class="text-sm font-black text-center"
              v-text="monthNames[i]"
            />
          </slot>
        </div>

        <div v-for="day in items" :key="day.index" class="cell">
          <slot name="default" :date="day.date" :in-range="day.inRange" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar {
  .table {
    @apply size-full;

    .page-content {
      @apply mt-2;
      @apply grid grid-cols-7;
    }

    .cell {
      @apply flex items-center justify-center;
    }

    &.show-grid {
      .page-content {
        .cell {
          @apply border-surface-800;
          border-style: solid;
          border-bottom-width: 1px;
        }

        .cell {
          &:not(:last-child) {
            border-right-width: 1px;
          }
        }
      }
    }
  }
}
</style>
