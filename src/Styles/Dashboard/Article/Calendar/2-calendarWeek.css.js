export default css`
  article#calendar_week #calendarDisplay {
    position: relative;
    top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
  }
  article#calendar_week .col {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(95% / 7);
    gap: 0;
    margin-left: calc(5% / 7);
    background: var(--accentGhostColor);
    padding: 0.5rem;
    border-radius: 0.5rem;
    height: 100%;
    overflow: hidden;
  }
  article#calendar_week .col div {
    position: absolute;
    width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
    font-size: xx-small;
    font-weight: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: max-content;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transform: scale(0.8);
  }
  article#calendar_week .col .label {
    top: 0;
    width: 100%;
    transform: translateY(-100%);
    font-size: medium;
    font-weight: 100;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
  }
  article#calendar_week .col div span {
    font-weight: 200;
    font-size: x-small;
  }
  article#calendar_week .col .label span {
    font-size: medium;
  }
`;
