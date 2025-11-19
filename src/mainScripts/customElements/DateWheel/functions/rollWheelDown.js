/**
 * @param {HTMLDivElement} wheel_container
 * @param {HTMLSpanElement[]} wheel_items
 */

export default (wheel_container, wheel_items) => {
  const item = wheel_items.shift();
  item.remove();

  const last = wheel_items[wheel_items.length - 1];
  const lastMonthNum = Number(last.dataset.monthNum);
  const nextMonthNum = (lastMonthNum + 1) % 12;

  item.dataset.monthNum = String(nextMonthNum);
  item.textContent = jsonTable["jsonMonths"][nextMonthNum][DOC.lang];

  wheel_container.insertBefore(item, wheel_container.lastChild);
  wheel_items.push(item);
};
