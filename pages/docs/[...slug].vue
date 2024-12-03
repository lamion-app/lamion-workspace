<script setup lang="ts">
definePageMeta({
  layout: "docs",
});

const route = useRoute();
const { locale } = useI18n();

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

const { data } = await useAsyncData("content", () => fetchContent(), {
  watch: [locale],
});
</script>

<template>
  <docs-navigation v-if="data">
    <content-renderer class="markdown" :value="data" />
  </docs-navigation>
</template>

<style lang="scss" src="/assets/css/markdown.scss" />
