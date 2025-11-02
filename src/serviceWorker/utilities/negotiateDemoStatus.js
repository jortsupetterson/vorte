const negotiateDemoStatus = async (ctx) => {
  return ctx.searchParams.has("demo");
};
