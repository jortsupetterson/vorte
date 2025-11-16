export class CalendarEventForm extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = __policy ? __policy.createHTML(HTML) : HTML;
  }
}

const HTML = html`
  <h3>
    ${{
      fi: "Luo tapahtuma",
      sv: "Skapa evenemang",
      en: "Create an event",
    }[DOC.lang]}
  </h3>
`;

(async () => {
  if (!document.getElementById("color-input-style")) {
    const CSS = html`
      <style id="calendar-event-form-style" nonce="${await getNonce()}">
        calendar-event-form {
        }
      </style>
    `;
    const safeHTML = __policy ? __policy.createHTML(CSS) : CSS;

    document.head.insertAdjacentHTML("beforeend", safeHTML);
  }
})();

import { DOC } from "../../Shared/SAVINGS";
import getNonce from "../../Shared/Utilities/getNonce";
import { __policy } from "../__policy";
