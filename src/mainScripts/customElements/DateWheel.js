const SLUG = "date-wheel";
export class DateWheel extends HTMLButtonElement {
  constructor() {
    super();
    const { year, month } = this.dataset;
    this.year = year;
    this.month = month;
    this.mode = "month";
    this.onscroll(ev);
    this.mode_switch = document.createElement("button");
    this.mode_switch.onpointerdown = () => this.toggle_mode();
  }
  set mode(newMode) {
    this.mode = newMode;
    this.mode_switch.textContent = newMode === "year" ? this.year : this.month;
  }
  toggle_mode() {
    this.mode === "month" ? (this.mode = "year") : (this.mode = "month");
  }
}
style(SLUG, css``);

import div from "../createHTML/div";
import style from "../createHTML/style";
