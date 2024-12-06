export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAppAuth();
  const loginPage = useLoginPage();

  if (to.meta.auth === true && !isLoggedIn.value) {
    return loginPage.navigate(from.fullPath);
  }
});
