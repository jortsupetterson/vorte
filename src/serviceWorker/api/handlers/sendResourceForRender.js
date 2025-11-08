export default sendResourceForRender = async ({
  isDemo,
  viewName,
  components,
}) => {
  const clients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  for (const CSSSelector of components) {
    const JSON = JSONConstructors[CSSSelector](isDemo, viewName);
    for (const client of clients) {
      client.postMessage({ CSSSelector, JSON });
    }
  }
};

const JSONConstructors = {
  "nav ul": (isDemo, viewName) => nav_ul_json[viewName](isDemo),
};

import nav_ul_json from "../../../Shared/JSONConstructors/nav_ul_json";
