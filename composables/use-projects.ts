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

  function useProjectLoad<T, R>(
    callback: (id: number, ...refs: Array<R>) => Promise<T>,
    ...customRefs: Array<Ref<R>>
  ) {
    const isLoading = ref(false);
    const data = ref<T>();

    async function startLoading(id: number, refs: Array<R>) {
      isLoading.value = true;
      data.value = await callback(id, ...refs);
      isLoading.value = false;
    }

    onMounted(async () => {
      const id = selectedProjectId.value;
      if (id === undefined) return;
      await startLoading(
        id,
        customRefs.map((x) => x.value),
      );
    });

    watch([selectedProjectId, ...customRefs], async ([id, ...refs]) => {
      if (id === undefined) return;
      await startLoading(id, refs);
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
