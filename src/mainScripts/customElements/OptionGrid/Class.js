import onSafeClick from "../../../Shared/Utilities/onSafeClick";

export const OPTION_GRID = "option-grid";
export const OPTION_ITEM = "option-item";

export class OptionItem extends HTMLElement {
  static registry = new Set();

  constructor() {
    super();
    OptionItem.registry.add(this);
    this.classList.remove("active");
    onSafeClick(this, () => {
      this.active = true;
    });
  }

  set active(isActive) {
    for (const instance of OptionItem.registry) {
      if (instance !== this && instance.classList.contains("active"))
        instance.classList.remove("active");
    }
    if (isActive) this.classList.add("active");
    else this.classList.remove("active");
  }

  get active() {
    return this.classList.contains("active");
  }
}

export class OptionGrid extends HTMLElement {
  connectedCallback() {
    const options = JSON.parse(this.dataset.options || "[]");
    for (const option of options) {
      const item = document.createElement(OPTION_ITEM);
      item.textContent = option;
      this.appendChild(item);
    }
  }
}

style(
  OPTION_GRID,
  css`
    option-item {
      pointer-events: all;
      background: transparent;
      cursor: pointer;
    }
    option-imem.active {
      cursor: default;
    }
  `
);
