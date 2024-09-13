<template>
  <div class="flex justify-center content-center p-10 flex-col items-start gap-3">
    <UCard>
      <div class="flex flex-col gap-2 items-start">
        <h1 v-text="'You are: ' + $account.value?.username" />

        <UButton @click="logout()">Logout</UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: true,
});

const { logout } = useAuthProviders();
</script>

<style scoped></style>
