<template>
  <Button class="p-button-icon-only" :severity="severity" text rounded>
    <span class="material-symbols-outlined text-lg">{{ icon }}</span>
  </Button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string;
    severity?: string;
  }>(),
  {
    severity: "secondary",
  },
);
</script>
