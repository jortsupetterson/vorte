import svgTable from "../markup/svgTable";
import inlineStringify from "../Utilities/inlineStringify";

export default (nav_ul_json, language, viewName, isDemo) => {
  const constructor = {
    home(nav_ul_json, language, isDemo) {
      const { my_vorte_app_list, vortepreneur_organization_list } = nav_ul_json;
      return html`
        <li>
          <details open>
            <summary>MY VORTE</summary>
            <ul id="MyVorteAppList">
              ${(() => {
                let markup = ``;
                for (const item of my_vorte_app_list) {
                  markup += {
                    tasks: html` <li data-fn="${inlineStringify({})}">
                      ${svgTable["svgList"]}${{
                        fi: "Tehtävät",
                        sv: "Uppgifter",
                        en: "Tasks",
                      }[language]}
                    </li>`,

                    calendar: html` <li data-fn="${inlineStringify({})}">
                      ${svgTable["svgCalendar"]}${{
                        fi: "Kalenteri",
                        sv: "Kalender",
                        en: "Calendar",
                      }[language]}
                    </li>`,

                    networking: html` <li data-fn="${inlineStringify({})}">
                      ${svgTable["svgNetwork"]}${{
                        fi: "Verkostoituminen",
                        sv: "Nätverkande",
                        en: "Networking",
                      }[language]}
                    </li>`,

                    rte: html` <li data-fn="${inlineStringify({})}">
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
          </details>
        </li>
        <li>
          <details open>
            <summary class="preview">VORTEPRENEUR</summary>
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
                for (const organizationName of vortepreneur_organization_list) {
                  markup += html`<li data-fn="${inlineStringify({})}">
                    ${svgTable["svgOrganization"]}${organizationName}
                  </li>`;
                }
                return markup;
              })()}
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>
              ${{ fi: "KÄYTTÄJÄ", sv: "ANVÄNDARE", en: "USER" }[language]}
            </summary>
            <ul>
              <li data-fn="${inlineStringify({})}">
                ${svgTable["svgPerson"]}
                ${{
                  fi: "Julkinen profiili",
                  sv: "Offentlig profil",
                  en: "Public profile",
                }[language]}
              </li>
              <li data-fn="${inlineStringify({})}">
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
          </details>
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
      `;
    },
    settings(nav_ul_json, language, isDemo) {
      let mark;
    },
  }[viewName];
  const innerHTML = constructor(nav_ul_json, language, isDemo);
  return innerHTML;
};
