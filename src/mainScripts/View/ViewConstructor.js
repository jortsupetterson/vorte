const frag = new DocumentFragment();
import structMenu from "./ViewMenu/MenuConstructor";
import structPanel from "./ViewPanel/PanelConstructor";

export const menu = structMenu();
const panel = structPanel();

const append = async () => {
  frag.append(await menu, await panel);
  document.body.append(frag);
  requestAnimationFrame(() => {
    performance.mark("ready");
    performance.measure("start→ready", "start", "ready");
    const d = performance.getEntriesByName("start→ready").at(-1).duration;
    console.log("[ready]", d.toFixed(2), "ms");
    performance.clearMarks("ready");
    performance.clearMeasures("start→ready");
  });
};

const structView = async () => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", append, { once: true });
  } else {
    append();
  }
};

export default structView;
