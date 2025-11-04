import CloseButton from "./CloseButton";

const cssText = css`
  view-menu {
    position: relative;
    background: var(--menuBackgroundColor);
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
    flex: 0 0 var(--menuWidth);
    padding: 1.5rem;
  }
  view-menu header {
  }
  view-menu main {
  }
  view-menu footer {
  }
`;
const sheet = new CSSStyleSheet();
sheet.replaceSync(cssText);
document.adoptedStyleSheets.push(sheet);

const structHeader = async (parent) => {
  const header = document.createElement("header");
  const btn = new CloseButton(parent);
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
    cookieStore.addEventListener("change", (ev) => console.log(ev));
  }
  set open(bool) {
    bool ? this.classList.add("open") : this.classList.remove("open");
  }
}

export default ViewMenu;
