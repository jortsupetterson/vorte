export default (async () => {
  let sharedOpen = false;
  let sharedMode = 2;
  const dropdown = document.createElement("div");
  dropdown.id = "dropdown";

  const mode_switch = document.createElement("button");
  mode_switch.id = "mode_switch";
  dropdown.appendChild(mode_switch);

  const wheel = document.createElement("div");
  wheel.id = "wheel";

  let wheelItems = new Array(7);

  const anchor_date = await getAnchorDate();
  let monthIndex = anchor_date.getMonth() - 3;
  monthIndex = monthIndex < 0 ? 11 + monthIndex : monthIndex;

  for (let i = 0; i < wheelItems.length; i++) {
    const item = document.createElement("span");
    monthIndex = monthIndex > 11 ? 0 : monthIndex;
    item.textContent = jsonTable["jsonMonths"][monthIndex][DOC.lang];
    item.dataset.monthNum = String(monthIndex);
    wheelItems[i] = item;
    wheel.appendChild(item);
    monthIndex++;
  }

  const indicator = document.createElement("span");
  indicator.id = "indicator";
  wheel.appendChild(indicator);

  dropdown.appendChild(wheel);
  return { sharedMode, sharedOpen, dropdown, mode_switch };
})();

import jsonTable from "../../../Shared/markup/jsonTable";
import getAnchorDate from "../../../Shared/Utilities/getAnchorDate";
import { DOC } from "../../../Shared/SAVINGS";
