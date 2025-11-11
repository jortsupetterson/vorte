export default css`
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
`;
