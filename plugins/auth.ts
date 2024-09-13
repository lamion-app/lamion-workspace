export default defineNuxtPlugin({
  async setup() {
    const auth = useAuthProviders();

    return {
      provide: {
        account: auth.account,
        isLoggedIn: auth.isLoggedIn,
      },
    };
  },
});
