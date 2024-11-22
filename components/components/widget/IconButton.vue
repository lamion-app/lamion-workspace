<template>
  <Button
    class="p-button-icon-only"
    :severity="severity"
    :text="!filled"
    rounded
  >
    <m-icon class="text-lg" :value="icon" />
  </Button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string;
    severity?: string;
    filled?: boolean;
  }>(),
  {
    severity: "secondary",
    filled: false,
  },
);
</script>
