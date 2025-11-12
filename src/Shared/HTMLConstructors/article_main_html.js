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
        ${structDatePicker(
          "days",
          "calendar_day",
          html` <button id="toggler" data-fn="${inlineStringify({})}">
            ${jsonTable["jsonWeekdays"][anchor_date.getDay()][language]}
            ${anchor_date.toLocaleDateString("fi-FI")}
          </button>`
        )}
        <div id="calendarDisplay"></div>
      `;
    },
    async calendar_week(article_main_json, language) {
      const { anchor_date } = article_main_json;

      return html`
        ${structDatePicker(
          "weeks",
          "calendar_week",
          html` <button data-fn="${inlineStringify({})}">
            ${{ fi: "viikko", sv: "vecka", en: "week" }[language]}
            ${getWeekNumber(anchor_date)}
            ${jsonTable["jsonMonths"][anchor_date.getMonth()][language]}
          </button>`
        )}

        <div id="calendarDisplay">
          ${(() => {
            let markup = ``;
            for (let i = 0; i < 7; i++) {
              markup += html`<div class="col"></div>`;
            }
            return markup;
          })()}
        </div>
      `;
    },
    async calendar_month(article_main_json, language) {
      const { anchor_date } = article_main_json;
      return html`
        ${structDatePicker(
          "months",
          "calendar_month",
          html` <button id="toggler" data-fn="${inlineStringify({})}">
            ${jsonTable["jsonMonths"][anchor_date.getMonth()][language]}
            ${anchor_date.getFullYear()}
          </button>`
        )}
        <div id="calendarDisplay">
          ${(() => {
            const table = getMonthTable(anchor_date, language); // 7x8: [ [null,abbr...], [week,{d,type}×7]×6 ]
            let out = "";
            for (let r = 0; r < 7; r++) {
              out += '<div class="row">';
              const row = table[r];
              for (let c = 0; c < 8; c++) {
                const cell = row[c];
                if (r === 0) {
                  out += `<div class="cell head">${cell ?? ""}</div>`;
                } else if (c === 0) {
                  out += `<div class="cell week">${cell}</div>`;
                } else {
                  const val = cell.day ?? cell.d;
                  out += `<div class="cell ${cell.type}">${val}</div>`;
                }
              }
              out += "</div>";
            }
            return out;
          })()}
        </div>
      `;
    },
  }[viewName];
  const innerHTML = await constructor(article_main_json, language);
  return innerHTML;
};

import jsonTable from "../markup/jsonTable";
import inlineStringify from "../Utilities/inlineStringify";
import getMonthTable from "../Utilities/Time/getMonthTable";
import structDatePicker from "../markup/HTML/structDatePicker";
import getWeekNumber from "../Utilities/Time/getWeekNumber";
