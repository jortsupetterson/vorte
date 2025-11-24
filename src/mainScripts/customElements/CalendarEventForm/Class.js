export const CALENDAR_EVENT_FORM = "calendar-event-form";

export class EventFormField extends HTMLElement {}

export class CalendarEventForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = __policy ? __policy.createHTML(HTML) : HTML;
    onSafeClick(this.querySelector("button#add"), () => {
      console.log("I work");
    });
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

  <div id="controls">
    <button
      id="cancel"
      data-fn="${inlineStringify({
        name: `toggleDialog`,
        params: { tag: CALENDAR_EVENT_FORM },
      })}"
    >
      kumoa
    </button>
    <button id="add" data-fn="">lisää kalenteriin</button>
  </div>
`;

style(
  CALENDAR_EVENT_FORM,
  css`
    calendar-event-form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      pointer-events: all;
      width: clamp(20rem, 350px, 95vw);
    }
    @scope (calendar-event-form) {
      h3 {
        padding: 0.5rem;
        font-weight: 300;
      }

      #controls {
        width: 100%;
        display: flex;
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
import { DOC } from "../../../Shared/SAVINGS";
import style from "../../createHTML/style";
import { __policy } from "../../__policy";
import inlineStringify from "../../../Shared/Utilities/inlineStringify";
import onSafeClick from "../../../Shared/Utilities/onSafeClick";
