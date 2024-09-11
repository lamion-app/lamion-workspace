<template>
  <div
    class="flex justify-center content-center p-10 flex-col items-start gap-3"
  >
    <UButton :loading="status != 'unauthenticated'" @click="actionSignIn"
      >Sign in</UButton
    >
  </div>
</template>

<script setup lang="ts">
const { signIn, status } = useAuth();

function actionSignIn() {
  const credentials = {
    username: "emilys",
    password: "emilyspass",
  };

  signIn(credentials, {
    callbackUrl: "/",
  });
}
</script>

<style scoped></style>
