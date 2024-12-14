<script setup lang="ts">
definePageMeta({
  layout: "docs",
});

const route = useRoute();
const { locale, t } = useI18n();

const isLoading = ref(false);

const { data } = await useAsyncData(
  `content-${route.fullPath}`,
  async () => {
    isLoading.value = true;
    const result = await fetchContent();
    isLoading.value = false;

    return result;
  },
  {
    watch: [locale],
  }
);

const title = `${data.value?.title} | ${t("docs.landing.title")}`;
const description = computed(() =>
  data.value?.seoDescription
    ? `${t(data.value?.seoDescription)} ${t("docs.seo.descFinal")}`
    : undefined
);

defineBreadcrumb({
  itemListElement: [
    { name: t("docs.landing.title"), item: "/docs" },
    { name: data.value?.title },
  ],
});

useHead({
  title: title,
  meta: [
    {
      name: "description",
      content: description,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:title",
      content: `${title} | ${t("app.title")}`,
    },
  ],
});

async function fetchContent() {
  const path = route.path.startsWith("/" + locale.value)
    ? route.path.substring(locale.value.length + 1)
    : route.path;

  try {
    return await queryContent(locale.value.toLowerCase(), path).findOne();
  } catch {
    try {
      return await queryContent(path).findOne();
    } catch {
      showError({ statusCode: 404, statusMessage: "Not found" });
    }
  }
}
</script>

<template>
  <div class="size-full">
    <docs-navigation v-if="data">
      <app-loader v-if="isLoading || !data" static />

      <content-renderer
        v-if="!!data"
        class="markdown code-bg pb-16"
        :value="data"
      >
        <template #empty>
          <p>No content found.</p>
        </template>
      </content-renderer>
    </docs-navigation>
  </div>
</template>
