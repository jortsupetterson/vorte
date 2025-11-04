import getLanguage from "../../../serviceWorker/utilities/getLanguage";
import renderDefaultView from "../views/0-default";
const viewMap = {
  default: renderDefaultView,
};

class RenderTrigger extends HTMLButtonElement {
  constructor({ id, svg, text }) {
    super();
    this.id = id;
    this.innerHTML = html`${svg}${text[language]}`;
    this.onpointerdown(async (event) => {
      const render = viewMap[this.id];
      await render();
      window.matchMedia("(max-width: 548px)").matches && viewmenu.open
        ? (viewmenu.open = false)
        : null;
    });
  }
}
export default RenderTrigger;
