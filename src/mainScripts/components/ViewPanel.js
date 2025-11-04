import MenuTrigger from "./triggers/MenuTrigger.js";
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

  view-panel header {
  }
  view-panel main {
  }
  view-panel footer {
  }
`;
const sheet = new CSSStyleSheet();
sheet.replaceSync(cssText);
document.adoptedStyleSheets.push(sheet);
const structHeader = async (parent) => {
  const header = document.createElement("header");
  const menuBtn = new MenuTrigger();
  header.appendChild(menuBtn);
  parent.appendChild(header);
  return header;
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
    this.header = structHeader(this);
    this.main = structMain(this);
    this.footer = structFooter(this);
    window.viewpanel = this;
  }
}

export default ViewPanel;
