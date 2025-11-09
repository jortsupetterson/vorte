import zipper from "../WebCrypto/zipper";
import negotiateCache from "../Utilities/negotiateCache";
export default async (isDemo) => {
  const constructor = {
    async home(isDemo) {
      if (isDemo) {
        return {
          widget_list: [
            {
              name: "welcome",
              params: {
                firstname: "",
              },
            },
            { name: "device_bound_passkey" },
            { name: "style_customization" },
            { name: "start_rte" },
          ],
        };
      }

      const userRes = await negotiateCache(new Request(`/user.json`));
      const userBytes = await userRes.arrayBuffer();
      const user = await zipper.unzip(userBytes);
      const truthsource = new Set(user.widget_list);
      const renderableList = [];

      if (truthsource.has("welcome")) {
        renderableList.push({
          name: "welcome",
          params: {
            fistname: ` ${user.firstname}`,
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
  };

  const JSON = await constructor(isDemo);
  return JSON;
};
