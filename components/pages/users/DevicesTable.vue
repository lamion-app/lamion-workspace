<script setup lang="ts">
const props = defineProps<{
  datePeriod: DatePeriod;
}>();

const { useProjectLoadTransform } = useProjects();

const tableEl = ref();
const bottomLoaderEl = ref();

const page = ref(0);
const isLastPage = ref(false);

watch(
  () => props.datePeriod,
  () => {
    page.value = 0;
    isLastPage.value = false;
    reset(true);
  },
);

const { data, isLoading, reset, blockLoading } = useProjectLoadTransform(
  (id, page, datePeriod) =>
    useApiCall<Array<Device>>(`/project/${id}/devices`, {
      query: {
        p: page,
        period: DatePeriod[datePeriod],
      },
    }),
  (n, o) => {
    isLastPage.value = n.length == 0;

    return [...o, ...n];
  },
  [page, toRef(() => props.datePeriod)],
  false,
);

const tableData = computed(() =>
  data.value?.map((x) => ({
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

onBeforeMount(() => {
  blockLoading(true);
});

useIntersectionObserver(tableEl, ([{ isIntersecting }]) => {
  blockLoading(!isIntersecting);
});

useIntersectionObserver(bottomLoaderEl, ([{ isIntersecting }]) => {
  if (isIntersecting && !isLoading.value && !isLastPage.value) {
    page.value += 1;
  }
});
</script>

<template>
  <div ref="tableEl" class="devices">
    <div v-if="isLoading && !data" class="w-full h-[200px]">
      <app-loader />
    </div>

    <template v-else>
      <DataTable :value="tableData">
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

      <progress-spinner
        v-if="!isLoading && !!data && !isLastPage"
        ref="bottomLoaderEl"
        class="mt-6 mx-auto"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
