export const createProjectLink = (page?: string, params?: object) => {
  const store = storeToRefs(useProjectsStore());

  let route: string;
  if (page == undefined || page == "") {
    route = "p-pId";
  } else if (page.startsWith("p-pId")) {
    route = page;
  } else {
    route = "p-pId-" + page;
  }

  return {
    name: route,
    params: {
      pId: store.selectedProjectIndex.value,
      ...params,
    },
  };
};
