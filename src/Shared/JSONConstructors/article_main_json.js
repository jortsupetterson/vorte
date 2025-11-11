export default async ({ isDemo, viewName, customParams }) => {
  const stub = get_1(viewName);
  const constructor = {
    async home({ isDemo }) {
      const { widget_list, firstname } = await fetchUserObject(isDemo);

      const truthsource = new Set(widget_list);
      const renderableList = [];

      if (truthsource.has("welcome")) {
        renderableList.push({
          name: "welcome",
          params: {
            firstname,
          },
        });
      }

      for (const staticItemName of [
        "device_bound_passkey",
        "style_customization",
        "start_rte",
      ]) {
        if (truthsource.has(staticItemName)) {
          renderableList.push({ name: staticItemName });
        }
      }

      return { widget_list: renderableList };
    },
    async calendar({ isDemo, customParams }) {
      const anchor_date = await shiftDate(
        customParams ?? {
          years: 0,
          months: 0,
          weeks: 0,
          days: 0,
        }
      );
      const { calendar_events_list } = await fetchCalendarObject(isDemo);
      return {
        anchor_date,
        calendar_events_list,
      };
    },
  }[stub];
  const JSON = await constructor({ isDemo, customParams });
  return JSON;
};
import { NOWplusYEAR } from "../CONFIG";
import fetchCalendarObject from "../Utilities/fetchCalendarObject";
import fetchUserObject from "../Utilities/fetchUserObject";
import get_1 from "../Utilities/get_-1";
import getAnchorDate from "../Utilities/getAnchorDate";

const shiftDate = async ({ years, months, weeks, days }) => {
  const d = await getAnchorDate();
  if (years) d.setFullYear(d.getFullYear() + years);
  if (months) d.setMonth(d.getMonth() + months);
  if (weeks) d.setDate(d.getDate() + 7 * weeks);
  if (days) d.setDate(d.getDate() + days);
  cookieStore.set({
    name: "anchorDate",
    value: d.toLocaleDateString("sv-SE"),
    expires: NOWplusYEAR,
  });
  return d;
};
