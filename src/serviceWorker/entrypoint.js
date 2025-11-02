import buildHtmlResponse from "./routes/default";
import buildWebmanifestResponse from "./routes/webmanifest";

const routes = Object.freeze({
  "/webmanifest": buildWebmanifestResponse,
  default: buildHtmlResponse,
});

self.addEventListener("fetch", (event) => {
  const t0 = performance.now();
  const { pathname, searchParams } = new URL(event.request.url);
  const handler = routes[pathname] || routes.default;

  event.respondWith(handler({ event, searchParams }));

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
