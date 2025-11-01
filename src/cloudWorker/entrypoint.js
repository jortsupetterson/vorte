import endpoints from "./endpoints/exports.js";
import middleware from "./middleware/exports.js";
export default {
  async fetch(raw, env, ctx) {
    const request = await middleware(raw, env, ctx);
    return await endpoints(request);
  },
};
