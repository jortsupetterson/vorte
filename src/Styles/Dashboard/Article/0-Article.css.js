export default css`
  article {
    background: var(--articleBackgroundColor);
    width: var(--articleWidth);
    flex: 1 1 auto;
    transition: width 0.2s ease;
    will-change: width;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    contain: content;
    height: clamp(100dvh, 100dvh, 100dvh);
  }
  ${ArticleHeaderCss}
  ${ArticleMainCss}
  ${ArticleFooterCss}
  ${homeArticleCss}
`;
import ArticleHeaderCss from "./1-articleHeader.css";
import ArticleMainCss from "./2-articleMain.css";
import ArticleFooterCss from "./3-articleFooter.css";
import homeArticleCss from "./homeArticle.css";
