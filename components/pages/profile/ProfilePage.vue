<script setup lang="ts">
import AddProjectDialog from "~/components/pages/projects/AddProjectDialog.vue";

const { t } = useI18n();

const { handleErrorBlock } = useErrorHandler();
const { projects, openProject } = useProjects();

const data = ref<ProfileFull>();
const isLoading = ref(false);
const isAddProjectDialogVisible = ref(false);

const isLogoutDialogVisible = ref(false);

onMounted(loadProfileData);

const settings = computed(() => [
  {
    type: "text" as const,
    key: "username",
    title: t("profile.settings.username.title"),
    subtitle: t("profile.settings.username.subtitle"),
    value: data.value!.account.username,
    onUpdate(value: string) {
      handleErrorBlock(async () => {
        await useApiCall(`/account/me`, {
          method: "PATCH",
          body: {
            username: value,
          },
        });

        data.value = {
          account: {
            ...data.value!.account,
            username: value,
          },
        };
      });
    },
  },
  {
    type: "text" as const,
    key: "email",
    title: t("profile.settings.email.title"),
    subtitle: t("profile.settings.email.subtitle"),
    value: data.value!.account.email,
    onUpdate(value: string) {
      handleErrorBlock(async () => {
        await useApiCall(`/account/me`, {
          method: "PATCH",
          body: {
            email: value,
          },
        });

        data.value = {
          account: {
            ...data.value!.account,
            email: value,
          },
        };
      });
    },
  },
  {
    type: "image" as const,
    key: "avatar",
    title: t("profile.settings.avatar.title"),
    subtitle: t("profile.settings.avatar.subtitle"),
    value: data.value!.account.avatar,
    label: data.value!.account.username,
    onUpdate(value: File) {
      handleErrorBlock(async () => {
        const formData = new FormData();
        formData.append("file", value);

        await useApiCall("/account/avatar/me", {
          method: "POST",
          body: formData,
        });

        await loadProfileData();
      });
    },
    onDelete() {
      handleErrorBlock(async () => {
        await useApiCall("/account/avatar/me", {
          method: "DELETE",
        });

        await loadProfileData();
      });
    },
  },
]);

const validateSettingsField = (key: string, value: string) => {
  if (key == "email") {
    // TODO: check email
  }

  return value.trim().length > 4;
};

async function loadProfileData() {
  data.value = undefined;
  isLoading.value = true;
  data.value = await useApiCall("/account/profile");
  isLoading.value = false;
}
</script>

<template>
  <div v-if="!!data" class="w-full col gap-4">
    <app-card container-class="flex-row items-center !gap-6">
      <label-image
        class="!size-[150px] !bg-window !text-6xl font-black"
        :label="data.account!.username"
        :image="data.account!.avatar"
      />

      <div class="col gap-2">
        <h1 class="text-5xl font-black" v-text="data.account!.username" />

        <span
          class="text-sm text-red-400 font-bold cursor-pointer"
          @click.prevent="isLogoutDialogVisible = true"
          >{{ $locale("auth.logout.action") }}</span
        >
      </div>
    </app-card>

    <logout-dialog v-model:visible="isLogoutDialogVisible" />

    <app-card class="mt-4" container-class="col items-start">
      <div class="w-full mt-4 grid lg:grid-cols-2 xl:grid-cols-3 gap-2">
        <Button
          class="!rounded-xl !bg-surface-200 dark:!bg-surface-900 max-xl:col-span-full"
          severity="secondary"
          @click="isAddProjectDialogVisible = true"
        >
          <m-icon value="add" />

          <span>{{ $locale("profile.createNewProject") }}</span>
        </Button>

        <app-card
          v-for="project in projects"
          :key="project.id"
          container-class="w-full flex gap-2 items-center"
        >
          <m-icon
            class="size-12 rounded-full bg-window flex center"
            value="workspaces"
          />

          <span class="flex-1 text-lg font">{{ project.title }}</span>

          <icon-button
            icon="open_in_new"
            severity="primary"
            filled
            @click="openProject(project.id)"
          />
        </app-card>
      </div>
    </app-card>

    <add-project-dialog v-model:visible="isAddProjectDialogVisible" />

    <app-card class="mt-4" :title="$locale('profile.title')">
      <settings-layout
        :settings="settings"
        :validation="validateSettingsField"
      />
    </app-card>
  </div>
</template>
