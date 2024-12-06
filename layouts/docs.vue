<template>
  <seo-layout>
    <div class="root">
      <header class="header">
        <div class="viewport-wrapper flex items-center justify-between gap-4">
          <app-logo />

          <div class="icons flex gap-2">
            <nuxt-link to="https://github.com/orgs/lamion-app" external>
              <img
                class="size-8 object-cover dark:invert"
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
              >
            </nuxt-link>
          </div>
        </div>
      </header>

      <main class="viewport-wrapper main">
        <slot />
      </main>
    </div>
  </seo-layout>
</template>

<style scoped lang="scss">
.root {
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

  .viewport-wrapper {
    @apply max-w-[1240px] mx-auto px-[20px];
  }

  .header {
    @apply w-full;
    height: var(--header-height);
    @apply border-surface-700 border-b-[1px];
  }

  .main {
    @apply w-full;
    min-height: calc(100vh - var(--header-height));
  }
}
</style>
