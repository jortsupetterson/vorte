export default async ({ isDemo, viewName, components }) => {
  const clients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  for (const CSSSelector of components) {
    const constructor = JSONConstructors[CSSSelector];
    const JSON = await constructor(isDemo, viewName);
    for (const client of clients) {
      client.postMessage({ CSSSelector, JSON, viewName, isDemo });
    }
  }
};

const JSONConstructors = {
  "nav ul": nav_ul_json,
  "article main": article_main_json,
  "article header h1": article_header_h1_json,
};

import article_header_h1_json from "../../../Shared/JSONConstructors/article_header_h1_json";
import article_main_json from "../../../Shared/JSONConstructors/article_main_json";
import nav_ul_json from "../../../Shared/JSONConstructors/nav_ul_json";
