export const useSeo = () => {
  const route = useRoute();
  const { t } = useI18n();

  const title = computed(() => {
    try {
      const routeTitle = route.meta.title;

      if (!routeTitle) {
        return null;
      }

      let title: string;
      if (routeTitle instanceof Function) {
        title = routeTitle.call(undefined).toString();
      } else {
        title = t(routeTitle.toString());
      }

      return title;
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  return {
    title: title,
  };
};
