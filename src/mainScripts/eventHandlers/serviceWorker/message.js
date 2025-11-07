import structNavigationList from "../../viewConstructors/structNavigationList";

export default (async () => {
  navigator.serviceWorker.addEventListener("message", async ({ data }) => {
    const { CSSSelector, content } = data;
    const constructor = viewConstructors[CSSSelector];
    const html = constructor(content);
    document.body.querySelector(CSSSelector).innerHTML = html;
  });
})();
const viewConstructors = {
  "nav ul": structNavigationList,
};
