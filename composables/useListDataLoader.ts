/* eslint-disable @typescript-eslint/no-explicit-any */

import type {MaybeElement} from "@vueuse/core";

export const useListDataLoader = <T>(params: {
  load: (id: Id, page: number, ...refs: Array<any>) => Promise<Array<T>>;
  params?: Array<Ref<any>>;
  resetOnChange?: Array<Ref<any>> | true;
  startLoadBy?: Ref<boolean>;
  loaderEl: Ref<MaybeElement>;
}) => {
  const { useProjectLoad } = useProjects();

  const page = ref(0);
  const isLastPage = ref(false);

  if (params.resetOnChange !== undefined) {
    let refs: Array<Ref<any>> | undefined = undefined;

    if (params.resetOnChange === true) {
      refs = params.params;
    } else if (params.resetOnChange) {
      refs = params.resetOnChange;
    }

    if (refs) {
      watch(refs, reload);
    }
  }

  const { data, isLoading, reset, blockLoading } = useProjectLoad({
    load: (id, ...d) => params.load(id, d[0], ...d.slice(1)),
    transform: (n, o) => {
      isLastPage.value = n.length == 0;

      return [...o, ...n];
    },
    customRefs: [page, ...(params.params ?? [])],
    autoLoading: !params.startLoadBy,
  });

  if (params.startLoadBy) {
    watch(params.startLoadBy, async (loading) => {
      await blockLoading(!loading);
    });
  }

  async function reload() {
    page.value = 0;
    isLastPage.value = false;
    reset(true);
  }

  useIntersectionObserver(params.loaderEl, ([{ isIntersecting }]) => {
    if (isIntersecting && !isLoading.value && !isLastPage.value) {
      page.value += 1;
    }
  });

  return reactive({
    data: data,
    isPreLoading: computed(() => isLoading.value && !data.value),
    isNeedPostLoading: computed(() => !!data.value && !isLastPage.value),
    isEmpty: computed(
      () => (!data.value || data.value.length == 0) && isLastPage.value,
    ),
    reload: reload,
  });
};
