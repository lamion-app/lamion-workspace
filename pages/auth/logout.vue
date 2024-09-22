<template>
  <div>
    <Button @click="logout">Logout</Button>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuthProviders();
</script>
