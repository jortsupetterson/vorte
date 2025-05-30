// src/durableObject.js
import { DurableObject } from "cloudflare:workers";

export class UserDO extends DurableObject {
  constructor(state, env) {
    super(state, env);
    this.ready = state.blockConcurrencyWhile(async () => {
      const raw = await state.storage.get("user");
      this.user = raw ? JSON.parse(raw) : {};
    });
  }

  // access-key header vs. tallennettu avain
  async authorize(req) {
    await this.ready;
    return req.headers.get("access-key") === this.user["access-key"];
  }

  async get(scope) {
    await this.ready;
    return this.user[scope];
  }

  async put(scope, val) {
    await this.ready;
    this.user[scope] = val;
    await this.state.storage.put("user", JSON.stringify(this.user));
  }

  async delete(scope) {
    await this.ready;
    delete this.user[scope];
    await this.state.storage.put("user", JSON.stringify(this.user));
  }
}
