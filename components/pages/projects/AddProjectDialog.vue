<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";

const visible = defineModel<boolean>("visible", { required: true });

const { handleError } = useErrorHandler();
const { openProject } = useProjects();

const validationSchema = yup.object({
  title: yup.string().min(3).required(),
  description: yup.string().trim(),
});

const { defineField, values, errors } = useForm({
  validationSchema: validationSchema,
});

const [title, titleAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");

const showErrors = ref(false);
const isLoading = ref(false);

async function onSubmit() {
  showErrors.value = true;

  console.log(errors);

  if (
    !(!!title.value && !errors.value["title"] && !errors.value["description"])
  ) {
    return;
  }

  isLoading.value = true;

  try {
    const newProject = await useApiCall<Project>("/project", {
      method: "POST",
      body: {
        title: values.title,
        description: values.description,
      },
    });

    await openProject(newProject.id, false);

    visible.value = false;
  } catch (e) {
    await handleError(e as Error);
  }

  isLoading.value = false;
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :header="$locale('projects.createProject.title')"
    modal
  >
    <form @submit.prevent="onSubmit">
      <input-validated
        v-model="title"
        :error="errors.title"
        :props="titleAttrs"
        variant="filled"
        :show-error="showErrors"
        :placeholder="$locale('projects.createProject.input.title')"
      />

      <input-validated
        v-model="description"
        :error="errors.description"
        :props="descriptionAttrs"
        variant="filled"
        :show-error="showErrors"
        class="mt-2"
        :placeholder="$locale('projects.createProject.input.description')"
      />

      <div class="mt-6 flex flex-wrap gap-2 justify-end">
        <Button
          variant="text"
          severity="secondary"
          :label="$locale('common.simple.cancel')"
          :disabled="isLoading"
        />

        <Button
          type="submit"
          :label="$locale('common.simple.finish')"
          :disabled="isLoading"
        />
      </div>
    </form>
  </Dialog>
</template>
