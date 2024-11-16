<template>
  <div class="list-details">
    <template v-if="items.length > 0">
      <div class="list no-scrollbar" :class="listClass">
        <div class="col gap-2">
          <div
            v-for="(item, index) in items"
            :key="index"
            @click="$emit('click:item', item)"
          >
            <slot
              name="item"
              :index="index"
              :item="item!"
              :active="item == selectedItem"
            />
          </div>
        </div>
      </div>

      <div
        v-if="showDetails && !!selectedItem"
        class="details"
        :class="detailsClass"
      >
        <slot name="details" :item="selectedItem" />
      </div>
    </template>

    <slot v-else name="empty" />
  </div>
</template>

<script setup lang="ts" generic="T">
withDefaults(
  defineProps<{
    items: Array<T>;
    selectedItem: T | undefined;
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
  item(props: { item: T; index: number; active: boolean }): VNode;
  details(props: { item: T }): VNode;
  empty(): VNode;
}>();
</script>

<style scoped lang="scss">
.list-details {
  @apply flex items-stretch gap-4;
  @apply lg:max-h-[100vh];

  .list,
  .details {
    @apply flex-1;
    @apply lg:overflow-y-auto;
  }

  .details {
    @apply max-lg:hidden;
  }
}
</style>
