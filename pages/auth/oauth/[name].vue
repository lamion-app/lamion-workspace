<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
  validate: async (route) => {
    if (typeof route.params.name !== "string") {
      return false;
    }

    const oauth = useOAuth();

    const isValid = await oauth.prepare(route.params.name, route.query);

    return isValid;
  },
});

const oauth = useOAuth();
const route = useRoute();

onMounted(async () => {
  await oauth.invokeProvider(route.params.name.toString(), route.query);

  navigateTo("/");
});
</script>

<template>
  <div>
    <ProgressBar mode="indeterminate" class="fixed top-0" style="height: 6px" />

    <app-card class="card">
      <h1>Wait a minute</h1>

      <h3>Loading you account</h3>
    </app-card>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 400px;
  transform: translate(-50%, -50%);
}
</style>
