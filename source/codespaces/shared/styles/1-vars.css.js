const structCssVars = ({
  base_color,
  tint_color,
  content_color,
  contrast_amount,
}) => {
  return css`
    :root {
      --baseColor: ${base_color};
      --tintColor: ${tint_color};
      --contentColor: ${content_color};
      --contrastAmount: ${contrast_amount};

      --articleBackgroundColor: rgb(from var(--tintColor) r g b / 0.16);
      --navBackgroundColor: rgb(from var(--tintColor) r g b / 0.2);

      --contentGhostColor: rgb(from var(--contentColor) r g b / 0.06);
      --tintGhostColor: rgb(from var(--tintColor) r g b / 0.08);

      --overlayColor: ${alphaComposite(
        alphaComposite(base_color, tint_color, 0.16),
        content_color,
        0.06
      )};

      --special3: rgb(from var(--tintColor) r g b / 0.17);

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
