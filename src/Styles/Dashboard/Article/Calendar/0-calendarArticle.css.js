export default css`
  @scope (article[id^="calendar"]) {
    main {
      flex-direction: column;
      justify-content: flex-start;
      flex-wrap: nowrap;
    }
    #datePicker {
      display: flex;
      justify-content: center;
      gap: 1rem;
      align-items: flex-end;
    }
    #datePicker button {
      position: relative;
      background: var(--contentGhostColor);
      border-radius: 0.2rem;
      padding: 0.5rem 1rem;
    }
    #datePicker #toggler {
      width: clamp(5rem, 180px, 95vw);
    }
    #datePicker button svg {
      fill: rgb(from var(--contentColor) r g b / 0.4);
      height: 1rem;
    }
    #calendarDisplay {
      display: flex;
      position: relative;
      flex-direction: column;
      width: clamp(20rem, 100%, 95vw);
    }
    #calendarDisplay #hourTimeline {
      display: flex;
      flex-direction: column;
      font-weight: 100;
      font-size: small;
      justify-content: space-between;
      align-items: center;
      min-height: 100%;
      padding: 0.5rem;
    }
  }
  ${CalendarDayCss}
  ${CalendarWeekCss}
  ${CalendarMonthCss}
  ${CalendarConfigCss}
`;
import CalendarDayCss from "./1-calendarDay.css";
import CalendarWeekCss from "./2-calendarWeek.css";
import CalendarMonthCss from "./3-calendarMonth.css";
import CalendarConfigCss from "./4-calendarConfig.css";
