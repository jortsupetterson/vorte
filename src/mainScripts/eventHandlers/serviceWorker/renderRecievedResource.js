export default (async () => {
  navigator.serviceWorker.addEventListener("message", async ({ data }) => {
    const { CSSSelector, JSON } = data;
    const html = HTMLConstructors[CSSSelector](JSON);
    document.body.querySelector(CSSSelector).innerHTML = html;
  });
})();

const HTMLConstructors = {
  "nav ul": nav_ul_html,
};

import nav_ul_html from "../../../Shared/HTMLConstructors/nav_ul_html";
