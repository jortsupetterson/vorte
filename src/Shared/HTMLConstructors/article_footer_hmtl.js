import inlineStringify from "../Utilities/inlineStringify";

export default async (article_footer_json, lanugage, viewName, isDemo) => {
  const constructor = {
    async home() {},
  }[viewName];
  const innerHTML = await constructor({
    article_footer_json,
    lanugage,
    isDemo,
    viewName,
  });
  return innerHTML;
};
