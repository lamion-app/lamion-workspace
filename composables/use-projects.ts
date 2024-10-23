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

  const createProjectLink = (page?: string, params?: object) => {
    let route: string;
    if (page == undefined || page == "") {
      route = "p-pId";
    } else if (page.startsWith("p-pId")) {
      route = page;
    } else {
      route = "p-pId-" + page;
    }

    return {
      name: route,
      params: {
        pId: store.selectedProjectIndex.value,
        ...params,
      },
    };
  };

  return {
    projects: shallowReadonly(store.projects),
    isProjectsLoading: readonly(store.isProjectsLoading),
    selectedProjectIndex: readonly(store.selectedProjectIndex),
    selectedProject: shallowReadonly(store.selectedProject),
    isSelectedProjectLoading: readonly(store.isSelectedProjectLoading),
    isSelectedProjectError: readonly(store.isSelectedProjectError),
    openProject,
    createProjectLink,
  };
};
