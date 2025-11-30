export class HomeNavigationListData {
  /**
   *
   * @param {Language} language
   */
  constructor(language) {
    /************
     * HEADINGS *
     ************/
    this.headings = {
      use: {
        fi: "KÄYTTÄJÄ",
        sv: "ANVÄNDARE",
        en: "USER",
      }[language],
      my_vorte: "MY VORTE",
      vortepreneur: "VORTEPRENEUR",
    };
    /**********
     * LABELS *
     **********/
    this.labels = {
      use: {
        home: { fi: "Koti", sv: "Hem", en: "Home" }[language],
        subscription: {
          fi: "Tilaus",
          sv: "Prenumeration",
          en: "Subscription",
        }[language],
        settings: {
          fi: "Asetukset",
          sv: "Inställningar",
          en: "Settings",
        }[language],
        public_profile: {
          fi: "Julkinen profiili",
          sv: "Offentlig profil",
          en: "Public profile",
        }[language],
      },
      my_vorte: {
        tasks: {
          fi: "Tehtävät",
          sv: "Uppgifter",
          en: "Tasks",
        }[language],
        calendar: {
          fi: "Kalenteri",
          sv: "Kalender",
          en: "Calendar",
        }[language],
        time_tracking: {
          fi: "Tuntikirjaus",
          sv: "Tidrapportering",
          en: "Time tracking",
        }[language],
        networking: {
          fi: "Verkostoituminen",
          sv: "Nätverkande",
          en: "Networking",
        }[language],
        rte: {
          fi: "Polku yrittäjäksi",
          sv: "Vägen till entreprenörskap",
          en: "Road to entrepreneurship",
        }[language],
      },
      vortepreneur: {
        "company/new": {
          fi: "Lisää yritys",
          sv: "Lägg till företag",
          en: "Add a company",
        }[language],
        no_companies_fallback: {
          fi: "yrityksiä ei löytynyt...",
          sv: "inga företag hittades...",
          en: "no companies found...",
        }[language],
      },
    };
    /*********
     * ICONS *
     *********/
    this.icons = {};
    /*********
     * ICONS *
     *********/
  }
}
