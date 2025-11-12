export default css`
  article[id^="calendar"] main {
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
  article[id^="calendar"] div#datePicker {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: flex-end;
  }
  article[id^="calendar"] div#datePicker button {
    background: var(--contentGhostColor);
    border-radius: 0.2rem;
    padding: 0.5rem 1rem;
  }
  article[id^="calendar"] div#datePicker button svg {
    fill: rgb(from var(--contentColor) r g b / 0.4);
    height: 1rem;
  }
  article[id^="calendar"] #calendarDisplay {
    display: flex;
    position: relative;
    flex-direction: column;
    width: clamp(20rem, 90%, 90vw);
    aspect-ratio: 4/3;
  }
  @media (orientation: portrait) {
    article[id^="calendar"] #calendarDisplay {
      aspect-ratio: 3/4;
    }
  }
  ${CalendarMonthCss}
`;
import CalendarMonthCss from "./3-calendarMonth.css";
