<template>
  <div
    class="flex justify-center content-center p-10 flex-col items-start gap-3"
  >
    <UCard>
      <div v-if="!isLoggedIn" class="flex flex-col gap-2 items-start">
        <h1>You are unauthorized</h1>

        <UButton to="login">Login in app</UButton>
      </div>

      <div v-else class="flex flex-col gap-2 items-start">
        <h1 v-text="'You are: ' + account?.username" />

        <UButton @click="logout()">Logout</UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
});

const { logout, isLoggedIn, account } = useAuthProviders();
</script>

<style scoped></style>
