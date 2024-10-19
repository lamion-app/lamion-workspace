<template>
  <span class="material-symbols-outlined notranslate" v-text="value" />
</template>

<script setup lang="ts">
defineProps<{
  value: string;
}>();
</script>
