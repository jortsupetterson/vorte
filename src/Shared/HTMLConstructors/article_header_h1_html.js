/// <reference path="../../Types/types.d.ts" />

/**
 * !====!
 * !STOP!
 * !====!
 *
 * Relax and close all methods of the `constructor` object.
 * Chek the types defined on `param` and `returns` field on JSdoc.
 * Once you have done that, make sure the view area you want to work on is indeed CSSSelector `article header h1` in the DOM.
 * Open the method named after the feature/view where you want to make changes to `article header h1` or create a new method.
 * If you dont get it trace function calls backward and forward, as well as check the DOM and see the result.
 * You can also ask for a walktrough on Vorte discord.
 */

/**
 * @param {object} article_header_h1_json JSON with only the neccesary fields formated for the specific viewName of the specified CSSSelector from the BLOB
 * @param {T.SupportedLanguage} language A language code used to look up content
 * @param {T.SupportedViewName} viewName Specifies the scope of content that should be readied for render
 * @returns {T.HTMLText} innerHTML of CSSSelector `article header h1` for specifed viewName
 */

export default async (article_header_h1_json, language, viewName) => {
  const constructor = {
    home() {
      const { firstname } = article_header_h1_json;
      return `${{ fi: "Hei", sv: "Hej", en: "Hi" }[language]} ${firstname}!`;
    },
    calendar_day() {
      return { fi: "Päivänäkymä", sv: "Dagsvy", en: "Day view" }[language];
    },
    calendar_week() {
      return { fi: "Viikkonäkymä", sv: "Veckovy", en: "Week view" }[language];
    },
    calendar_month() {
      return { fi: "Kuukausinäkymä", sv: "Månadsvy", en: "Month view" }[
        language
      ];
    },
    calendar_config() {
      return { fi: "Asetukset", sv: "Instalingär", en: "Settings" }[language];
    },
  }[viewName];

  /** @type {T.HTMLText} */
  const innerHTML = constructor();
  return innerHTML;
};
