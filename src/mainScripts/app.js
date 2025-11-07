import { NOWplusYEAR } from "../../shared/NOWplusYEAR";

export const app = {
  navigation: {
    latest: cookieStore.get("navigation.latest"),
    history: JSON.parse(sessionStorage.getItem("navigation.history")) || [],
  },
  mascot: {
    name: "vor",
    selector: null,
  },
  language: {
    code: cookieStore.get("language"),
    selector: null,
  },
  unsavedChanges: false,
};
