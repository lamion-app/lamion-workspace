export default defineNuxtPlugin({
  async setup() {
    const auth = useAppAuth();

    return {
      provide: {
        account: auth.account,
        isLoggedIn: auth.isLoggedIn,
      },
    };
  },
});
