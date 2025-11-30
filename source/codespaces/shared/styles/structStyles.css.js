/**
 * @param {HexColor} baseColor
 * @param {HexColor} tintColor
 * @param {HexColor} contentColor
 * @param {number} contrastAmount
 * @param {CSSText[]} additionalCSS
 * @returns {CSSText}
 */
export default (
  baseColor,
  tintColor,
  contentColor,
  contrastAmount,
  additionalCSS = []
) => {
  let cssText = `
  ${FontsScrollbarCss}
  ${structCssVars(
    baseColor,
    tintColor,
    contentColor,
    contrastAmount,
  )}
  ${DocumentElementCss}
  ${BodyCss}
  ${NormalizationsCss}
  ${CommonClassesCss}
  `;
  for (const additional of additionalCSS) {
    cssText += additional
  }
  return cssText;
};
import FontsScrollbarCss from "./Universal/0-fonts&scrollbar.css";
import structCssVars from "./Universal/1-vars.css";
import DocumentElementCss from "./Universal/2-documentElement.css";
import BodyCss from "./Universal/3-body.css";
import NormalizationsCss from "./Universal/4-normalizations.css";
import CommonClassesCss from "./Universal/5-commonClasses.css";