/** @type {"year"|"month"} */
const mode = localStorage.getItem("DateWheel.wheel_mode") ?? "month";

const anchor_date = await getAnchorDate();
const year = anchor_date.getFullYear();
const month = anchor_date.getMonth();
const date = anchor_date.getDate();

export const wheel_state = { mode, year, month, date };

//elementNodes
const mode_switch = document.createElement("button");
const wheel_container = document.createElement("div");
mode_switch.id = "mode_switch";
wheel_container.id = "wheel_container";
wheel_container.tabIndex = 0;

/** @type {HTMLSpanElement[]} */
let wheel_items = new Array(7);
for (let i = 0; i < wheel_items.length; i++) {
  const item = document.createElement("span");
  wheel_items[i] = item;
  wheel_container.appendChild(item);
}

export default async (returnVoid = true) => {
  const { mode, year, month, date } = wheel_state;

  if (mode === "month") {
    //update mode_switch button label
    mode_switch.textContent = String(year);

    //clamp month to 0-11
    let monthIndex = month - 3;
    monthIndex = monthIndex < 0 ? 11 + monthIndex : monthIndex;

    // update dom
    for (const item of wheel_items) {
      monthIndex = monthIndex > 11 ? 0 : monthIndex;

      item.textContent = jsonTable["jsonMonths"][monthIndex][DOC.lang];

      const itemDate = new Date(year, monthIndex, date);
      item.dataset.anchor_date = itemDate.toISOString().slice(0, 10);

      monthIndex++;
    }
  }

  if (mode === "year") {
    mode_switch.textContent = jsonTable["jsonMonths"][month][DOC.lang];
    let yearIndex = year - 3;

    for (const item of wheel_items) {
      item.textContent = String(yearIndex);

      const itemDate = new Date(yearIndex, month, date);
      item.dataset.anchor_date = itemDate.toISOString().slice(0, 10);

      yearIndex++;
    }
  }

  //Must append last for roll logic to work and only once also
  if (!returnVoid) {
    const indicator = document.createElement("span");
    onSafeClick(indicator, selectDate);
    indicator.id = "indicator";
    wheel_container.appendChild(indicator);

    //pointers
    return { mode_switch, wheel_container, wheel_items };
  }
};

import jsonTable from "../../../Shared/markup/jsonTable";
import getAnchorDate from "../../../Shared/Utilities/getAnchorDate";
import { DOC } from "../../../Shared/SAVINGS";
import selectDate from "./functions/selectDate";
import onSafeClick from "../../../Shared/Utilities/onSafeClick";
