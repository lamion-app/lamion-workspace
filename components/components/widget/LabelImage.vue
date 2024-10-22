<template>
  <Avatar
    class="avatar"
    :label="
      image == null || image.length == 0
        ? label.charAt(0).toUpperCase()
        : undefined
    "
    :image="image == null || image.length == 0 ? undefined : image"
    size="large"
    shape="circle"
  />
</template>

<script setup lang="ts">
defineProps<{
  image?: string;
  label: string;
}>();
</script>
