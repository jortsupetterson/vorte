export default style(
  DATE_WHEEL,
  css`
    date-wheel {
      width: clamp(10rem, 200px, 95vw);
      aspect-ratio: 3/3.5;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
    }

    date-wheel #mode_switch {
      font-size: small;
      padding: 0.2rem 0.4rem;
      border-radius: 0.2rem;
      pointer-events: all;
      cursor: pointer;
      background: var(--contentGhostColor);
    }

    date-wheel #wheel_container {
      pointer-events: all;
      height: clamp(60%, 60%, 60%);
      width: 80%;
      position: relative;
      bottom: 0;
      overflow: hidden;
      mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        var(--overlayColor) 40%,
        var(--overlayColor) 60%,
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        var(--overlayColor) 40%,
        var(--overlayColor) 60%,
        transparent 100%
      );
    }
    date-wheel #wheel_container > span {
      height: 20%;
      transition: transform 0.3s ease, opacity 0.3s ease;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.75;
      pointer-events: none;
    }

    ${(() => {
      let css = "";
      for (let index = 1; index <= 7; index++) {
        const scale =
          0.4 + Math.min(index - 1, 3) * 0.2 - Math.max(index - 4, 0) * 0.2;

        const baseTranslate = (index - 2) * 100;
        const distanceFromCenter = index - 4;
        const direction =
          distanceFromCenter === 0 ? 0 : distanceFromCenter < 0 ? 1 : -1;
        const offset = (1 - scale) * 50 * direction;

        const translate = baseTranslate + offset;
        const rotate = (index - 4) * 22.5;

        css += `date-wheel #wheel_container span:nth-child(${index}){transform: translateY(${translate}%) scale(${scale}) rotateX(${rotate}deg);} `;
      }
      return css;
    })()}

    date-wheel #wheel_container span:nth-child(4) {
      opacity: 1;
    }

    date-wheel #wheel_container #indicator {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: var(--contentGhostColor);
      border-radius: 0.2rem;
      height: 15%;
      width: 80%;
      z-index: -1;
      pointer-events: all;
      cursor: pointer;
    }
  `
);
import style from "../../createHTML/style";
import { DATE_WHEEL } from "./Class.js";
