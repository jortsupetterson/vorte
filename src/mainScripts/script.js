export const functions = {
  msgToSw: (msg) =>
    navigator.serviceWorker.controller.postMessage(
      (() => {
        msg.params.isDemo = isDemo;
        return msg;
      })()
    ),
  toggleNav: () => document.body.querySelector("nav").classList.toggle("open"),
};

document.addEventListener("pointerup", async (event) => {
  const data = JSON.parse(event.target.dataset.fn);
  functions[data.name](data.params ?? null);

  //side-effects
  if (
    data.type === "navigate" &&
    mQ.matches &&
    document.body.querySelector("nav").classList.contains("open")
  ) {
    functions.toggleNav();
  }
});

const mQ = window.matchMedia("(max-width: 548px)");
const isDemo = new URLSearchParams(window.location.search).has("demo");

import renderRecievedResource from "./eventHandlers/serviceWorker/renderRecievedResource";
renderRecievedResource;
