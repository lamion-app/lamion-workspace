<template>
  <app-card class="!rounded-3xl" title="Platforms" variant="outlined" no-gap>
    <div class="-mx-5 px-5 flex-1">
      <radar-chart class="w-full" :items="data" name="devices" />
    </div>

    <app-card
      class="-mx-5 -mb-5"
      title="Top devices"
      title-class="text-xl font-bold"
    >
      <div class="devices">
        <div v-for="(_, index) in Array(5)" :key="index" class="device">
          <Avatar class="leading" shape="circle">
            <m-icon value="public" />
          </Avatar>

          <div class="content">
            <span class="name">Chrome 130</span>
            <span class="total">Total <span class="count">8K</span> calls</span>
          </div>

          <Avatar class="trailing" label="2K" shape="circle" />
        </div>
      </div>
    </app-card>
  </app-card>
</template>

<script setup lang="ts">
const data = [
  {
    name: "Android",
    number: 65,
  },
  {
    name: "IOS",
    number: 59,
  },
  {
    name: "WEB/Deskto",
    number: 90,
  },
  {
    name: "WEB/Mobile",
    number: 81,
  },
  {
    name: "Desktop",
    number: 56,
  },
];
</script>

<style scoped lang="scss">
.devices {
  @apply w-full;
  @apply flex flex-col flex-wrap gap-2;
  @apply overflow-hidden;

  .device {
    @apply w-full;
    height: 48px;
    @apply flex items-center justify-between gap-2;
    @apply overflow-x-hidden;

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
