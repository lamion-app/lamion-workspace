import type { H3Event } from "h3";
import { serverQueryContent } from "#content/server";

export default defineSitemapEventHandler(async (e: H3Event) => {
  const contentList = await serverQueryContent(e).find();

  return contentList
    .filter((c) => !c._path?.endsWith("_dir")) // Filters _dir.yml files
    .map((c) => {
      const pathParts = c._path!.split("/").filter((x) => x.length > 0);
      return pathParts.slice(1).join("/"); // Remove language tag from url
    })
    .filter((value, index, array) => array.indexOf(value) === index) // Filter duplicates
    .map((path) => {
      return asSitemapUrl({
        loc: path,
      });
    });
});
