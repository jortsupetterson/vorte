export default css`
  @scope (article#calendar_month) {
    #calendarDisplay {
      display: flex;
      justify-content: flex-end;
      aspect-ratio: 4/3;
    }

    @media (orientation: portrait) {
      #calendarDisplay {
        aspect-ratio: 3/4;
      }
    }

    .row {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: flex-end;
      width: clamp(100%, 100%, 100%);
      height: calc(95% / 6);
      gap: 0;
      margin-bottom: calc(5% / 6);
    }

    .row:first-of-type {
      height: auto;
      min-height: none;
    }

    .cell {
      border: solid 0.01rem transparent;
    }
    .cell.head:first-of-type,
    .cell.week {
      min-height: max-content;
      min-width: max-content;
      max-width: max-content;
      max-height: max-content;
      line-height: 1;
      padding: 0.2rem;
      border-radius: 0.2rem;
      font-size: small;
      margin-right: 1%;
      font-weight: 100;
    }

    .cell.week:hover {
      background: var(--contentGhostColor);
    }
    .cell.head,
    .cell.prev,
    .cell.curr,
    .cell.next {
      width: calc(90% / 7);
      height: 100%;
      margin-left: calc(5% / 7);
      padding: 0.5rem;
      border-radius: 0.5rem;
      background: var(--accentGhostColor);
      line-height: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0.2rem;
      font-size: small;
    }

    .cell.head {
      background: transparent;
      font-weight: 100;
    }

    .cell.head:first-of-type {
      opacity: 0;
    }

    .cell.next,
    .cell.prev {
      background: var(--contentGhostColor);
    }

    .cell.curr {
      overflow: hidden;
    }

    .cell.curr:hover {
      border-color: var(--contentColor);
    }

    .cell.curr span {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: x-small;
      line-height: normal;
      font-weight: 100;
      padding: 0.2rem;
      border-radius: 0.2rem;
    }
  }
`;
