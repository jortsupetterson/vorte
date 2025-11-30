const nonce = await getNonce();
const dashboard = Object.create(null);

function initializeDOM() {
  dashboard.nav = document.body.querySelector("nav");
  dashboard.mascot_img = dashboard.nav.querySelector("img");
  dashboard.nav_list = document.getElementById("nav-list");

  dashboard.article = document.body.querySelector("article");
  dashboard.nav_closer = document.getElementById("nav-closer");
  dashboard.nav_toggler = document.getElementById("nav-toggler");
  dashboard.headline = document.getElementById("headline");
  dashboard.main = article.querySelector("main");
  dashboard.footer = article.querySelector("footer");

  onSafeClick(dashboard.nav_toggler, toggleNav);
  onSafeClick(dashboard.nav_closer, toggleNav);
}

function toggleNav() {
  dashboard.nav.classList.toggle("open");
}

function domUpdateSideEffects() {}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeDOM, { once: true });
} else {
  initializeDOM();
}

import getNonce from "../../../lib/getNonce";
import onSafeClick from "./onSafeClick";
export { nonce, dashboard, toggleNav };
