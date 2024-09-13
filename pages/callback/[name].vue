<script setup lang="ts">
// definePageMeta({
//   validate: async (route) => {
//     return (
//       typeof route.params.name === "string" && route.params.name == "google"
//     );
//   },
// });

definePageMeta({
  auth: false,
});

const route = useRoute();
const oauth = useOAuth();

onMounted(() => {
  const oauthName = route.params.name.toString();

  oauth.load(oauthName);
});
</script>

<template>
  <div>
    <div v-if="oauth.isLoading" class="flex">
      <UProgress class="fixed top-0" />

      <UCard class="card">
        <h1>Wait a minute</h1>

        <h3>Loading you account</h3>
      </UCard>
    </div>

    <div v-else-if="!oauth.isValid">
      <h1>Invalid input</h1>
    </div>
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
