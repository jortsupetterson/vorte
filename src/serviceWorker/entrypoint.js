import middleware from "./middleware/exports";
import endpoints from "./endpoints/exports";

self.addEventListener("fetch", async (event) => {
  const ctx = await middleware(event);
  await endpoints(ctx);
});
