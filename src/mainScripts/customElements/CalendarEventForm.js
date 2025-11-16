const SLUG = "calendar-event-form";

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
  <div class="field"></div>
  <div class="field"></div>
  <div class="field"></div>
  <div class="field"></div>
  <div class="field"></div>
`;

style(
  SLUG,
  css`
    ${SLUG} {
      background: var(--overlayColor);
      border-radius: 1rem;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: all;
      padding: 1rem;
    }
  `
);
import { DOC } from "../../Shared/SAVINGS";
import style from "../createHTML/style";
import { __policy } from "../__policy";
