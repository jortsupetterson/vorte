export default (async () => {
  navigator.serviceWorker.addEventListener("message", async ({ data }) => {
    const { CSSSelector, JSON, viewName, isDemo } = data;
    const constructor = HTMLConstructors[CSSSelector];
    const html = await constructor(
      JSON,
      document.documentElement.lang,
      viewName,
      isDemo
    );
    document.body.querySelector(CSSSelector).innerHTML = html;
  });
})();

const HTMLConstructors = {
  "nav ul": nav_ul_html,
  "article main": article_main_html,
  "article header h1": article_header_h1_html,
};

import article_header_h1_html from "../../../Shared/HTMLConstructors/article_header_h1_html";
import article_main_html from "../../../Shared/HTMLConstructors/article_main_html";
import nav_ul_html from "../../../Shared/HTMLConstructors/nav_ul_html";
