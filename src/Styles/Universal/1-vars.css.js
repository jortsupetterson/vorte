const structCssVars = ({
  accentColor,
  contentColor,
  backgroundColor,
  contrastAmount,
}) => {
  return css`
    :root {
      --accentColor: ${accentColor};
      --backgroundColor: ${backgroundColor};
      --contentColor: ${contentColor};
      --contrastAmount: ${contrastAmount};

      --articleBackgroundColor: rgb(from var(--accentColor) r g b / 0.16);
      --navBackgroundColor: rgb(from var(--accentColor) r g b / 0.2);

      --contentGhostColor: rgb(from var(--contentColor) r g b / 0.06);
      --accentGhostColor: rgb(from var(--accentColor) r g b / 0.08);

      --overlayColor: ${alphaComposite(
        alphaComposite(backgroundColor, accentColor, 0.16),
        contentColor,
        0.06
      )};

      --special1: #323232;
      --special2: #4a4a4a;
      --special3: rgb(from var(--accentColor) r g b / 0.17);

      --articleWidth: clamp(320px, 100%, 1920px);
      --navWidth: clamp(250px, var(--articleWidth), 548px);
    }

    @media (min-width: 548px) {
      :root {
        --navWidth: clamp(250px, var(--articleWidth), 17.5rem);
      }
    }
  `;
};
export default structCssVars;
import alphaComposite from "../../Shared/Utilities/Styling/alphaComposite";
