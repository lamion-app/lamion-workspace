/* eslint-disable @typescript-eslint/no-explicit-any */

import type {MaybeElement} from "@vueuse/core";

export const useListDataLoader = <T>(params: {
  load: (id: Id, page: number, ...refs: Array<any>) => Promise<Array<T>>;
  params?: Array<Ref<any>>;
  resetOnChange?: Array<Ref<any>>;
  startLoadBy?: Ref<boolean>;
  loaderEl: Ref<MaybeElement>;
}) => {
  const { useProjectLoadTransform } = useProjects();

  const page = ref(0);
  const isLastPage = ref(false);

  if (params.resetOnChange) {
    watch(params.resetOnChange, () => {
      page.value = 0;
      isLastPage.value = false;
      reset(true);
    });
  }

  const { data, isLoading, reset, blockLoading } = useProjectLoadTransform(
    (id, ...d) => params.load(id, d[0], ...d.slice(1)),
    (n, o) => {
      isLastPage.value = n.length == 0;

      return [...o, ...n];
    },
    [page, ...(params.params ?? [])],
    !params.startLoadBy,
  );

  if (params.startLoadBy) {
    watch(params.startLoadBy, async (loading) => {
      await blockLoading(!loading);
    });
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
  });
};
