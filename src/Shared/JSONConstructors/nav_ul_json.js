import zipper from "../WebCrypto/zipper";
import negotiateCache from "../Utilities/negotiateCache";
export default async (isDemo, viewName) => {
  const constructor = {
    async home(isDemo) {
      if (isDemo) {
        return {
          my_vorte_app_list: ["tasks", "calendar", "networking", "rte"],
          vortepreneur_organization_list: ["Example Oy"],
        };
      }
      const userRes = await negotiateCache(new Request(`/user.json`));
      const userBytes = new Uint8Array(await userRes.arrayBuffer());
      const user = await zipper.unzip(userBytes);
      return {
        my_vorte_app_list: user.my_vorte_app_list,
        vortepreneur_organization_list: user.vortepreneur_organization_list,
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
