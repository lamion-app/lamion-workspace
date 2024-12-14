<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <div class="landing">
    <header class="header border-surface-700 border-b-[1px]">
      <div class="viewport-wrapper">
        <app-logo />

        <div class="icons flex gap-2">
          <nuxt-link :to="config.public.app.socials.github">
            <nuxt-img
              class="size-8 object-cover dark:invert"
              src="/img/github.png"
              alt="GitHub"
            />
          </nuxt-link>
        </div>
      </div>
    </header>

    <main class="viewport-wrapper main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
@import url(/assets/css/landing.scss);

.landing {
  background: linear-gradient(
    50deg,
    var(--p-surface-100) 0%,
    var(--p-gray-100) 100%
  );

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      50deg,
      var(--p-surface-950) 0%,
      var(--p-gray-900) 100%
    );
  }
}
</style>
