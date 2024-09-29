const routeName = "auth-login";

export const useLoginPage = () => ({
  name: routeName,
  isAuthPage: (route: string) => route.startsWith("/auth"),
  navigate: (callbackUrl?: string) => {
    return navigateTo({
      name: routeName,
      query: {
        callbackUrl: callbackUrl,
      },
    });
  },
});
