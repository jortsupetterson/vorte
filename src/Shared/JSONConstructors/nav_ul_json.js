export default async ({ isDemo, viewName }) => {
  const stub = get_1(viewName);
  const constructor = {
    async home(isDemo) {
      const { my_vorte_apps, vortepreneur_organizations } =
        await UserObject.read({ isDemo });

      return {
        my_vorte_apps,
        vortepreneur_organizations,
      };
    },
    async tasks(isDemo) {},
    async calendar(isDemo) {
      const { open_on_start } = await CalendarObject.read({ isDemo });
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
import CalendarObject from "../Utilities/Storage/CalendarObject";
import UserObject from "../Utilities/Storage/UserObject";
import get_1 from "../Utilities/get_-1";
