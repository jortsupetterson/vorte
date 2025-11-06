import MenuTrigger from "./triggers/MenuTrigger.js";
const t0 = performance.now();
const cssText = css`
  view-panel {
    background: var(--viewpanelBackgroundColor);
    height: 100dvh;
    width: var(--viewpanelWidth);
    flex: 1 1 auto;
    transition: width 0.2s ease;
    will-change: width;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    contain: content;
  }
`;
const sheet = new CSSStyleSheet();
sheet.replaceSync(cssText);
document.adoptedStyleSheets.push(sheet);
console.log(performance.now() - t0);
const structHeader = async (parent) => {
  const header = document.createElement("header");
  const menuBtn = new MenuTrigger();
  header.appendChild(menuBtn);
  parent.appendChild(header);
  return { heading };
};
const structMain = async (parent) => {
  const main = document.createElement("main");
  parent.appendChild(main);
  return main;
};
const structFooter = async (parent) => {
  const footer = document.createElement("footer");
  parent.appendChild(footer);
  return footer;
};

class ViewPanel extends HTMLElement {
  constructor() {
    super();
    const { heading } = structHeader(this);
    this.heading = heading;
    this.display = structMain(this);
    this.controls = structFooter(this);
  }
  set heading(value) {
    this.heading.textContent = value;
  }
}

export default ViewPanel;
