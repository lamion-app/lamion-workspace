<template>
  <Button class="p-button-icon-only" :severity="severity" text rounded>
    <m-icon class="text-lg" :value="icon" />
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
