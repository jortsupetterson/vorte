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

  article[id^="calendar"] div#calendarDisplay {
    position: relative;
    width: clamp(20rem, 80%, 90vw);
    aspect-ratio: 5/3;
  }

  @media (orientation: portrait) {
    article[id^="calendar"] div#calendarDisplay {
      aspect-ratio: 3/3.5;
    }
  }

  article[id^="calendar"] div#calendarDisplay div#body {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;
  }

  article[id^="calendar"] div#calendarDisplay div#body div.week {
    display: flex;
    justify-content: space-evenly;
    height: calc(95% / 5);
  }

  article[id^="calendar"] div#calendarDisplay div#body div.week div.day {
    width: calc(95% / 7);
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: var(--accentGhostColor);
    line-height: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
