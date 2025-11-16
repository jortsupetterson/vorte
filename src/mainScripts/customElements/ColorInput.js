const SLUG = "color-input";

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
