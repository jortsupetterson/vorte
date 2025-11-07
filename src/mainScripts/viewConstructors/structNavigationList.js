import inlineStringify from "../../../shared/utilities/inlineStringify";

export default structNavigationList = (navigationListJSON) => {
  let markup = ``;
  const lang = document.body.dataset.language;
  for (const listItem of navigationListJSON) {
    markup += `<li>${listItemTypes[listItem.type](listItem.obj, lang)}</li>`;
  }
  return markup;
};

const listItemTypes = {
  details({ title, items }, lang) {
    return html`
      <details open>
        <summary>${typeof title === "object" ? title[lang] : title}</summary>
        <ul>
          ${(() => {
            let markup = ``;
            for (const item of items) {
              markup += html`
                <li ${item.fn ? `data-fn="${inlineStringify(item.fn)}"` : ``}>
                  ${item.svg ?? ""}${item.text ?? ""}
                </li>
              `;
            }
          })()}
        </ul>
      </details>
    `;
  },
  button() {
    return html``;
  },
};
