<script setup lang="ts">
import type { FeatureDetailedItem } from "@/components-types/pages/Feature";

defineProps<{
  item: FeatureDetailedItem;
}>();

defineEmits<{
  "click:open": [];
  "click:edit": [];
}>();
</script>

<template>
  <app-card class="!justify-start !gap-4">
    <div class="col">
      <span class="text-2xl line-clamp-2" v-text="item.title" />
      <span
        class="text-sm text-secondary"
        v-text="
          $locale('features.card.functionsCount', {
            count: item.functions_count,
          })
        "
      />
    </div>

    <div class="col gap-2">
      <div class="flex gap-2">
        <div class="flex-1 col">
          <span class="text-xs text-primary-800 dark:text-primary-200">{{
            $locale("features.card.totalCalls")
          }}</span>

          <value-quantity
            class="font-medium text-primary"
            :value="item.total_events"
            quantity="K"
          />
        </div>

        <Divider layout="vertical" />

        <div class="flex-1 col">
          <span class="text-xs text-red-800 dark:text-red-200">{{
            $locale("features.card.errorsOfTotal")
          }}</span>

          <value-quantity
            class="font-medium text-red-600 dark:text-red-500"
            :value="item.total_errors"
            quantity="%"
          />
        </div>
      </div>
    </div>

    <app-card
      class="!gap-1"
      :title="$locale('features.card.topFunction')"
      title-class="text-sm font-medium text-secondary"
    >
      <div
        v-for="f in item.top_function"
        :key="f.id"
        class="flex gap-2 justify-between items-center"
      >
        <div>
          <span
            class="font-bold line-clamp-1"
            :title="f.title"
            v-text="f.title"
          />

          <div class="flex items-center gap-1 text-sm text-secondary">
            <span>{{ $locale("features.card.totalCalls") }}:</span>

            <value-quantity
              class="font-black"
              :value="f.total_events"
              quantity="K"
            />
          </div>
        </div>

        <value-quantity
          class="text-xs font-black"
          :value="round(f.percent)"
          quantity="%"
        />
      </div>
    </app-card>

    <div class="spacer flex items-end flex-wrap gap-2">
      <Chip @click="$emit('click:open')">
        <m-icon class="text-lg" value="open_in_new" />

        <span class="font-medium text-sm">{{
          $locale("common.simple.open")
        }}</span>
      </Chip>

      <Chip @click="$emit('click:edit')">
        <m-icon class="text-lg" value="edit" />

        <span class="font-medium text-sm">{{
          $locale("common.simple.edit")
        }}</span>
      </Chip>
    </div>
  </app-card>
</template>
