export default (article_header_h1_json, language, viewName) => {
  const constructor = {
    home(article_header_h1_json, language) {
      const { firstname } = article_header_h1_json;
      return jsonHomeTitles(language, firstname);
    },
  }[viewName];
  const innerHTML = constructor(article_header_h1_json, language);
  return innerHTML;
};

import jsonHomeTitles from "../markup/JSON/jsonHomeTitles";
