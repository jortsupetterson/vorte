/// <reference path="../../../Types/Calendar.d.ts"/>

/**
 * @param {boolean} isDemo
 * @returns {Promise<Calendar>}
 */

export default async (isDemo) => {
  if (isDemo) return DEMO_CALENDAR;
  const calendarRes = await negotiateCache(new Request(`/calendar.json`));
  const calendarBytes = await calendarRes.arrayBuffer();
  /** @type {Calendar} */
  const calendar = await zipper.unzip(calendarBytes);
  return calendar;
};
import negotiateCache from "../Negotiations/negotiateCache";
import zipper from "../../WebCrypto/zipper";

import { DEMO_CALENDAR } from "../../DEMO_OBJECTS/DEMO_CALENDAR";
