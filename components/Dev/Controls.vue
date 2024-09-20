<template>
  <AppCard class="controls">
    <slot />
  </AppCard>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.controls {
  @apply fixed bottom-4 right-6;
}
</style>