<script setup lang="ts">
definePageMeta({
  layout: "docs",
});
</script>

<template>
  <div class="size-full col">
    <div class="col gap-12 py-24 text-center">
      <h1 class="text-5xl sm:text-7xl font-bold">
        Simple events logger for <br />
        <span class="text-primary font-black">your projects</span>
      </h1>

      <p class="text-xl">
        Lamion is simple and easy to learn events logger library for web
        applications.
        <br />
        Just include script in your html and it is ready to go!
      </p>

      <div class="flex justify-center gap-6">
        <Button to="/docs/getting-started/installation" as="router-link">
          Getting started
        </Button>

        <Button to="/p" as="router-link" text> Go to your projects </Button>
      </div>
    </div>
  </div>
</template>
