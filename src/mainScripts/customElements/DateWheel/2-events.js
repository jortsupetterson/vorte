/**
 * @param {HTMLButtonElement} mode_switch
 * @param {HTMLDivElement} wheel_container
 * @param {HTMLSpanElement[]} wheel_items
 * @returns {void} Attaches events to the DateWheel component
 */
export default (mode_switch, wheel_container, wheel_items) => {
  //MODE_SWICTH
  mode_switch.onpointerdown = () => {
    wheel_state.mode = wheel_state.mode === "month" ? "year" : "month";
    updateState(true);
    localStorage.setItem("DateWheel.wheel_mode", wheel_state.mode);
  };

  // MOUSE_WHEEL
  wheel_container.onwheel = (ev) => {
    ev.preventDefault();
    if (ev.deltaY > 0)
      throttledRoll("down", wheel_state.mode, wheel_container, wheel_items);
    else throttledRoll("up", wheel_state.mode, wheel_container, wheel_items);
  };

  // TOUCH
  let touchStart = 0;

  wheel_container.ontouchstart = (ev) => {
    touchStart = ev.touches[0].clientY;
  };

  wheel_container.ontouchmove = (ev) => {
    const currentY = ev.touches[0].clientY;
    const deltaY = currentY - touchStart;

    if (deltaY > 20) {
      throttledRoll("up", wheel_state.mode, wheel_container, wheel_items);
      touchStart = currentY;
    }
    if (deltaY < -20) {
      throttledRoll("down", wheel_state.mode, wheel_container, wheel_items);
      touchStart = currentY;
    }
  };

  wheel_container.onkeydown = (ev) => {
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      throttledRoll("down", wheel_state.mode, wheel_container, wheel_items);
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      throttledRoll("up", wheel_state.mode, wheel_container, wheel_items);
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      selectDate();
    }
    if (ev.key === "Alt") {
      ev.preventDefault();
      wheel_state.mode = wheel_state.mode === "month" ? "year" : "month";
      updateState(true);
      localStorage.setItem("DateWheel.wheel_mode", wheel_state.mode);
    }
  };
};

import throttledRoll from "./functions/throttledRoll";
import updateState, { wheel_state } from "./1-state";
import selectDate from "./functions/selectDate";
