export const functions = {
  messageToServiceWorker: (msg) =>
    navigator.serviceWorker.controller.postMessage(msg),
  toggleNavigation: () =>
    document.body.querySelector("nav").classList.toggle("open"),
};

document.addEventListener("pointerup", async (event) => {
  const data = JSON.parse(event.target.dataset.fn);
  functions[data.name](data.params);

  //side-effects
  if (
    data.type === "navigate" &&
    mQ.matches &&
    document.body.querySelector("nav").classList.contains("open")
  ) {
    functions.toggleNavigation();
  }
});

const mQ = window.matchMedia("(max-width: 548px)");

import serviceWorker from "./eventHandlers/serviceWorker";
serviceWorker;
