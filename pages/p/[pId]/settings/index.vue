<template>
  <app-layout>
    <h1 class="text-6xl font-black">{{ $locale("settings.title") }}</h1>

    <app-card class="mt-12" container-class="col !gap-6">
      <div class="section">
        <h3 class="title">{{ $locale("settings.general.title") }}</h3>

        <settings-layout
          :settings="settings"
          :validation="validateSettingsField"
          @update-text-item="console.log($event) /* TODO */"
          @update-image="console.log('Update image:', $event) /* TODO */"
          @delete-image="console.log('Delete image:', $event) /* TODO */"
        />
      </div>

      <div class="section !gap-4">
        <h3 class="title">{{ $locale("settings.accessTokens.title") }}</h3>

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

            <span>{{ $locale("settings.accessTokens.newAccessToken") }}</span>
          </Button>

          <Button
            class="max-sm:w-full"
            text
            rounded
            severity="danger"
            @click="confirmRevokeAll()"
          >
            <m-icon value="delete" />

            <span>{{ $locale("settings.accessTokens.revokeAll") }}</span>
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

const { t } = useI18n();
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
    title: t("settings.general.items.projectName.title"),
    subtitle: t("settings.general.items.projectName.subtitle"),
    value: selectedProject.value!.title,
  },
  {
    type: "text" as const,
    key: "project-label",
    title: t("settings.general.items.projectDescription.title"),
    subtitle: t("settings.general.items.projectDescription.subtitle"),
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
    message: t("settings.accessTokens.dialogs.revokeToken.title"),
    rejectProps: {
      label: t("common.simple.cancel"),
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: t("settings.accessTokens.dialogs.revokeToken.confirm"),
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
    message: t("settings.accessTokens.dialogs.revokeAllTokens.subtitle"),
    header: t("settings.accessTokens.dialogs.revokeAllTokens.title"),
    rejectProps: {
      label: t("common.simple.cancel"),
      severity: "secondary",
    },
    acceptProps: {
      label: t("settings.accessTokens.dialogs.revokeAllTokens.confirm"),
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
