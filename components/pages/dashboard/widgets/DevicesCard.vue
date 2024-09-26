<template>
  <app-card title="Top devices" title-class="text-xl font-bold">
    <div class="devices">
      <div v-for="(_, index) in Array(20)" :key="index" class="device">
        <Avatar class="leading" shape="circle">
          <span class="material-symbols-outlined">&#xe80b;</span>
        </Avatar>

        <div class="content">
          <span class="name">Chrome 130</span>
          <span class="total">Total <span class="count">8K</span> calls</span>
        </div>

        <Avatar class="trailing" label="2K" shape="circle" />
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
    height: 48px;
    @apply flex items-center justify-between gap-2;
    @apply rounded-full bg-surface-800;
    @apply overflow-x-hidden;
    @apply px-1 py-1;

    .leading,
    .trailing {
      width: 40px;
      height: 40px;
    }

    .leading {
      @apply bg-surface-700;
    }

    .content {
      @apply flex flex-1 flex-col;

      .name {
        @apply text-sm font-medium text-nowrap;
      }

      .total {
        @apply text-xs font-thin;

        .count {
          @apply font-bold;
        }
      }
    }

    .trailing {
      @apply text-sm font-bold;
      @apply bg-sky-600 rounded-full;
    }
  }
}
</style>
