import endpoints from "./endpoints/exports.js";
import middleware from "./middleware/exports.js";
export default {
  async fetch(req, env, ctx) {
    const auth = req.headers.get("authorization");
    return await endpoints({ req, env, ctx, auth });
  },
};
