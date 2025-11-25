/// <reference path="../../Types/Common.d.ts" />

/**
 * !====!
 * !STOP!
 * !====!
 *
 * Relax and close all methods of the `constructor` object.
 * Chek the types defined on `param` and `returns` field on JSdoc.
 * Once you have done that, make sure the view area you want to work on is indeed CSSSelector `article main` in the DOM.
 * Open the method named after the feature/view where you want to make changes to `article main` or create a new method.
 * If you dont get it trace function calls backward and forward, as well as check the DOM and see the result.
 * You can also ask for a walktrough on Vorte discord.
 */

/**
 * @param {object} article_main_json JSON with only the neccesary fields formated for the specific viewName of the specified CSSSelector from the BLOB
 * @param {Common.Language} language A language code used to look up content
 * @param {Common.ViewName} viewName Specifies the scope of content that should be readied for render
 * @returns {Common.HTMLText} innerHTML of CSSSelector `article main` for specifed viewName
 */

export default async (article_main_json, language, viewName) => {
  const constructor = {
    async home() {
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

    async calendar_day() {
      const { anchor_date, event_list, category_list } = article_main_json,
        nonce = getNonce(),
        style_rules = [],
        event_category_css_classes = new Set();

      const innerHTML = (() => {
        let markup = ``;
        for (const {
          event_category_id,
          event_info,
          event_starts_at,
          event_duration_minutes,
        } of event_list) {
          const saved_category = category_list.find(
              (category) => category.id === event_category_id
            ),
            category_color = saved_category?.hex_color ?? "var(--contentColor)";

          const event_category_css_class = `ev-cat-${event_category_id}`;

          if (!event_category_css_classes.has(event_category_css_class)) {
            event_category_css_classes.add(event_category_css_class);
            style_rules.push(`
              .${event_category_css_class} {
                background: rgb(from ${category_color} r g b / 0.13);
              }
              `);
          }

          const event_start_date = new Date(event_starts_at),
            event_start_hours = event_start_date.getHours(),
            event_start_minutes = event_start_date.getMinutes(),
            event_total_minutes =
              event_start_hours * 60 +
              event_start_minutes +
              event_duration_minutes,
            event_end_minutes = event_total_minutes % 60,
            event_end_hours = (event_total_minutes - event_end_minutes) / 60;

          markup += html`
            <div class="${event_category_css_class}">
              <span>
                <span>
                  ${event_start_hours}.${event_start_minutes < 10
                    ? "0" + event_start_minutes
                    : event_start_minutes}-${event_end_hours}.${event_end_minutes <
                  10
                    ? "0" + event_end_minutes
                    : event_end_minutes}
                </span>
                ${saved_category.name}
              </span>
              <span>${event_info}</span>
            </div>
          `;
        }
        return markup;
      })();
      const styles = style_rules.join("");
      return html`
        ${structDatePicker(
          "days",
          "calendar_day",
          `${jsonTable["jsonWeekdays"][anchor_date.getDay()][language]}
          ${anchor_date.toLocaleDateString("fi-FI")}`
        )}
        <div id="calendarDisplay">
          <style nonce="${await nonce}">
            ${styles}
          </style>
          ${innerHTML}
        </div>
      `;
    },
    async calendar_week() {
      const { anchor_date, monday_date, event_list, category_list } =
        article_main_json;

      const range = findWeeksTimeRange(event_list);
      const timeline_start_minutes =
          range.min > 6 * 60 ? 6 * 60 : Math.floor(range.min / 180) * 180,
        timeline_end_minutes =
          range.max < 18 * 60 ? 18 * 60 : Math.ceil(range.max / 180) * 180;
      const calendar_height_from_minutes =
        timeline_end_minutes - timeline_start_minutes;

      const nonce = getNonce(),
        monday = monday_date.getDate(),
        month = monday_date.getMonth(),
        year = monday_date.getFullYear(),
        style_rules = [];

      const grid = (() => {
        let markup = ``;

        for (let day_offset = 0; day_offset < 7; day_offset++) {
          const day_num = monday + day_offset;

          markup += html`<div class="col">
            <div class="label">
              ${jsonTable["jsonWeekdayAbbrevations"][language][day_offset]}
              <span>${day_num}</span>
            </div>
            <div
              class="col-inner"
              data-fn="${inlineStringify({
                name: `msgToSw`,
                params: {
                  type: `render`,
                  params: {
                    viewName: `calendar_day`,
                    components: [`article main`, `article header h1`],
                    customParams: {
                      anchor_date: `${year}-${month + 1}-${day_num}`,
                    },
                  },
                },
              })}"
            >
              ${(() => {
                const raw_events = event_list[day_num];
                if (!raw_events) return "";

                const this_days_events = [];

                for (const event of raw_events) {
                  const event_start_date = new Date(event.event_starts_at),
                    event_start_hours = event_start_date.getHours(),
                    event_start_minutes = event_start_date.getMinutes(),
                    event_start_total_in_minutes =
                      event_start_hours * 60 + event_start_minutes,
                    event_total_raw =
                      event_start_total_in_minutes +
                      event.event_duration_minutes;

                  if (event_total_raw <= 24 * 60) {
                    this_days_events.push(event);
                    continue;
                  }

                  // ADDRESSING EVENTS THAT LAST OVER MIDNIGHT
                  const todays_duration =
                    24 * 60 - event_start_total_in_minutes;
                  const tommorws_duration = event_total_raw - 24 * 60;

                  this_days_events.push({
                    ...event,
                    event_duration_minutes: todays_duration,
                  });

                  const tommorows_date = new Date(event.event_starts_at);
                  tommorows_date.setDate(tommorows_date.getDate() + 1);
                  tommorows_date.setHours(0, 0, 0, 0);

                  const tomorrows_day_num = day_num + 1;
                  (event_list[tomorrows_day_num] ||= []).push({
                    ...event,
                    event_starts_at: tommorows_date.toISOString(),
                    event_duration_minutes: tommorws_duration,
                  });
                }

                this_days_events.sort(
                  (a, b) =>
                    new Date(a.event_starts_at) - new Date(b.event_starts_at)
                );

                let column = ``;

                for (const event of this_days_events) {
                  const event_hash = `ev-${getContentFingerptint(event)}`;

                  const {
                    event_starts_at,
                    event_duration_minutes,
                    event_category_id,
                  } = event;

                  const saved_category = category_list.find(
                      (category) => category.id === event_category_id
                    ),
                    category_color =
                      saved_category?.hex_color ?? "var(--contentColor)";

                  const event_start_time = new Date(event_starts_at),
                    event_start_hours = event_start_time.getHours(),
                    event_start_minutes = event_start_time.getMinutes(),
                    event_start_total_minutes =
                      event_start_hours * 60 + event_start_minutes;

                  //position: absolute
                  const event_start_position_from_minutes =
                    event_start_total_minutes - timeline_start_minutes;

                  const end_total_raw =
                    event_start_total_minutes + event_duration_minutes;
                  const end_total =
                    end_total_raw >= 24 * 60 ? 24 * 60 : end_total_raw;

                  let event_end_hours;
                  let event_end_minutes;

                  if (end_total === 24 * 60) {
                    event_end_hours = 23;
                    event_end_minutes = 59;
                  } else {
                    event_end_hours = (end_total / 60) | 0;
                    event_end_minutes = end_total % 60;
                  }

                  style_rules.push(`
              div#${event_hash} {
                top: calc(${event_start_position_from_minutes} * ${DEFAULT_PIXEL_HEIGHT}px);
                height: calc(${event_duration_minutes} * ${DEFAULT_PIXEL_HEIGHT}px);
                background: rgb(from ${category_color} r g b / 0.13);
              }
            `);

                  column += `<div id="${event_hash}">
              <span>${event_start_hours}.${
                    event_start_minutes < 10
                      ? "0" + event_start_minutes
                      : event_start_minutes
                  }-${event_end_hours}.${
                    event_end_minutes < 10
                      ? "0" + event_end_minutes
                      : event_end_minutes
                  }</span>
              ${saved_category.name}
            </div>`;
                }

                return column;
              })()}
            </div>
          </div>`;
        }

        return markup;
      })();

      const styles = style_rules.join("");

      return html`
        ${structDatePicker(
          "weeks",
          "calendar_week",
          `
            ${{ fi: "viikko", sv: "vecka", en: "week" }[language]}
            ${getWeekNumber(anchor_date)}
            ${jsonTable["jsonMonths"][anchor_date.getMonth()][language]}
          `
        )}
        <div id="calendarDisplay">
          <style nonce="${await nonce}">
            #calendarDisplay{
               min-height: calc(${calendar_height_from_minutes} * ${DEFAULT_PIXEL_HEIGHT}px);
             }
             ${styles}
          </style>
          ${structHourTimeline(timeline_start_minutes, timeline_end_minutes)}
          ${grid}
        </div>
        <div class="padding"></div>
      `;
    },
    async calendar_month() {
      const nonce = getNonce(),
        style_rules = [],
        event_category_css_classes = new Set();

      const { anchor_date, event_list, categories } = article_main_json;

      const markup = (() => {
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
              out += `<button class="cell week" data-fn="${inlineStringify({
                name: "msgToSw",
                params: {
                  type: "render",
                  params: {
                    viewName: "calendar_week",
                    components: ["article main", "article header h1"],
                    customParams: { anchor_date: cell.date },
                  },
                },
              })}">${cell.number}</button>`;
            } else {
              const day_num = cell.d;
              const events = event_list[day_num] ?? "";
              out += `<div class="cell ${cell.type}" ${
                cell.type === "curr"
                  ? `data-fn="${inlineStringify({
                      name: "msgToSw",
                      params: {
                        type: "render",
                        params: {
                          viewName: "calendar_day",
                          components: ["article main", "article header h1"],
                          customParams: { anchor_date: cell.date },
                        },
                      },
                    })}"`
                  : ""
              }>${day_num}${(() => {
                let inner = ``;
                if (cell.type === "curr" && Array.isArray(events)) {
                  let extra_count = 0;
                  events.forEach(({ event_category_id }, index) => {
                    if (index < 2) {
                      const saved_category = categories.find(
                        (category) => category.id === event_category_id
                      );

                      const event_category_css_class = `ev-cat-${event_category_id}`;

                      const category_color =
                        saved_category?.hex_color ?? "var(--contentColor)";
                      if (
                        !event_category_css_classes.has(
                          event_category_css_class
                        )
                      ) {
                        event_category_css_classes.add(
                          event_category_css_class
                        );
                        style_rules.push(`
                        span.${event_category_css_class} {
                            background: rgb(from ${category_color} r g b / 0.13);
                        }
                        `);
                      }
                      inner += `<span class="${event_category_css_class}">${saved_category.name}</span>`;
                    } else extra_count++;
                  });
                  if (extra_count > 0) inner += `<span>+${extra_count}</span>`;
                }
                return inner;
              })()}</div>`;
            }
          }
          out += "</div>";
        }
        return out;
      })();
      const styles = style_rules.join("");
      const year = anchor_date.getFullYear();
      const month = anchor_date.getMonth();
      return html` ${structDatePicker(
          "months",
          "calendar_month",
          `${jsonTable["jsonMonths"][month][language]} ${year}`
        )}
        <div id="calendarDisplay">
          <style nonce="${await nonce}">
            ${styles}
          </style>
          ${markup}
        </div>`;
    },
    async calendar_config() {
      const nonce = getNonce();

      /** @type {Calendar["config"]} */
      const config = article_main_json;

      const style_rules = [];
      let category_list_html = ``;

      for (const category of config.categories) {
        style_rules.push(`
          .ev-cat-${category.id} {
            background: rgb(from ${category.hex_color} r g b / 0.13);
          }
        `);
        category_list_html += html`
          <category-list-item
            data-id="${category.id}"
            data-name="${category.name}"
            data-color="${category.hex_color}"
            class="ev-cat-${category.id}"
          >
            ${category.name}
          </category-list-item>
        `;
      }

      return html`
        <style nonce="${await nonce}">
          ${style_rules.join("")}
        </style>

        <section id="calendar_category_list">
          <p>
            ${{
              fi: "Tapahtumien kategorisointi",
              sv: "Kategorisering av händelser",
              en: "Event categorization",
            }[language]}
          </p>
          <ul>
            ${category_list_html}
          </ul>
          <button
            id="newCategory"
            data-fn="${inlineStringify({
              name: `toggleDialog`,
              params: {
                tag: `calendar-category-form`,
                dataset: { type: `create` },
              },
            })}"
          >
            ${{
              fi: "+ luo uusi kategoria",
              sv: "+ skapa en ny kategori",
              en: "+ create a new category",
            }[language]}
          </button>
        </section>

        <section id="calendar_configuration">
          <div>
            <p>
              ${{
                fi: "Viikon aloituspäivä",
                sv: "Veckans startdag",
                en: "Week start day",
              }[language]}
            </p>

            <option-grid
              id="week_starts_on"
              data-mode="single"
              data-options="${inlineStringify([
                {
                  id: `monday`,
                  label: {
                    fi: `maanantai`,
                    sv: `måndag`,
                    en: `monday`,
                  }[language],
                  selected: config.week_starts_on.monday,
                },
                {
                  id: `sunday`,
                  label: {
                    fi: `sunnuntai`,
                    sv: `söndag`,
                    en: `sunday`,
                  }[language],
                  selected: config.week_starts_on.sunday,
                },
              ])}"
            >
            </option-grid>
          </div>

          <div>
            <p>
              ${{
                fi: "Näytetään viikkonäkymässä",
                sv: "Visa i veckovy",
                en: "Shown in week view",
              }[language]}
            </p>

            <option-grid
              id="displayed_on_week_view"
              data-mode="multiple"
              data-options="${inlineStringify([
                {
                  id: `saturday`,
                  label: {
                    fi: `lauantai`,
                    sv: `lördag`,
                    en: `saturday`,
                  }[language],
                  selected: config.displayed_on_week_view.saturday,
                },
                {
                  id: `sunday`,
                  label: {
                    fi: `sunnuntai`,
                    sv: `söndag`,
                    en: `sunday`,
                  }[language],
                  selected: config.displayed_on_week_view.sunday,
                },
              ])}"
            >
            </option-grid>
          </div>

          <div>
            <p>
              ${{
                fi: "Vastaanota muistutukset tapahtumista",
                sv: "Ta emot påminnelser om händelser",
                en: "Receive reminders about events",
              }[language]}
            </p>
            <option-grid
              id="notifications"
              data-mode="multiple"
              data-options="${inlineStringify([
                {
                  id: `push`,
                  label: {
                    fi: `push-ilmoitukset`,
                    sv: `push-meddelanden`,
                    en: `push notifications`,
                  }[language],
                  selected: config.notifications.push,
                },
                {
                  id: `email`,
                  label: {
                    fi: `sähköposti`,
                    sv: `e-post`,
                    en: `email`,
                  }[language],
                  selected: config.notifications.email,
                },
              ])}"
            >
            </option-grid>
          </div>
        </section>
      `;
    },
  }[viewName];
  const innerHTML = await constructor();
  return innerHTML;
};

import jsonTable from "../markup/jsonTable";
import inlineStringify from "../Utilities/inlineStringify";
import getMonthTable from "../Utilities/Time/getMonthTable";
import structDatePicker from "../markup/HTML/structDatePicker";
import getWeekNumber from "../Utilities/Time/weekNumberFromDate";
import getNonce from "../Utilities/Getters/getNonce";
import getContentFingerptint from "../Utilities/Codec/getContentFingerptint";
import structHourTimeline from "../markup/HTML/structHourTimeline";
import findWeeksTimeRange from "../Utilities/Time/findWeeksTimeRange";
import { DEFAULT_PIXEL_HEIGHT } from "../DEMO_OBJECTS/DEMO_CALENDAR";
