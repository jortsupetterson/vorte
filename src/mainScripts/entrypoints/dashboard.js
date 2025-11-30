/*
 *=================*
 * CUSTOM ELEMENTS *
 *=================*
 */
import {
  CALENDAR_EVENT_FORM,
  CalendarEventForm,
} from "../customElements/CalendarEventForm/Class.js";
import { DATE_WHEEL, DateWheel } from "../customElements/DateWheel/Class.js";
import {
  OPTION_GRID,
  OPTION_ITEM,
  OptionGrid,
  OptionItem,
} from "../customElements/OptionGrid/Class.js";
import {
  CATEGORY_LIST_ITEM,
  CategoryListItem,
} from "../customElements/CalendarCategoryList/Class.js";
import {
  CALENDAR_CATEGORY_FORM,
  CalendarCategoryForm,
} from "../customElements/CalendarCategoryForm/Class.js";
import { DATE_PICKER, DatePicker } from "../customElements/DatePicker/Class.js";
customElements.define(CALENDAR_EVENT_FORM, CalendarEventForm);
customElements.define(DATE_WHEEL, DateWheel);
customElements.define(OPTION_GRID, OptionGrid);
customElements.define(OPTION_ITEM, OptionItem);
customElements.define(CATEGORY_LIST_ITEM, CategoryListItem);
customElements.define(CALENDAR_CATEGORY_FORM, CalendarCategoryForm);
customElements.define(DATE_PICKER, DatePicker);

/*
 *================*
 * EVENT HANDLERS *
 *================*
 */
import PointerEvent from "../eventHandlers/PointerEvent.js";
import MessageEvent from "../eventHandlers/MessageEvent.js";
import CookiestoreChangeEvent from "../eventHandlers/CookiestoreChangeEvent.js";
import TouchEvent from "../eventHandlers/TouchEvent.js";
PointerEvent;
MessageEvent;
CookiestoreChangeEvent;
TouchEvent;
if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", cacheElements, {
    once: true,
  });
else cacheElements();

/*
 *===========*
 * FUNCTIONS *
 *===========*
 */
import msgToSw from "../functions/msgToSw.js";
import toggleNav from "../functions/toggleNav.js";
import toggleDialog from "../functions/toggleDialog.js";
import removeElement from "../functions/removeElement.js";
export const functions = Object.freeze({
  msgToSw,
  toggleNav,
  toggleDialog,
  removeElement,
});

//OTHER
const searchParams = new URLSearchParams(window.location.search);
export const is_demo = searchParams.has("demo"),
  benchmarks = searchParams.has("benchmarks");
export let t0;

/** @type {{navEl: HTMLElement, mascotEl: HTMLImageElement, articleEl: HTMLElement, articleMain: HTMLElement, articleDialog: HTMLElement }} */
export const element_cache = Object.create(null);
async function cacheElements() {
  element_cache.navEl = document.body.querySelector("nav");
  element_cache.mascotEl = navEl.querySelector("img");
  element_cache.articleEl = document.body.querySelector("article");
  element_cache.articleMain = articleEl.querySelector("main");
  element_cache.articleDialog = articleEl.querySelector("dialog");
}

// PERFORMANCE MEASUREMENT
(async () => {
  if (!benchmarks || typeof PerformanceObserver === "undefined") return;

  queueMicrotask(() => {
    const supported =
      Array.isArray(PerformanceObserver.supportedEntryTypes) &&
      PerformanceObserver.supportedEntryTypes.includes("longtask");
    if (!supported) return;

    let tbtLastMinute = 0;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const blocking = entry.duration - 50;
        if (blocking > 0) tbtLastMinute += blocking;
      }
    });

    try {
      observer.observe({ type: "longtask", buffered: true });
    } catch {
      observer.observe({ entryTypes: ["longtask"] });
    }

    setInterval(() => {
      console.log("[benchmarks] TBT last 60s (ms):", tbtLastMinute.toFixed(1));
      tbtLastMinute = 0;
    }, 60_000);
  });
})();
