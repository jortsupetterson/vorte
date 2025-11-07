export default css`
  @keyframes fadeIn {
    0% {
      opacity: 0.01;
    }

    to {
      opacity: 1;
    }
  }

  body {
    animation: fadeIn 0.5s ease-in-out;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    color: var(--contentColor);
    font-family: Inter;
    height: clamp(100dvh, 100dvh, 100dvh);
    width: clamp(320px, 100%, 1920px);
    gap: 0;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    filter: contrast(--contrastAmount);
    overflow: hidden;
  }
`;
