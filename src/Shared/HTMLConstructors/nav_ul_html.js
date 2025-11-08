import svgTable from "../markup/svgTable";
import inlineStringify from "../../../shared/utilities/inlineStringify";

export default nav_ul_html = (nav_ul_json) => {
  const lang = document.body.dataset.language;
  const innerHTML = {
    home(nav_ul_json) {
      const { my_vorte_app_list, vortepreneur_organization_list } = nav_ul_json;
      return html`
        <li>
          <details id="MyVorteAppList" open>
            <summary>MY VORTE</summary>
            <ul>
              ${(() => {
                let markup = ``;
                for (const item of my_vorte_app_list) {
                  markup += {
                    tasks: html` <li data-fn="${inlineStringify({})}">
                      ${svgTable["svgX"]}${{
                        fi: "Tehtävät",
                        sv: "Uppgifter",
                        en: "Tasks",
                      }[lang]}
                    </li>`,

                    calendar: html` <li data-fn="${inlineStringify({})}">
                      ${svgTable["svgX"]}${{
                        fi: "Kalenteri",
                        sv: "Kalender",
                        en: "Calendar",
                      }[lang]}
                    </li>`,

                    networking: html` <li data-fn="${inlineStringify({})}">
                      ${svgTable["svgX"]}${{
                        fi: "Verkostoituminen",
                        sv: "Nätverkande",
                        en: "Networking",
                      }[lang]}
                    </li>`,

                    rte: html` <li data-fn="${inlineStringify({})}">
                      ${svgTable["svgX"]}${{
                        fi: "Polku yrittäjäksi",
                        sv: "Vägen till entreprenörskap",
                        en: "Road to entrepreneurship",
                      }[lang]}
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
            <ul>
              <li data-fn="$2"></li>
              ${(() => {
                let markup = ``;
                for (const organizationName of vortepreneur_organization_list) {
                  markup += html`<li>${organizationName}</li>`;
                }
                return markup;
              })()}
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>
              ${{ fi: "KÄYTTÄJÄ", sv: "ANVÄNDARE", en: "USER" }[lang]}
            </summary>
            <ul>
              <li>
                ${svgTable["svgX"]}
                ${{
                  fi: "Julkinen profiili",
                  sv: "Offentlig profil",
                  en: "Public profile",
                }[lang]}
              </li>
              <li>
                ${svgTable["svgX"]}
                ${{ fi: "Asetukset", sv: "Inställningar", en: "Settings" }[
                  lang
                ]}
              </li>
              <li>
                ${svgTable["svgX"]}
                ${{ fi: "Tilaus", sv: "Prenumeration", en: "Subscription" }[
                  lang
                ]}
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a href="${isDemo ? `` : ``}">
            ${isDemo
              ? {
                  fi: "Luo käyttäjä",
                  sv: "Skapa användare",
                  en: "Create a user",
                }[lang]
              : { fi: "Kirjaudu ulos", sv: "Logga ut", en: "Sign out" }[lang]}
          </a>
        </li>
      `;
    },
    settings() {
      let mark;
    },
  }[viewName](nav_ul_json);
  return innerHTML;
};
