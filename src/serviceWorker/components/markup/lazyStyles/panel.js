export default css`
  view-panel {
    background: var(--view-panelBackgroundColor);
    width: var(--view-panelWidth);
    flex: 1 1 auto;
    transition: width 0.2s ease;
    will-change: width;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    contain: content;
  }
`;
