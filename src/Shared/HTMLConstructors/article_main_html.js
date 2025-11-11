import svgTable from "../markup/svgTable";
import jsonTable from "../markup/jsonTable";
import inlineStringify from "../Utilities/inlineStringify";
import getWeekNum from "../Utilities/getWeekNum";

export default async (article_main_json, language, viewName) => {
  const constructor = {
    async home(article_main_json, language) {
      const { widget_list } = article_main_json;
      let markup = ``;
      for (const item of widget_list) {
        const constructor = {
          welcome({ firstname }) {
            return html`
              <div>
                <h2>
                  ${{
                    fi: "Tervetuloa Vorteen!",
                    sv: "Välkommen till Vorte!",
                    en: "Welcome to Vorte!",
                  }[language]}
                </h2>
                <p>
                  ${{
                    fi: "Kiitos kun valitsit meidät",
                    sv: "Tack för att du valde oss",
                    en: "Thank you for choosing us",
                  }[language]}${firstname ? ` ${firstname}` : ""}!
                </p>
                <button data-fn="${inlineStringify({})}">ok</button>
              </div>
            `;
          },
          device_bound_passkey() {
            return html`
              <div>
                <p>
                  ${{
                    fi: "Lisää laitekohtainen pääsyavain nopeampaa tunnistautumista ja helpompaa tilin palautusta varten.",
                    sv: "Lägg till en enhetsspecifik åtkomstnyckel för snabbare inloggning och enklare kontorestaurering.",
                    en: "Add a device-specific access key for faster authentication and easier account recovery.",
                  }[language]}
                </p>
                <button data-fn="${inlineStringify({})}">
                  ${{ fi: "lisää", sv: "lägg till", en: "add" }[language]}
                </button>
              </div>
            `;
          },
          style_customization() {
            return html`
              <div>
                <p>
                  ${{
                    fi: "Mukauta käyttöliittymä sinulle sopivaksi asetuksissa.",
                    sv: "Anpassa gränssnittet så att det passar dig i inställningarna.",
                    en: "Customize the interface to suit you in the settings.",
                  }[language]}
                </p>
                <button data-fn="${inlineStringify({})}">
                  ${{ fi: "mukauta", sv: "anpassa", en: "customize" }[language]}
                </button>
              </div>
            `;
          },
          start_rte() {
            return html`
              <div>
                <p>
                  ${{
                    fi: "Aloita matkasi kohti yrittäjyyttä Polku yrittäjäksi -sovelluksella.",
                    sv: "Börja din resa mot entreprenörskap med appen Vägen till företagande.",
                    en: "Start your journey toward entrepreneurship with the Path to Entrepreneurship app.",
                  }[language]}
                </p>
                <button data-fn="${inlineStringify({})}">
                  ${{ fi: "aloita", sv: "börja", en: "start" }[language]}
                </button>
              </div>
            `;
          },
        }[item.name];
        markup += constructor(item.params);
      }
      return markup;
    },
    async calendar_day(article_main_json, language) {
      const { anchor_date } = article_main_json;
      return html`
        <div id="datePicker">
          <button
            data-fn="${inlineStringify({
              name: `msgToSw`,
              params: {
                name: `sendResourceForRender`,
                params: {
                  viewName: `calendar_day`,
                  components: [`article main`],
                  customParams: {
                    days: -1,
                  },
                },
              },
            })}"
          >
            ${svgTable["svgArrowLeft"]}
          </button>
          <button data-fn="${inlineStringify({})}">
            ${jsonTable["jsonWeekdays"][anchor_date.getDay()][language]}
            ${anchor_date.toLocaleDateString("fi-FI")}
          </button>
          <button
            data-fn="${inlineStringify({
              name: `msgToSw`,
              params: {
                name: `sendResourceForRender`,
                params: {
                  viewName: `calendar_day`,
                  components: [`article main`],
                  customParams: {
                    days: 1,
                  },
                },
              },
            })}"
          >
            ${svgTable["svgArrowRight"]}
          </button>
        </div>

        <div id="calendarView">
          <div id="timeline"></div>
          <div id="events"></div>
        </div>
      `;
    },
    async calendar_week(article_main_json, language) {
      const { anchor_date } = article_main_json;

      return html`
        <div id="datePicker">
          <button
            data-fn="${inlineStringify({
              name: `msgToSw`,
              params: {
                name: `sendResourceForRender`,
                params: {
                  viewName: `calendar_week`,
                  components: [`article main`],
                  customParams: {
                    weeks: -1,
                  },
                },
              },
            })}"
          >
            ${svgTable["svgArrowLeft"]}
          </button>
          <button data-fn="${inlineStringify({})}">
            ${{ fi: "viikko", sv: "vecka", en: "week" }[language]}
            ${getWeekNum(anchor_date)}
            ${jsonTable["jsonMonths"][anchor_date.getMonth()][language]}
          </button>
          <button
            data-fn="${inlineStringify({
              name: `msgToSw`,
              params: {
                name: `sendResourceForRender`,
                params: {
                  viewName: `calendar_week`,
                  components: [`article main`],
                  customParams: {
                    weeks: 1,
                  },
                },
              },
            })}"
          >
            ${svgTable["svgArrowRight"]}
          </button>
        </div>

        <div id="calendarView">
          <div id="timeline"></div>
          <div id="events"></div>
        </div>
      `;
    },
    async calendar_month(article_main_json, language) {
      const { anchor_date } = article_main_json;
      return html`
        <div id="datePicker">
          <button
            data-fn="${inlineStringify({
              name: `msgToSw`,
              params: {
                name: `sendResourceForRender`,
                params: {
                  viewName: `calendar_month`,
                  components: [`article main`],
                  customParams: {
                    months: -1,
                  },
                },
              },
            })}"
          >
            ${svgTable["svgArrowLeft"]}
          </button>

          <button data-fn="${inlineStringify({})}">
            ${jsonTable["jsonMonths"][anchor_date.getMonth()][language]}
            ${anchor_date.getFullYear()}
          </button>

          <button
            data-fn="${inlineStringify({
              name: `msgToSw`,
              params: {
                name: `sendResourceForRender`,
                params: {
                  viewName: `calendar_month`,
                  components: [`article main`],
                  customParams: {
                    months: 1,
                  },
                },
              },
            })}"
          >
            ${svgTable["svgArrowRight"]}
          </button>
        </div>

        <div id="calendarView">
          <div id="timeline"></div>
          <div id="events"></div>
        </div>
      `;
    },
  }[viewName];
  const innerHTML = await constructor(article_main_json, language);
  return innerHTML;
};
