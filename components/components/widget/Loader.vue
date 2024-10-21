<template>
  <div class="loader">
    <progress-spinner
      class="!size-[50px]"
      stroke-width="8"
      animation-duration=".5s"
    />
  </div>
</template>

<style scoped lang="scss">
.loader {
  @apply flex items-center justify-center;
  @apply absolute top-0 left-0 size-full;
  @apply p-3 bg-surface-700 bg-opacity-40;
  z-index: 1003; // z-index used to overlap multi-select component
}
</style>
