import checkForUpdate from "./utilities/checkForUpdate";
import buildHtmlResponse from "./routes/default";
import buildIconResponse from "./routes/icons";
import buildWebmanifestResponse from "./routes/webmanifest";
import negotiateCache from "./utilities/negotiateCache";

const routes = Object.freeze({
  default: buildHtmlResponse,
  webmanifest: buildWebmanifestResponse,
  icons: buildIconResponse,
  states: buildMarkupResponse,
  fonts: negotiateCache,
  images: negotiateCache,
  "sitemap.xml": negotiateCache,
});

self.addEventListener("install", (event) =>
  event.waitUntil(self.skipWaiting())
);
self.addEventListener("activate", (event) =>
  event.waitUntil(
    (async () => {
      await self.clients.claim();
      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      for (const client of clients) client.navigate(client.url);
    })()
  )
);

self.addEventListener("fetch", (event) => {
  const { pathname, searchParams } = new URL(event.request.url);
  const path = pathname.split("/").filter(Boolean);
  const handler = routes[path[0]] ?? routes.default;
  event.respondWith(handler({ path, event, searchParams }));
  event.waitUntil(checkForUpdate());
});
