<script setup lang="ts">
const props = defineProps<{
  platforms: ChartItem[];
  topDevices: TopDevice[];
}>();

const devices = computed(() =>
  props.topDevices.map((x) => ({
    title: x.title,
    activityActual: x.activity.actual,
    activityDiff: x.activity.actual - x.activity.past,
    icon: computePlatformIcon(x.platform),
  })),
);
</script>

<template>
  <app-card
    class="!rounded-3xl"
    :title="$locale('users.platforms')"
    variant="outlined"
    container-class="col h-full pb-5"
  >
    <div
      class="-mx-5 px-5 h-[320px] md:h-full md:max-h-[260px] xl:max-h-[300px]"
    >
      <radar-chart class="size-full" :items="platforms" name="devices" />
    </div>

    <app-card
      class="-mx-5 -mb-3 flex-1 !overflow-y-auto"
      :title="$locale('users.topDevices')"
      title-class="text-xl font-bold"
    >
      <div class="devices">
        <div v-for="(device, index) in devices" :key="index" class="device">
          <div class="content">
            <span class="title" :title="device.title">{{ device.title }}</span>

            <div class="subtitle">
              <value-quantity
                :class="
                  device.activityDiff > 0 ? 'text-primary' : 'text-red-500'
                "
                :prefix="device.activityDiff > 0 ? '+' : '-'"
                :value="Math.abs(device.activityDiff)"
              />

              <span>(<value-quantity :value="device.activityActual" />)</span>

              <span class="font-thin">{{ $locale("users.totalEvents") }}</span>
            </div>
          </div>

          <Avatar class="leading" shape="circle">
            <m-icon :value="device.icon" />
          </Avatar>
        </div>
      </div>
    </app-card>
  </app-card>
</template>

<style scoped lang="scss">
.devices {
  @apply w-full;
  @apply flex flex-col flex-wrap gap-2;
  @apply overflow-hidden;

  .device {
    @apply w-full;
    height: 48px;
    @apply flex items-center gap-2;
    @apply overflow-x-hidden;

    .leading {
      width: 40px;
      height: 40px;
      @apply bg-surface-200 dark:bg-surface-700;
    }

    .content {
      @apply flex-1 flex flex-col;

      .title {
        @apply text-sm font-medium;
        @apply line-clamp-1;
      }

      .subtitle {
        @apply flex items-center gap-1;
        @apply text-sm font-medium;
      }
    }

    .trailing {
      @apply text-sm font-bold;
      @apply bg-sky-600 rounded-full;
    }
  }
}
</style>
