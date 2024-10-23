import { defineStore } from "pinia";
import { computedAsync } from "@vueuse/core";

const mockProjects = [
  {
    id: 1,
    name: "Test project",
    description: "Test project description",
  },
  {
    id: 2,
    name: "My super puper project",
    description: "💕😂👌😊👍💕❤️🙌😍",
  },
];

const loadProjects = (): Promise<Array<Project>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProjects);
    }, 1500);
  });
};

const loadSelectedProject = (index: number): Promise<Project> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProjects[index]);
    }, 1500);
  });
};

export const useProjectsStore = defineStore("projects", () => {
  const route = useRoute();

  const selectedProjectIndex = computed(() => {
    return Number(route.params.pId);
  });

  const projects = ref<Array<Project> | null>(null);
  const isProjectsLoading = ref<boolean>(false);

  const isSelectedProjectLoading = ref<boolean>(false);
  const isSelectedProjectError = ref<boolean>(false);

  const selectedProject = computedAsync(async () => {
    const projectIndex = selectedProjectIndex.value;

    if (isNaN(projectIndex)) return;

    isSelectedProjectLoading.value = true;

    try {
      if (projectIndex == undefined) {
        isSelectedProjectError.value = true;
        return null;
      } else {
        const result = await loadSelectedProject(projectIndex);

        if (result == null) {
          isSelectedProjectError.value = true;
          return null;
        }

        isSelectedProjectError.value = false;

        return result;
      }
    } finally {
      isSelectedProjectLoading.value = false;
    }
  }, null);

  onMounted(async () => {
    isProjectsLoading.value = true;

    projects.value = await loadProjects();

    isProjectsLoading.value = false;
  });

  return {
    projects,
    isProjectsLoading,
    selectedProjectIndex,
    selectedProject,
    isSelectedProjectLoading,
    isSelectedProjectError,
  };
});
