(async () => {
  if (!document.getElementById("color-input-style")) {
    const HTML = html`
      <style id="color-input-style" nonce="${await getNonce()}">
        color-input {
        }
      </style>
    `;
    const safeHTML = __policy ? __policy.createHTML(HTML) : HTML;

    document.head.insertAdjacentHTML("beforeend", safeHTML);
  }
})();

export class ColorInput extends HTMLInputElement {
  constructor() {
    super();

    this.type = "color";

    const role = this.dataset.role;
    const name = `${role}Color`;

    this.oninput = ({ target }) => {
      const { value } = target;
      DOC.style.setProperty(`--${name}`, value);
      cookieStore.set({ name, value, expires: NOWplusYEAR });
    };
  }
}

import { DOC } from "../../Shared/SAVINGS";
import { NOWplusYEAR } from "../../Shared/CONFIG";
import { __policy } from "../__policy";

import getNonce from "../../Shared/Utilities/getNonce";
