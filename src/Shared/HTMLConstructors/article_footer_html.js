/// <reference path="../../Types/Common.d.ts" />

/**
 * !====!
 * !STOP!
 * !====!
 *
 * Relax and close all methods of the `constructor` object.
 * Chek the types defined on `param` and `returns` field on JSdoc.
 * Once you have done that, make sure the view area you want to work on is indeed CSSSelector `article footer` in the DOM.
 * Open the method named after the feature/view where you want to make changes to `article footer` or create a new method.
 * If you dont get it trace function calls backward and forward, as well as check the DOM and see the result.
 * You can also ask for a walktrough on Vorte discord.
 */

/**
 * @param {object} article_footer_json JSON with only the neccesary fields formated for the specific viewName of the specified CSSSelector from the BLOB
 * @param {T.SupportedLanguage} language A language code used to look up content
 * @param {T.SupportedViewName} viewName Specifies the scope of content that should be readied for render
 * @returns {T.HTMLText} innerHTML of CSSSelector `article footer` for specifed viewName
 */

export default async (article_footer_json, language, viewName) => {
  const stub = viewName.split("_");

  const constructor = {
    async home() {
      return html` <button data-fn="">mukauta näkymää</button> `;
    },
    async calendar() {
      const isToday = await isThisDate();
      if (stub[1] === "config") {
        return html`
          <button
            data-fn="${inlineStringify({ name: `toggleCalendarEventForm` })}"
          >
            tehdasasetukset
          </button>
        `;
      }

      return html`
        <button
          id="backToThisDay"
          ${isToday ? `disabled` : ``}
          data-fn="${swr(viewName, [`article main`], {
            anchor_date: new Date().toISOString().slice(0, 10),
          })}"
        >
          nykyhetkeen
        </button>

        <button
          data-fn="${inlineStringify({ name: `toggleCalendarEventForm` })}"
        >
          luo tapahtuma
        </button>
      `;
    },
  }[stub[0]];

  /** @type {T.HTMLText} */
  const innerHTML = await constructor();
  return innerHTML;
};

import isThisDate from "../Utilities/Time/isThisDate";
import inlineStringify from "../Utilities/inlineStringify";
import swr from "../Utilities/swr";
