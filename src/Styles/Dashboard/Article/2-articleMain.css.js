export default css`
  article main {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
    flex-wrap: wrap;
    min-width: var(--articleWidth);
    overflow-y: auto;
    pointer-events: all;
    height: clamp(80dvh, 80dvh, 80dvh);
    padding: 2rem;
    gap: 2rem;
  }
`;
