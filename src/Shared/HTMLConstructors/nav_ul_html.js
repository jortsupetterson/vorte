/// <reference path="../../Types/Common.d.ts" />

/**
 * !====!
 * !STOP!
 * !====!
 *
 * Relax and close all methods of the `constructor` object.
 * Chek the types defined on `param` and `returns` field on JSdoc.
 * Once you have done that, make sure the view area you want to work on is indeed CSSSelector `nav ul` in the DOM.
 * Open the method named after the feature/view where you want to make changes to `nav ul` or create a new method.
 * If you dont get it trace function calls backward and forward, as well as check the DOM and see the result.
 * You can also ask for a walktrough on Vorte discord.
 */

/**
 * @param {object} nav_ul_json JSON with only the neccesary fields formated for the specific viewName of the specified CSSSelector from the BLOB.
 * @param {T.SupportedLanguage} language A language code used to look up content.
 * @param {T.SupportedViewName} viewName Specifies the scope of content that should be readied for render.
 * @param {boolean} isDemo A boolean based on wheter window.location.search has `?demo` flag or not.
 * @returns {T.HTMLText} innerHTML of CSSSelector `nav ul` for specifed viewName.
 */

export default async (nav_ul_json, language, viewName, isDemo) => {
  const cookie = await cookieStore.get("articleId");
  const articleId = cookie?.value ?? "home";
  const constructor = {
    home() {
      const { my_vorte_apps, vortepreneur_organizations } = nav_ul_json;
      return html`
        <li>
          <div>
            <p>MY VORTE</p>
            <ul id="MyVorteAppList">
              ${(() => {
                let markup = ``;
                for (const item of my_vorte_apps) {
                  markup += {
                    home: html`<li
                      id="home"
                      ${isActive(articleId, `home`) ?? ``}
                      data-fn="${inlineStringify({
                        name: `msgToSw`,
                        params: {
                          name: `sendResourceForRender`,
                          params: {
                            viewName: `home`,
                            components: [
                              `article main`,
                              `article footer`,
                              `article header h1`,
                            ],
                          },
                        },
                      })}"
                    >
                      ${svgTable["svgHouse"]}${{
                        fi: "Koti",
                        sv: "Hem",
                        en: "Home",
                      }[language]}
                    </li>`,
                    tasks: html`<li
                      id="tasks"
                      ${isActive(articleId, `tasks`) ?? ``}
                      data-fn="${inlineStringify({
                        name: `msgToSw`,
                        params: {
                          name: `sendResourceForRender`,
                          params: {
                            viewName: `tasks`,
                            components: [`nav ul`],
                          },
                        },
                      })}"
                    >
                      ${svgTable["svgList"]}${{
                        fi: "Tehtävät",
                        sv: "Uppgifter",
                        en: "Tasks",
                      }[language]}
                    </li>`,

                    calendar: html` <li
                      id="calendar"
                      ${isActive(articleId, `calendar`) ?? ``}
                      data-fn="${inlineStringify({
                        name: `msgToSw`,
                        params: {
                          name: `sendResourceForRender`,
                          params: {
                            viewName: `calendar`,
                            components: [`nav ul`],
                          },
                        },
                      })}"
                    >
                      ${svgTable["svgCalendar"]}${{
                        fi: "Kalenteri",
                        sv: "Kalender",
                        en: "Calendar",
                      }[language]}
                    </li>`,

                    networking: html` <li
                      id="networking"
                      ${isActive(articleId, `networking`) ?? ``}
                      data-fn="${inlineStringify({})}"
                    >
                      ${svgTable["svgNetwork"]}${{
                        fi: "Verkostoituminen",
                        sv: "Nätverkande",
                        en: "Networking",
                      }[language]}
                    </li>`,

                    rte: html` <li
                      id="rte"
                      ${isActive(articleId, `rte`) ?? ``}
                      data-fn="${inlineStringify({})}"
                    >
                      ${svgTable["svgRoad"]}${{
                        fi: "Polku yrittäjäksi",
                        sv: "Vägen till entreprenörskap",
                        en: "Road to entrepreneurship",
                      }[language]}
                    </li>`,
                  }[item];
                }
                return markup;
              })()}
            </ul>
          </div>
        </li>
        <li>
          <div>
            <p class="preview">VORTEPRENEUR</p>
            <ul id="VortepreneurOrganizationList">
              <li data-fn="${inlineStringify({})}">
                ${svgTable["svgPlus"]}
                ${{
                  fi: "Lisää organisaatio",
                  sv: "Lägg till en organisation",
                  en: "Add an organisation",
                }[language]}
              </li>
              ${(() => {
                let markup = ``;
                for (const organizationName of vortepreneur_organizations) {
                  markup += html`<li data-fn="${inlineStringify({})}">
                    ${svgTable["svgOrganization"]}${organizationName}
                  </li>`;
                }
                return markup;
              })()}
            </ul>
          </div>
        </li>
        <li>
          <div>
            <p>${{ fi: "KÄYTTÄJÄ", sv: "ANVÄNDARE", en: "USER" }[language]}</p>
            <ul>
              <li data-fn="${inlineStringify({})}">
                ${svgTable["svgPerson"]}
                ${{
                  fi: "Julkinen profiili",
                  sv: "Offentlig profil",
                  en: "Public profile",
                }[language]}
              </li>
              <li
                id="settings"
                ${isActive(articleId, `settings`) ?? ``}
                data-fn="${inlineStringify({
                  name: `msgToSw`,
                  params: {
                    name: `sendResourceForRender`,
                    params: {
                      viewName: `settings`,
                      components: [`nav ul`],
                    },
                  },
                })}"
              >
                ${svgTable["svgGear"]}
                ${{ fi: "Asetukset", sv: "Inställningar", en: "Settings" }[
                  language
                ]}
              </li>
              <li data-fn="${inlineStringify({})}">
                ${svgTable["svgSubscription"]}
                ${{ fi: "Tilaus", sv: "Prenumeration", en: "Subscription" }[
                  language
                ]}
              </li>
            </ul>
          </div>
        </li>
        <li>
          <button
            data-fn="${inlineStringify({
              name: `setLocation`,
              params: { location: `/` },
            })}"
          >
            ${isDemo
              ? `${
                  {
                    fi: "Luo käyttäjä",
                    sv: "Skapa användare",
                    en: "Create a user",
                  }[language]
                }→`
              : { fi: "Kirjaudu ulos", sv: "Logga ut", en: "Sign out" }[
                  language
                ]}
          </button>
        </li>
        <ul>
          <li data-fn=""></li>
        </ul>
        <ul>
          <li data-fn=""></li>
        </ul>
      `;
    },
    calendar() {
      const { open_on_start } = nav_ul_json;
      return html`
        <li>
          <button
            id="home"
            data-fn="${inlineStringify({
              name: `msgToSw`,
              params: {
                name: `sendResourceForRender`,
                params: { viewName: `home`, components: [`nav ul`] },
              },
            })}"
          >
            ${svgTable["svgArrowLeft"]}
          </button>
        </li>
        <li>
          <div>
            <p>MY VORTE</p>
            <h2>
              ${{ fi: "Kalenteri", sv: "Kalender", en: "Calendar" }[language]}
            </h2>
            <ul>
              <li
                id="calendar_day"
                ${isActive(articleId, `calendar_day`)}
                data-fn="${swr(`calendar_day`, [
                  `article main`,
                  `article footer`,
                  `article header h1`,
                ])}"
              >
                ${svgTable["svgCalendarDay"]}
                ${{ fi: "Päivänäkymä", sv: "Dagsvy", en: "Day view" }[language]}
              </li>
              <li
                id="calendar_week"
                ${isActive(articleId, `calendar_week`)}
                data-fn="${swr(`calendar_week`, [
                  `article main`,
                  `article footer`,
                  `article header h1`,
                ])}"
              >
                ${svgTable["svgCalendarWeek"]}
                ${{ fi: "Viikkonäkymä", sv: "Veckovy", en: "Week view" }[
                  language
                ]}
              </li>
              <li
                id="calendar_month"
                ${isActive(articleId, `calendar_month`)}
                data-fn="${swr(`calendar_month`, [
                  `article main`,
                  `article footer`,
                  `article header h1`,
                ])}"
              >
                ${svgTable["svgCalendar"]}
                ${{ fi: "Kuukausinäkymä", sv: "Månadsvy", en: "Month view" }[
                  language
                ]}
              </li>
              <li
                id="calendar_config"
                data-fn="${swr(`calendar_config`, [
                  `article main`,
                  `article footer`,
                  `article header h1`,
                ])}
              "
              >
                ${svgTable["svgGear"]}
                ${{ fi: "Asetukset", sv: "Instalingär", en: "Settings" }[
                  language
                ]}
              </li>
            </ul>
          </div>
        </li>
      `;
    },
  }[viewName];

  /** @type {T.HTMLText} */
  const innerHTML = constructor();
  return innerHTML;
};
import swr from "../Utilities/swr";
import svgTable from "../markup/svgTable";
import inlineStringify from "../Utilities/inlineStringify";

const isActive = (articleId, itemId) => {
  if (articleId.includes(itemId)) {
    return `class="active"`;
  }
};
