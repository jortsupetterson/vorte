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
    }
  `;
};
export default buildCssVars;
