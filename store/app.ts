import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", () => {
  const isAppLoaded = ref(false);

  onMounted(() => {
    isAppLoaded.value = true;
  });

  return {
    isAppLoaded,
  };
});
