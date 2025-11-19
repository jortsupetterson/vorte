/**
 * @param {"year"|"month"} wheel_mode
 * @param {HTMLDivElement} wheel_container
 * @param {HTMLSpanElement[]} wheel_items
 * @returns {void}
 */
export default (wheel_mode, wheel_container, wheel_items) => {
  const item = wheel_items.pop();
  item.remove();

  const first = wheel_items[0];
  const anchor_date = new Date(first.dataset.anchor_date);
  const year = anchor_date.getUTCFullYear();
  const month = anchor_date.getUTCMonth();
  const date = anchor_date.getUTCDate();

  if (wheel_mode === "month") {
    const prevMonthNum = (month + 11) % 12;
    const prevDate = new Date(year, prevMonthNum, date);
    item.dataset.anchor_date = prevDate.toISOString().slice(0, 10);
    item.textContent = jsonTable["jsonMonths"][prevMonthNum][DOC.lang];
  }

  if (wheel_mode === "year") {
    const prevYearNum = year - 1;
    const prevDate = new Date(prevYearNum, month, date);
    item.dataset.anchor_date = prevDate.toISOString().slice(0, 10);
    item.textContent = String(prevYearNum);
  }

  wheel_container.insertBefore(item, wheel_items[0]);
  wheel_items.unshift(item);
};

import jsonTable from "../../../../Shared/markup/jsonTable";
import { DOC } from "../../../../Shared/SAVINGS";
