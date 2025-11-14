export default async ({ isDemo, viewName }) => {
  const stub = get_1(viewName);
  const constructor = {
    async home(isDemo) {
      const { my_vorte_apps, vortepreneur_organizations } =
        await fetchUserObject(isDemo);

      return {
        my_vorte_apps,
        vortepreneur_organizations,
      };
    },
    async settings() {
      return {
        tabList: ["user", "styles"],
      };
    },
    async calendar() {
      const { open_on_start } = await fetchCalendarObject(isDemo);
      return { open_on_start };
    },
  }[stub];
  const JSON = await constructor(isDemo);
  return JSON;
};
import fetchCalendarObject from "../Utilities/fetchCalendarObject";
import fetchUserObject from "../Utilities/fetchUserObject";
import get_1 from "../Utilities/get_-1";
