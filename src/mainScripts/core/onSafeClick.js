let downX = 0;
let downY = 0;

/** @type {SafeEvent} */
export default (element, callback, signal = false) => {
  element.addEventListener(
    "pointerdown",
    (event) => {
      downX = event.clientX;
      downY = event.clientY;
    },
    signal
  );
  element.addEventListener(
    "pointerup",
    (event) => {
      const move = Math.hypot(event.clientX - downX, event.clientY - downY);
      if (move > 10) return;
      if (typeof callback === "function") callback(event);
    },
    signal
  );
};
