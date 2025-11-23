export const DATE_WHEEL = "date-wheel";
export class DateWheel extends HTMLElement {
  connectedCallback() {
    this.appendChild(mode_switch);
    this.appendChild(wheel_container);
  }
}

import updateState from "./1-state";
let { mode_switch, wheel_container, wheel_items } = await updateState(false);

import events from "./2-events";
queueMicrotask(() => events(mode_switch, wheel_container, wheel_items));

import styles from "./3-styles";
styles;

import { __policy } from "../../__policy";
