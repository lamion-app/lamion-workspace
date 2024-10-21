export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAppAuth();
  const loginPage = useLoginPage();

  if (to.meta.auth === false || loginPage.isAuthPage(to.fullPath)) return;

  if (!isLoggedIn.value) {
    return loginPage.navigate(from.fullPath);
  }
});
