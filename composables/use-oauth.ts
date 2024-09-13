type OAuthProviderCallback = () => Promise<void>;

export const useOAuth = () => {
  const { providers } = useAuthProviders();

  const loadedProvider = ref<OAuthProviderCallback | null>(null);

  const prepare = async (oauthName: string, query: typeof LocationQuery) => {
    const provider = providers.find((p) => p.name == oauthName);

    if (!provider || !provider.handleOauthResult) {
      return false;
    }

    const params = provider?.collectOauthParams?.call(provider, query);

    if (params === null) {
      return false;
    }

    loadedProvider.value = provider.handleOauthResult!.bind(provider, params);

    return true;
  };

  const invokeProvider = async (
    oauthName: string,
    query: typeof LocationQuery
  ) => {
    if (loadedProvider.value == null) {
      await prepare(oauthName, query);
    }

    if (loadedProvider.value != null) {
      await loadedProvider.value();
    }
  };

  return reactive({
    loadedProvider: loadedProvider,
    prepare: prepare,
    invokeProvider: invokeProvider,
  });
};
