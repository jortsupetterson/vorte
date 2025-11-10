export default async (isDemo, viewName) => {
  const constructor = {
    async home(isDemo) {
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
    async calendar_day(isDemo) {
      const { calendar_events_list } = await fetchCalendarObject(isDemo);
      return { calendar_events_list };
    },
  }[viewName];
  const JSON = await constructor(isDemo);
  return JSON;
};
import fetchCalendarObject from "../Utilities/fetchCalendarObject";
import fetchUserObject from "../Utilities/fetchUserObject";
