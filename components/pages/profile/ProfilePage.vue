<template>
  <div class="w-full col gap-4">
    <app-card container-class="flex-row items-center !gap-6">
      <label-image
        class="!size-[150px] !bg-window !text-6xl font-black"
        :label="account!.username"
        :image="account!.image"
      />

      <div class="col gap-2">
        <h1 class="text-5xl font-black" v-text="account!.username" />

        <span
          class="text-sm text-red-400 font-bold cursor-pointer"
          @click.prevent="isLogoutDialogVisible = true"
          >Logout</span
        >
      </div>
    </app-card>

    <logout-dialog v-model:visible="isLogoutDialogVisible" />

    <app-card class="mt-4" container-class="col items-start">
      <div class="w-full mt-4 grid lg:grid-cols-2 xl:grid-cols-3 gap-2">
        <Button
          class="!rounded-xl !bg-surface-200 max-xl:col-span-full"
          severity="secondary"
        >
          <m-icon value="add" />

          <span>Create new project</span>
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

          <span class="flex-1 text-lg font">{{ project.name }}</span>

          <div class="actions flex gap-2">
            <icon-button icon="edit" filled />
            <icon-button
              icon="open_in_new"
              severity="primary"
              filled
              @click="openProject(project)"
            />
          </div>
        </app-card>
      </div>
    </app-card>

    <app-card class="mt-4">
      <settings-layout
        :sections="settings"
        :validation="validateSettingsField"
        @update-text-item="console.log($event) /* TODO */"
        @update-image="console.log('Update image:', $event) /* TODO */"
        @delete-image="console.log('Delete image:', $event) /* TODO */"
      />
    </app-card>
  </div>
</template>

<script setup lang="ts">
const { account } = useAppAuth();

const isLogoutDialogVisible = ref(false);

const settings = computed(() => [
  {
    title: "Profile",
    items: [
      {
        type: "text" as const,
        key: "username",
        title: "Username",
        subtitle: "Displayed name",
        value: account.value!.username,
      },
      {
        type: "text" as const,
        key: "email",
        title: "Contact email",
        subtitle: "Setup meow email address",
        value: account.value!.email,
      },
      {
        type: "image" as const,
        key: "avatar",
        title: "Avatar",
        subtitle: "Set profile avatar",
        value: account.value!.image,
        label: account.value!.username,
      },
    ],
  },
]);

const validateSettingsField = (key: string, value: string) => {
  if (key == "email") {
    // TODO: check email
  }

  return value.trim().length > 4;
};

const { projects, openProject } = useProjects();
</script>
