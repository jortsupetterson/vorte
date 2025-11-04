import MenuButton from "./MenuButton";
const cssText = css`
  view-port {
    background: var(--viewportBackgroundColor);
    height: 100dvh;
    width: var(--viewportWidth);
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

  view-port header {
  }
  view-port main {
  }
  view-port footer {
  }
`;
const sheet = new CSSStyleSheet();
sheet.replaceSync(cssText);
document.adoptedStyleSheets.push(sheet);
const structHeader = async (parent) => {
  const header = document.createElement("header");
  const menuBtn = new MenuButton(parent.previousElementSibling);
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

class ViewPort extends HTMLElement {
  constructor() {
    super();
    this.header = structHeader(this);
    this.main = structMain(this);
    this.footer = structFooter(this);
  }
}

export default ViewPort;
