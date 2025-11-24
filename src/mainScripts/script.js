export const functions = Object.freeze({
  msgToSw,
  setLocation: ({ location }) => (window.location.href = location),
  toggleNav: () => {
    const result = navEl.classList.toggle("open");
    cookieStore.set({ name: "navStatus", value: result, expires: NOWplusYEAR });
  },
  toggleDialog: ({ tag, dataset }) => {
    if (
      !articleDialog.firstChild ||
      articleDialog.firstChild.tagName.toLowerCase() !== tag
    ) {
      const el = document.createElement(tag);
      articleDialog.replaceChildren(el);
      if (!articleDialog.open) articleDialog.open = true;
    } else articleDialog.open = !articleDialog.open;
  },
  removeElement: ({}) => {},
});

//universal clicks
onSafeClick(document, async (event) => {
  const dataStr = event.target.dataset.fn;
  if (!dataStr) return;
  const { name, params } = JSON.parse(dataStr);
  functions[name](params ?? null);
});

//mobile swipes
let startX;
document.ontouchstart = (event) => (startX = event.touches[0].clientX);
document.ontouchend = (event) => {
  let open = navEl.classList.contains("open");
  const difference = event.changedTouches[0].clientX - startX;
  if (!open && difference > 100) functions.toggleNav();
  else if (open && difference < -100) functions.toggleNav();
};

//keyboard clicks
document.onkeydown = (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    functions.toggleNav();
  }
};

cookieStore.onchange = async (ev) => {
  if (articleEl.id.includes("calendar")) {
    const btn = document.getElementById("backToThisDay"),
      isToday = await isThisDate();
    if (btn && isToday) {
      btn.disabled = true;
    } else if (btn && !isToday) {
      btn.disabled = false;
    }
  }
};

export const isDemo = new URLSearchParams(window.location.search).has("demo");

/** @type {HTMLElement[]} */
export let [navEl, mascotEl, articleEl, articleMain, articleDialog] = [];

async function cacheElements() {
  navEl = document.body.querySelector("nav");
  mascotEl = navEl.querySelector("img");
  articleEl = document.body.querySelector("article");
  articleMain = articleEl.querySelector("main");
  articleDialog = articleEl.querySelector("dialog");
}

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", cacheElements, { once: true });
else cacheElements();

import { ColorInput } from "./customElements/ColorInput";
customElements.define("color-input", ColorInput, { extends: "input" });

import {
  CALENDAR_EVENT_FORM,
  CalendarEventForm,
} from "./customElements/CalendarEventForm/Class.js";
customElements.define(CALENDAR_EVENT_FORM, CalendarEventForm);

import { DATE_WHEEL, DateWheel } from "./customElements/DateWheel/Class.js";
customElements.define(DATE_WHEEL, DateWheel);

import {
  OPTION_GRID,
  OPTION_ITEM,
  OptionGrid,
  OptionItem,
} from "./customElements/OptionGrid/Class.js";
customElements.define(OPTION_GRID, OptionGrid);
customElements.define(OPTION_ITEM, OptionItem);

import {
  CATEGORY_LIST_ITEM,
  CategoryListItem,
} from "./customElements/CalendarCategoryList/Class.js";
customElements.define(CATEGORY_LIST_ITEM, CategoryListItem);

import {
  CALENDAR_CATEGORY_FORM,
  CalendarCategoryForm,
} from "./customElements/CalendarCategoryForm/Class.js";
customElements.define(CALENDAR_CATEGORY_FORM, CalendarCategoryForm);

import { NOWplusYEAR } from "../Shared/CONFIG";
import onSafeClick from "../Shared/Utilities/onSafeClick.js";
import isThisDate from "../Shared/Utilities/Time/isThisDate.js";
import renderRecievedResource from "./eventHandlers/serviceWorker/renderRecievedResource";
renderRecievedResource;
import msgToSw from "./functions/msgToSw.js";
