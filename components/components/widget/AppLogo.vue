<template>
  <div class="logo flex items-center justify-center">
    <NuxtLink :to="{ name: 'index' }">
      <span
        v-if="expanded"
        class="text-logo text-4xl font-black text-primary select-none cursor-pointer"
        >APP LOGO</span
      >

      <Avatar
        v-else
        label="A"
        shape="circle"
        size="large"
        class="avatar-logo font-black !text-3xl !bg-primary !text-primary-contrast"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  expanded: boolean;
}>();
</script>

<style lang="scss" scoped>
.logo {
  height: 60px;

  .text-logo {
    white-space: nowrap;
  }
}
</style>
