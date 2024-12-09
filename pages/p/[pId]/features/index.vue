<script setup lang="ts">
import { DefaultSortVariant } from "@/components-types/pages/Feature";

definePageMeta({
  layout: "main",
  title: "features.title",
  auth: true,
});

const { t } = useI18n();
const { useProjectLoadAlias } = useProjects();

const bottomLoader = ref();
const featuresSortOp = ref();

const featureData = reactive({
  sort: DefaultSortVariant.EVENTS,
  addDialogVisible: false,
  editDialogItem: ref<FeatureDetailedItem | undefined>(),
});

const { isLoading, data } = useProjectLoadAlias((id) =>
  useApiCall<FeatureFull>(`/project/${id}/features/full`)
);

const features = useListDataLoader({
  load: (id, page, sort: DefaultSortVariant) =>
    useApiCall<Array<FeatureDetailedItem>>(`/project/${id}/features`, {
      query: {
        p: page,
        sort: sort.remoteName,
      },
    }),
  params: [toRef(featureData, "sort")],
  resetOnChange: [toRef(featureData, "sort")],
  loaderEl: bottomLoader,
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

function changeSortVariant(variant: DefaultSortVariant) {
  featureData.sort = variant;
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
                    i === 0 ? 'features-functions' : 'features-crashes'
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
          :loading="features.isPreLoading"
        >
          <div class="flex flex-wrap gap-2">
            <Button
              severity="primary"
              rounded
              @click="featureData.addDialogVisible = true"
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
                  v-for="item in DefaultSortVariant.AllValues"
                  :key="item.uiName"
                  class="rounded px-4 py-2 text-start"
                  :class="{
                    'bg-surface-800': item == featureData.sort,
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
          v-if="!!features.data && features.data.length > 0"
          class="mt-4 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
        >
          <feature-card
            v-for="item in features.data"
            :key="item.id"
            :item="item"
            class="bg-surface-900"
            @click:open="
              navigateTo(
                createProjectLink('features-id', {
                  id: item.id,
                })
              )
            "
            @click:edit="featureData.editDialogItem = item"
          />
        </div>

        <app-card v-if="!!features.data && features.data.length == 0" class="mt-4">
          <span class="text-4xl text-center">N/A</span>
        </app-card>

        <app-loader
          v-if="features.isNeedPostLoading"
          ref="bottomLoader"
          static
        />
      </div>
    </dashboard-layout>

    <add-feature-dialog v-model:visible="featureData.addDialogVisible" />
    <edit-feature-dialog
      v-if="featureData.editDialogItem"
      :visible="!!featureData.editDialogItem"
      :feature-id="featureData.editDialogItem.id"
      :title="featureData.editDialogItem.title"
      :description="featureData.editDialogItem.description ?? ''"
      @update:visible="featureData.editDialogItem = undefined"
    />
  </app-layout>
</template>
