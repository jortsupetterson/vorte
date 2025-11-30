export default css`
  article header {
    position: relative;
    width: calc(var(--articleWidth) * 0.95);
    height: clamp(10dvh, 10dvh, 10dvh);
    padding: 1rem;
    border-bottom: 0.1rem solid var(--special3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  article header div#controls {
    position: fixed;
    left: 0.5rem;
    width: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  article header h1 {
    height: 1.5rem;
    font-weight: 400;
    font-size: 1rem;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
