export const useProjects = () => {
  const store = storeToRefs(useProjectsStore());

  const openProject = (project: Project) => {
    const index = store.projects.value!.indexOf(project);

    navigateTo({
      name: "p-pId",
      params: {
        pId: index,
      },
    });
  };

  return {
    projects: shallowReadonly(store.projects),
    isProjectsLoading: readonly(store.isProjectsLoading),
    selectedProjectIndex: readonly(store.selectedProjectIndex),
    selectedProject: shallowReadonly(store.selectedProject),
    selectedProjectId: computed(() => store.selectedProject.value?.id),
    selectedProjectState: store.selectedProjectState,
    openProject: openProject,
  };
};
