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
    cursor: default;
    touch-action: manipulation;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  *:focus {
    outline: none;
  }
  [data-fn] {
    pointer-events: all;
    width: max-content;
    height: max-content;
    padding: 0.5rem;
  }
  button,
  [role="button"] {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    outline: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
  }
  button svg,
  [role="button"] svg {
    fill: var(--contentColor);
  }
  .padding {
    min-height: 2rem;
    min-width: 100%;
  }
`;
