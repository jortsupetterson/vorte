import buildHtmlResponse from "./routes/default";
import buildIconResponse from "./routes/icons";
import buildWebmanifestResponse from "./routes/webmanifest";

const routes = Object.freeze({
  webmanifest: buildWebmanifestResponse,
  default: buildHtmlResponse,
  icons: buildIconResponse,
});

self.addEventListener("fetch", (event) => {
  const t0 = performance.now();
  const { pathname, searchParams } = new URL(event.request.url);
  const path = pathname.split("/").filter(Boolean);
  const handler = routes[path[0]] ?? routes.default;

  event.respondWith(handler({ path, event, searchParams }));

  event.waitUntil(
    Promise.resolve().then(() => {
      console.log(
        `ServiceWorker responded in "${
          performance.now() - t0
        }ms" for pathname "${pathname}"`
      );
    })
  );
});
