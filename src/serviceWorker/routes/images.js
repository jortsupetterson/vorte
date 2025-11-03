const resolveImageRequest = async (ctx) => {
  const cache = await caches.open("default");
  const req = ctx.event.request;

  const cached = await cache.match(req);
  if (cached) return cached;

  const network = await fetch(req);
  ctx.event.waitUntil(cache.put(req, network.clone()));
  return network;
};
export default resolveImageRequest;
