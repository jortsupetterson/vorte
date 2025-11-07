export default css`
  view-menu {
    position: relative;
    background: var(--view-menuBackgroundColor);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    transition: flex-basis 0.2s ease, padding 0.2s ease;
    will-change: left, padding;
    padding: 1.5rem 0 1.5rem 0;
    flex: 0 0 0;
    border-radius: 0;
    margin: 0;
    overflow: hidden;
    contain: content;
  }

  view-menu.open {
    flex: 0 0 var(--view-menuWidth);
    padding: 1.5rem;
  }
`;
