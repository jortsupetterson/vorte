import { NOWplusYEAR } from "../../../shared/NOWplusYEAR";
import { SUPPORTED_LANGUAGES } from "../../../shared/SUPPORTED_LANGUAGES";

const supported = new Set(SUPPORTED_LANGUAGES);

const setLanguage = async (newLanguage) => {
  if (!supported.has(newLanguage)) {
    throw new Error(
      "Unsupported language or invalid format, allowed options: " +
        JSON.stringify(SUPPORTED_LANGUAGES)
    );
  }
  window.language = newLanguage;
  document.documentElement.lang = newLanguage;
  cookieStore.set({ name: "lang", value: newLanguage, expires: NOWplusYEAR });
};
