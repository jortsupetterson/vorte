export default css`
  article dialog {
    all: unset;
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: fit-content;
    height: fit-content;
    transform: translate(-50%, -50%);
    margin: 0;
    display: none;
    background: var(--overlayColor);
    box-shadow: 0 0 12px var(--contentGhostColor),
      0 0 24px var(--accentGhostColor);
    padding: 0.4rem;
    border-radius: 0.2rem;
  }
  article dialog[open] {
    display: block;
  }
`;
