/**
 * @param {HTMLDivElement} wheel_container
 * @param {HTMLSpanElement[]} wheel_items
 * @returns {void} Attaches events to the DateWheel component
 */
export default (wheel_container, wheel_items) => {
  // MOUSE_WHEEL
  wheel_container.onwheel = (ev) => {
    ev.preventDefault();
    if (ev.deltaY > 0) throttledRoll("down", wheel_container, wheel_items);
    else throttledRoll("up", wheel_container, wheel_items);
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
      throttledRoll("up", wheel_container, wheel_items);
      touchStart = currentY;
    }
    if (deltaY < -20) {
      throttledRoll("down", wheel_container, wheel_items);
      touchStart = currentY;
    }
  };

  wheel_container.onpointerenter = () => wheel_container.focus();
  wheel_container.onkeydown = (ev) => {
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      throttledRoll("down", wheel_container, wheel_items);
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      throttledRoll("up", wheel_container, wheel_items);
    }
  };
};

import throttledRoll from "./functions/throttledRoll";
