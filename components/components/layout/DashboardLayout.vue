<template>
  <div class="dashboard">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  @apply size-full;
  @apply flex flex-col;
  @apply gap-4;

  @screen md {
    @apply grid grid-flow-row items-start justify-start;

    grid-template-columns: repeat(12, 1fr);
  }

  & > * {
    height: 100%;
  }
}
</style>
