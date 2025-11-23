export default css`
  @scope (article#calendar_config) {
    main {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 2rem;
      gap: 1rem;
      border-radius: 0.5rem;
      width: clamp(20rem, 350px, 95vw);
    }
    section div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }

    section#calendar_configuration {
      gap: 2rem;
    }

    section p {
      font-size: smaller;
      font-weight: 400;
      width: 100%;
      text-align: center;
    }
    #calendar_category_list {
      align-items: flex-start;
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
      padding: 0.2rem 0.4rem 0.2rem 0.8rem;
      border-radius: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: small;
      font-weight: 300;
    }
    #calendar_category_list ul li div {
      display: flex;
      gap: 0.1rem;
      width: max-content;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: smaller;
    }

    #calendar_category_list button:hover {
      text-decoration: underline;
    }

    button#newCategory {
      font-size: small;
      font-weight: 200;
    }
  }
`;
