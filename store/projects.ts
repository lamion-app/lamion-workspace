import { defineStore } from "pinia";
import { SelectedProjectState } from "@/types/Project";

const loadProjects = async (): Promise<Array<Project>> => {
  return await useApiCall<Array<Project>>("/project");
};

export const useProjectsStore = defineStore("projects", () => {
  const router = useRouter();

  const selectedProjectIndex = computed(() => {
    return Number(router.currentRoute.value.params.pId);
  });

  const projects = ref<Array<Project> | null>(null);
  const isProjectsLoading = ref<boolean>(false);

  const selectedProject = ref<Project>();
  const selectedProjectState = ref<SelectedProjectState>();

  let savedProjectKey: number | undefined = undefined;

  async function reloadProjects() {
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
  }

  watch([projects, selectedProjectIndex], async ([projects, index]) => {
    if (
      isNaN(index) ||
      index == undefined ||
      !projects ||
      projects.length === 0
    ) {
      selectedProjectState.value = SelectedProjectState.NOT_FOUND;
      return;
    }

    if (index === savedProjectKey && !!selectedProject.value) {
      selectedProjectState.value = SelectedProjectState.READY;
      return;
    }

    savedProjectKey = index;

    const project = projects[index];
    selectedProject.value = project;

    if (project) {
      selectedProjectState.value = SelectedProjectState.READY;
    } else {
      selectedProjectState.value = SelectedProjectState.NOT_FOUND;
    }
  });

  onMounted(reloadProjects);

  return {
    projects: projects,
    isProjectsLoading: isProjectsLoading,
    selectedProjectIndex: selectedProjectIndex,
    selectedProject: selectedProject,
    selectedProjectState: selectedProjectState,
    reloadProjects: reloadProjects,
  };
});
