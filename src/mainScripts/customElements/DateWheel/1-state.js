/** @type {1|2} */
let shared_mode = localStorage.getItem("DateWheel.shared_mode") ?? 2;

//elementNodes
const mode_switch = document.createElement("button");
const wheel_container = document.createElement("div");
mode_switch.id = "mode_switch";
wheel_container.id = "wheel_container";
wheel_container.tabIndex = 0;

/** @type {HTMLSpanElement[]} */
let wheel_items;

export default async () => {
  wheel_items = new Array(7);

  const anchor_date = await getAnchorDate();

  let monthIndex = anchor_date.getMonth() - 3;
  monthIndex = monthIndex < 0 ? 11 + monthIndex : monthIndex;

  for (let i = 0; i < wheel_items.length; i++) {
    const item = document.createElement("span");
    monthIndex = monthIndex > 11 ? 0 : monthIndex;
    item.textContent = jsonTable["jsonMonths"][monthIndex][DOC.lang];
    item.dataset.year = String(anchor_date.getFullYear());
    item.dataset.monthNum = String(monthIndex);
    wheel_items[i] = item;
    wheel_container.appendChild(item);
    monthIndex++;
  }

  //Must append last for roll logic to work
  const indicator = document.createElement("span");
  indicator.id = "indicator";
  wheel_container.appendChild(indicator);

  return { shared_mode, mode_switch, wheel_container, wheel_items };
};

import jsonTable from "../../../Shared/markup/jsonTable";
import getAnchorDate from "../../../Shared/Utilities/getAnchorDate";
import { DOC } from "../../../Shared/SAVINGS";
