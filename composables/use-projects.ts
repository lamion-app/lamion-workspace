/* eslint-disable @typescript-eslint/no-explicit-any */
export const useProjects = () => {
  const store = useProjectsStore();
  const data = storeToRefs(store);

  const { handleError } = useErrorHandler();

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

  const selectedProjectId = computed(() => {
    if (data.selectedProjectState.value !== SelectedProjectState.READY)
      return undefined;

    return data.selectedProject.value?.id;
  });

  function useProjectLoad<T>(params: {
    load: (id: number, ...refs: Array<any>) => Promise<T>;
    transform?: (newValue: T, currentValue: T) => T;
    customRefs?: Array<Ref<any>>;
    autoLoading?: boolean;
  }) {
    const autoLoading = params.autoLoading ?? true;

    let isResetRequested = false;
    let isBlocked = !autoLoading;

    const isLoading = ref(false);
    const isError = ref(false);
    const data = ref<T>();

    async function blockLoading(block: boolean) {
      if (isBlocked == block) return;

      isBlocked = block;

      if (!block) {
        await invokeLoadWithCurrentValues();
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

    async function onLoad(id: number, refs: Array<any>) {
      if (isBlocked) return;

      isLoading.value = true;
      try {
        const result = await params.load(id, ...refs);
        if (isResetRequested || !data.value || !params.transform) {
          data.value = result;
          isResetRequested = false;
        } else {
          data.value = params.transform(result, data.value);
        }
      } catch (e) {
        await handleError(e as Error);
        isError.value = true;
      }

      isLoading.value = false;
    }

    async function invokeLoadWithCurrentValues() {
      if (data.value != undefined || isLoading.value) return;

      const id = selectedProjectId.value;
      if (id === undefined) return;

      await onLoad(id, params.customRefs?.map((x) => x.value) ?? []);
    }

    if (autoLoading) {
      onBeforeMount(invokeLoadWithCurrentValues);
    }

    watch(
      [selectedProjectId, ...(params.customRefs ?? [])],
      async (val) => {
        const [id, ...refs] = val;

        if (id === undefined || isBlocked || isLoading.value) return;

        await onLoad(id, refs);
      },
      {
        immediate: autoLoading,
      }
    );

    return {
      isLoading: shallowReadonly(isLoading),
      data: shallowReadonly(data),
      isError: shallowReadonly(isError),
      reset: reset,
      blockLoading: blockLoading,
    };
  }

  function useProjectLoadAlias<T>(
    callback: (id: number, ...refs: Array<any>) => Promise<T>,
    customRefs: Array<Ref<any>> = [],
    autoLoading: boolean = true
  ) {
    return useProjectLoad({
      load: callback,
      customRefs: customRefs,
      autoLoading: autoLoading,
    });
  }

  return {
    projects: shallowReadonly(data.projects),
    isProjectsLoading: readonly(data.isProjectsLoading),
    selectedProjectIndex: readonly(data.selectedProjectIndex),
    selectedProject: shallowReadonly(data.selectedProject),
    selectedProjectId: selectedProjectId,
    selectedProjectState: data.selectedProjectState,
    openProject: openProject,
    /**
     * @deprecated
     */
    useProjectLoadAlias: useProjectLoadAlias,
    useProjectLoad: useProjectLoad,
  };
};
