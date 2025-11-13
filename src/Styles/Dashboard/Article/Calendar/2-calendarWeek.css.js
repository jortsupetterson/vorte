export default css`
  article#calendar_week #calendarDisplay {
    position: relative;
    top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    min-height: 80%;
    height: max-content;
  }
  article#calendar_week .col {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 100%;
    height: max-content;
    width: calc(95% / 7);
    gap: 0;
    margin-left: calc(5% / 7);
    background: var(--accentGhostColor);
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  article#calendar_week .col .label {
    position: absolute;
    top: 0;
    width: 100%;
    transform: translateY(-100%);
    font-size: medium;
    font-weight: 100;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
  }

  article#calendar_week .col .label span {
    font-weight: 200;
  }
`;
