export default css`
  article#calendar_month #calendarDisplay {
    display: flex;
    justify-content: flex-end;
    aspect-ratio: 4/3;
  }

  @media (orientation: portrait) {
    article#calendar_month #calendarDisplay {
      aspect-ratio: 3/4;
    }
  }

  article#calendar_month .row {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-end;
    width: clamp(100%, 100%, 100%);
    height: calc(95% / 6);
    gap: 0;
    margin-bottom: calc(5% / 6);
  }

  article#calendar_month .row:first-of-type {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    width: clamp(100%, 100%, 100%);
    height: auto;
    min-height: none;
  }

  article#calendar_month .cell.head {
    min-width: calc(90% / 7);
    margin-left: calc(5% / 7);
    font-size: medium;
    font-weight: 100;
  }

  article#calendar_month .cell.head:first-of-type {
    min-width: 5%;
  }

  article#calendar_month .cell.week {
    min-height: max-content;
    min-width: max-content;
    max-width: max-content;
    max-height: max-content;
    line-height: 1;
    padding: 0;
    font-size: medium;
    margin-right: 1%;
    font-weight: 100;
  }

  article#calendar_month .cell.prev,
  article#calendar_month .cell.curr,
  article#calendar_month .cell.next {
    min-width: calc(90% / 7);
    min-height: 100%;
    margin-left: calc(5% / 7);
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: var(--accentGhostColor);
    line-height: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: small;
  }

  article#calendar_month .cell.next,
  article#calendar_month .cell.prev {
    background: var(--contentGhostColor);
  }
`;
