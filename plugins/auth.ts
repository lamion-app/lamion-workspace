export default defineNuxtPlugin({
  async setup() {
    const auth = useAppAuth();

    return {
      provide: {
        account: computed(() => auth.account.value!),
        isLoggedIn: auth.isLoggedIn,
      },
    };
  },
});
