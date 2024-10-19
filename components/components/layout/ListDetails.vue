<template>
  <div class="list-details">
    <div class="list no-scrollbar" :class="listClass">
      <div class="flex flex-col gap-2">
        <div
          v-for="(item, index) in items"
          :key="index"
          @click="$emit('click:item', item)"
        >
          <slot name="item" :item="item" :active="item == selectedItem" />
        </div>
      </div>
    </div>

    <div
      v-if="showDetails && selectedItem !== null"
      class="details"
      :class="detailsClass"
    >
      <slot name="details" :item="selectedItem" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
withDefaults(
  defineProps<{
    items: Array<T>;
    selectedItem: T | null;
    listClass?: string;
    detailsClass?: string;
    showDetails?: boolean;
  }>(),
  {
    listClass: undefined,
    detailsClass: undefined,
    showDetails: true,
  },
);

defineEmits<{
  "click:item": [T];
}>();

defineSlots<{
  item(props: { item: T, active: boolean }): VNode;
  details(props: { item: T }): VNode;
}>();
</script>

<style scoped lang="scss">
.list-details {
  @apply flex items-stretch gap-4;
  @apply max-h-[100vh];

  .list,
  .details {
    @apply flex-1;
    @apply overflow-y-auto;
  }

  .details {
    @apply max-lg:hidden;
  }
}
</style>
