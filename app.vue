<script setup lang="ts">
const { t } = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${t("app.title")}` : t("app.title");
  },
});
</script>

<template>
  <div id="app">
    <Head>
      <Meta
        name="google-site-verification"
        content="ZcKm2416laGr3KgHL1pAcT-ZD4RbnmyMnufrQ5s4x4s"
    /></Head>

    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Toast group="global-toast" />
  </div>
</template>
