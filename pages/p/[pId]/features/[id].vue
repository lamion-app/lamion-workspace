<script setup lang="ts">
import { Teleport } from "vue";
import type { RouteLocationNormalizedLoadedGeneric } from "#vue-router";

definePageMeta({
  layout: "main",
  title: (route: RouteLocationNormalizedLoadedGeneric) => {
    const { $i18n } = useNuxtApp();
    const t = $i18n.t;

    return t("features.details.title", {
      name: route.params.id,
    });
  },
  key: (route) => {
    return `feature#${route.params.id}`;
  },
  validate: async (route) => {
    return typeof route.params.id === "string" && /^\d+$/.test(route.params.id);
  },
});

const { t } = useI18n();
const route = useRoute();
const confirm = useConfirm();
const toast = useToast();
const { selectedProjectId } = useProjects();
const { useProjectLoad } = useProjects();
const { handleErrorBlock } = useErrorHandler();

const bottomLoaderEl = ref();
const showEditDialog = ref(false);

const functionsSearch = reactive({
  globalSearch: "",
});

const fId = computed(() => route.params.id);

const { data, isLoading, isError } = useProjectLoad({
  load: (id: Id, featureId: Id) =>
    useApiCall<FeatureDetailsFull>(`/project/${id}/features/${featureId}`),
  customRefs: [fId],
});

const functions = useListDataLoader({
  load: (id: Id, page: number, featureId: Id, query: string) =>
    useApiCall<Array<FunctionWithEventsDto>>(
      `/project/${id}/functions/feature/${featureId}`,
      {
        query: {
          p: page,
          q: query,
        },
      },
    ),
  loaderEl: bottomLoaderEl,
  startLoadBy: computed(
    () => !!data.value && !isLoading.value && !isError.value,
  ),
  params: [
    toRef(() => route.params.id),
    toRef(functionsSearch, "globalSearch"),
  ],
  resetOnChange: true,
});

const tags = computed(
  () =>
    data.value?.tags?.map((x) => ({
      name: x,
      color: stringToColour(x),
    })) ?? [],
);

const eventsCard = computed(() => {
  const info = data.value!.events;

  return {
    title: t("features.details.totalEvents"),
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

const errorsCard = computed(() => {
  const info = data.value!.errors;

  return {
    title: t("features.details.crashRate"),
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

const confirmDelete = () => {
  confirm.require({
    group: "dialog",
    message: t("features.details.dialogs.delete.subtitle"),
    header: t("features.details.dialogs.delete.title"),
    rejectProps: {
      label: t("common.simple.cancel"),
      severity: "secondary",
    },
    acceptProps: {
      label: t("common.simple.delete"),
      severity: "danger",
    },
    accept: () => {
      handleErrorBlock(async () => {
        await useApiCall(
          `/project/${selectedProjectId.value}/features/${route.params.id}`,
          {
            method: "DELETE",
          },
        );

        toast.add({
          group: "global-toast",
          severity: "info",
          summary: t("common.simple.ready"),
          life: 3000,
        });

        navigateTo(createProjectLink("features"));
      });
    },
  });
};

const confirmDetachFunction = (
  event: MouseEvent,
  item: FunctionWithEventsDto,
) => {
  confirm.require({
    group: "prompt",
    target: event.currentTarget as HTMLElement,
    message: t("features.details.dialogs.detachFeature.title"),
    rejectProps: {
      label: t("common.simple.cancel"),
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: t("features.details.dialogs.detachFeature.confirm"),
      severity: "danger",
    },
    accept: () => {
      handleErrorBlock(async () => {
        await useApiCall(
          `/project/${selectedProjectId.value}/features/${route.params.id}/functions/${item.id}`,
          {
            method: "DELETE",
          },
        );

        toast.add({
          group: "global-toast",
          severity: "info",
          summary: t("common.simple.ready"),
          life: 3000,
        });

        functions.reload();
      });
    },
  });
};
</script>

<template>
  <app-layout :is-loading="isLoading">
    <div v-if="!!data" class="max-w-[1000px] mx-auto col gap-4">
      <div class="w-full flex items-center justify-between">
        <Button
          class="max-lg:!hidden w-fit"
          rounded
          text
          plain
          @click="$router.go(-1)"
        >
          <m-icon value="arrow_back" />

          <span>{{ $locale("common.simple.back") }}</span>
        </Button>

        <client-only>
          <component
            :is="$viewport.isLessThan('lg') ? Teleport : 'div'"
            to="#header-actions"
          >
            <div class="flex gap-2 rounded-full px-2 py-1 lg:bg-surface-800">
              <icon-button icon="edit" @click="showEditDialog = true" />
              <icon-button
                icon="delete"
                severity="danger"
                @click="confirmDelete()"
              />
            </div>
          </component>
        </client-only>
      </div>

      <h1 class="text-6xl line-clamp-1" v-text="data.feature.title" />

      <p v-text="data.feature.description" />

      <div class="w-full flex flex-wrap gap-2">
        <div
          v-for="(tag, i) in tags"
          :key="i"
          class="relative rounded overflow-hidden"
        >
          <span class="relative px-2 z-10" v-text="tag.name" />

          <div
            class="absolute top-0 left-0 size-full opacity-50"
            :style="{
              'background-color': tag.color,
            }"
          />
        </div>
      </div>

      <div class="lg:grid lg:grid-cols-2 gap-4">
        <progress-card
          class="flex-1"
          :title="eventsCard.title"
          :overall="eventsCard.overall"
          :data="eventsCard.data"
          :comparison="eventsCard.comparison"
        />

        <progress-card
          class="flex-1"
          :title="errorsCard.title"
          :overall="errorsCard.overall"
          :data="errorsCard.data"
          :comparison="errorsCard.comparison"
        />
      </div>

      <app-card
        :title="$locale('features.details.functions.title')"
        title-class="text-xl font-medium"
      >
        <div class="filters flex flex-wrap justify-between gap-2">
          <IconField>
            <InputIcon>
              <m-icon class="text-lg" value="search" />
            </InputIcon>

            <InputText
              v-model="functionsSearch.globalSearch"
              class="w-full lg:w-[350px]"
              :placeholder="$locale('common.simple.search')"
            />
          </IconField>
        </div>

        <app-loader v-if="functions.isPreLoading" static />

        <div v-else-if="functions.isEmpty" class="col center py-8">
          <h1 class="text-4xl text-center">
            {{ $locale("features.details.noFunctions") }}
          </h1>
        </div>

        <div v-if="functions.data" class="items col gap-2">
          <app-card
            v-for="item in functions.data"
            :key="item.id"
            container-class="!flex-row items-center"
          >
            <div class="page-content flex-1">
              <span class="text-lg font-medium" v-text="item.title" />

              <div class="text-sm font-thin">
                <span>{{ $locale("features.details.totalEvents") }}:</span>

                <value-quantity
                  class="ms-1"
                  :value="item.events"
                  quantity-class="text-secondary"
                />
              </div>
            </div>

            <div class="actions">
              <icon-button
                icon="link_off"
                severity="danger"
                @click="confirmDetachFunction($event, item)"
              />
            </div>
          </app-card>
        </div>

        <app-loader
          v-if="functions.isNeedPostLoading"
          ref="bottomLoaderEl"
          static
        />
      </app-card>

      <edit-feature-dialog
        v-model:visible="showEditDialog"
        :feature-id="data.feature.id"
        :title="data.feature.title"
        :description="data.feature.description ?? ''"
      />
    </div>

    <div v-if="isError" class="col center">
      <h1>Error</h1>
    </div>

    <confirm-dialog group="dialog" />
    <confirm-popup group="prompt" />
  </app-layout>
</template>

<style scoped lang="scss">
.function {
  .actions {
    @apply opacity-0 transition;
  }

  &:hover {
    .actions {
      @apply opacity-100;
    }
  }
}
</style>
