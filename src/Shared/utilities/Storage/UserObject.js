/// <reference path="../../../Types/User.d.ts"/>
/** @type {User} */
let user;

let syncTimerId = null;
let pendingSync = null;
const wait_ms = 12_000;

export default {
  async create() {},
  /**
   * @param {boolean} isDemo
   * @returns {Promise<User>}
   */
  async read({ isDemo }) {
    if (isDemo) {
      user = DEMO_USER;
    } else {
      const userRes = await negotiateCache(new Request(`/user.json`));
      const userBytes = await userRes.arrayBuffer();
      user = await zipper.unzip(userBytes);
    }
    return user;
  },
  async update({ path, value, isDemo }) {
    let cursor = user;

    for (let i = 0; i < path.length - 1; i++) {
      cursor = cursor[path[i]];
    }
    cursor[path[path.length - 1]] = value;

    if (isDemo) return;

    this.last_updated = Date.now();

    if (syncTimerId !== null) clearTimeout(syncTimerId);
    if (!pendingSync) {
      pendingSync = (async () => {
        await new Promise((resolve) => {
          syncTimerId = setTimeout(resolve, wait_ms);
        });
        syncTimerId = null;
        await this.sync();
        pendingSync = null;
      })();
    }
    return pendingSync;
  },
  async delete() {},
};

import negotiateCache from "../Negotiations/negotiateCache";
import zipper from "../../WebCrypto/zipper";
import { DEMO_USER } from "../../DEMO_OBJECTS/DEMO_USER";
