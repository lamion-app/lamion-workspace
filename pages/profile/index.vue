<template>
  <app-layout>
    <app-card container-class="flex-row items-center !gap-6">
      <label-image
        class="!size-[150px] !bg-window !text-6xl font-black"
        :label="$account.value.username"
        :image="$account.value.image"
      />

      <div class="col gap-2">
        <h1 class="text-5xl font-black" v-text="$account.value.username" />

        <span
          class="text-sm text-red-400 font-bold cursor-pointer"
          @click.prevent="isLogoutDialogVisible = true"
          >Logout</span
        >
      </div>
    </app-card>

    <logout-dialog v-model:visible="isLogoutDialogVisible" />

    <app-card class="mt-8">
      <div class="flex flex-wrap gap-4">
        <select-button v-model="activeTab" :options="tabs" />

        <div class="spacer" />

        <Button v-if="activeTab == 'Projects'" rounded severity="primary">
          <m-icon value="add" />

          <span>Create new project</span>
        </Button>
      </div>

      <div class="mt-4">
        <profile-settings
          v-if="activeTab == 'Settings'"
          :sections="settings"
          :validation="validateSettingsField"
          @update-text-item="console.log($event) /* TODO */"
          @update-image="console.log('Update image:', $event) /* TODO */"
          @delete-image="console.log('Delete image:', $event) /* TODO */"
        />

        <div v-else-if="activeTab == 'Projects'" class="projects">
          <div class="mt-4 grid lg:grid-cols-2 xl:grid-cols-3 gap-2">
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
                  @click="swapSelectedProject(project)"
                />
              </div>
            </app-card>
          </div>
        </div>
      </div>
    </app-card>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

useHead({
  title: "Profile",
});

const { account } = useAppAuth();

const tabs = ["Settings", "Projects"];
const activeTab = ref(tabs[0]);

const isLogoutDialogVisible = ref(false);

// SETTINGS TAB

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

// PROJECTS TAB

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);

onMounted(() => {
  projectsStore.loadInitProject();
});

function swapSelectedProject(project: Project) {
  projectsStore.updateSelectedProject(project);

  navigateTo("/");
}
</script>
