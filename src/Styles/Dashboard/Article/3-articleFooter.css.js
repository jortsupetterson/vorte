export default css`
  article footer {
    position: fixed;
    bottom: 0;
    height: clamp(10dvh, 10dvh, 10dvh);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border-top: 0.1rem solid var(--special3);
    width: calc(var(--articleWidth) * 0.95);
  }

  article footer button {
    font-size: small;
  }
`;
