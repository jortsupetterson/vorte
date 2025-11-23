export const OPTION_GRID = "option-grid";
export const OPTION_ITEM = "option-item";

export class OptionItem extends HTMLElement {
  connectedCallback() {
    if (this.hasAttribute("selected")) {
      this.classList.add("selected");
    }

    onSafeClick(this, () => {
      const value = !this.selected;
      functions.msgToSw({
        type: "storage",
        params: {
          namespace: "CalendarObject",
          operation: "update",
          path: ["config", this.parentElement.id, this.id],
          value,
        },
      });
      this.selected = value;
    });
  }

  set selected(isSelected) {
    if (isSelected && this.parentElement.dataset.mode === "single") {
      for (const instance of this.parentElement.children) {
        if (instance !== this && instance.classList.contains("selected")) {
          instance.classList.remove("selected");
          functions.msgToSw({
            type: "storage",
            params: {
              namespace: "CalendarObject",
              operation: "update",
              path: ["config", instance.parentElement.id, instance.id],
              value: false,
            },
          });
        }
      }
    }

    if (isSelected) {
      this.classList.add("selected");
    } else {
      this.classList.remove("selected");
    }
  }

  get selected() {
    return this.classList.contains("selected");
  }
}

export class OptionGrid extends HTMLElement {
  connectedCallback() {
    const options = JSON.parse(this.dataset.options || "[]");
    for (const option of options) {
      /** @type {OptionItem} */
      const item = document.createElement(OPTION_ITEM);
      item.id = option.id;
      item.textContent = option.label;

      if (option.selected) {
        item.setAttribute("selected", "");
      }
      this.appendChild(item);
    }
  }
}

style(
  OPTION_GRID,
  css`
    option-grid {
      display: flex;
      justify-content: space-evenly;
      align-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      gap: 1rem;
    }

    option-item {
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: all;
      background: transparent;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: small;
      font-weight: 300;
      flex: 1;
    }

    option-item.selected {
      background: var(--accentGhostColor);
    }

    @scope (option-grid[data-mode="single"]) {
      option-item.selected {
        pointer-events: none;
      }
    }
  `
);

import onSafeClick from "../../../Shared/Utilities/onSafeClick";
import style from "../../createHTML/style";
import { functions } from "../../script";
