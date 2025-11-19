export const DATE_WHEEL = "date-wheel";
export class DateWheel extends HTMLElement {
  /**
   * @param {number} year
   * @param {number} month 0-11
   */
  constructor(year, month) {
    super();
    this.appendChild(mode_switch);
    this.appendChild(wheel_container);

    this.dataset.year = year;
    this.dataset.month = month;

    /** @param {PointerEvent} ev */
    mode_switch.onpointerdown = (ev) => {
      ev.stopPropagation();
      this.mode = this.mode === 2 ? 1 : 2;
    };

    this.mode = shared_mode;
  }

  get mode() {
    return shared_mode;
  }

  set mode(newMode) {
    shared_mode = newMode;
    mode_switch.textContent = newMode === 1 ? "2025" : "6";
  }
}

import sharedState from "./1-state";
let { shared_mode, mode_switch, wheel_container, wheel_items } =
  await sharedState();

import events from "./2-events";
queueMicrotask(() => events(wheel_container, wheel_items));

import styles from "./3-styles";
styles;

import { __policy } from "../../__policy";
