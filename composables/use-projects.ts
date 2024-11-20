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
    transform: (newValue: T, currentValue: T) => T,
    customRefs: Array<Ref<any>> = [],
    autoLoading: boolean = true,
  ) {
    let isResetRequested = false;
    let isBlocked = false;

    const isLoading = ref(false);
    const data = ref<T>();

    async function blockLoading(block: boolean) {
      if (isBlocked == block) return;

      isBlocked = block;

      if (!block) {
        await onMountedAction();
      }
    }

    function reset(force: boolean = false) {
      if (force) {
        isResetRequested = false;
        data.value = undefined;
      } else {
        isResetRequested = true;
      }
    }

    async function startLoading(id: number, refs: Array<any>) {
      if (isBlocked) return;

      isLoading.value = true;
      const result = await callback(id, ...refs);

      if (isResetRequested || !data.value) {
        data.value = result;
        isResetRequested = false;
      } else {
        data.value = transform(result, data.value);
      }

      isLoading.value = false;
    }

    async function onMountedAction() {
      if (data.value != undefined || isLoading.value) return;

      const id = selectedProjectId.value;
      if (id === undefined) return;
      await startLoading(
        id,
        customRefs.map((x) => x.value),
      );
    }

    if (autoLoading) {
      onMounted(onMountedAction);
    }

    watch([selectedProjectId, ...customRefs], async ([id, ...refs]) => {
      if (id === undefined) return;
      await startLoading(id, refs);
    });

    return {
      isLoading: shallowReadonly(isLoading),
      data: shallowReadonly(data),
      reset: reset,
      blockLoading: blockLoading,
    };
  }

  function useProjectLoad<T>(
    callback: (id: number, ...refs: Array<any>) => Promise<T>,
    customRefs: Array<Ref<any>> = [],
    autoLoading: boolean = true,
  ) {
    return useProjectLoadTransform(callback, (p) => p, customRefs, autoLoading);
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
