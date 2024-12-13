export const useAppAuth = () => {
  const config = useRuntimeConfig();
  const { signOut, signUp, data, status, token } = useAuth();

  const localePath = useLocalePath();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const providers: Array<AuthProvider<any>> = [
    CredentialsAuthProvider,
    GitHubAuthProvider,
  ];

  const isLoggedIn = computed(() => !!data.value);
  const isLoading = computed(() => status.value == "loading");

  const projectsRootPath = localePath("/p");

  return {
    providers: providers,
    token: token,
    account: data,
    status: status,
    isLoggedIn: isLoggedIn,
    isLoading: isLoading,
    logout: () => {
      signOut({
        redirect: false,
      }).then(() => {
        localStorage.clear();

        navigateTo(localePath("/"));
      });
    },
    signIn: {
      credentials: (email: string, password: string) => {
        const route = useRoute();

        return CredentialsAuthProvider.invoke(
          email,
          password,
          route.query.callbackUrl?.toString() ?? projectsRootPath
        );
      },
      githubOauth: GitHubAuthProvider.invoke.bind(GitHubAuthProvider, config),
    },
    signUp: async (email: string, username: string, password: string) => {
      const route = useRoute();

      const callbackUrl =
        route.query.callbackUrl?.toString() ?? projectsRootPath;

      await signUp(
        {
          email: email,
          username: username,
          password: password,
        },
        {
          callbackUrl: callbackUrl,
        }
      );
    },
  };
};
