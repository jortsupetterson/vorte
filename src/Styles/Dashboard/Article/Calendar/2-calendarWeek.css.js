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
    width: calc(95% / 7);
    margin-left: calc(5% / 7);
    height: 100%;
  }
  article#calendar_week .col-inner {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0.4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    background: var(--accentGhostColor);
    border-radius: 0.4rem;
    border: solid 1px transparent;
  }

  article#calendar_week .col-inner:hover {
    border-color: var(--contentColor);
  }

  article#calendar_week .col-inner div {
    position: absolute;
    width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
    font-size: xx-small;
    font-weight: 100;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: max-content;
    padding: 0.2rem;
    border-radius: 0.2rem;
    transform: scale(0.9);
  }

  article#calendar_week .col .label {
    position: absolute;
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
    padding: 0.5rem;
  }
  article#calendar_week .col div span {
    font-weight: 200;
    font-size: x-small;
  }
  article#calendar_week .col .label span {
    font-size: medium;
  }
`;
