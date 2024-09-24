<template>
  <app-card
    title="Top devices"
    subtitle="For the current month"
    title-class="text-xl font-bold"
  >
    <div class="devices">
      <div class="device">
        <Avatar shape="circle" size="large">
          <span class="material-symbols-outlined">&#xe324;</span>
        </Avatar>

        <div class="content">
          <span class="name">Xiaomi 78 pro max</span>
          <span class="total"
            >Total <span class="count">300K</span> devices</span
          >
        </div>

        <div class="info">
          <Avatar label="10K" shape="circle" size="large" class="count" />

          <span class="label">users</span>
        </div>
      </div>

      <div class="device">
        <Avatar shape="circle" size="large">
          <span class="material-symbols-outlined">&#xe027;</span>
        </Avatar>

        <div class="content">
          <span class="name">Iphone 15 pro</span>
          <span class="total"
            >Total <span class="count">50K</span> devices</span
          >
        </div>

        <div class="info">
          <Avatar label="2K" shape="circle" size="large" class="count" />

          <span class="label">users</span>
        </div>
      </div>

      <div v-for="(_, index) in Array(3)" :key="index" class="device">
        <Avatar shape="circle" size="large">
          <span class="material-symbols-outlined">&#xe80b;</span>
        </Avatar>

        <div class="content">
          <span class="name">Chrome 130</span>
          <span class="total">Total <span class="count">8K</span> devices</span>
        </div>

        <div class="info">
          <Avatar label="500" shape="circle" size="large" class="count" />

          <span class="label">users</span>
        </div>
      </div>
    </div>
  </app-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.devices {
  @apply w-full;
  @apply flex flex-col flex-wrap gap-2;
  @apply overflow-hidden;

  .device {
    @apply w-full;
    height: 56px;
    @apply flex items-center justify-between gap-2;
    @apply rounded-full bg-surface-800;
    @apply overflow-x-hidden;
    @apply px-1 py-1;

    .content {
      @apply flex flex-1 flex-col;

      .name {
        @apply text-sm font-medium;
      }

      .total {
        @apply text-xs font-thin;

        .count {
          @apply font-bold;
        }
      }
    }

    .info {
      @apply flex gap-2 items-center;
      @apply bg-surface-700 rounded-full;
      @apply ps-1 py-1 pe-4;

      .count {
        width: 40px;
        height: 40px;
        @apply text-sm font-bold;
        @apply bg-sky-600;
      }

      .label {
        @apply text-sm font-medium;
      }
    }
  }
}
</style>
