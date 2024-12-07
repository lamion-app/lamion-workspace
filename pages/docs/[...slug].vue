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

    console.log(result);

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
      <content-renderer class="markdown pb-16" :value="data">
        <template #empty>
          <p>No content found.</p>
        </template>
      </content-renderer>
    </docs-navigation>

    <span>
      {{ data }}
    </span>

    <app-loader v-if="isLoading" static />
  </div>
</template>

<style lang="scss" src="/assets/css/markdown.scss" />
