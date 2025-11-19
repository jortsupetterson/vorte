/**
 * @param {"year"|"month"} wheel_mode
 * @param {HTMLDivElement} wheel_container
 * @param {HTMLSpanElement[]} wheel_items
 * @returns {void}
 */
export default (wheel_mode, wheel_container, wheel_items) => {
  const item = wheel_items.shift();
  item.remove();

  const last = wheel_items[wheel_items.length - 1];
  const anchor_date = new Date(last.dataset.anchor_date);
  const year = anchor_date.getUTCFullYear();
  const month = anchor_date.getUTCMonth();
  const date = anchor_date.getUTCDate();

  if (wheel_mode === "month") {
    const nextMonthNum = (month + 1) % 12;
    const nextDate = new Date(year, nextMonthNum, date);
    item.dataset.anchor_date = nextDate.toISOString().slice(0, 10);
    item.textContent = jsonTable["jsonMonths"][nextMonthNum][DOC.lang];
  }

  if (wheel_mode === "year") {
    const nextYearNum = year + 1;
    const nextDate = new Date(nextYearNum, month, date);
    item.dataset.anchor_date = nextDate.toISOString().slice(0, 10);
    item.textContent = String(nextYearNum);
  }

  wheel_container.insertBefore(item, wheel_container.lastChild);
  wheel_items.push(item);
};

import jsonTable from "../../../../Shared/markup/jsonTable";
import { DOC } from "../../../../Shared/SAVINGS";
