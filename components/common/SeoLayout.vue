<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();
const head = useLocaleHead();

const title = computed(() => {
  const routeTitle = route.meta.title?.toString();

  if (routeTitle == null) {
    return t("app.title");
  }

  return `${t(routeTitle)} - ${t("app.title")}`;
});
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body>
        <slot />
      </Body>
    </Html>
  </div>
</template>
