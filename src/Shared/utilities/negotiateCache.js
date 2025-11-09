export default async (req) => {
  const cache = await caches.open("default");
  const cached = await cache.match(req);
  if (cached) return cached;
  const network = await fetch(req);
  cache.put(req, network.clone());
  return network;
};
