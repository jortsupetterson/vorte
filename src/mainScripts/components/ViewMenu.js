const cssText = css`
  view-menu: {
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

const structMain = async () => {
  const main = document.createElement("main");
};

class ViewMenu extends HTMLElement {
  constructor() {
    super();
    this.id = "menu";
    this.open = false;
    this.header = document.createElement("header");
    this.main = structMain();
    this.footer = document.createElement("footer");

    this.appendChild(this.header);
  }
  set open(bool) {
    bool ? this.classList.add("open") : this.classList.remove("open");
  }
}

customElements.define("view-menu", ViewMenu);

export default ViewMenu;
