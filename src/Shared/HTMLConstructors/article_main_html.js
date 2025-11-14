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
      const { anchor_date, monday_date, event_list } = article_main_json;
      const range = findWeeksTimeRange(event_list);
      const timelineStartMinutes =
          range.min > 6 * 60 ? 6 * 60 : Math.floor(range.min / 180) * 180,
        timelineEndMinutes =
          range.max < 21 * 60 ? 21 * 60 : Math.ceil(range.max / 180) * 180;
      const displayHeight = timelineEndMinutes - timelineStartMinutes;

      const nonce = await getNonce();
      const monday = monday_date.getDate();
      const styleRules = [];

      const grid = (() => {
        let markup = ``;

        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
          const dayNum = monday + dayOffset;

          markup += html`<div class="col">
            <div class="label">
              ${jsonTable["jsonWeekdayAbbrevations"][language][dayOffset]}
              <span>${dayNum}</span>
            </div>

            ${(() => {
              const rawEvents = event_list[dayNum];
              if (!rawEvents) return "";

              const thisDaysEvents = [];

              for (const event of rawEvents) {
                const startDate = new Date(event.starts_at);
                const startHours = startDate.getHours();
                const startMinutes = startDate.getMinutes();
                const startTotal = startHours * 60 + startMinutes;
                const endTotalRaw = startTotal + event.duration_minutes;

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

                const eventStartTime = new Date(starts_at);
                const eventStartHours = eventStartTime.getHours();
                const eventStartMinutes = eventStartTime.getMinutes();
                const eventStartTotalMinutes =
                  eventStartHours * 60 + eventStartMinutes;
                const eventStartPosition =
                  eventStartTotalMinutes - timelineStartMinutes;

                const endTotalRaw = eventStartTotalMinutes + duration_minutes;
                const endTotal = endTotalRaw >= 24 * 60 ? 24 * 60 : endTotalRaw;

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
                background: rgb(from var(--contentColor) r g b / 0.13);
              }
            `);

                column += `<div id="${id}">
              <span>${eventStartHours}.${
                  eventStartMinutes < 10
                    ? "0" + eventStartMinutes
                    : eventStartMinutes
                }-${eventEndHours}.${
                  eventEndMinutes < 10 ? "0" + eventEndMinutes : eventEndMinutes
                }</span>
              ${category}
            </div>`;
              }

              return column;
            })()}
          </div>`;
        }

        return markup;
      })();

      const styles = styleRules.join("");

      return html`
        ${structDatePicker(
          "weeks",
          "calendar_week",
          html`<button data-fn="${inlineStringify({})}">
            ${{ fi: "viikko", sv: "vecka", en: "week" }[language]}
            ${getWeekNumber(anchor_date)}
            ${jsonTable["jsonMonths"][anchor_date.getMonth()][language]}
          </button>`
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
import getThisMonday from "../Utilities/Time/getThisMonday";
import getNonce from "../Utilities/getNonce";
import calendarEventSearch from "../Utilities/Time/calendarEventSearch";
import getContentFingerptint from "../Utilities/Codec/getContentFingerptint";
import { DEFAULT_PIXEL_HEIGHT, DEFAULT_START } from "../CONFIG";
import structHourTimeline from "../markup/HTML/structHourTimeline";
import findWeeksTimeRange from "../Utilities/Time/findWeeksTimeRange";
