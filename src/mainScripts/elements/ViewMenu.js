import CloseTrigger from "./triggers/CloseTrigger";

const cssText = css`
  view-menu {
    position: relative;
    background: var(--viewmenuBackgroundColor);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    transition: flex-basis 0.2s ease, padding 0.2s ease;
    will-change: left, padding;
    padding: 1.5rem 0 1.5rem 0;
    flex: 0 0 0;
    border-radius: 0;
    margin: 0;
    overflow: hidden;
    contain: content;
    height: 100dvh;
  }

  view-menu.open {
    flex: 0 0 var(--viewmenuWidth);
    padding: 1.5rem;
  }
  view-menu header {
  }
  view-menu main {
  }
  view-menu footer {
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    min-width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    height: 0;
  }
  view-menu footer figure {
    filter: blur(0.01rem);
  }
  view-menu footer figure img {
    height: clamp(10rem, 10rem, 10rem);
    width: clamp(10rem, 10rem, 10rem);
  }
`;
const sheet = new CSSStyleSheet();
sheet.replaceSync(cssText);
document.adoptedStyleSheets.push(sheet);

const structHeader = async (parent) => {
  const header = document.createElement("header");
  const btn = new CloseTrigger(parent);
  header.appendChild(btn);
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
  const fig = document.createElement("figure");
  const img = document.createElement("img");
  img.src = `/images`;
  fig.appendChild(img);
  footer.apppendChild(fig);
  parent.appendChild(footer);
  return footer;
};

class ViewMenu extends HTMLElement {
  constructor() {
    super();
    this.open = true;
    this.header = structHeader(this);
    this.main = structMain(this);
    this.footer = structFooter(this);
    window.ViewMenu = this;
  }
  set open(bool) {
    bool ? this.classList.add("open") : this.classList.remove("open");
  }
}

export default ViewMenu;
