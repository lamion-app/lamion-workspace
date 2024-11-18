/* eslint-disable @typescript-eslint/no-explicit-any */
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
    projects: shallowReadonly(store.projects),
    isProjectsLoading: readonly(store.isProjectsLoading),
    selectedProjectIndex: readonly(store.selectedProjectIndex),
    selectedProject: shallowReadonly(store.selectedProject),
    selectedProjectId: selectedProjectId,
    selectedProjectState: store.selectedProjectState,
    openProject: openProject,
    useProjectLoad: useProjectLoad,
    useProjectLoadTransform: useProjectLoadTransform,
  };
};
