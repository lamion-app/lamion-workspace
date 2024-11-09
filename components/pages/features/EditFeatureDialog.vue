<template>
  <Dialog v-model:visible="visible" modal :show-header="false">
    <div class="col py-4">
      <h2 class="text-3xl font-medium">{{ $locale('editFeature') }}</h2>

      <input-text class="mt-6" :placeholder="$locale('featureName')" variant="filled" />
      <input-text
        class="mt-1"
        :placeholder="$locale('featureDescription')"
        variant="filled"
      />

      <div class="mt-8 flex flex-wrap justify-end gap-2">
        <Button
          class="max-sm:w-full"
          severity="secondary"
          :label="$locale('cancel')"
          @click="visible = false"
        />

        <Button
          class="max-sm:w-full"
          :label="$locale('saveChanges')"
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
