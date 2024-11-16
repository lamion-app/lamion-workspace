import { defineStore } from "pinia";
import { SelectedProjectState } from "@/types/Project";

const loadProjects = async (): Promise<Array<Project>> => {
  return await useApiCall<Array<Project>>("/project");
};

export const useProjectsStore = defineStore("projects", () => {
  const route = useRoute();

  const selectedProjectIndex = computed(() => {
    return Number(route.params.pId);
  });

  const projects = ref<Array<Project> | null>(null);
  const isProjectsLoading = ref<boolean>(false);

  const selectedProject = ref<Project>();
  const selectedProjectState = ref<SelectedProjectState>();

  let savedProjectKey: number | undefined = undefined;

  watch([projects, selectedProjectIndex], async ([projects, index]) => {
    if (isNaN(index) || index == undefined) {
      // Handle if project already loaded and route changed
      if (!selectedProject.value && !!savedProjectKey) {
        selectedProjectState.value = SelectedProjectState.NOT_FOUND;
      }

      return;
    }

    if (!projects || projects.length === 0) return;

    if (index != savedProjectKey) {
      savedProjectKey = index;

      const project = projects[index];
      selectedProject.value = project;

      if (project) {
        selectedProjectState.value = SelectedProjectState.READY;
      } else {
        selectedProjectState.value = SelectedProjectState.NOT_FOUND;
      }
    }
  });

  onMounted(async () => {
    isProjectsLoading.value = true;

    try {
      selectedProjectState.value = SelectedProjectState.LOADING;
      projects.value = await loadProjects();
    } catch (e) {
      console.error(e);
      selectedProjectState.value = SelectedProjectState.ERROR;
    } finally {
      isProjectsLoading.value = false;
    }
  });

  return {
    projects: projects,
    isProjectsLoading: isProjectsLoading,
    selectedProjectIndex: selectedProjectIndex,
    selectedProject: selectedProject,
    selectedProjectState: selectedProjectState,
  };
});
