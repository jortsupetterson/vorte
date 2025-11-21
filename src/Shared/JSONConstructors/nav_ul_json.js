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
    async tasks(isDemo) {},
    async calendar(isDemo) {
      const { open_on_start } = await fetchCalendarObject(isDemo);
      return { open_on_start };
    },
    async settings() {
      return {
        tabList: ["user", "styles"],
      };
    },
  }[stub];
  const JSON = await constructor(isDemo);
  return JSON;
};
import fetchCalendarObject from "../Utilities/Storage/fetchCalendarObject";
import fetchUserObject from "../Utilities/Storage/fetchUserObject";
import get_1 from "../Utilities/get_-1";
