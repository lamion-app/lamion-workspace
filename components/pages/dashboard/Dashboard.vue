<template>
  <div class="dashboard">
    <div class="grid grid-cols-3 gap-6 grid-flow-row-dense">
      <devices-card class="col-span-1" />

      <functions-card class="col-span-2" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dashboard {
  // TODO: remove
  height: 10000px;
}
</style>
