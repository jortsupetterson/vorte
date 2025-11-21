export default css`
  @scope (article#calendar_day) {
    #calendarDisplay {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background: var(--accentGhostColor);
      min-height: 70%;
      height: max-content;
      width: clamp(20rem, 480px, 95vw);
    }
    #calendarDisplay div {
      width: 100%;
      max-width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-radius: 0.25rem;
      padding: 1rem;
    }

    #calendarDisplay div span {
      justify-content: flex-start;
      align-items: flex-start;
      max-width: 100%;
      height: 100%;
      overflow-wrap: break-word;
      word-break: break-word;
    }

    #calendarDisplay div span:first-child {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: clamp(30%, 30%, 30%);
      font-weight: 200;
      border-right: solid 0.01rem rgb(from var(--contentColor) r g b / 0.4);
      font-size: small;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #calendarDisplay div span:first-child span {
      font-weight: 300;
      border-right: none;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      font-size: smaller;
    }

    #calendarDisplay div span:last-child {
      width: 70%;
      font-size: small;
      font-weight: 100;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
