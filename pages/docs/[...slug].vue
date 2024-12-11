<script setup lang="ts">
definePageMeta({
  layout: "docs",
  key: "static",
});

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

const isLoading = ref(false);

const { data } = await useAsyncData(
  "content",
  async () => {
    isLoading.value = true;
    const result = await fetchContent();
    isLoading.value = false;

    return result;
  },
  {
    watch: [locale, router.currentRoute],
  }
);

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
