let lastRollTime = 0;
const ROLL_INTERVAL_MS = 100;

/**
 * @param {"up"|"down"} direction
 * @param {HTMLDivElement} wheel_container
 * @param {HTMLSpanElement[]} wheel_items
 */

export default (direction, wheel_container, wheel_items) => {
  const now = performance.now();
  if (now - lastRollTime < ROLL_INTERVAL_MS) return;
  lastRollTime = now;
  if (direction === "down") rollWheelDown(wheel_container, wheel_items);
  else rollWheelUp(wheel_container, wheel_items);
};
import rollWheelDown from "./rollWheelDown";
import rollWheelUp from "./rollWheelUp";
