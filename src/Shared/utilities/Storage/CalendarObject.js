/// <reference path="../../../Types/Calendar.d.ts"/>
/** @type {Calendar} */
let calendar;

let syncTimerId = null;
let pendingSync = null;
const wait_ms = 12_000;

export default {
  async create() {},

  /**
   * @param {boolean} isDemo
   * @returns {Promise<Calendar>}
   */
  async read({ isDemo }) {
    if (isDemo) {
      calendar = DEMO_CALENDAR;
    } else {
      const calendarRes = await negotiateCache(new Request("/calendar.json"));
      const calendarBytes = await calendarRes.arrayBuffer();
      calendar = await zipper.unzip(calendarBytes);
    }
    return calendar;
  },

  async update({ path, value, isDemo }) {
    let cursor = calendar;
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

  async sync() {
    await zipper.zip(calendar);
  },

  last_updated: Date.now(),
};

import negotiateCache from "../Negotiations/negotiateCache";
import zipper from "../../WebCrypto/zipper";
import { DEMO_CALENDAR } from "../../DEMO_OBJECTS/DEMO_CALENDAR";
