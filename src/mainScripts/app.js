import { NOWplusYEAR } from "../../shared/NOWplusYEAR";

export const app = {
  view: {
    name: "default",
    history: JSON.parse(sessionStorage.getItem("view.history")) || [],
  },
  mascot: {
    name: "vor",
    selector: null,
    element: null,
  },
  language: {
    code: cookieStore.get("language"),
    selector: null,
  },
  unsavedChanges: false,
  async navigate() {},
};
