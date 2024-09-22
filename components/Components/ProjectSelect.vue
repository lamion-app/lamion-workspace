<template>
  <Select
    v-model="selectedProject"
    :options="projects"
    option-label="name"
    class="w-full !rounded-full transition-all"
  >
    <template #value="slotParams">
      <div v-if="slotParams.value" class="flex items-center">
        <div>{{ slotParams.value.name }}</div>
      </div>

      <div v-else>
        <span>{{ slotParams.placeholder }}</span>
      </div>
    </template>

    <template #option="{ option }">
      <div class="flex items-center">
        <div>{{ option.name }}</div>
      </div>
    </template>
  </Select>
</template>

<script setup lang="ts">
defineProps<{
  projects: Array<Project>;
}>();

const selectedProject = defineModel<Project>();
</script>
