let activeOverlayElement = null;

export const functions = {
  /**
   * @param {object} msg
   * @param {string} msg.name Specifies which function to run on the ServiceWorker
   * @param {{ isDemo?: boolean } | object} [msg.params] Optional params forwarded to the function
   * @returns {void} Sends a message to the ServiceWorker to invoke an async remote procedure call
   */
  msgToSw: (msg) =>
    navigator.serviceWorker.controller.postMessage(
      (() => {
        msg.params.isDemo = isDemo;
        return msg;
      })()
    ),
  setLocation: ({ location }) => (window.location.href = location),
  toggleNav: () => {
    const result = navEl.classList.toggle("open");
    cookieStore.set({ name: "navStatus", value: result, expires: NOWplusYEAR });
  },
  toggleDateWheel: async () => {
    let wheel = articleMain.querySelector("date-wheel");
    if (wheel) {
      wheel.remove();
      if (activeOverlayElement) activeOverlayElement = null;
    } else {
      let anchor_date = await getAnchorDate();
      let overlayElement = new DateWheel(
        anchor_date.getFullYear(),
        anchor_date.getMonth()
      );
      if (activeOverlayElement) activeOverlayElement.remove();
      articleMain.appendChild(overlayElement);
      activeOverlayElement = overlayElement;
      overlayElement.querySelector("#wheel_container").focus();
    }
  },
  toggleCalendarEventForm: () => {
    let form = articleMain.querySelector("calendar-event-form");
    if (form) {
      form.remove();
      if (activeOverlayElement) activeOverlayElement = null;
    } else {
      let overlayElement = new CalendarEventForm();
      if (activeOverlayElement) activeOverlayElement.remove();
      articleMain.appendChild(overlayElement);
      activeOverlayElement = overlayElement;
    }
  },
};

//universal clicks
onSafeClick(document, async (event) => {
  const dataStr = event.target.dataset.fn;
  if (!dataStr) return;
  const { name, params } = JSON.parse(dataStr);
  functions[name](params ?? null);

  //side-effects
  const msg = params?.params ?? null;

  if (name === "msgToSw" && msg.components.includes("nav ul")) {
    const viewName = msg.viewName;
    const cut = viewName.indexOf("_");
    const base = cut === -1 ? viewName : viewName.slice(0, cut);
    const newMascotSource = `/images/${document.body.dataset.mascotname}/${base}.webp`;
    if (newMascotSource !== mascotEl.src) {
      mascotEl.src = newMascotSource;
    }
    cookieStore.set({
      name: "navId",
      value: msg.viewName,
      expires: NOWplusYEAR,
    });
  }

  if (name === "msgToSw" && msg.components.includes("article main")) {
    if (mQ.matches && navEl.classList.contains("open")) functions.toggleNav();
    const currentlyActive = navEl.querySelector("ul [data-fn].active");
    if (currentlyActive?.id !== msg.viewName) {
      currentlyActive?.classList.remove("active");
    }
    navEl
      .querySelector(`ul [data-fn]#${msg.viewName}`)
      ?.classList.add("active");

    cookieStore.set({
      name: "articleId",
      value: msg.viewName,
      expires: NOWplusYEAR,
    });
  }
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

const mQ = window.matchMedia("(max-width: 548px)");
const isDemo = new URLSearchParams(window.location.search).has("demo");

export let navEl, mascotEl, articleEl, articleMain;

async function cacheElements() {
  navEl = document.body.querySelector("nav");
  mascotEl = navEl.querySelector("img");
  articleEl = document.body.querySelector("article");
  articleMain = articleEl.querySelector("main");
}

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", cacheElements, { once: true });
else cacheElements();

import { NOWplusYEAR } from "../Shared/CONFIG";
import onSafeClick from "../Shared/Utilities/onSafeClick.js";
import getAnchorDate from "../Shared/Utilities/getAnchorDate.js";
import renderRecievedResource from "./eventHandlers/serviceWorker/renderRecievedResource";
renderRecievedResource;

import { ColorInput } from "./customElements/ColorInput";
customElements.define("color-input", ColorInput, { extends: "input" });
import { CalendarEventForm } from "./customElements/CalendarEventForm";
customElements.define("calendar-event-form", CalendarEventForm);
import { DATE_WHEEL, DateWheel } from "./customElements/DateWheel/Class.js";
import isThisDate from "../Shared/Utilities/Time/isThisDate.js";
customElements.define(DATE_WHEEL, DateWheel);
