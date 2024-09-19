<template>
  <Card class="app-card transition">
    <template #content>
      <div class="flex flex-col items-center justify-center">
        <slot />
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.app-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
