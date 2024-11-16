<script setup lang="ts">
defineProps<{
  item: CalendarItem;
}>();

const types = new Map([
  [
    CalendarActivityVariant.USERS,
    {
      color: "bg-sky-500",
      label: "activity.count.users",
    },
  ],
  [
    CalendarActivityVariant.EVENTS,
    {
      color: "bg-primary-500",
      label: "activity.count.events",
    },
  ],
  [
    CalendarActivityVariant.ERRORS,
    {
      color: "bg-red-500",
      label: "activity.count.crashes",
    },
  ],
]);
</script>

<template>
  <div class="w-full">
    <div
      v-for="type in item.types"
      :key="type[0]"
      class="flex items-center gap-2"
    >
      <div
        class="indicator size-2 rounded-full"
        :class="types.get(type[0])!.color"
      />

      <p>
        <value-quantity :value="type[1]" quantity="K" />

        <span class="ms-1">{{ $locale(types.get(type[0])!.label) }}</span>
      </p>
    </div>
  </div>
</template>
