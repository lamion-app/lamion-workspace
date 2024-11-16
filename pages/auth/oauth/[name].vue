<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
  title: "auth.oauth.title",
  validate: async (route) => {
    if (typeof route.params.name !== "string") {
      return false;
    }

    const oauth = useOAuth();

    return await oauth.prepare(route.params.name, route.query);
  },
});

const oauth = useOAuth();
const route = useRoute();
const { handleErrorBlock } = useErrorHandler();

onMounted(async () => {
  await handleErrorBlock(async () => {
    await oauth.invokeProvider(route.params.name.toString(), route.query);
  });

  navigateTo("/");
});
</script>

<template>
  <div>
    <ProgressBar mode="indeterminate" class="fixed top-0" style="height: 6px" />

    <app-card class="card">
      <h1>{{ $locale("auth.oauth.waitAMinute") }}</h1>

      <h3>{{ $locale("auth.oauth.loadingYouAccount") }}</h3>
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
