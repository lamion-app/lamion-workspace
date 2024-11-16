<template>
  <main class="max-w-screen-2xl mx-auto px-6 py-4">
    <Button rounded text plain @click="$router.go(-1)">
      <m-icon value="arrow_back" />

      <span>{{ $locale("common.simple.back") }}</span>
    </Button>

    <profile-page class="mt-8" />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  title: "profile.title",
});
</script>
