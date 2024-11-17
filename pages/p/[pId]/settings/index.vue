<script setup lang="ts">
import type {
  AccessKeyDto,
  SettingsFull,
} from "~/components-types/pages/Settings";
import type { AccessKey } from "~/types/AccessKey";
import { useErrorHandler } from "~/composables/use-error-handler";

definePageMeta({
  layout: "main",
  title: "settings.title",
});

const { t } = useI18n();
const { useProjectLoad, selectedProjectId } = useProjects();
const { handleErrorBlock } = useErrorHandler();
const confirm = useConfirm();
const toast = useToast();

const { isLoading, data } = useProjectLoad((id) =>
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

const tokensList = computed(() =>
  tokens.value.map((x) => ({
    id: x.id,
    title: x.title,
    createdAt: parseISODateString(x.created_at),
  })),
);

const validateSettingsField = (key: string, value: string) => {
  console.debug(key, value);

  // TODO
  return true;
};

const confirmDeleteItem = (token: AccessKey, event: MouseEvent) => {
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
    await useApiCall(`/project/${selectedProjectId.value}/settings/token`, {
      method: "DELETE",
    });

    toast.add({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  });
}

function deleteToken(token: AccessKey) {
  handleErrorBlock(async () => {
    await useApiCall(
      `/project/${selectedProjectId.value}/settings/token/${token.id}`,
      {
        method: "DELETE",
      },
    );

    toast.add({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
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

        <div class="col gap-2">
          <div
            v-for="item in tokensList"
            :key="item.id"
            class="flex justify-between gap-2"
          >
            <div class="col">
              <span class="text-lg font-medium">{{ item.title }}</span>
              <span class="text-sm font-thin">{{
                $d(item.createdAt, "short")
              }}</span>
            </div>

            <icon-button
              icon="delete"
              severity="danger"
              @click="confirmDeleteItem(item, $event)"
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

<style scoped lang="scss">
.section {
  @apply flex flex-col gap-2;

  .title {
    @apply text-2xl font-bold;
  }
}
</style>
