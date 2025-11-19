export default (wheel) => {
  // MOUSE_WHEEL
  wheel.onwheel = (ev) => {
    ev.preventDefault();
    if (ev.deltaY > 0) maybeRoll("down");
    else maybeRoll("up");
  };

  // TOUCH
  let touchStart = 0;

  wheel.ontouchstart = (ev) => {
    touchStart = ev.touches[0].clientY;
  };

  wheel.ontouchmove = (ev) => {
    const currentY = ev.touches[0].clientY;
    const deltaY = currentY - touchStart;

    if (deltaY > 20) {
      maybeRoll("up");
      touchStart = currentY;
    }
    if (deltaY < -20) {
      maybeRoll("down");
      touchStart = currentY;
    }
  };
};
import throttledRoll from "./functions/throttledRoll";
