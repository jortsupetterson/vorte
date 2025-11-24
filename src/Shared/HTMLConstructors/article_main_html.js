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
      const { anchor_date, event_list, category_list } = article_main_json;
      const nonce = await getNonce();
      const styleRules = [];
      const categoryHashes = new Set();
      const markup = (() => {
        let htm = ``;
        for (const {
          category,
          info,
          starts_at,
          duration_minutes,
        } of event_list) {
          const categoryHash = `cat-${getContentFingerptint(category)}`,
            categoryObjFromConfig = category_list.find(
              (c) => c.name === category
            ),
            categoryColor =
              categoryObjFromConfig?.hex_color ?? "var(--contentColor)";

          if (!categoryHashes.has(categoryHash)) {
            categoryHashes.add(categoryHash);
            styleRules.push(`
              .${categoryHash} {
                background: rgb(from ${categoryColor} r g b / 0.13);
              }
              `);
          }

          const eventStartDate = new Date(starts_at);
          const eventStartHours = eventStartDate.getHours();
          const eventStartMinutes = eventStartDate.getMinutes();
          const eventTotalMinutes =
            eventStartHours * 60 + eventStartMinutes + duration_minutes;
          const eventEndMinutes = eventTotalMinutes % 60;
          const eventEndHours = (eventTotalMinutes - eventEndMinutes) / 60;

          htm += html`
            <div class="${categoryHash}">
              <span>
                <span>
                  ${eventStartHours}.${eventStartMinutes < 10
                    ? "0" + eventStartMinutes
                    : eventStartMinutes}-${eventEndHours}.${eventEndMinutes < 10
                    ? "0" + eventEndMinutes
                    : eventEndMinutes}
                </span>
                ${category}
              </span>
              <span>${info}</span>
            </div>
          `;
        }
        return htm;
      })();
      const styles = styleRules.join("");
      return html`
        ${structDatePicker(
          "days",
          "calendar_day",
          `${jsonTable["jsonWeekdays"][anchor_date.getDay()][language]}
          ${anchor_date.toLocaleDateString("fi-FI")}`
        )}
        <div id="calendarDisplay">
          <style nonce="${nonce}">
            ${styles}
          </style>
          ${markup}
        </div>
      `;
    },
    async calendar_week() {
      const { anchor_date, monday_date, event_list, category_list } =
        article_main_json;
      const range = findWeeksTimeRange(event_list);
      const timelineStartMinutes =
          range.min > 6 * 60 ? 6 * 60 : Math.floor(range.min / 180) * 180,
        timelineEndMinutes =
          range.max < 18 * 60 ? 18 * 60 : Math.ceil(range.max / 180) * 180;
      const displayHeight = timelineEndMinutes - timelineStartMinutes;

      const nonce = await getNonce(),
        monday = monday_date.getDate(),
        month = monday_date.getMonth(),
        year = monday_date.getFullYear(),
        styleRules = [];

      const grid = (() => {
        let markup = ``;

        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
          const dayNum = monday + dayOffset;

          markup += html`<div class="col">
            <div class="label">
              ${jsonTable["jsonWeekdayAbbrevations"][language][dayOffset]}
              <span>${dayNum}</span>
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
                      anchor_date: `${year}-${month + 1}-${dayNum}`,
                    },
                  },
                },
              })}"
            >
              ${(() => {
                const rawEvents = event_list[dayNum];
                if (!rawEvents) return "";

                const thisDaysEvents = [];

                for (const event of rawEvents) {
                  const startDate = new Date(event.starts_at),
                    startHours = startDate.getHours(),
                    startMinutes = startDate.getMinutes(),
                    startTotal = startHours * 60 + startMinutes,
                    endTotalRaw = startTotal + event.duration_minutes;

                  if (endTotalRaw <= 24 * 60) {
                    thisDaysEvents.push(event);
                    continue;
                  }

                  const todayDuration = 24 * 60 - startTotal;
                  const nextDuration = endTotalRaw - 24 * 60;

                  thisDaysEvents.push({
                    ...event,
                    duration_minutes: todayDuration,
                  });

                  const nextDayDate = new Date(event.starts_at);
                  nextDayDate.setDate(nextDayDate.getDate() + 1);
                  nextDayDate.setHours(0, 0, 0, 0);

                  const nextDayNum = dayNum + 1;
                  (event_list[nextDayNum] ||= []).push({
                    ...event,
                    starts_at: nextDayDate.toISOString(),
                    duration_minutes: nextDuration,
                  });
                }

                thisDaysEvents.sort(
                  (a, b) => new Date(a.starts_at) - new Date(b.starts_at)
                );

                let column = ``;

                for (const event of thisDaysEvents) {
                  const { starts_at, duration_minutes, category } = event;
                  const id = `ev-${getContentFingerptint(event)}`;

                  const configCategoryObj = category_list.find(
                      (cat) => cat.name === category
                    ),
                    categoryColor =
                      configCategoryObj?.hex_color ?? "var(--contentColor)";

                  const eventStartTime = new Date(starts_at);
                  const eventStartHours = eventStartTime.getHours();
                  const eventStartMinutes = eventStartTime.getMinutes();
                  const eventStartTotalMinutes =
                    eventStartHours * 60 + eventStartMinutes;
                  const eventStartPosition =
                    eventStartTotalMinutes - timelineStartMinutes;

                  const endTotalRaw = eventStartTotalMinutes + duration_minutes;
                  const endTotal =
                    endTotalRaw >= 24 * 60 ? 24 * 60 : endTotalRaw;

                  let eventEndHours;
                  let eventEndMinutes;

                  if (endTotal === 24 * 60) {
                    eventEndHours = 23;
                    eventEndMinutes = 59;
                  } else {
                    eventEndHours = (endTotal / 60) | 0;
                    eventEndMinutes = endTotal % 60;
                  }

                  styleRules.push(`
              div#${id} {
                top: calc(${eventStartPosition} * ${DEFAULT_PIXEL_HEIGHT}px);
                height: calc(${duration_minutes} * ${DEFAULT_PIXEL_HEIGHT}px);
                background: rgb(from ${categoryColor} r g b / 0.13);
              }
            `);

                  column += `<div id="${id}">
              <span>${eventStartHours}.${
                    eventStartMinutes < 10
                      ? "0" + eventStartMinutes
                      : eventStartMinutes
                  }-${eventEndHours}.${
                    eventEndMinutes < 10
                      ? "0" + eventEndMinutes
                      : eventEndMinutes
                  }</span>
              ${category}
            </div>`;
                }

                return column;
              })()}
            </div>
          </div>`;
        }

        return markup;
      })();

      const styles = styleRules.join("");

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
          <style nonce="${nonce}">
            #calendarDisplay{
               min-height: calc(${displayHeight} * ${DEFAULT_PIXEL_HEIGHT}px);
             }
             ${styles}
          </style>
          ${structHourTimeline(timelineStartMinutes, timelineEndMinutes)}
          ${grid}
        </div>
        <div class="padding"></div>
      `;
    },
    async calendar_month() {
      const nonce = await getNonce();
      const styleRules = [];
      const categoryHashes = new Set();
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
              const dayNum = cell.d;
              const events = event_list[dayNum] ?? "";
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
              }>${dayNum}${(() => {
                let inner = ``;
                if (cell.type === "curr" && Array.isArray(events)) {
                  let extraCount = 0;
                  events.forEach(({ category }, index) => {
                    if (index < 2) {
                      const catHash = `cat-${getContentFingerptint(category)}`;
                      const catConfigObj = categories.find(
                        (cat) => cat.name === category
                      );
                      const catColor =
                        catConfigObj?.hex_color ?? "var(--contentColor)";
                      if (!categoryHashes.has(catHash)) {
                        categoryHashes.add(catHash);
                        styleRules.push(`
                        span.${catHash} {
                            background: rgb(from ${catColor} r g b / 0.13);
                        }
                        `);
                      }
                      inner += `<span class="${catHash}">${category}</span>`;
                    } else extraCount++;
                  });
                  if (extraCount > 0) inner += `<span>+${extraCount}</span>`;
                }
                return inner;
              })()}</div>`;
            }
          }
          out += "</div>";
        }
        return out;
      })();
      const styles = styleRules.join("");
      const year = anchor_date.getFullYear();
      const month = anchor_date.getMonth();
      return html` ${structDatePicker(
          "months",
          "calendar_month",
          `${jsonTable["jsonMonths"][month][language]} ${year}`
        )}
        <div id="calendarDisplay">
          <style nonce="${nonce}">
            ${styles}
          </style>
          ${markup}
        </div>`;
    },
    async calendar_config() {
      const nonce = getNonce();

      /** @type {Calendar["config"]} */
      const config = article_main_json;

      const styleRules = [];
      let category_list_html = ``;

      for (const category of config.categories) {
        const categoryHash = `cat-${getContentFingerptint(category)}`;
        styleRules.push(`
          .${categoryHash} {
            background: rgb(from ${category.hex_color} r g b / 0.13);
          }
        `);
        category_list_html += html`
          <category-list-item id="${category.name}" class="${categoryHash}">
            ${category.name}
          </category-list-item>
        `;
      }

      return html`
        <style nonce="${await nonce}">
          ${styleRules.join("")}
        </style>

        <section id="calendar_category_list">
          <p>
            ${{ fi: "Tapahtumien kategorisointi", sv: "", en: "" }[language]}
          </p>
          <ul>
            ${category_list_html}
          </ul>
          <button id="newCategory" data-fn="">
            ${{ fi: "+ luo uusi kategoria", sv: "", en: "" }[language]}
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
