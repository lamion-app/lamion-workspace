export const useOAuth = () => {
  const { providers } = useAuthProviders();
  const route = useRoute();

  const isLoading = ref<boolean | null>(true);
  const isValid = ref<boolean | null>(true);

  const load = async (oauthName: string) => {
    isLoading.value = true;
    isValid.value = true;

    const provider = providers.find(
      (p) => p.name == oauthName
    );

    if (!provider || !provider.handleOauthResult) {
      isLoading.value = false;
      isValid.value = false;
      return;
    }

    const params = provider?.collectOauthParams?.call(provider, route.query);
    if (params === null) {
      isValid.value = false;
    } else {
      await provider.handleOauthResult!.call(provider, params);
    }

    isLoading.value = false;
  };

  return reactive({
    isValid: isValid,
    isLoading: isLoading,
    load: load,
  });
};
