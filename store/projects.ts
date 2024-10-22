import { defineStore } from "pinia";

const key = "selectedProject";

const getDefaultSelectedProject = () => {
  const data = localStorage.getItem(key);

  if (!data) return null;

  return Number(data);
};

const saveSelectedProject = (data: number | null) => {
  if (data == null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, data.toString());
  }
};

export const useProjectsStore = defineStore("projectsStore", () => {
  const selectedProjectIndex = ref<number | null>(null);

  const projects = ref([
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
  ]);

  const selectedProject = computed({
    get: () => {
      const index = selectedProjectIndex.value;
      if (index == null) return null;

      return projects.value[index];
    },
    set: (project: Project) => {
      const index = projects.value.indexOf(project);
      const realIndex = index == -1 ? null : index;

      selectedProjectIndex.value = realIndex;

      saveSelectedProject(realIndex);
    },
  });

  const isProjectSelected = computed(() => selectedProject.value !== null);

  const loadInitProject = () => {
    selectedProjectIndex.value = getDefaultSelectedProject();
  };

  return {
    projects,
    selectedProject,
    isProjectSelected,
    loadInitProject,
    updateSelectedProject: (project: Project) => {
      selectedProject.value = project;
    },
  };
});
