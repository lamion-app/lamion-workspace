export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAppAuth();
  const localePath = useLocalePath();
  
  if (to.meta.auth === true && !isLoggedIn.value) {
    return navigateTo(
      localePath({
        name: "auth-login",
        query: {
          callbackUrl: to.fullPath,
        },
      })
    );
  }
});
