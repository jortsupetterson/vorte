export default css`
  article#calendar_day #calendarDisplay {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: var(--accentGhostColor);
    height: auto;
    width: clamp(20rem, 480px, 95vw);
  }
  article#calendar_day #calendarDisplay div {
    width: 100%;
    max-width: 100%;
    display: flex;
    border-radius: 0.25rem;
    padding: 0.25rem;
  }

  article#calendar_day #calendarDisplay div span {
    padding: 0.5rem;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  article#calendar_day #calendarDisplay div span:first-of-type {
    display: flex;
    flex-direction: column;
    width: 30%;
    font-weight: 200;
    border-right: solid 1px var(--contentColor);
    font-size: small;
  }

  article#calendar_day #calendarDisplay div span:first-of-type span {
    font-weight: 300;
    border-right: none;
    display: flex;
    width: 100%;
    padding: 0;
    font-size: smaller;
  }

  article#calendar_day #calendarDisplay div span:last-of-type {
    width: 70%;
    font-weight: 100;
    display: flex;
    font-size: medium;
  }
`;
