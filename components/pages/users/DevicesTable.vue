<script setup lang="ts">
const props = defineProps<{
  datePeriod: DatePeriod;
}>();

const tableEl = ref();
const bottomLoaderEl = ref();

const isTableOnScreen = ref(false);

const table = useListDataLoader({
  load: (id, page, datePeriod) =>
    useApiCall<Array<Device>>(`/project/${id}/devices`, {
      query: {
        p: page,
        period: DatePeriod[datePeriod],
      },
    }),
  params: [toRef(() => props.datePeriod)],
  startLoadBy: isTableOnScreen,
  resetOnChange: [toRef(() => props.datePeriod)],
  loaderEl: bottomLoaderEl,
});

const items = computed(() =>
  table.data?.map((x) => ({
    title: x.title,
    platform: {
      icon: computePlatformIcon(x.platform),
      title: x.platform,
    },
    activity: {
      value: x.activity.actual,
      change: computeChange(x.activity),
    },
    error: {
      value: x.errors.actual,
      change: computeChange(x.errors),
    },
  })),
);

useIntersectionObserver(tableEl, ([{ isIntersecting }]) => {
  isTableOnScreen.value = isIntersecting;
});
</script>

<template>
  <div ref="tableEl" class="devices">
    <div v-if="table.isPreLoading" class="w-full h-[150px]">
      <app-loader class="size-full" static />
    </div>

    <template v-else>
      <DataTable :value="items">
        <Column :header="$locale('devices.name')">
          <template #body="slotProps">
            <span>{{ slotProps.data.title }}</span>

            <div class="flex items-center gap-2">
              <m-icon :value="slotProps.data.platform.icon" />

              <span v-text="slotProps.data.platform.title" />
            </div>
          </template>
        </Column>

        <Column :header="$locale('devices.activity')">
          <template #body="slotProps">
            <div class="flex items-center gap-2">
              <value-quantity
                value-class="text-3xl"
                quantity-class="text-2xl text-secondary"
                :value="slotProps.data.activity.value"
              />

              <up-down-indicator
                v-if="slotProps.data.activity.change"
                :value="slotProps.data.activity.change"
                quantity="%"
              />
            </div>
          </template>
        </Column>

        <Column :header="$locale('devices.errors')">
          <template #body="slotProps">
            <div class="flex items-center gap-2">
              <value-quantity
                value-class="text-3xl"
                quantity-class="text-2xl text-secondary"
                :value="slotProps.data.error.value"
              />

              <up-down-indicator
                v-if="slotProps.data.error.change"
                :value="slotProps.data.error.change"
                revert
                quantity="%"
              />
            </div>
          </template>
        </Column>
      </DataTable>

      <div v-if="table.isNeedPostLoading" class="w-full mt-6 flex center">
        <app-loader ref="bottomLoaderEl" static />
      </div>
    </template>
  </div>
</template>
