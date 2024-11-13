export const CredentialsAuthProvider = <AuthProvider<unknown>>{
  name: "credentials",
  displayedName: "Credentials",
  isSupportOauth: false,
  invoke: async (email: string, password: string, callbackUrl?: string) => {
    const { signIn } = useAuth();

    await signIn(
      {
        email: email,
        password: password,
      },
      {
        redirect: !!callbackUrl,
        callbackUrl: callbackUrl,
      },
    );
  },
};
