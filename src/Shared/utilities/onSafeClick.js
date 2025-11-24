let downX = 0;
let downY = 0;
/**
 * @param {HTMLElement} element
 * @param {Function} callback
 */
export default (element, callback) => {
  element.onpointerdown = (event) => {
    downX = event.clientX;
    downY = event.clientY;
  };
  element.onpointerup = (event) => {
    const move = Math.hypot(event.clientX - downX, event.clientY - downY);
    if (move > 10) return;
    if (typeof callback === "function") callback(event);
  };
};
