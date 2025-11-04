const cssText = css`
  view-port: {
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

const structMain = async () => {
  const main = document.createElement("main");
};

class ViewPort extends HTMLElement {
  constructor() {
    super();
    this.id = "viewport";
    this.open = false;
    this.header = document.createElement("header");
    this.main = structMain();
    this.footer = document.createElement("footer");

    this.appendChild(this.header);
  }
}

customElements.define("view-port", ViewPort);

export default ViewPort;
