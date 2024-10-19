<template>
  <div class="w-full">
    <div v-if="showCrashes" class="flex items-center gap-2">
      <div class="indicator size-2 rounded-full bg-red-500" />

      <p>
        <value-quantity value="1" quantity="K" />

        <span> crashes</span>
      </p>
    </div>

    <div v-if="showUsers" class="flex items-center gap-2">
      <div class="indicator size-2 rounded-full bg-primary-500" />

      <p>
        <value-quantity value="4" quantity="K" />

        <span> new users</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  showCrashes: boolean;
  showUsers: boolean;
}>();
</script>
