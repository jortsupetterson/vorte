import jsonTable from "../../Shared/markup/jsonTable";

let sharedOpen = false;
let sharedMode = 2;
const dropdown = document.createElement("div");
dropdown.id = "dropdown";
dropdown.className = "scroll";

const mode_switch = document.createElement("button");
dropdown.appendChild(mode_switch);

const wheel = document.createElement("div");
wheel.id = "wheel";

let wheelItems = new Array(7);

for (let i = 0; i < wheelItems.length; i++) {
  const item = document.createElement("span");
  item.textContent = i;
  wheelItems[i] = item;
  wheel.appendChild(item);
}

const indicator = document.createElement("span");
indicator.id = "indicator";
wheel.appendChild(indicator);

dropdown.appendChild(wheel);

function rollWheelDown() {
  const item = wheelItems.shift();
  item.remove();
  wheel.insertBefore(item, wheel.lastChild);
  wheelItems = [...wheelItems, item];
}
function rollWheelUp() {
  const item = wheelItems.pop();
  item.remove();
  wheel.insertBefore(item, wheelItems[0]);
  wheelItems = [item, ...wheelItems];
}
export const DATE_WHEEL = "date-wheel";
const ROLL_INTERVAL_MS = 200;
let lastRollTime = 0;

function maybeRoll(direction) {
  const now = performance.now();
  if (now - lastRollTime < ROLL_INTERVAL_MS) return;
  lastRollTime = now;
  if (direction === "down") rollWheelDown();
  else rollWheelUp();
}
// HIIRI
wheel.onwheel = (ev) => {
  ev.preventDefault();
  if (ev.deltaY > 0) maybeRoll("down");
  else maybeRoll("up");
};

// TOUCH
let touchStart = 0;

wheel.ontouchstart = (ev) => {
  touchStart = ev.touches[0].clientY;
};

wheel.ontouchmove = (ev) => {
  const currentY = ev.touches[0].clientY;
  const deltaY = currentY - touchStart;

  if (deltaY > 20) {
    maybeRoll("up");
    touchStart = currentY;
  }
  if (deltaY < -20) {
    maybeRoll("down");
    touchStart = currentY;
  }
};

export class DateWheel extends HTMLButtonElement {
  constructor() {
    super();

    if (sharedOpen) {
      this.appendChild(dropdown);
    }
    const { year, month } = this.dataset;
    this.year = year;
    this.month = month;

    this.mode_switch = mode_switch;

    this.onpointerdown = () => {
      this.open = !this.open;
      if (this.open) this.appendChild(dropdown);
      else this.removeChild(dropdown);
    };

    this.mode_switch.onpointerdown = (event) => {
      event.stopPropagation();
      this.mode = this.mode === 2 ? 1 : 2;
    };

    this.mode = sharedMode;
  }

  get mode() {
    return sharedMode;
  }

  set mode(newMode) {
    sharedMode = newMode;
    this.mode_switch.textContent = newMode === 1 ? this.year : this.month;
  }

  get open() {
    return sharedOpen;
  }

  set open(value) {
    sharedOpen = !!value;
  }
}

style(
  DATE_WHEEL,
  css`
    .killed {
      pointer-events: none;
    }
    [is="${DATE_WHEEL}"] #dropdown {
      position: absolute;
      z-index: 1;
      bottom: -0.2rem;
      left: 50%;
      transform: translate(-50%, 100%);
      background: var(--overlayColor);
      width: clamp(10rem, 200px, 95vw);
      aspect-ratio: 3/4;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      pointer-events: all;
    }

    [is="${DATE_WHEEL}"] #dropdown #wheel {
      height: clamp(80%, 80%, 80%);
      width: 100%;
      position: relative;
      bottom: 0;
      overflow: hidden;
    }
    [is="${DATE_WHEEL}"] #dropdown #wheel > span {
      height: 20%;
      transition: transform 0.2s ease;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      pointer-events: all;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ${(() => {
      let css = "";
      for (let index = 1; index <= 7; index++) {
        const scale =
          0.4 + Math.min(index - 1, 3) * 0.2 - Math.max(index - 4, 0) * 0.2;
        const translate = (index - 2) * 100;
        css += `[is="${DATE_WHEEL}"] #dropdown #wheel span:nth-child(${index}){transform: translateY(${translate}%) scale(${scale});}`;
      }
      return css;
    })()}
    [is="${DATE_WHEEL}"] #dropdown #wheel #indicator {
      transform: translateY(200%);
      background: var(--contentGhostColor);
      border-radius: 0.2rem;
      z-index: -1;
    }
  `
);
import style from "../createHTML/style";
import { __policy } from "../__policy";
