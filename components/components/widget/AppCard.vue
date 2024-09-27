<template>
  <div class="app-card">
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
  title?: string | null;
  subtitle?: string | null;
  titleClass?: string | null;
}>();
</script>

<style scoped lang="scss">
.app-card {
  @apply flex flex-col gap-6 justify-between;
  @apply p-5 bg-surface-900 rounded-xl;
  @apply overflow-hidden;
}
</style>
