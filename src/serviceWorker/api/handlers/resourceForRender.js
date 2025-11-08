export default resourceForRender = async ({
  isDemo,
  viewName,
  includeComponents,
}) => {
  const cache = await caches.open("default");
  const clients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  for (const CSSSelector of includeComponents) {
    const JSON = await JSONConstructors[CSSSelector](cache, isDemo, viewName);
    for (const client of clients) {
      client.postMessage({ CSSSelector, JSON });
    }
  }
};

const JSONConstructors = {
  "nav ul": (cache, isDemo, viewName) => nav_ul[viewName](cache, isDemo),
};

import nav_ul from "../JSONConstructors/nav_ul";
