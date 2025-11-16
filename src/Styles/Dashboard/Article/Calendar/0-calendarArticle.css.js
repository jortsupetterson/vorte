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
    width: clamp(20rem, 100%, 95vw);
  }
  article[id^="calendar"] #calendarDisplay #hourTimeline {
    display: flex;
    flex-direction: column;
    font-weight: 100;
    font-size: small;
    justify-content: space-between;
    align-items: center;
    min-height: 100%;
    padding: 0.5rem;
  }
  ${CalendarDayCss}
  ${CalendarWeekCss}
  ${CalendarMonthCss}
`;
import CalendarDayCss from "./1-calendarDay.css";
import CalendarWeekCss from "./2-calendarWeek.css";
import CalendarMonthCss from "./3-calendarMonth.css";
