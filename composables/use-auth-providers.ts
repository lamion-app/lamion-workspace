export const useAuthProviders = () => {
  const config = useRuntimeConfig();
  const { signOut, data, status } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const providers: Array<AuthProvider<any>> = [
    CredentialsAuthProvider,
    GitHubAuthProvider,
    GoogleAuthProvider,
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
      });

      loginPage.navigate();
    },
    signIn: {
      credentials: (username: string, password: string) => {
        const route = useRoute();

        CredentialsAuthProvider.invoke(
          username,
          password,
          route.query.callbackUrl?.toString() ?? "/"
        );
      },
      googleOauth: GoogleAuthProvider.invoke.bind(GoogleAuthProvider, config),
      githubOauth: GitHubAuthProvider.invoke.bind(GitHubAuthProvider, config),
    },
  };
};
