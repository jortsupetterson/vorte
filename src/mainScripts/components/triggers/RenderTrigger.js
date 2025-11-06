import render from "../../utilities/render";

class RenderTrigger extends HTMLButtonElement {
  constructor({ renderTarget, svg, text }) {
    super();
    this.innerHTML = html`${svg}${text[language]}`;
    this.addEventListener("pointerdown", async () => render(renderTarget));
  }
}
export default RenderTrigger;
