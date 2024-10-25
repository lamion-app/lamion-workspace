<template>
  <app-layout>
    <h1 class="text-6xl font-black">Settings</h1>

    <app-card class="mt-12" container-class="col !gap-6">
      <div class="section">
        <h3 class="title">General settings</h3>

        <settings-layout
          :settings="settings"
          :validation="validateSettingsField"
          @update-text-item="console.log($event) /* TODO */"
          @update-image="console.log('Update image:', $event) /* TODO */"
          @delete-image="console.log('Delete image:', $event) /* TODO */"
        />
      </div>

      <div class="section !gap-4">
        <h3 class="title">Project access tokens</h3>

        <div class="col gap-2">
          <div
            v-for="item in accessTokens"
            :key="item.name"
            class="flex justify-between gap-2"
          >
            <div class="col">
              <span class="text-lg font-medium">{{ item.name }}</span>
              <span class="text-sm font-thin">{{ item.value }}</span>
            </div>

            <icon-button
              icon="delete"
              severity="danger"
              @click="confirmDeleteItem($event)"
            />
          </div>
        </div>

        <div class="mt-2 flex flex-wrap gap-2">
          <Button
            as="router-link"
            class="max-sm:w-full"
            rounded
            severity="primary"
            :to="createProjectLink('settings-token-new')"
          >
            <m-icon value="add" />

            <span>New access token</span>
          </Button>

          <Button
            class="max-sm:w-full"
            text
            rounded
            severity="danger"
            @click="confirmRevokeAll()"
          >
            <m-icon value="delete" />

            <span>Revoke all</span>
          </Button>
        </div>
      </div>
    </app-card>

    <confirm-popup group="prompt" />
    <confirm-dialog group="dialog" />
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

useHead({
  title: "Project settings",
});

const confirm = useConfirm();
const toast = useToast();

const { selectedProject } = useProjects();

const accessTokens = [
  {
    name: "FIRST TOKEN",
    value: "Created 23.06.2024",
  },
  {
    name: "SECOND TOKEN",
    value: "Created 23.06.2024",
  },
];

const settings = computed(() => [
  {
    type: "text" as const,
    key: "project-name",
    title: "Project name",
    subtitle: "Displayed project name",
    value: selectedProject.value!.name,
  },
  {
    type: "text" as const,
    key: "project-label",
    title: "Project label",
    subtitle: "Any project description",
    value: selectedProject.value!.description,
  },
]);

const validateSettingsField = (key: string, value: string) => {
  console.log(key, value);

  return true; // TODO
};

const confirmDeleteItem = (event: MouseEvent) => {
  confirm.require({
    group: "prompt",
    target: event.currentTarget as HTMLElement,
    message: "Are you sure you want to revoike token?",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Revoke",
      severity: "danger",
    },
    accept: async () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
    },
  });
};

const confirmRevokeAll = () => {
  confirm.require({
    group: "dialog",
    message: "Do you want to revoke all tokens?",
    header: "Danger Zone",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Record deleted",
        life: 3000,
      });
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
  });
};
</script>

<style scoped lang="scss">
.section {
  @apply flex flex-col gap-2;

  .title {
    @apply text-2xl font-bold;
  }
}
</style>
