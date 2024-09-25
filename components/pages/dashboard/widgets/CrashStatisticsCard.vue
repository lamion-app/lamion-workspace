<template>
  <app-card
    class="crash-free-users"
    title="Crash alert"
    title-class="text-4xl font-black"
  >
    <div class="content">
      <div class="number">
        <span class="value text-red-500">500</span>
        <span class="amount text-red-300">crashes</span>
      </div>

      <span class="info">In the last week</span>
    </div>
  </app-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.crash-free-users {
  background: linear-gradient(
    135deg,
    var(--p-rose-900) 0%,
    var(--p-rose-950) 120%
  );

  .content {
    @apply w-full;
    @apply flex flex-col gap-2 justify-self-center;
  }

  .number {
    .value {
      @apply text-7xl font-black;
    }

    .amount {
      @apply ms-2 text-4xl font-bold;
    }
  }

  .info {
    @apply mt-2;
    @apply text-xl font-medium;
  }

  //.chart {
  //  @apply w-full h-6;
  //  @apply rounded overflow-hidden;
  //
  //  background: linear-gradient(
  //    90deg,
  //    var(--p-primary-500) 10%,
  //    var(--p-red-500) 30%
  //  );
  //}
}
</style>
