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
    font-weight: 300;
    color: var(--accentColor);
    border: solid 0.01rem var(--accentColor);
    padding: 1rem 0.5rem;
    border-radius: 0.5rem;
  }

  article footer button:hover {
    color: var(--contentColor);
    border-color: var(--contentColor);
  }

  article footer button:disabled {
    color: var(--special3);
    border-color: var(--special3);
    cursor: not-allowed;
  }
`;
