const SLUG = "calendar-event-form";

export class CalendarEventForm extends HTMLElement {
  connectedCallback() {
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
  <div class="field"></div>
  <div class="field"></div>
  <div class="field"></div>
  <div class="field"></div>
  <div class="field"></div>
`;

style(
  SLUG,
  css`
    calendar-event-form {
      pointer-events: all;
    }
  `
);
import { DOC } from "../../Shared/SAVINGS";
import style from "../createHTML/style";
import { __policy } from "../__policy";
