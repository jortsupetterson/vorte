export default () => {
  return css`
    button svg {
      width: clamp(1.33rem, 1.33rem, 1.33rem);
      height: clamp(1.33rem, 1.33rem, 1.33rem);
    }
    ${NavCss}
    ${ArticleCss}
  `;
};
import NavCss from "./Nav/0-Nav.css";
import ArticleCss from "./Article/0-Article.css";
