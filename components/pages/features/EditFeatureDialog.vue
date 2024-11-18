<script setup lang="ts">
const props = defineProps<{
  featureId: Id;
  title: string;
  description: string;
}>();

const visible = defineModel<boolean>("visible", { required: true });

const { handleErrorBlock } = useErrorHandler();
const { selectedProjectId } = useProjects();
const { t } = useI18n();
const toast = useToast();

const titleText = ref("");
const descriptionText = ref("");

watchEffect(() => {
  titleText.value = props.title;
  descriptionText.value = props.description;
});

function finishEditing() {
  handleErrorBlock(async () => {
    await useApiCall(
      `/project/${selectedProjectId.value}/features/${props.featureId}`,
      {
        method: "PUT",
        body: {
          title: titleText.value,
          description: descriptionText.value,
        },
      },
    );

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
  <Dialog v-model:visible="visible" modal :show-header="false">
    <div class="col py-4">
      <h2 class="text-3xl font-medium">{{ $locale("features.edit.title") }}</h2>

      <input-text
        v-model="titleText"
        class="mt-6"
        :placeholder="$locale('features.edit.name')"
        variant="filled"
      />

      <input-text
        v-model="descriptionText"
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
          @click="finishEditing()"
        />
      </div>
    </div>
  </Dialog>
</template>
