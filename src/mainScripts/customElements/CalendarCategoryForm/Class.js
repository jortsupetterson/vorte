export const CALENDAR_CATEGORY_FORM = "calendar-category-form";
export class CalendarCategoryForm extends HTMLElement {
  connectedCallback() {
    const { type, id, name, color } = this.dataset;
    const language = DOC.lang;
    const unsafeHTML = html`
      <p>
        ${{
          create: {
            fi: "Luo kategoria",
            sv: "Skapa kategori",
            en: "Create category",
          },
          edit: {
            fi: "Muokkaa kategoriaa",
            sv: "Redigera kategori",
            en: "Edit category",
          },
        }[type][language]}
      </p>
      <div class="field">
        <label for="name-input"
          >${{ fi: "Nimi:", sv: "Namn:", en: "Name:" }[language]}</label
        >
        <input
          id="name-input"
          value="${type === `edit` ? name : ``}"
          type="text"
          placeholder="${{
            fi: `kategorian nimi`,
            sv: `kategorinamn`,
            en: `category name`,
          }[language]}"
        />
      </div>
      <div class="field">
        <label for="color-input"
          >${{ fi: "Väri:", sv: "Färg:", en: "Color:" }[language]}</label
        >
        <input
          id="color-input"
          value="${type === `edit`
            ? color
            : getComputedStyle(DOC).getPropertyValue(`--contentColor`).trim()}"
          type="color"
        />
      </div>
      <div id="controls">
        <button
          id="cancel"
          data-fn="${inlineStringify({
            name: `toggleDialog`,
            params: { tag: CALENDAR_CATEGORY_FORM },
          })}"
        >
          ${{ fi: "kumoa", sv: "avbryt", en: "cancel" }[language]}
        </button>
        <button id="saveCategory" data-fn="">
          ${{ fi: "tallenna", sv: "spara", en: "save" }[language]}
        </button>
      </div>
    `;

    const safeHTML = __policy ? __policy.createHTML(unsafeHTML) : unsafeHTML;
    this.innerHTML = safeHTML;
    onSafeClick(document.getElementById("saveCategory"), () => {
      if (type === "edit") {
        functions.msgToSw({
          type: `storage`,
          params: {
            namespace: `CalendarObject`,
            operation: `update`,
            path: [`config`, `categories`, `id`],
            search: id,
            value: {
              id: id,
              name: document.getElementById("name-input").value,
              hex_color: document.getElementById("color-input").value,
            },
          },
        });
      } else {
        const new_category_id = crypto.randomUUID();
        functions.msgToSw({
          type: `storage`,
          params: {
            namespace: `CalendarObject`,
            operation: `create`,
            path: [`config`, `categories`],
            search: new_category_id,
            value: {
              id: new_category_id,
              name: document.getElementById("name-input").value,
              hex_color: document.getElementById("color-input").value,
            },
          },
        });
      }
      functions.msgToSw({
        type: `render`,
        params: {
          viewName: `calendar_config`,
          components: [`article main`],
        },
      });
    });
  }
}

style(
  CALENDAR_CATEGORY_FORM,
  css`
    calendar-category-form {
      width: clamp(20rem, 350px, 95vw);
      padding: 1rem;
      gap: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
    @scope (${CALENDAR_CATEGORY_FORM}) {
      .field {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 80%;
        gap: 0.5rem;
      }
      .field label {
        font-size: smaller;
        font-weight: 200;
        padding: 0 0.5rem;
      }
      .field input {
        height: 1.5rem;
        width: 100%;
        border-radius: 0.5rem;
        padding: 0.5rem;
        background: var(--contentGhostColor);
        font-size: small;
        font-weight: 200;
      }

      input[type="text"] {
        cursor: text;
      }

      input[type="color"] {
        -webkit-appearance: none;
        border: none;
        outline: none;
        padding: 0;
        border-radius: 0.5rem;
        background: none;
        cursor: pointer;
        height: 2rem;
        background: transparent;
        opacity: 0.13;
      }

      input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
        border-radius: inherit;
      }
      input[type="color"]::-webkit-color-swatch {
        border: none;
        border-radius: inherit;
      }
      input[type="color"]::-moz-color-swatch {
        border: none;
        border-radius: inherit;
      }

      #controls {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }

      @scope (#controls) {
        button {
          font-size: small;
          font-weight: 200;
        }
        button#cancel {
          font-weight: 100;
        }

        button:hover {
          text-decoration: underline;
        }
      }
    }
  `
);

import style from "../../createHTML/style";
import { DOC } from "../../../Shared/SAVINGS";
import { __policy } from "../../__policy";
import inlineStringify from "../../../Shared/Utilities/inlineStringify";
import onSafeClick from "../../../Shared/Utilities/onSafeClick";
import { functions } from "../../script";
