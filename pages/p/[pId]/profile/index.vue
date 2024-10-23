<template>
  <app-layout>
    <profile-page />
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

useHead({
  title: "Profile",
});
</script>
