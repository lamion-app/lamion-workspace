<script setup lang="ts">
definePageMeta({
  layout: "main",
  title: "settings.title",
  auth: true,
});

const { t } = useI18n();
const { useProjectLoadAlias, selectedProjectId } = useProjects();
const { handleErrorBlock } = useErrorHandler();
const confirm = useConfirm();
const toast = useToast();

const { isLoading, data } = useProjectLoadAlias((id) =>
  useApiCall<SettingsFull>(`/project/${id}/settings`),
);

const tokens = ref<Array<AccessKeyDto>>([]);
const settingsData = reactive({
  title: "",
  description: "",
});

watchEffect(() => {
  const projectData = data.value;
  if (!projectData) return;

  tokens.value = projectData.tokens;

  settingsData.title = projectData.title;
  settingsData.description = projectData.description ?? "";
});

const settings = computed<Array<SettingsItem>>(() => [
  {
    type: "text" as const,
    key: "project-name",
    title: t("settings.general.items.projectName.title"),
    subtitle: t("settings.general.items.projectName.subtitle"),
    value: settingsData.title,
    onUpdate(value: string) {
      handleErrorBlock(async () => {
        await useApiCall(`/project/${selectedProjectId.value}`, {
          method: "PATCH",
          body: {
            title: value,
          },
        });

        settingsData.title = value;
      });
    },
  },
  {
    type: "text" as const,
    key: "project-label",
    title: t("settings.general.items.projectDescription.title"),
    subtitle: t("settings.general.items.projectDescription.subtitle"),
    value: settingsData.description,
    onUpdate(value: string) {
      handleErrorBlock(async () => {
        await useApiCall(`/project/${selectedProjectId.value}`, {
          method: "PATCH",
          body: {
            description: value,
          },
        });

        settingsData.description = value;
      });
    },
  },
]);

const validateSettingsField = (key: string, value: string) => {
  console.debug(key, value);

  // TODO
  return true;
};

const tokensList = computed(() =>
  tokens.value.map((x) => ({
    id: x.id,
    title: x.title,
    createdAt: parseISODateString(x.created_at),
  })),
);

const confirmDeleteItem = (token: AccessKey, event: Event) => {
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
    accept: () => {
      deleteToken(token);
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
      outlined: true,
    },
    acceptProps: {
      label: t("settings.accessTokens.dialogs.revokeAllTokens.confirm"),
      severity: "danger",
    },
    accept: () => {
      deleteAllTokens();
    },
  });
};

function deleteAllTokens() {
  handleErrorBlock(async () => {
    await useApiCall(`/project/${selectedProjectId.value}/access/key`, {
      method: "DELETE",
    });

    toast.add({
      severity: "info",
      summary: t("settings.accessTokens.dialogs.revokeAllTokens.popup.title"),
      detail: t("settings.accessTokens.dialogs.revokeAllTokens.popup.message"),
      life: 3000,
    });

    tokens.value = [];
  });
}

function deleteToken(token: AccessKey) {
  handleErrorBlock(async () => {
    await useApiCall(
      `/project/${selectedProjectId.value}/access/key/${token.id}`,
      {
        method: "DELETE",
      },
    );

    tokens.value = tokens.value.filter((x) => x.id !== token.id);
  });
}
</script>

<template>
  <app-layout :is-loading="isLoading">
    <h1 class="text-6xl font-black">{{ $locale("settings.title") }}</h1>

    <app-card v-if="!!data" class="mt-12" container-class="col !gap-6">
      <div class="section">
        <h3 class="title">{{ $locale("settings.general.title") }}</h3>

        <settings-layout
          :settings="settings"
          :validation="validateSettingsField"
        />
      </div>

      <div class="section !gap-4">
        <h3 class="title">{{ $locale("settings.accessTokens.title") }}</h3>

        <access-keys-section
          :items="tokensList"
          @delete-item="confirmDeleteItem($event.item, $event.event)"
          @delete-all="confirmRevokeAll()"
        />
      </div>
    </app-card>

    <confirm-popup group="prompt" />
    <confirm-dialog group="dialog" />
  </app-layout>
</template>

<style scoped lang="scss">
.section {
  @apply flex flex-col gap-2;

  .title {
    @apply text-2xl font-bold;
  }
}
</style>
