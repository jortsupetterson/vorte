import { SUPPORTED_LANGUAGES, NOWplusYEAR } from "../Shared/CONFIG.js";
const supported = new Set(SUPPORTED_LANGUAGES);

navigator.serviceWorker.register("/ServiceWorker", {
  scope: "/",
  type: "module",
});

const { pathname } = new URL(window.location.href);

const pathLang = pathname.split("/").filter(Boolean)[0];

const navLang = navigator.language.split("-").filter(Boolean)[0];

if (supported.has(pathLang)) {
  cookieStore.set({
    name: "lang",
    value: pathLang,
    expires: NOWplusYEAR,
  });
} else if (supported.has(navLang)) {
  cookieStore.set({
    name: "lang",
    value: navLang,
    expires: NOWplusYEAR,
  });
} else {
  cookieStore.set({
    name: "lang",
    value: "en",
    expires: NOWplusYEAR,
  });
}

cookieStore.set({
  name: "accentColor",
  value: "#199473",
  expires: NOWplusYEAR,
});

const prefersColorSchemeDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

if (prefersColorSchemeDark) {
  cookieStore.set({
    name: "backgroundColor",
    value: "#000000",
    expires: NOWplusYEAR,
  });
  cookieStore.set({
    name: "contentColor",
    value: "#ffffff",
    expires: NOWplusYEAR,
  });
} else {
  cookieStore.set({
    name: "backgroundColor",
    value: "#ffffff",
    expires: NOWplusYEAR,
  });
  cookieStore.set({
    name: "contentColor",
    value: "#000000",
    expires: NOWplusYEAR,
  });
}

await navigator.serviceWorker.ready.then(() => window.location.reload());
