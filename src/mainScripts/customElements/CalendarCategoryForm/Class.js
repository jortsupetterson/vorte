export const CALENDAR_CATEGORY_FORM = "calendar-category-form";
export class CalendarCategoryForm extends HTMLElement {
  connectedCallback() {
    const { type, name, hex_color } = this.dataset;
    this.innerHTML = html`
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
        }[type][DOC.lang]}
      </p>
      <div>
        <label for="name-input"
          >${{ fi: "Nimi:", sv: "Namn:", en: "Name:" }[DOC.lang]}</label
        >
        <input id="name-input" value="${name}" type="text" />
      </div>
      <div>
        <label for="color-input"
          >${{ fi: "Väri:", sv: "Färg:", en: "Color:" }[DOC.lang]}</label
        >
        <input id="color-input" value="${hex_color}" type="color" />
      </div>
    `;
  }
}
import { DOC } from "../../../Shared/SAVINGS";
