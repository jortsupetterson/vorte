/**
 * @param {HTMLDivElement} wheel_container
 * @param {HTMLSpanElement[]} wheel_items
 */

export default (shared_mode, wheel_container, wheel_items) => {
  const item = wheel_items.pop();
  item.remove();

  const first = wheel_items[0];
  const firstMonthNum = Number(first.dataset.monthNum);
  const prevMonthNum = (firstMonthNum + 11) % 12;

  item.dataset.monthNum = String(prevMonthNum);
  item.textContent = jsonTable["jsonMonths"][prevMonthNum][DOC.lang];

  wheel_container.insertBefore(item, wheel_items[0]);
  wheel_items.unshift(item);
};

import jsonTable from "../../../../Shared/markup/jsonTable";
import { DOC } from "../../../../Shared/SAVINGS";
