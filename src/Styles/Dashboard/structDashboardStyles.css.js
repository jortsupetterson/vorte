export default () => {
  return css`
    li svg,
    button svg {
      width: clamp(1.5rem, 1.5rem, 1.5rem);
      height: clamp(1.5rem, 1.5rem, 1.5rem);
    }
    ${NavCss}
    ${ArticleCss}
  `;
};
import NavCss from "./Nav/0-Nav.css";
import ArticleCss from "./Article/0-Article.css";
