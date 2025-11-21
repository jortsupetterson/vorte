export default css`
  @scope (article#calendar_config) {
    main {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      flex-wrap: wrap;
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      gap: 1rem;
      background: var(--accentGhostColor);
      border-radius: 0.5rem;
      width: clamp(20rem, 300px, 95vw);
    }

    #calendar_category_list ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
    }

    #calendar_category_list ul li {
      padding: 0.5rem;
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: small;
    }
    #calendar_category_list ul li div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: smaller;
    }

    #calendar_category_list ul li div button {
    }
  }
`;
