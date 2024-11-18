<script setup lang="ts">
import type { FunctionSimpleDto } from "~/components-types/pages/Feature";

const visible = defineModel<boolean>("visible", { required: true });

const selectedFunctions = ref<Array<FunctionSimpleDto>>([]);

const { handleErrorBlock } = useErrorHandler();
const { useProjectLoad, selectedProjectId } = useProjects();
const { t } = useI18n();
const toast = useToast();

const titleText = ref("");
const descriptionText = ref("");
const { data: functions, isLoading } = useProjectLoad((id) =>
  useApiCall<Array<FunctionSimpleDto>>(`/project/${id}/functions`),
);

function finishEditing() {
  handleErrorBlock(async () => {
    await useApiCall(`/project/${selectedProjectId.value}/features`, {
      method: "POST",
      body: {
        title: titleText.value,
        description: descriptionText.value,
        functions: selectedFunctions.value.map((x) => x.id),
      },
    });

    toast.add({
      group: "global-toast",
      severity: "info",
      summary: t("common.simple.ready"),
      life: 3000,
    });

    visible.value = false;
  });
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    class="m-4 w-full sm:max-w-[500px]"
    :header="$locale('features.create.title')"
    modal
  >
    <app-loader v-if="isLoading" />

    <div v-else class="col gap-8">
      <div class="col gap-2">
        <InputText
          v-model="titleText"
          class="w-full"
          type="text"
          :placeholder="$locale('features.create.name')"
          variant="filled"
        />

        <InputText
          v-model="descriptionText"
          class="w-full"
          type="text"
          :placeholder="$locale('features.create.description')"
          variant="filled"
        />

        <MultiSelect
          v-model="selectedFunctions"
          class="w-full"
          :options="functions"
          :placeholder="$locale('features.create.linkFunctions')"
          option-label="title"
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

        <Button
          class="flex-1"
          :label="$locale('common.simple.finish')"
          @click="finishEditing()"
        />
      </div>
    </div>
  </Dialog>
</template>
