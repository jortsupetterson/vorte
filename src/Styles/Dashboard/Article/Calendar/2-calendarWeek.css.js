export default css`
  article#calendar_week #calendarDisplay {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  article#calendar_week .col {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-end;
    height: clamp(100%, 100%, 100%);
    width: calc(95% / 7);
    gap: 0;
    margin-left: calc(5% / 7);
    background: var(--accentGhostColor);
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
`;
