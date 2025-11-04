const serveNetwork = async (ctx) => {
  return await fetch(ctx.event.request.url, { cache: "no-store" });
};
export default serveNetwork;
