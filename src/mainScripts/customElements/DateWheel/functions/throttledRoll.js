let lastRollTime = 0;
const ROLL_INTERVAL_MS = 100;

/**
 * @param {"up"|"down"} roll_direction
 * @param {1|2} wheel_mode
 * @param {HTMLDivElement} wheel_container
 * @param {HTMLSpanElement[]} wheel_items
 * @returns {void} Updates DOM order of the DateWheel resulting in a smooth scroll effect due to nth:child() CSS rules
 */

export default (roll_direction, wheel_mode, wheel_container, wheel_items) => {
  const now = performance.now();
  if (now - lastRollTime < ROLL_INTERVAL_MS) return;
  lastRollTime = now;

  if (roll_direction === "down")
    rollWheelDown(wheel_mode, wheel_container, wheel_items);
  else rollWheelUp(wheel_mode, wheel_container, wheel_items);
};

import rollWheelDown from "./rollWheelDown";
import rollWheelUp from "./rollWheelUp";
