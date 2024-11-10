export const useAppAuth = () => {
  const config = useRuntimeConfig();
  const { signOut, signUp, data, status } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const providers: Array<AuthProvider<any>> = [
    CredentialsAuthProvider,
    GitHubAuthProvider,
  ];

  const isLoggedIn = computed(() => !!data.value);
  const isLoading = computed(() => status.value == "loading");

  return {
    providers: providers,
    account: data,
    status: status,
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
      credentials: (email: string, password: string) => {
        const route = useRoute();

        return CredentialsAuthProvider.invoke(
          email,
          password,
          route.query.callbackUrl?.toString() ?? "/",
        );
      },
      githubOauth: GitHubAuthProvider.invoke.bind(GitHubAuthProvider, config),
    },
    signUp: async (email: string, username: string, password: string) => {
      const route = useRoute();

      const callbackUrl = route.query.callbackUrl?.toString() ?? "/";

      await signUp(
        {
          email: email,
          username: username,
          password: password,
        },
        {
          callbackUrl: callbackUrl,
        },
      );
    },
    /*async (email: string, username: string, password: string) => {
                          const response = await useApiCall("auth/signUp", {
                            method: "post",
                            body: {
                              email,
                              username,
                              password,
                            },
                          });
              
                          if (response.error.value == null) {
                            return await credentialsSignIn(email, password);
                          } else {
                            throw response.error.value;
                          }
                        },*/
  };
};
