const negotiateDemoStatus = async (ctx) => {
  return ctx.searchParams.has("demo");
};
export default negotiateDemoStatus;
