import { FetchError } from "ofetch";

function getErrorTextByStatus(status: number) {
  switch (status) {
    case 400:
      return "app.errors.statuses.badRequest";
    case 401:
      return "app.errors.statuses.unauthorized";
    case 403:
      return "app.errors.statuses.forbidden";
    case 404:
      return "app.errors.statuses.notFound";
    case 500:
      return "app.errors.statuses.internalServerError";
  }

  return undefined;
}

export const useErrorHandler = () => {
  const toast = useToast();
  const { t } = useI18n();

  async function handleError(e: Error) {
    let message: string | undefined = undefined;

    if (e instanceof FetchError) {
      const msg = e.data.message;

      if (msg == undefined) {
        const messageCode = getErrorTextByStatus(e.statusCode!);
        if (messageCode) {
          message = t(messageCode);
        }
      } else {
        message = msg;
      }
    }

    toast.add({
      group: "global-toast",
      severity: "error",
      summary: t("app.errors.title"),
      detail: message ?? t("app.errors.unknownError"),
      life: 3000,
    });
  }

  async function handleErrorBlock<T>(block: () => Promise<T>) {
    try {
      return await block();
    } catch (e) {
      await handleError(e as Error);
    }
  }

  return {
    handleError: handleError,
    handleErrorBlock: handleErrorBlock,
  };
};
