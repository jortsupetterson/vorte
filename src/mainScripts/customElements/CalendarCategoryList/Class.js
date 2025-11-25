export const CATEGORY_LIST_ITEM = "category-list-item";

export class CategoryListItem extends HTMLElement {
  connectedCallback() {
    const controls = document.createElement("div");
    controls.id = "controls";

    const { id, name, color } = this.dataset;

    let i = 0;
    for (const label of [
      {
        fi: "muokkaa",
        sv: "redigera",
        en: "edit",
      }[DOC.lang],
      {
        fi: "poista",
        sv: "ta bort",
        en: "delete",
      }[DOC.lang],
    ]) {
      const button = document.createElement("button");
      i === 1 ? (button.id = "del") : (button.id = "edit");
      button.textContent = label;
      onSafeClick(button, () => {
        if (button.id === "del") {
          functions.msgToSw({
            type: "storage",
            params: {
              namespace: "CalendarObject",
              operation: "delete",
              path: ["config", "categories", "id"],
              search: id,
            },
          });
          this.remove();
        } else {
          functions.toggleDialog({
            tag: "calendar-category-form",
            dataset: { type: "edit", id, name, color },
          });
        }
      });
      controls.appendChild(button);
      i++;
    }

    this.appendChild(controls);
  }
}
import { DOC } from "../../../Shared/SAVINGS";
import onSafeClick from "../../../Shared/Utilities/onSafeClick";
import { functions } from "../../script";
