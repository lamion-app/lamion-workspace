<template>
  <div id="app">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Toast />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Lamion",
});
</script>
