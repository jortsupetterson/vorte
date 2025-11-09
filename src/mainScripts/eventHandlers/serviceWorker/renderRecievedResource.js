export default (async () => {
  navigator.serviceWorker.addEventListener("message", async ({ data }) => {
    const { CSSSelector, JSON } = data;
    const html = HTMLConstructors[CSSSelector](
      JSON,
      document.documentElement.lang
    );
    document.body.querySelector(CSSSelector).innerHTML = html;
  });
})();

const HTMLConstructors = {
  "nav ul": nav_ul_html,
  "article main": article_main_html,
};

import article_main_html from "../../../Shared/HTMLConstructors/article_main_html";
import nav_ul_html from "../../../Shared/HTMLConstructors/nav_ul_html";
