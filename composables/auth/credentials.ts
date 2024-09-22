export const CredentialsAuthProvider = <AuthProvider<unknown>>{
  name: "credentials",
  displayedName: "Credentials",
  isSupportOauth: false,
  invoke: async (username: string, password: string, callbackUrl?: string) => {
    const { signIn } = useAuth();

    await signIn(
        {
          username: username,
          password: password,
        },
        {
          redirect: !!callbackUrl,
          callbackUrl: callbackUrl,
        }
    );
  },
};
