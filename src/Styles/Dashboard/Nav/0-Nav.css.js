export default css`
  nav {
    position: relative;
    background: var(--navBackgroundColor);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    transition: flex-basis 0.2s ease, padding 0.2s ease;
    will-change: left, padding;
    padding: 0;
    flex: 0 0 0;
    border-radius: 0;
    margin: 0;
    overflow: hidden;
    contain: content;
    height: clamp(100dvh, 100dvh, 100dvh);
  }

  nav.open {
    flex: 0 0 var(--navWidth);
    padding: 0 1.5rem 0 1.5rem;
  }
  ${ButtonCss}
  ${UlCss}
  ${ImgCss}
  ${ToRootButtonCss}
`;

import ButtonCss from "./1-button.css";
import UlCss from "./2-ul.css";
import ImgCss from "./3-img.css";
import ToRootButtonCss from "./4-to.root.button.css";
