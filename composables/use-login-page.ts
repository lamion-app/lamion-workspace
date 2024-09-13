const routeName = "login";

export const useLoginPage = () => ({
  name: routeName,
  navigate: () => {
    navigateTo(routeName);
  },
});
