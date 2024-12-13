import type { H3Event } from "h3";
import { serverQueryContent } from "#content/server";

export default defineSitemapEventHandler(async (e: H3Event) => {
  const contentList = await serverQueryContent(e).find();
  const config = useRuntimeConfig();
  const defaultLocale = config.public.i18n.defaultLocale;

  return contentList
    .filter((c) => !c._path?.endsWith("_dir")) // Filters _dir.yml files
    .map((c) => {
      if (c._path!.startsWith(defaultLocale)) {
        return c._path?.substring(defaultLocale.length);
      }

      return c._path;
    })
    .filter((value, index, array) => array.indexOf(value) === index) // Filter duplicates
    .map((path) => {
      return asSitemapUrl({
        loc: path,
        _i18nTransform: true,
      });
    });
});
