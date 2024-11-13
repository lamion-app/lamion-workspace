<template>
  <Dialog
    v-model:visible="visible"
    class="m-4 w-full sm:max-w-[500px]"
    :header="$locale('features.create.title')"
    modal
  >
    <div class="col gap-8">
      <div class="col gap-2">
        <InputText
          class="w-full"
          type="text"
          :placeholder="$locale('features.create.name')"
          variant="filled"
        />

        <InputText
          class="w-full"
          type="text"
          :placeholder="$locale('features.create.description')"
          variant="filled"
        />

        <MultiSelect
          v-model="selectedFunctions"
          class="w-full"
          :options="['test-1', 'test-2']"
          :placeholder="$locale('features.create.linkFunctions')"
          display="chip"
          variant="filled"
        />
      </div>

      <div class="flex flex-wrap max-sm:flex-wrap-reverse gap-2">
        <Button
          class="max-sm:w-full min-w-24"
          :label="$locale('common.simple.cancel')"
          severity="secondary"
          @click="visible = false"
        />

        <Button class="flex-1" :label="$locale('common.simple.finish')" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>("visible", { required: true });

const selectedFunctions = ref([]);
</script>
