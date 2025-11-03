const SUPPORTED_LANGUAGES = new Set(["fi", "sv", "en"]);

navigator.serviceWorker.register("/sw.js", { scope: "/", type: "module" });

const { pathname } = new URL(window.location.href);

const pathLang = pathname.split("/").filter(Boolean)[0];

const navLang = navigator.language.split("-").filter(Boolean)[0];

if (SUPPORTED_LANGUAGES.has(pathLang)) {
  cookieStore.set({
    name: "lang",
    value: pathLang,
    expires: Date.now() + 31536000 * 1000,
  });
} else if (SUPPORTED_LANGUAGES.has(navLang)) {
  cookieStore.set({
    name: "lang",
    value: navLang,
    expires: Date.now() + 31536000 * 1000,
  });
} else {
  cookieStore.set({
    name: "lang",
    value: "en",
    expires: Date.now() + 31536000 * 1000,
  });
}

cookieStore.set({ name: "accentColor", value: "#199473", expires: 31536000 });

const prefersColorSchemeDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

if (prefersColorSchemeDark) {
  cookieStore.set({
    name: "backgroundColor",
    value: "#000",
    expires: Date.now() + 31536000 * 1000,
  });
  cookieStore.set({
    name: "contentColor",
    value: "#fff",
    expires: Date.now() + 31536000 * 1000,
  });
} else {
  cookieStore.set({
    name: "backgroundColor",
    value: "#fff",
    expires: Date.now() + 31536000 * 1000,
  });
  cookieStore.set({
    name: "contentColor",
    value: "#000",
    expires: Date.now() + 31536000 * 1000,
  });
}

await navigator.serviceWorker.ready.then(() => window.location.reload());
