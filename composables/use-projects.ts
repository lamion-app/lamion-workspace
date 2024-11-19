/* eslint-disable @typescript-eslint/no-explicit-any */
export const useProjects = () => {
  const store = useProjectsStore();
  const data = storeToRefs(store);

  const openProject = async (projectId: Id, fastFail: boolean = true) => {
    const index = data.projects.value!.findIndex((x) => x.id == projectId);

    if (index == -1) {
      if (fastFail) return;

      await store.reloadProjects();

      return await openProject(projectId, true);
    }

    navigateTo({
      name: "p-pId",
      params: {
        pId: index,
      },
    });
  };

  const selectedProjectId = computed(() => data.selectedProject.value?.id);

  function useProjectLoadTransform<T>(
    callback: (id: number, ...refs: Array<any>) => Promise<T>,
    transform: (newValue: T, currentValue: T | undefined) => T,
    ...customRefs: Array<Ref<any>>
  ) {
    let isResetRequested: boolean = false;

    const isLoading = ref(false);
    const data = ref<T>();

    function reset(force: boolean = false) {
      if (force) {
        isResetRequested = false;
        data.value = undefined;
      } else {
        isResetRequested = true;
      }
    }

    async function startLoading(id: number, refs: Array<any>) {
      isLoading.value = true;
      const result = await callback(id, ...refs);

      if (isResetRequested) {
        data.value = transform(result, undefined);
        isResetRequested = false;
      } else {
        data.value = transform(result, data.value);
      }

      isLoading.value = false;
    }

    onMounted(async () => {
      if (data.value != undefined || isLoading.value) return;

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
      isLoading: shallowReadonly(isLoading),
      data: shallowReadonly(data),
      reset: reset,
    };
  }

  function useProjectLoad<T>(
    callback: (id: number, ...refs: Array<any>) => Promise<T>,
    ...customRefs: Array<Ref<any>>
  ) {
    return useProjectLoadTransform(callback, (p) => p, ...customRefs);
  }

  return {
    projects: shallowReadonly(data.projects),
    isProjectsLoading: readonly(data.isProjectsLoading),
    selectedProjectIndex: readonly(data.selectedProjectIndex),
    selectedProject: shallowReadonly(data.selectedProject),
    selectedProjectId: selectedProjectId,
    selectedProjectState: data.selectedProjectState,
    openProject: openProject,
    useProjectLoad: useProjectLoad,
    useProjectLoadTransform: useProjectLoadTransform,
  };
};
