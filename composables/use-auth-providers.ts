export const useAuthProviders = () => {
  const config = useRuntimeConfig();
  const route = useRoute();
  const { signOut, data } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const providers: Array<AuthProvider<any>> = [
    CredentialsAuthProvider,
    GitHubAuthProvider,
    GoogleAuthProvider,
  ];

  const isLoggedIn = computed(() => !!data.value);

  return {
    providers,
    account: data,
    isLoggedIn: isLoggedIn,
    logout: () => {
      signOut({
        callbackUrl: "/",
      });
    },
    signIn: {
      credentials: (username: string, password: string) => {
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
