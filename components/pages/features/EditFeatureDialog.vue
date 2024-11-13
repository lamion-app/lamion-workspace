<template>
  <Dialog v-model:visible="visible" modal :show-header="false">
    <div class="col py-4">
      <h2 class="text-3xl font-medium">{{ $locale("features.edit.title") }}</h2>

      <input-text
        class="mt-6"
        :placeholder="$locale('features.edit.name')"
        variant="filled"
      />

      <input-text
        class="mt-2"
        :placeholder="$locale('features.edit.description')"
        variant="filled"
      />

      <div class="mt-8 flex flex-wrap justify-end gap-2">
        <Button
          class="max-sm:w-full"
          severity="secondary"
          :label="$locale('common.simple.cancel')"
          @click="visible = false"
        />

        <Button
          class="max-sm:w-full"
          :label="$locale('common.simple.finish')"
          @click="visible = false"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>("visible", { required: true });
</script>

<style scoped></style>
