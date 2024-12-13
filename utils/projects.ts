export const createProjectLink = (page?: string, params?: object) => {
  const store = storeToRefs(useProjectsStore());
  const localePath = useLocalePath();

  let route: string;
  if (page == undefined || page == "") {
    route = "p-pId";
  } else if (page.startsWith("p-pId")) {
    route = page;
  } else {
    route = "p-pId-" + page;
  }

  return localePath({
    name: route,
    params: {
      pId: store.selectedProjectIndex.value,
      ...params,
    },
  });
};
