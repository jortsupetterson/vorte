export default article_main_html = (article_main_json) => {
  const lang = document.body.dataset.language;
  const innerHTML = {
    home(article_main_json) {
      const { widget_list } = article_main_json;
      let markup = ``;
      for (const item in widget_list) {
        markup += {
          welcome({ firstname }) {
            return html`
              <div>
                <h6>
                  ${{
                    fi: `Tervetuloa Vorteen!`,
                    sv: `Välkömmen till Vorte`,
                    en: `Welcome to Vorte`,
                  }[lang]}
                </h6>
                <p>
                  ${{
                    fi: "Kiitos kun valitsit meidät",
                    sv: "",
                    en: "Thank you for choosing us",
                  }[lang]}${firstname}!
                </p>
                <button data-fn="${inlineStringify({})}">ok</button>
              </div>
            `;
          },
        }[item.name](item.params);
      }
      return markup;
    },
  }[viewName](article_main_json);
  return innerHTML;
};
