export default async (isDemo, viewName) => {
  const constructor = {
    async home(isDemo) {
      const { my_vorte_app_list, vortepreneur_organization_list } =
        await getUserObject(isDemo);

      return {
        my_vorte_app_list,
        vortepreneur_organization_list,
      };
    },
    settings() {
      return {
        tabList: ["user", "styles"],
      };
    },
  }[viewName];
  const JSON = await constructor(isDemo);
  return JSON;
};
import getUserObject from "../Utilities/getUserObject";
