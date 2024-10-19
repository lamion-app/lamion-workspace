<template>
  <app-layout>
    <div class="mx-auto max-w-6xl">
      <Button
        class="max-lg:!hidden w-fit"
        rounded
        text
        plain
        @click="$router.go(-1)"
      >
        <m-icon value="arrow_back" />

        <span>Back</span>
      </Button>

      <app-card class="mt-6 max-lg:!contents">
        <activity-date-details :item="Number($route.params.date)" />
      </app-card>
    </div>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>
