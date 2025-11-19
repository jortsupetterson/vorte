export const functions = {
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
    wheel
      ? wheel.remove()
      : articleMain.appendChild(
          new DateWheel(
            (await getAnchorDate()).getFullYear(),
            (await getAnchorDate()).getMonth()
          )
        );
  },
  toggleCalendarEventForm: () => {
    let form = articleMain.querySelector("calendar-event-form");
    form ? form.remove() : articleMain.appendChild(new CalendarEventForm());
  },
};

//universal clicks
let downX = 0;
let downY = 0;
document.onpointerdown = (event) => {
  downX = event.clientX;
  downY = event.clientY;
};
document.onpointerup = async (event) => {
  const move = Math.hypot(event.clientX - downX, event.clientY - downY);
  if (move > 10) return;

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
};

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
import getAnchorDate from "../Shared/Utilities/getAnchorDate.js";
import renderRecievedResource from "./eventHandlers/serviceWorker/renderRecievedResource";
renderRecievedResource;

import { ColorInput } from "./customElements/ColorInput";
customElements.define("color-input", ColorInput, { extends: "input" });
import { CalendarEventForm } from "./customElements/CalendarEventForm";
customElements.define("calendar-event-form", CalendarEventForm);
import { DATE_WHEEL, DateWheel } from "./customElements/DateWheel/Class.js";
customElements.define(DATE_WHEEL, DateWheel);
