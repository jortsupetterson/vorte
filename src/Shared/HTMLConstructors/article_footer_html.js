import get_1 from "../Utilities/get_-1";
import inlineStringify from "../Utilities/inlineStringify";

export default async (article_footer_json, lanugage, viewName, isDemo) => {
  const stub = get_1(viewName);
  const constructor = {
    async home() {
      return html` <button data-fn="">mukauta näkymää</button> `;
    },
    async calendar() {
      return html`
        <button
          data-fn="${inlineStringify({ name: `toggleCalendarEventForm` })}"
        >
          lisää tapahtuma
        </button>
      `;
    },
  }[stub];
  const innerHTML = await constructor({
    article_footer_json,
    lanugage,
    isDemo,
    viewName,
  });
  return innerHTML;
};
