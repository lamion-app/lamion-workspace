<template>
  <div
    class="card bg-surface-900 flex flex-col gap-6 p-5 justify-center rounded-xl overflow-hidden"
  >
    <div v-if="!!title || !!subtitle" class="flex flex-col gap-2">
      <span
        v-if="!!title"
        :class="!!titleClass ? titleClass : 'text-2xl font-black'"
        v-text="title"
      />
      <span v-if="!!subtitle" class="text-sm" v-text="subtitle" />
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
  titleClass?: string;
}>();
</script>
