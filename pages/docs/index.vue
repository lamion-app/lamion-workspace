<script setup lang="ts">
definePageMeta({
  layout: "docs",
  title: "docs.landing.title",
});

const { t } = useI18n();

useHead({
  meta: [
    {
      name: "description",
      content: t("docs.seo.description"),
    },
  ],
});
</script>

<template>
  <div class="size-full col">
    <landing-section class="text-center">
      <h1 class="text-5xl sm:text-7xl font-bold">
        {{ t("docs.landing.title_1") }}
        <br />
        <span class="text-primary font-black">{{
          t("docs.landing.title_2")
        }}</span>
      </h1>

      <p class="text-xl">
        {{ t("docs.landing.subtitle_1") }}
        <br />
        {{ t("docs.landing.subtitle_2") }}
      </p>

      <Button
        class="w-full max-w-[200px] mx-auto"
        :to="$localePath('/docs/getting-started/installation')"
        as="router-link"
        >{{ t("docs.landing.start") }}</Button
      >
    </landing-section>
  </div>
</template>
