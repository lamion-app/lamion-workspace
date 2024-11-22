import type { NamedValue } from "@intlify/core-base";

export default defineNuxtPlugin(() => {
  return {
    // TODO: deprecated
    provide: {
      // locale: (name: string) => t(name),
      locale: (name: string, props?: NamedValue): string => {
        const { t } = useI18n();

        if (props == undefined) {
          return t(name);
        } else {
          return t(name, props);
        }
      },
    },
  };
});
