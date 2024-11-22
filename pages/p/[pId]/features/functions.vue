<template>
  <app-layout>
    <app-card
      class="!gap-4"
      :title="$locale('functions.title')"
      :subtitle="$locale('functions.subtitle')"
      title-class="text-lg font-medium"
    >
      <IconField>
        <InputIcon>
          <m-icon value="search" class="text-lg" />
        </InputIcon>

        <InputText
          v-model="filters.query"
          class="w-full lg:w-[350px]"
          :placeholder="$locale('common.simple.search')"
        />
      </IconField>
    </app-card>

    <app-card
      class="w-full !overflow-x-auto mt-6"
      :loading="functions.isPreLoading"
    >
      <div v-if="functions.isEmpty" class="col center">
        <h1 class="text-4xl">{{ $locale("functions.table.noData") }}</h1>
      </div>

      <functions-table
        v-else
        v-model:filters="filters"
        class="min-w-[800px]"
        :is-loading="functions.isPreLoading"
        :items="functions.data"
        :features="features"
        :tags="tags"
      />

      <app-loader
        v-if="functions.isNeedPostLoading"
        ref="bottomLoaderEl"
        static
      />
    </app-card>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
  title: "functions.title",
  isRootRoute: true,
});

const bottomLoaderEl = ref();

const filters = reactive({
  query: "",
  name: undefined as string | undefined,
  features: undefined as Array<FeatureSimpleDto> | undefined,
  tags: undefined as Array<FunctionTag> | undefined,
});

const functions = useListDataLoader({
  load: (
    id: Id,
    page: number,
    query: string,
    name: string | undefined,
    features: Array<FeatureSimpleDto> | undefined,
    tags: Array<FunctionTag> | undefined,
  ) =>
    useApiCall<Array<FunctionDetailedDto>>(`/project/${id}/functions/search`, {
      query: {
        p: page,
        q: query,
        n: name,
        f: features?.map((x) => x.id),
        t: tags?.map((x) => x.id),
      },
    }),
  loaderEl: bottomLoaderEl,
  params: [...Object.values(toRefs(filters))],
  resetOnChange: true,
  reloadDelay: 1000,
});

const tags = ref<Array<FunctionTag>>();
const features = ref<Array<FeatureSimpleDto>>();

watchEffect(() => {
  if (!functions.data) {
    return;
  }

  const totalTags = functions.data.flatMap((x) => x.tags);

  tags.value = totalTags
    .filter((e, i, self) => i == self.findIndex((x) => x.id == e.id))
    .sort((a, b) => a.id - b.id);
});

watchEffect(() => {
  if (!functions.data) {
    return;
  }

  const totalTags = functions.data.flatMap((x) => x.features);

  features.value = totalTags
    .filter((e, i, self) => i == self.findIndex((x) => x.id == e.id))
    .sort((a, b) => a.id - b.id);
});
</script>
