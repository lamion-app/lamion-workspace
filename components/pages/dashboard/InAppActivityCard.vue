<script setup lang="ts">
const props = defineProps<{
  items: Array<TopFeature>;
}>();

const displayingItems = computed(() => props.items.slice(0, 5));
</script>

<template>
  <app-card
    :title="$locale('dashboard.inAppActivity.title')"
    :subtitle="$locale('dashboard.inAppActivity.subtitle')"
    title-tag="h2"
  >
    <div class="col gap-4">
      <nuxt-link
        v-for="(feature, index) in displayingItems"
        :key="feature.id"
        class="flex gap-2 items-center cursor-pointer"
        :to="createProjectLink('features-id', { id: feature.id })"
      >
        <Avatar
          :label="(index + 1).toString()"
          shape="square"
          size="large"
          class="!text-lg !size-14"
        />

        <div class="col flex-1 mb-1">
          <span class="text-lg font-bold line-clamp-1" v-text="feature.title" />

          <span
            class="text-xs font-medium"
            v-text="
              $locale('dashboard.inAppActivity.ofTotalEvents', {
                expr: feature.total_events_percent.toFixed(2),
              })
            "
          />
        </div>

        <value-quantity
          :value="feature.total_events"
          value-class="text-xl font-bold"
          quantity-class="text-lg font-medium text-secondary"
        />
      </nuxt-link>
    </div>
  </app-card>
</template>
