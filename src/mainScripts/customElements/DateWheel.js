import jsonTable from "../../Shared/markup/jsonTable";
import getAnchorDate from "../../Shared/Utilities/getAnchorDate";

let sharedOpen = false;
let sharedMode = 2;
const dropdown = document.createElement("div");
dropdown.id = "dropdown";

const mode_switch = document.createElement("button");
dropdown.appendChild(mode_switch);

const wheel = document.createElement("div");
wheel.id = "wheel";

let wheelItems = new Array(7);

(async () => {
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
})();

function rollWheelDown() {
  const item = wheelItems.shift();
  item.remove();

  const last = wheelItems[wheelItems.length - 1];
  const lastMonthNum = Number(last.dataset.monthNum);
  const nextMonthNum = (lastMonthNum + 1) % 12;

  item.dataset.monthNum = String(nextMonthNum);
  item.textContent = jsonTable["jsonMonths"][nextMonthNum][DOC.lang];

  wheel.insertBefore(item, wheel.lastChild);
  wheelItems.push(item);
}

function rollWheelUp() {
  const item = wheelItems.pop();
  item.remove();

  const first = wheelItems[0];
  const firstMonthNum = Number(first.dataset.monthNum);
  const prevMonthNum = (firstMonthNum + 11) % 12;

  item.dataset.monthNum = String(prevMonthNum);
  item.textContent = jsonTable["jsonMonths"][prevMonthNum][DOC.lang];

  wheel.insertBefore(item, wheelItems[0]);
  wheelItems.unshift(item);
}

export const DATE_WHEEL = "date-wheel";
const ROLL_INTERVAL_MS = 100;
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
      justify-content: space-evenly;
      align-items: center;
      pointer-events: all;
    }

    [is="${DATE_WHEEL}"] #dropdown #wheel {
      height: clamp(60%, 60%, 60%);
      width: 80%;
      position: relative;
      bottom: 0;
      overflow: hidden;
      mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        var(--overlayColor) 40%,
        var(--overlayColor) 60%,
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        var(--overlayColor) 40%,
        var(--overlayColor) 60%,
        transparent 100%
      );
    }
    [is="${DATE_WHEEL}"] #dropdown #wheel > span {
      height: 20%;
      transition: transform 0.3s ease, opacity 0.3s ease;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      pointer-events: all;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.75;
    }

    ${(() => {
      let css = "";
      for (let index = 1; index <= 7; index++) {
        const scale =
          0.4 + Math.min(index - 1, 3) * 0.2 - Math.max(index - 4, 0) * 0.2;

        const baseTranslate = (index - 2) * 100;
        const distanceFromCenter = index - 4;
        const direction =
          distanceFromCenter === 0 ? 0 : distanceFromCenter < 0 ? 1 : -1;
        const offset = (1 - scale) * 50 * direction;

        const translate = baseTranslate + offset;
        const rotate = (index - 4) * 22.5;

        css += `[is="${DATE_WHEEL}"] #dropdown #wheel span:nth-child(${index}){transform: translateY(${translate}%) scale(${scale}) rotateX(${rotate}deg);} `;
      }
      return css;
    })()}

    [is="${DATE_WHEEL}"] #dropdown #wheel span:nth-child(4) {
      opacity: 1;
    }

    [is="${DATE_WHEEL}"] #dropdown #wheel #indicator {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: var(--contentGhostColor);
      border-radius: 0.2rem;
      height: 15%;
      width: 80%;
      z-index: -1;
    }
  `
);
import style from "../createHTML/style";
import { __policy } from "../__policy";
import { DOC } from "../../Shared/SAVINGS";
