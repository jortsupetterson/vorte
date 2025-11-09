export default async (isDemo, viewName) => {
  const constructor = {
    async home(isDemo) {
      const { widget_list, firstname } = await getUserObject(isDemo);

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
  }[viewName];
  const JSON = await constructor(isDemo);
  return JSON;
};
import getUserObject from "../Utilities/getUserObject";
