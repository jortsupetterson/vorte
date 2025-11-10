export default async (article_header_h1_json, language, viewName) => {
  const constructor = {
    home(article_header_h1_json, language) {
      const { firstname } = article_header_h1_json;
      return `${{ fi: "Hei", sv: "Hej", en: "Hi" }[language]} ${firstname}!`;
    },
    calendar_day(article_header_h1_json, language) {
      return { fi: "Päivänäkymä", sv: "Dagsvy", en: "Day view" }[language];
    },
    calendar_week(article_header_h1_json, language) {
      return { fi: "Viikkonäkymä", sv: "Veckovy", en: "Week view" }[language];
    },
    calendar_month(article_header_h1_json, language) {
      return { fi: "Kuukausinäkymä", sv: "Månadsvy", en: "Month view" }[
        language
      ];
    },
  }[viewName];
  const innerHTML = constructor(article_header_h1_json, language);
  return innerHTML;
};
