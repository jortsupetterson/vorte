export default css`
  article main {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    min-width: var(--articleWidth);
    overflow-y: auto;
    height: clamp(95dvh, 95dvh, 95dvh);
    gap: 2rem;
  }
`;
