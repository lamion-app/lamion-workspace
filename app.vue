<template>
  <div id="app">
    <NuxtRouteAnnouncer />

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
