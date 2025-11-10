import svgTable from "../markup/svgTable";
import jsonTable from "../markup/jsonTable";
import inlineStringify from "../Utilities/inlineStringify";
export default async (article_main_json, language, viewName) => {
  const constructor = {
    home(article_main_json, language) {
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
    calendar_day(article_main_json, language) {
      return html`
        <div id="datePicker">
          <button data-fn="${inlineStringify({})}">
            ${svgTable["svgArrowLeft"]}
          </button>
          <button data-fn="${inlineStringify({})}">
            ${jsonTable["jsonWeekdays"][new Date().getDay()][language]}
            ${new Date().toLocaleDateString("fi-FI")}
          </button>
          <button data-fn="${inlineStringify({})}">
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
  const innerHTML = constructor(article_main_json, language);
  return innerHTML;
};
