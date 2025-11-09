export default async ({
  accentColor,
  contentColor,
  backgroundColor,
  contrastAmount,
}) => {
  return `${FontsScrollbarCss}${structCssVars({
    accentColor,
    contentColor,
    backgroundColor,
    contrastAmount,
  })}${DocumentElementCss}${BodyCss}`;
};

import FontsScrollbarCss from "./Universal/0-fonts&scrollbar.css";
import structCssVars from "./Universal/1-vars.css";
import DocumentElementCss from "./Universal/2-documentElement.css";
import BodyCss from "./Universal/3-body.css";
