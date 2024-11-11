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
      <div class="header">
        <div class="row" :class="[gap]">
          <div v-for="(_, i) in Array(7)" :key="i" class="cell">
            <slot name="dayOfWeek" :index="i">
              <span
                class="text-sm font-black text-center"
                v-text="monthNames[i]"
              />
            </slot>
          </div>
        </div>
      </div>

      <div class="page-content" :class="[gap]">
        <div
          v-for="week in Array(weeks).keys()"
          :key="week"
          class="row"
          :class="[gap]"
        >
          <div v-for="day in Array(7).keys()" :key="day" class="cell">
            <slot name="default" :index="week * 7 + (day + 1)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

withDefaults(
  defineProps<{
    weeks?: number;
    gap?: string;
    grid?: boolean;
  }>(),
  {
    weeks: 4,
    gap: "",
    grid: false,
  },
);

const monthNames = [
  t("datetime.months.short.mon"),
  t("datetime.months.short.tue"),
  t("datetime.months.short.wed"),
  t("datetime.months.short.thu"),
  t("datetime.months.short.fri"),
  t("datetime.months.short.sat"),
  t("datetime.months.short.sun"),
];
</script>

<style lang="scss" scoped>
.calendar {
  .table {
    @apply size-full;

    .row {
      @apply grid grid-cols-7;
    }

    .page-content {
      @apply mt-2;
      @apply flex flex-col;
    }

    .cell {
      @apply flex items-center justify-center;
    }

    &.show-grid {
      .page-content {
        .row,
        .cell {
          @apply border-surface-800;
          border-style: solid;
        }

        .row {
          border-top-width: 1px;

          &:last-of-type {
            border-bottom-width: 1px;
          }
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
