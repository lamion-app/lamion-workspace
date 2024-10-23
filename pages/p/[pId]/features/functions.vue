<template>
  <app-layout>
    <app-card
      class="!gap-4"
      title="App functions"
      subtitle="Search across all app functions"
      title-class="text-lg font-medium"
    >
      <IconField>
        <InputIcon>
          <m-icon value="search" class="text-lg" />
        </InputIcon>

        <InputText
          v-model="filters.search"
          class="w-full lg:w-[350px]"
          placeholder="Search"
        />
      </IconField>
    </app-card>

    <functions-table
      v-model:filters="filters"
      class="mt-6"
      :is-loading="isLoading"
      :data="content"
      :features="features"
      :tags="tags"
    />
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

useHead({
  title: "Functions",
});

const isLoading = ref(false);
const content = ref<Array<FunctionItem>>([]);
const features = ref<Array<FeatureFilter>>([]);
const tags = ref<Array<FunctionTag>>([]);

const filters = reactive({
  search: "",
  name: undefined,
  features: undefined,
  tags: undefined,
});

watch(filters, loadDataAfterTimeout);
onMounted(loadTableData);

let loadTimer: ReturnType<typeof setTimeout> | undefined;

function loadDataAfterTimeout() {
  if (loadTimer !== undefined) {
    clearTimeout(loadTimer);
  }

  loadTimer = setTimeout(loadData, 800);
}

function loadTableData() {
  features.value = [
    { name: "Authorization" },
    { name: "Post" },
    { name: "Home" },
  ];

  tags.value = [
    { name: "UI", color: "blue" },
    { name: "NETWORK", color: "green" },
    { name: "NAVIGATION", color: "magenta" },
    { name: "EXTRA" },
  ];

  loadData();
}

function loadData() {
  if (isLoading.value) return;

  isLoading.value = true;
  setTimeout(() => {
    content.value = [...Array(5).keys()]
      .map((_) => [
        {
          name: "Login click",
          totalActivityNumber: 10000,
          activityNumber: 10,
          activityQuantity: "K",
          feature: { name: "Authorization" },
          tags: [{ name: "UI", color: "blue" }],
        },
        {
          name: "Login failed",
          totalActivityNumber: 400,
          activityNumber: 0.4,
          activityQuantity: "K",
          feature: { name: "Authorization" },
          tags: [
            { name: "UI", color: "blue" },
            { name: "NETWORK", color: "green" },
          ],
        },
        {
          name: "Open post details",
          totalActivityNumber: 20000,
          activityNumber: 20,
          activityQuantity: "K",
          feature: { name: "Post" },
          tags: [
            { name: "UI", color: "blue" },
            { name: "NAVIGATION", color: "magenta" },
          ],
        },
        {
          name: "Like post",
          totalActivityNumber: 120000,
          activityNumber: 120,
          activityQuantity: "K",
          feature: { name: "Post" },
          tags: [
            { name: "UI", color: "blue" },
            { name: "NETWORK", color: "green" },
          ],
        },
        {
          name: "Load more posts",
          totalActivityNumber: 78000,
          activityNumber: 78,
          activityQuantity: "K",
          feature: { name: "Home" },
          tags: [{ name: "NETWORK", color: "green" }],
        },
        {
          name: "See post comments",
          totalActivityNumber: 8000,
          activityNumber: 8,
          activityQuantity: "K",
          feature: { name: "Post" },
          tags: [
            { name: "UI", color: "blue" },
            { name: "NETWORK", color: "green" },
            { name: "EXTRA" },
          ],
        },
        {
          name: "Open post author",
          totalActivityNumber: 2000,
          activityNumber: 2,
          activityQuantity: "K",
          feature: { name: "Post" },
          tags: [
            { name: "UI", color: "blue" },
            { name: "NETWORK", color: "green" },
            { name: "NAVIGATION", color: "magenta" },
          ],
        },
      ])
      .flat();

    isLoading.value = false;
  }, 1500);
}
</script>
