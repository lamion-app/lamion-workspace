<template>
  <app-layout scrollable>
    <app-card
      title="App functions"
      subtitle="Search across all app functions"
      title-class="text-lg font-medium"
    >
      <div class="w-full flex flex-wrap gap-2 justify-between">
        <IconField>
          <InputIcon>
            <span class="text-lg material-symbols-outlined">&#xe8b6;</span>
          </InputIcon>

          <InputText class="w-full lg:w-[350px]" placeholder="Search" />
        </IconField>
      </div>
    </app-card>

    <functions-table class="mt-6" />
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>
