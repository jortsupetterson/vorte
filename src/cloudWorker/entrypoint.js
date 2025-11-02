import endpoints from "./endpoints/exports.js";
import middleware from "./middleware/exports.js";
export default {
  async fetch(req, env, ev) {
    const ctx = await middleware(req, env, ev);
    return await endpoints(ctx);
  },
};
