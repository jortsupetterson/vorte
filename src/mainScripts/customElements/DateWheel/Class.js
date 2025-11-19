export const DATE_WHEEL = "date-wheel";
export class DateWheel extends HTMLElement {
  constructor() {
    super();

    if (sharedOpen) {
      this.appendChild(dropdown);
    }
    this.mode_switch = mode_switch;

    this.appendChild(dropdown);

    this.mode_switch.onpointerdown = (event) => {
      event.stopPropagation();
      this.mode = this.mode === 2 ? 1 : 2;
    };

    this.mode = sharedMode;
  }

  get mode() {
    return sharedMode;
  }

  set mode(newMode) {
    sharedMode = newMode;
    this.mode_switch.textContent = newMode === 1 ? this.year : this.month;
  }

  get open() {
    return sharedOpen;
  }

  set open(value) {
    sharedOpen = !!value;
  }

  connectedCallback() {
    const year = this.dataset.year;
    const month = this.dataset.month;
    this.year = year;
    this.month = month;
    this.mode_switch.textContent = this.mode === 2 ? this.year : this.month;
  }
}

import state from "./1-state";
let { sharedMode, sharedOpen, dropdown, mode_switch } = await sharedState;

import events from "./2-events";
events(wheel);

import styles from "./3-styles";
styles;

import { __policy } from "../../__policy";
