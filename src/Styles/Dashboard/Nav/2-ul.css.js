export default css`
  nav ul {
    pointer-events: all;
    position: relative;
    top: 10dvh;
    width: var(--navWidth);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    overflow-y: auto;
    height: clamp(95dvh, 95dvh, 95dvh);
  }

  nav ul li div {
    width: clamp(100%, 100%, 100%);
    display: flex;
    flex-direction: column;
    min-height: max-content;
  }

  nav ul li div p {
    position: relative;
    font-weight: 100;
  }

  nav ul li div ul {
    top: 0;
    gap: 0;
    height: auto;
    position: relative;
    left: 0.25rem;
    width: clamp(100%, 100%, 100%);
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    min-height: max-content;
  }

  nav ul li div ul li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;
    width: clamp(1.5rem, 1.5rem, 1.5rem);
    height: clamp(1.5rem, 1.5rem, 1.5rem);
    font-size: medium;
    font-weight: 300;
  }
  nav ul li div ul li svg {
    fill: var(--contentColor);
    width: clamp(1rem, 1rem, 1rem);
    height: clamp(1rem, 1rem, 1rem);
  }

  nav ul li div ul li[data-fn].active svg,
  nav ul li div ul li[data-fn].active,
  nav ul li div ul li[data-fn]:hover svg,
  nav ul li div ul li[data-fn]:hover {
    fill: var(--accentColor);
    color: var(--accentColor);
  }

  nav ul li button {
    font-weight: 100;
  }
`;
