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

  const selectedProjectId = computed(() => store.selectedProject.value?.id);

  function useProjectLoad<T>(callback: (id: number) => Promise<T>) {
    const isLoading = ref(false);
    const data = ref<T>();

    async function startLoading(id: number) {
      isLoading.value = true;
      data.value = await callback(id);
      isLoading.value = false;
    }

    onMounted(async () => {
      const id = selectedProjectId.value;
      if (id === undefined) return;
      await startLoading(id);
    });

    watch(selectedProjectId, async (id) => {
      if (id === undefined) return;
      await startLoading(id);
    });

    return {
      isLoading: isLoading,
      data: data,
    };
  }

  return {
    projects: shallowReadonly(store.projects),
    isProjectsLoading: readonly(store.isProjectsLoading),
    selectedProjectIndex: readonly(store.selectedProjectIndex),
    selectedProject: shallowReadonly(store.selectedProject),
    selectedProjectId: selectedProjectId,
    selectedProjectState: store.selectedProjectState,
    openProject: openProject,
    useProjectLoad: useProjectLoad,
  };
};
