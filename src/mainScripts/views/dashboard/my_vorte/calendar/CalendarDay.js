export class CalendarDay extends HTMLElement {
  constructor() {
    this.data = swRPC();
    elements.mascot_img.src = "";
  }
  connectedCallback() {}
  disconnectedCallback() {}
}

import { elements } from "../../core/elements";
import swRPC from "../../core/swRPC";
