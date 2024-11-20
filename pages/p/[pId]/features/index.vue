<script setup lang="ts">
import { FeatureSortVariant } from "~/components-types/pages/Feature";

definePageMeta({
  layout: "main",
  title: "features.title",
});

const { t } = useI18n();
const { useProjectLoad, useProjectLoadTransform } = useProjects();

const bottomLoader = ref();
const featuresSortOp = ref();

const feature = reactive({
  page: 0,
  sort: FeatureSortVariant.EVENTS,
  isLastPage: false,
  addDialogVisible: false,
  editDialogItem: ref<FeatureDetailedItem | undefined>(),
});

const { isLoading, data } = useProjectLoad((id) =>
  useApiCall<FeatureFull>(`/project/${id}/features/full`),
);

const {
  data: features,
  isLoading: isFeaturesLoading,
  reset: resetFeatures,
} = useProjectLoadTransform<Array<FeatureDetailedItem>>(
  (id, page, sort: FeatureSortVariant) =>
    useApiCall<Array<FeatureDetailedItem>>(`/project/${id}/features`, {
      query: {
        p: page,
        sort: sort.remoteName,
      },
    }),
  (items, old) => {
    feature.isLastPage = items.length == 0;

    return [...old, ...items];
  },
  [toRef(feature, "page"), toRef(feature, "sort")],
);

useIntersectionObserver(bottomLoader, ([{ isIntersecting }]) => {
  if (isIntersecting && !isFeaturesLoading.value && !feature.isLastPage) {
    feature.page += 1;
  }
});

const totalEventsCard = computed(() => {
  const info = data.value!.total_events;

  return {
    title: t("features.totalEvents"),
    overall: info.comparison,
    data: {
      start: parseISODateString(info.from),
      end: parseISODateString(info.to),
      items: mapDateChartDto(info.chart),
    },
    comparison: {
      icon: "person",
      text: t("common.phrases.fromLastMonth"),
    },
  };
});

function changeSortVariant(variant: FeatureSortVariant) {
  resetFeatures();
  feature.page = 0;
  feature.sort = variant;
  featuresSortOp.value.hide();
}
</script>

<template>
  <app-layout :is-loading="isLoading">
    <dashboard-layout v-if="!!data">
      <div class="col-span-full lg:col-span-4 flex flex-col gap-4 !h-[600px]">
        <progress-card
          class="flex-1"
          :title="totalEventsCard.title"
          :overall="totalEventsCard.overall"
          :data="totalEventsCard.data"
          :comparison="totalEventsCard.comparison"
        />

        <div class="col gap-2">
          <app-card
            v-for="(_, i) in Array(2)"
            :key="i"
            class="flex-1"
            :title="
              [
                $locale('features.seeAppFunctions'),
                $locale('features.manageCrashes'),
              ][i]
            "
            title-class="font-bold text-2xl"
          >
            <template #action>
              <icon-button
                as="router-link"
                class="!text-2xl"
                :class="{
                  '!bg-primary-500': i === 0,
                  '!text-primary-100': i === 0,
                  '!bg-red-500': i === 1,
                  '!text-red-100': i === 1,
                }"
                icon="&#xf1e1;"
                :to="
                  createProjectLink(
                    i === 0 ? 'features-functions' : 'features-crashes',
                  )
                "
              />
            </template>
          </app-card>
        </div>
      </div>

      <features-card class="col-span-full lg:col-span-8 !h-[600px]" />

      <div class="col-span-full hidden lg:block" />

      <div class="col-span-full relative">
        <app-card
          class="!gap-4"
          :title="$locale('features.totalFeatures')"
          :subtitle="
            $locale('features.totalItems', { count: data.total_features })
          "
          :loading="isFeaturesLoading && features?.length == 0"
        >
          <div class="flex flex-wrap gap-2">
            <Button
              severity="primary"
              rounded
              @click="feature.addDialogVisible = true"
            >
              <m-icon value="add" />

              <span>{{ $locale("features.createNewFeature") }}</span>
            </Button>

            <div class="spacer" />

            <Button
              severity="secondary"
              rounded
              @click="featuresSortOp.toggle($event)"
            >
              <span>{{ $locale("common.simple.sortBy") }}</span>
              <m-icon value="sort" />
            </Button>

            <Popover ref="featuresSortOp">
              <div class="col">
                <button
                  v-for="item in FeatureSortVariant.AllValues"
                  :key="item.uiName"
                  class="rounded px-4 py-2 text-start"
                  :class="{
                    'bg-surface-800': item == feature.sort,
                  }"
                  @click="changeSortVariant(item)"
                >
                  <span v-text="$locale(item.uiName)" />
                </button>
              </div>
            </Popover>
          </div>
        </app-card>

        <div
          v-if="!!features && features.length > 0"
          class="mt-4 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
        >
          <feature-card
            v-for="item in features"
            :key="item.id"
            :item="item"
            class="bg-surface-900"
            @click:open="
              navigateTo(
                createProjectLink('features-id', {
                  id: item.id,
                }),
              )
            "
            @click:edit="feature.editDialogItem = item"
          />
        </div>

        <app-loader
          v-if="features?.length != 0 && !feature.isLastPage"
          ref="bottomLoader"
          static
        />
      </div>
    </dashboard-layout>

    <add-feature-dialog v-model:visible="feature.addDialogVisible" />
    <edit-feature-dialog
      v-if="feature.editDialogItem"
      :visible="!!feature.editDialogItem"
      :feature-id="feature.editDialogItem.id"
      :title="feature.editDialogItem.title"
      :description="feature.editDialogItem.description ?? ''"
      @update:visible="feature.editDialogItem = undefined"
    />
  </app-layout>
</template>
