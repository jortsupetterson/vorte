import Fonts from "./0-fonts";
import buildCssVars from "./1-vars";
import Html from "./2-html";
import Body from "./3-body";

const buildCssText = async () => {
  const [fonts, vars, html, body] = await Promise.all([
    Fonts,
    buildCssVars(),
    Html,
    Body,
  ]);
  return [fonts, vars, html, body].join("\n");
};
export default buildCssText;
