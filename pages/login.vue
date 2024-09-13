<template>
  <div class="flex justify-center content-center p-10 flex-col items-start gap-3">
    <UButton
      v-for="provider in providers"
      :key="provider.name"
      @click="invokeProvider(provider)"
      >Sign in with {{ provider.displayedName }}</UButton
    >
  </div>
</template>

<script setup lang="ts">
import type { AuthProvider } from "#imports";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { providers, signIn } = useAuthProviders();

function invokeProvider(provider: AuthProvider<unknown>) {
  switch (provider.name) {
    case CredentialsAuthProvider.name:
      signIn.credentials("emilys", "emilyspass");
      break;
    case GitHubAuthProvider.name:
      signIn.githubOauth();
      break;
    case GoogleAuthProvider.name:
      signIn.googleOauth();
      break;
  }
}
</script>

<style scoped></style>
