<template>
  <app-card class="!justify-start !gap-4">
    <div class="flex flex-col">
      <span class="text-2xl">Authorization</span>
      <span class="text-sm text-secondary">10 functions</span>
    </div>

    <div class="info flex flex-col gap-2">
      <div class="flex gap-2">
        <div class="flex-1">
          <span class="text-xs text-primary-200">Total calls</span>

          <value-quantity
            class="font-medium text-primary"
            value="10"
            quantity="K"
          />
        </div>

        <Divider layout="vertical" />

        <div class="flex-1">
          <span class="text-xs text-red-200">Errors</span>

          <value-quantity
            class="font-medium text-red-500"
            value="2"
            quantity="%"
          />
        </div>
      </div>
    </div>

    <div class="rounded-lg bg-surface-800 bg-opacity-40 px-3 py-1">
      <span class="text-sm font-medium text-secondary">Top function</span>

      <div class="mt-1 flex gap-2 justify-between items-center">
        <div>
          <span class="font-bold">Sign in</span>

          <div class="flex items-center gap-1 text-sm text-secondary">
            <span>Total events:</span>

            <value-quantity class="font-black" value="1" quantity="K" />
          </div>
        </div>

        <value-quantity class="text-xs font-black" value="30" quantity="%" />
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <Chip @click="$emit('click:open')">
        <span class="material-symbols-outlined text-lg">&#xe89e;</span>

        <span class="font-medium text-sm">Open</span>
      </Chip>

      <Chip @click="$emit('click:edit')">
        <span class="material-symbols-outlined text-lg">&#xe3c9;</span>

        <span class="font-medium text-sm">Edit</span>
      </Chip>
    </div>
  </app-card>
</template>

<script setup lang="ts">
defineEmits<{
  "click:open": [];
  "click:edit": [];
}>();
</script>
