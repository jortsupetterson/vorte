import zipper from "../WebCrypto/zipper";
import negotiateCache from "../Utilities/negotiateCache";
export default nav_ul_html = async (isDemo) => {
  const userRes = await negotiateCache(new Request(``));
  const userBytes = new Uint8Array(await userRes.ArrayBuffer());
  const user = await zipper.unzip(userBytes);

  const res = {
    home(isDemo) {
      return {
        my_vorte_app_list: isDemo
          ? ["tasks", "calendar", "networking", "rte"]
          : user.my_vorte_app_list,
        vortepreneur_organization_list: isDemo
          ? ["Example Oy"]
          : user.vortepreneur_organization_list,
      };
    },
    settings() {
      return {
        tabList: ["user", "styles"],
      };
    },
  }[viewName](isDemo);
  return res;
};
