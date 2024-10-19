<template>
  <app-layout>
    <app-card class="mx-auto max-w-6xl">
      <Button class="w-fit" rounded text plain>
        <span class="material-symbols-outlined">&#xe5c4;</span>

        <span>Back</span>
      </Button>

      <activity-date-details :item="Number($route.params.date)" />
    </app-card>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>
