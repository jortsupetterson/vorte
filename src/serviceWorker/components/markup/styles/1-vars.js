import getAccentColor from "../../../utilities/getAccentColor";
import getBackgroundColor from "../../../utilities/getBackgroundColor";
import getContentColor from "../../../utilities/getContentColor";
import getContrastAmount from "../../../utilities/getContrastAmount";

const buildCssVars = async () => {
  const [accentColor, contentColor, backgroundColor, contrastAmount] =
    await Promise.all([
      getAccentColor(),
      getContentColor(),
      getBackgroundColor(),
      getContrastAmount(),
    ]);
  return css`
    :root {
      --accentColor: ${accentColor};
      --backgroundColor: ${backgroundColor};
      --contentColor: ${contentColor};
      --contrastAmount: ${contrastAmount};

      --viewportBackgroundColor: rgb(from var(--accentColor) r g b / 0.16);
      --menuBackgroundColor: rgb(from var(--accentColor) r g b / 0.2);

      --contentGhostColor: rgb(from var(--contentColor) r g b / 0.06);
      --accentGhostColor: rgb(from var(--accentColor) r g b / 0.08);

      --special1: #323232;
      --special2: #4a4a4a;
      --special3: rgb(from var(--accentColor) r g b / 0.17);

      --viewportWidth: clamp(320px, 100%, 1920px);
      --menuWidth: clamp(250px, var(--viewportWidth), 548px);
    }

    @media (min-width: 548px) {
      :root {
        --menuWidth: clamp(250px, var(--viewportWidth), 17.5rem);
      }
    }
  `;
};
export default buildCssVars;
