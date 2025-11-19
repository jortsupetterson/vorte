export const DATE_WHEEL = "date-wheel";
export class DateWheel extends HTMLElement {
  constructor() {
    super();
    this.appendChild(mode_switch);
    this.appendChild(wheel_container);

    this.mode_switch.onpointerdown = (event) => {
      event.stopPropagation();
      this.mode = this.mode === 2 ? 1 : 2;
    };

    this.mode = shared_mode;
  }

  get mode() {
    return shared_mode;
  }

  set mode(newMode) {
    shared_mode = newMode;
    this.mode_switch.textContent = newMode === 1 ? this.year : this.month;
  }

  connectedCallback() {
    const year = this.dataset.year;
    const month = this.dataset.month;
    this.year = year;
    this.month = month;
    this.mode_switch.textContent = this.mode === 2 ? this.year : this.month;
  }
}

import sharedState from "./1-sharedState";
let { shared_mode, mode_switch, wheel_container, wheel_items } =
  await sharedState();

import events from "./2-events";
queueMicrotask(() => events(wheel_container, wheel_items));

import styles from "./3-styles";
styles;

import { __policy } from "../../__policy";
