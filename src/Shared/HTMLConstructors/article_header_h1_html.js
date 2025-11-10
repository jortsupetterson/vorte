export default (article_header_h1_json, language, viewName) => {
  const constructor = {
    home(article_header_h1_json, language) {
      const { firstname } = article_header_h1_json;
      return `${{ fi: "Hei", sv: "Hej", en: "Hi" }[language]} ${firstname}!`;
    },
    calendar_day(article_header_h1_json, language) {
      return { fi: "Päivänäkymä", sv: "Dagsvy", en: "Day view" }[language];
    },
  }[viewName];
  const innerHTML = constructor(article_header_h1_json, language);
  return innerHTML;
};
