<template>
  <div
    class="flex justify-center content-center p-10 flex-col items-start gap-3"
  >
    <UCard>
      <template v-if="status == 'authenticated'">
        <h1 v-text="'You are: ' + data?.username" />
      </template>

      <template v-else>
        <h1>You are unauthorized</h1>
      </template>
    </UCard>

    <div class="flex gap-2">
      <UButton :disabled="status != 'authenticated'" @click="actionLogout">Logout</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, signOut, status } = useAuth();

function actionLogout() {
  signOut({
    callbackUrl: "/login",
  });
}
</script>

<style scoped></style>
