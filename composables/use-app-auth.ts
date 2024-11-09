export const useAppAuth = () => {
  const config = useRuntimeConfig();
  const { signOut, data, status } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const providers: Array<AuthProvider<any>> = [
    CredentialsAuthProvider,
    GitHubAuthProvider,
  ];

  const isLoggedIn = computed(() => !!data.value);
  const isLoading = computed(() => status.value == "loading");

  return {
    providers,
    account: data,
    isLoggedIn: isLoggedIn,
    isLoading: isLoading,
    logout: () => {
      const loginPage = useLoginPage();

      signOut({
        redirect: false,
      }).then(() => {
        localStorage.clear();

        loginPage.navigate();
      });
    },
    signIn: {
      credentials: (username: string, password: string) => {
        const route = useRoute();

        CredentialsAuthProvider.invoke(
          username,
          password,
          route.query.callbackUrl?.toString() ?? "/",
        ).then(() => {
          console.log("Auth completed");
        });
      },
      githubOauth: GitHubAuthProvider.invoke.bind(GitHubAuthProvider, config),
    },
  };
};
