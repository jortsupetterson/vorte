/**
 * @param {object}
 * @property {boolean} isDemo A boolean based on wheter window.location.search has `?demo` flag or not
 * @property {Common.ViewName} viewName
 * @property {object} [customParams]
 */

export default async ({ isDemo, viewName, customParams }) => {
  const query = viewName.split("_");
  const constructor = {
    async home({ isDemo }) {
      const { widget_list, firstname } = await UserObject.read({ isDemo });

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
      const dateWasGiven = !!customParams?.anchor_date,
        anchor_date = dateWasGiven
          ? new Date(customParams.anchor_date)
          : await shiftDate(
              customParams ?? {
                years: 0,
                months: 0,
                weeks: 0,
                days: 0,
              }
            ),
        calendar = await CalendarObject.read({ isDemo });

      const specific = {
        day() {
          const event_list =
            calendar.events[anchor_date.toISOString().slice(0, 10)] ??
            EMPTY_LIST;
          return {
            anchor_date,
            event_list,
            category_list: calendar.config.categories,
          };
        },
        week() {
          const monday_date = getThisMonday(anchor_date);
          const sunday_date = new Date(monday_date);
          sunday_date.setUTCDate(sunday_date.getUTCDate() + 6);
          const event_list = calendarEventSearch(
            calendar.events,
            new Date(monday_date),
            sunday_date
          );
          return {
            anchor_date,
            monday_date,
            event_list,
            category_list: calendar.config.categories,
          };
        },
        month() {
          const year = anchor_date.getFullYear();
          const month = anchor_date.getMonth();

          const firstDay = new Date(year, month, 1);
          const lastDay = new Date(year, month + 1, 0);

          const event_list = calendarEventSearch(
            calendar.events,
            firstDay,
            lastDay
          );
          return {
            anchor_date,
            event_list,
            categories: calendar.config.categories,
          };
        },
        config() {
          return calendar.config;
        },
      }[query[1]];

      if (dateWasGiven) {
        cookieStore.set({
          name: "anchorDate",
          value: customParams.anchor_date,
          expires: NOWplusYEAR,
        });
      }
      return specific();
    },
  }[query[0]];
  const JSON = await constructor({ isDemo, customParams });
  return JSON;
};
import CalendarObject from "../Utilities/Storage/CalendarObject.js";
import UserObject from "../Utilities/Storage/UserObject.js";
import shiftDate from "../Utilities/Time/shiftDate";
import calendarEventSearch from "../Utilities/Time/calendarEventSearch";
import getThisMonday from "../Utilities/Time/getThisMonday";
import { EMPTY_LIST } from "../SAVINGS.js";
import { NOWplusYEAR } from "../CONFIG.js";
