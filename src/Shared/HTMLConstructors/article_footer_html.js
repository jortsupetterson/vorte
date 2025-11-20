export default async (article_footer_json, lanugage, viewName, isDemo) => {
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
  const innerHTML = await constructor({
    article_footer_json,
    lanugage,
    isDemo,
    viewName,
  });
  return innerHTML;
};

import isThisDate from "../Utilities/Time/isThisDate";
import getAnchorDate from "../Utilities/getAnchorDate";
import inlineStringify from "../Utilities/inlineStringify";
import svgTable from "../markup/svgTable";
import swr from "../Utilities/swr";
