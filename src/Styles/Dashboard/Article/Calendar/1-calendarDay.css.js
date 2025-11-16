export default css`
  article#calendar_day #calendarDisplay {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: var(--accentGhostColor);
    min-height: 70%;
  }
  article#calendar_day #calendarDisplay div {
    width: 100%;
    display: flex;
    border-radius: 0.25rem;
    padding: 0.25rem;
  }
`;
