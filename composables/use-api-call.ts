import type { NitroFetchOptions, NitroFetchRequest } from "nitropack/types";

export const useApiCall = (
  path: string,
  props?: NitroFetchOptions<NitroFetchRequest>,
) => {
  const config = useRuntimeConfig();

  return useFetch(path, {
    baseURL: config.public.api.origin,
    ...props,
  });
};
