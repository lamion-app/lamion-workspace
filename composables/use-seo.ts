export const useSeo = () => {
  const route = useRoute();
  const { locale } = useI18n();
  const { t } = useI18n();

  const pageTitle = ref<string | null>(null);

  watch(
    [route, locale],
    ([route]) => {
      try {
        const routeTitle = route.meta.title;

        if (!routeTitle) {
          pageTitle.value = null;
          return;
        }

        if (routeTitle instanceof Function) {
          pageTitle.value = routeTitle.call(undefined, route).toString();
        } else {
          pageTitle.value = t(routeTitle.toString());
        }
      } catch (e) {
        console.error(e);
        pageTitle.value = null;
      }
    },
    {
      immediate: true,
    }
  );

  return {
    title: pageTitle,
  };
};
