class NavButton extends HTMLButtonElement {
  constructor(id, label) {
    super();
    this.id = id;
    this.onpointerdown(async (event) => {});
  }
}

customElements.define("nav-button");
