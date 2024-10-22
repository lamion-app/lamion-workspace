export default defineNuxtPlugin({
  async setup() {
    const store = useProjectsStore();
    const { selectedProject } = storeToRefs(store);

    return {
      provide: {
        selectedProject: selectedProject,
      },
    };
  },
});
