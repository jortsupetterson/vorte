export default css`
  article#home main div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--accentGhostColor);
    width: clamp(15rem, 25rem, 85dvw);
    border-radius: 0.25rem;
    padding: 2rem;
    padding-bottom: 4rem;
  }

  article#home main div button {
    background: var(--contentGhostColor);
    padding: 0.25rem 0.5rem;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    border-radius: 0.05rem;
    font-size: small;
  }
`;
