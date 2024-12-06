<script setup lang="ts">
definePageMeta({
  layout: "docs",
});
</script>

<template>
  <div class="size-full col">
    <div class="col gap-12 py-36 text-center">
      <h1 class="text-5xl sm:text-7xl font-bold">
        {{ $locale("docs.landing.title_1") }}
        <br >
        <span class="text-primary font-black">{{
          $locale("docs.landing.title_2")
        }}</span>
      </h1>

      <p class="text-xl">
        {{ $locale("docs.landing.subtitle_1") }}
        <br >
        {{ $locale("docs.landing.subtitle_2") }}
      </p>

      <div class="flex justify-center gap-6">
        <Button
          class="min-w-36"
          to="/docs/getting-started/installation"
          as="router-link"
          >{{ $locale("docs.landing.start") }}</Button
        >

        <Button to="/p" as="router-link" text>{{
          $locale("docs.landing.open_projects")
        }}</Button>
      </div>
    </div>
  </div>
</template>
