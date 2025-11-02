const SUPPORTED_LANGUAGES = new Set(["fi", "sv", "en"]);

navigator.serviceWorker.register("/sw.js", { scope: "/", type: "module" });

const { pathname } = new URL(window.location.href);

const pathLang = pathname.split("/").filter(Boolean)[0];

const navLang = navigator.language.split("-").filter(Boolean)[0];

if (SUPPORTED_LANGUAGES.has(pathLang)) {
  cookieStore.set("lang", pathLang);
} else if (SUPPORTED_LANGUAGES.has(navLang)) {
  cookieStore.set("lang", navLang);
} else {
  cookieStore.set("lang", "en");
}

cookieStore.set("accentColor", "#199473");

const prefersColorSchemeDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

if (prefersColorSchemeDark) {
  cookieStore.set("backgroundColor", "#000");
  cookieStore.set("contentColor", "#fff");
} else {
  cookieStore.set("backgroundColor", "#fff");
  cookieStore.set("contentColor", "#000");
}

await navigator.serviceWorker.ready;

setTimeout(() => {
  window.location.reload();
}, 210);

document.documentElement.dataset.transition = `fade${
  prefersColorSchemeDark ? "Dark" : "Light"
}`;
