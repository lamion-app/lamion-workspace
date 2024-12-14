<script setup lang="ts">
const { t } = useI18n();
const { title } = useSeo();
const route = useRoute();

useHead({
  titleTemplate: (titleChunk) => {
    const value = title.value ?? titleChunk;
    const isTitlePrefixEnabled = route.meta.titlePrefix !== false;

    if (value && isTitlePrefixEnabled) {
      return `${value} %separator %siteName`;
    } else if (value) {
      return value;
    } else {
      return t("app.title");
    }
  },
  meta: [
    {
      name: "keywords",
      content: t("app.seo.keywords"),
    },
  ],
});
</script>

<template>
  <seo-layout>
    <div id="app">
      <NuxtRouteAnnouncer />
      <NuxtLoadingIndicator />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <Toast group="global-toast" />
    </div>
  </seo-layout>
</template>
