/**
 * @param {object} msg
 * @param {"render"|"storage"} msg.type Specifies which function to run on the ServiceWorker
 * @param {{ isDemo?: boolean } | object} [msg.params] Optional params forwarded to the function
 * @returns {void} Sends a message to the ServiceWorker to invoke an async remote procedure call
 */
export default (msg) => {
  msg.params.isDemo = isDemo;
  navigator.serviceWorker.controller.postMessage(msg);

  //side-effect
  if (msg.type === "render") {
    if (msg.params.components.includes("nav ul")) {
      const viewName = msg.params.viewName;
      const cut = viewName.indexOf("_");
      const base = cut === -1 ? viewName : viewName.slice(0, cut);
      const newMascotSource = `/images/${document.body.dataset.mascotname}/${base}.webp`;
      if (newMascotSource !== mascotEl.src) {
        mascotEl.src = newMascotSource;
      }
      cookieStore.set({
        name: "navId",
        value: msg.params.viewName,
        expires: NOWplusYEAR,
      });
    }

    if (msg.params.components.includes("article main")) {
      articleDialog.open = false;
      if (mQ.matches && navEl.classList.contains("open")) functions.toggleNav();
      const currentlyActive = navEl.querySelector("ul [data-fn].active");
      if (currentlyActive?.id !== msg.params.viewName) {
        currentlyActive?.classList.remove("active");
      }
      navEl
        .querySelector(`ul [data-fn]#${msg.params.viewName}`)
        ?.classList.add("active");

      cookieStore.set({
        name: "articleId",
        value: msg.params.viewName,
        expires: NOWplusYEAR,
      });
    }
  }
};
const mQ = window.matchMedia("(max-width: 548px)");
import { functions, isDemo, articleDialog, navEl, mascotEl } from "../script";
import { NOWplusYEAR } from "../../Shared/CONFIG";
