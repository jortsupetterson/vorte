window.language = document.documentElement.language;
window.widgetList = [];
import MenuTrigger from "./components/triggers/MenuTrigger";
import CloseTrigger from "./components/triggers/CloseTrigger";
customElements.define("close-trigger", CloseTrigger);
customElements.define("menu-trigger", MenuTrigger);

import ViewMenu from "./components/ViewMenu";
import ViewPanel from "./components/ViewPanel";
customElements.define("view-menu", ViewMenu);
customElements.define("view-panel", ViewPanel);
