import { SUPPORTED_VIEWS } from "../../../shared/SUPPORTED_VIEWNAMES";
import { NOWplusYEAR } from "../../../shared/NOWplusYEAR";

const supported = new Set(SUPPORTED_VIEWS);

const setActiveView = async (newActiveView) => {
  if (!supported.has(newActiveView)) {
    throw new Error(
      "Unsupported language or invalid format, allowed options: " +
        JSON.stringify(SUPPORTED_VIEWS)
    );
  }
  window.language = newActiveView;
  cookieStore.set({
    name: "activeView",
    value: newActiveView,
    expires: NOWplusYEAR,
  });
};

export default setActiveView;
