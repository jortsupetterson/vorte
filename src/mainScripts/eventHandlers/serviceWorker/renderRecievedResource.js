export default (async () => {
  navigator.serviceWorker.addEventListener("message", async ({ data }) => {
    const { CSSSelector, JSON, viewName, isDemo } = data;
    const constructor = HTMLConstructors[CSSSelector];
    const html = await constructor(
      JSON,
      document.documentElement.lang,
      viewName,
      isDemo
    );
    schedule(CSSSelector, html);
    if (CSSSelector === "nav ul") {
      navEl.id = viewName;
    }
    if (CSSSelector === "article main") {
      articleEl.id = viewName;
    }
  });
})();

const HTMLConstructors = {
  "nav ul": nav_ul_html,
  "article main": article_main_html,
  "article header h1": article_header_h1_html,
  "article footer": article_footer_html,
};

// Optimized DOM ops
const elCache = new Map();
function getEl(sel) {
  const el = elCache.get(sel);
  if (el && document.contains(el)) return el;
  const found = document.body.querySelector(sel);
  if (found) elCache.set(sel, found);
  return found;
}

const renderQueue = new Map();
let queued = false;
function schedule(sel, html) {
  renderQueue.set(sel, html);
  if (!queued) {
    queued = true;
    queueMicrotask(flush);
  }
}
function flush() {
  for (const [sel, html] of renderQueue) {
    const el = getEl(sel);
    if (el) patchHTML(el, html);
  }
  renderQueue.clear();
  queued = false;
}

const __last = new WeakMap();
const __rx = /[<>&]/;
const __range = document.createRange();
const __tpl = document.createElement("template");
function patchHTML(target, html) {
  const next = html + "";
  if (__last.get(target) === next) return;
  if (!__rx.test(next)) {
    target.textContent = next;
    __last.set(target, next);
    return;
  }
  __range.selectNodeContents(target);
  const frag = __range.createContextualFragment
    ? __range.createContextualFragment(next)
    : ((__tpl.innerHTML = next), __tpl.content.cloneNode(true));
  target.replaceChildren(frag);
  __last.set(target, next);
}
import article_footer_html from "../../../Shared/HTMLConstructors/article_footer_html";
import article_header_h1_html from "../../../Shared/HTMLConstructors/article_header_h1_html";
import article_main_html from "../../../Shared/HTMLConstructors/article_main_html";
import nav_ul_html from "../../../Shared/HTMLConstructors/nav_ul_html";
import { navEl, articleEl } from "../../script";
