<script setup lang="ts">
definePageMeta({
  layout: "docs",
});

const route = useRoute();
const { locale } = useI18n();

const isLoading = ref(true);

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

useHead({
  title: data.value?.title,
});

async function fetchContent() {
  try {
    return await queryContent(locale.value.toLowerCase(), route.path).findOne();
  } catch {
    try {
      return await queryContent(route.path).findOne();
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

      <content-renderer v-else class="markdown code-bg pb-16" :value="data">
        <template #empty>
          <p>No content found.</p>
        </template>
      </content-renderer>
    </docs-navigation>
  </div>
</template>
