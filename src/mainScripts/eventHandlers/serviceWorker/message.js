import structNavigationList from "../../viewConstructors/structNavigationList";

export default (async () => {
  navigator.serviceWorker.addEventListener("message", async ({ data }) => {
    const { CSSSelector, JSON } = data;
    const constructor = viewConstructors[CSSSelector];
    const html = constructor(JSON);
    document.body.querySelector(CSSSelector).innerHTML = html;
  });
})();
const viewConstructors = {
  "nav ul": structNavigationList,
};
