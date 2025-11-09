const routes = Object.freeze({
  document: buildDocumentResponse,
  images: ({ event }) => negotiateCache(event.request),
  fonts: ({ event }) => negotiateCache(event.request),
  icons: buildIconResponse,
  webmanifest: buildWebmanifestResponse,
  "sitemap.xml": ({ event }) => negotiateCache(event.request),
});

self.addEventListener("fetch", (event) => {
  const { pathname, searchParams } = new URL(event.request.url);
  const path = pathname.split("/").filter(Boolean);
  const handler = routes[path[0]] ?? routes.document;
  event.respondWith(handler({ path, event, searchParams }));
  event.waitUntil(checkForUpdate());
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

self.addEventListener("message", ({ data }) => {
  handleMessage(data);
});

import handleMessage from "./api/handleMessage";
import checkForUpdate from "../Shared/Utilities/checkForUpdate";
import negotiateCache from "../Shared/Utilities/negotiateCache";
import buildDocumentResponse from "./routes/document";
import buildIconResponse from "./routes/icons";
import buildWebmanifestResponse from "./routes/webmanifest";
