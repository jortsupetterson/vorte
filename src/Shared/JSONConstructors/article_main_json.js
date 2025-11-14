export default async ({ isDemo, viewName, customParams }) => {
  const query = viewName.split("_");
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
      const calendar = await fetchCalendarObject(isDemo);

      const specific = {
        day() {
          const event_list =
            calendar[anchor_date.toISOString().slice(0, 10)] ?? EMPTY_LIST;
          return {
            anchor_date,
            event_list,
          };
        },
        week() {
          const monday_date = getThisMonday(anchor_date);
          const sunday_date = new Date(monday_date);
          sunday_date.setUTCDate(sunday_date.getUTCDate() + 6);
          const event_list = calendarEventSearch(
            calendar,
            new Date(monday_date),
            sunday_date
          );
          console.log(event_list);
          return {
            anchor_date,
            monday_date,
            event_list,
          };
        },
        month() {
          const year = anchor_date.getFullYear();
          const month = anchor_date.getMonth();

          const firstDay = new Date(year, month, 1);
          const lastDay = new Date(year, month + 1, 0);

          const event_list = calendarEventSearch(calendar, firstDay, lastDay);
          return {
            anchor_date,
            firstDay,
            lastDay,
            event_list,
          };
        },
      }[query[1]];

      return specific();
    },
  }[query[0]];
  const JSON = await constructor({ isDemo, customParams });
  return JSON;
};
import fetchCalendarObject from "../Utilities/fetchCalendarObject";
import fetchUserObject from "../Utilities/fetchUserObject";
import shiftDate from "../Utilities/Time/shiftDate";
import calendarEventSearch from "../Utilities/Time/calendarEventSearch";
import getThisMonday from "../Utilities/Time/getThisMonday";
import { EMPTY_LIST } from "../SAVINGS.js";
