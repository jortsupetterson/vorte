export default css`
  html {
    text-rendering: optimizeLegibility;
    font-kerning: none;
    font-variant-ligatures: none;
    font-feature-settings: "liga" 0, "kern" 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--backgroundColor);
    height: clamp(100vh, 100vh, 100vh);
    width: clamp(100vw, 100vw, 100vw);
  }

  * {
    pointer-events: none;
    user-select: none;
    touch-action: manipulation;
  }
  [data-fn] {
    pointer-events: all;
    width: max-content;
    height: max-content;
    padding: 1rem;
  }
  button {
    cursor: pointer;
  }
`;
