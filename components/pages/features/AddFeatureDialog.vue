<template>
  <Dialog
    v-model:visible="visible"
    class="m-4 w-full sm:max-w-[500px]"
    header="Add new feature"
    modal
  >
    <div class="col gap-8">
      <div class="col gap-2">
        <InputText
          class="w-full"
          type="text"
          :placeholder="$locale('featureName')"
          variant="filled"
        />

        <InputText
          class="w-full"
          type="text"
          :placeholder="$locale('featureDescription')"
          variant="filled"
        />

        <MultiSelect
          v-model="selectedFunctions"
          class="w-full"
          :options="['test-1', 'test-2']"
          :placeholder="$locale('linkFunctions')"
          display="chip"
          variant="filled"
        />
      </div>

      <div class="flex flex-wrap max-sm:flex-wrap-reverse gap-2">
        <Button
          class="max-sm:w-full min-w-24"
          :label="$locale('cancel')"
          severity="secondary"
          @click="visible = false"
        />

        <Button class="flex-1" :label="$locale('finish')" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>("visible", { required: true });

const selectedFunctions = ref([]);
</script>
