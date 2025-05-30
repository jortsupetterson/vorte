//services/src/handleRequest.js
import { UserDO } from "./durableObject.js";export { UserDO };

export default {
  async fetch(req, env) {
    const m = req.headers.get("Method");
    const s = req.headers.get("Scope");

    const id   = env.USER_DO.idFromName("user");
    const stub = env.USER_DO.get(id);

    if (!(await stub.authorize(req))) {
      console.error("[USER] 403 Unauthorized");
      return new Response(null, { status: 403 });
    }

    // GET
    if (m === "GET") {
      const d = await stub.get(s);
      return d === undefined
        ? new Response(null, { status: 404 })
        : new Response(JSON.stringify(d), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
    }

    // PUT
    if (m === "PUT") {
      const p = await req.json().catch(() => null);
      if (p === null) return new Response(null, { status: 400 });
      await stub.put(s, p);
      return new Response(null, { status: 204 });
    }

    // DELETE
    if (m === "DELETE") {
      await stub.delete(s);
      return new Response(null, { status: 204 });
    }

    // Muut
    console.error("[USER] 400 Bad Method");
    return new Response(null, { status: 400 });
  },
};
