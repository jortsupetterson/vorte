const buildDocumentResponse = async (ctx) => {
  const [
    nonce,
    language,
    accentColor,
    backgroundColor,
    contentColor,
    contrastAmount,
    mascotName,
    /**/
    navId,
    navStatus,
    articleId,
    /**/
    isDemo,
    isAuthenticated,
  ] = await Promise.all([
    getNonce(),
    getLanguage(),
    getAccentColor(),
    getBackgroundColor(),
    getContentColor(),
    getContrastAmount(),
    getMascotName(),
    /**/
    getNavId(),
    getNavStatus(),
    getArticleId(),
    /**/
    negotiateDemoStatus(ctx),
    negotiateAuthenticationStatus(),
  ]);

  if (!isDemo) return Response.redirect("https://why.vorte.app");

  return new Response(
    html`
      <!DOCTYPE html>
      <html lang="${language}">
        <head>
          <title>Vorte</title>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="application-name" content="Vorte" />
          <meta name="color-scheme" content="light dark" />
          <meta name="theme-color" content="${accentColor}" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Vorte" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link rel="icon" href="/icons/512x512?v=${accentColor}" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/180x180?v=${accentColor}"
          />
          <link
            rel="mask-icon"
            href="/images/safari-pinned-tab.svg"
            color="${accentColor}"
          />
          <link
            rel="manifest"
            href="/webmanifest?v=${accentColor}"
            crossorigin="use-credentials"
          />
          <style id="eager" nonce="${nonce}">
            ${await structStylesCss({
              accentColor,
              contentColor,
              backgroundColor,
              contrastAmount,
            })}
          </style>
          <script type="module" nonce="${nonce}">
            ${mainScripts};
          </script>
        </head>
        <body
          ${isDemo || isAuthenticated
            ? `data-language="${language}" data-mascotName="${mascotName}"`
            : ``}
        >
          ${isDemo || isAuthenticated
            ? await dashboardLayout(
                isDemo,
                navId,
                navStatus,
                articleId,
                mascotName,
                language
              )
            : await authenticationLayout(mascotName)}
        </body>
      </html>
    `,
    {
      status: 200,
      headers: {
        "content-language": language,
        "content-type": "text/html; charset=utf-8",
        "Content-Security-Policy": `default-src 'none'; require-trusted-types-for 'script'; script-src 'nonce-${nonce}' 'unsafe-inline'; style-src 'nonce-${nonce}' 'unsafe-inline'; manifest-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none';`,
        "Trusted-Types": "vorte-ui",
        "Strict-Transport-Security":
          "max-age=63072000; includeSubDomains; preload",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Resource-Policy": "same-origin",
        "X-UA-Compatible": "IE=edge",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
      },
    }
  );
};
////////////////////////////////////////////////////////////////////////////////////
const dashboardLayout = async (
  isDemo,
  navId,
  navStatus,
  articleId,
  mascotName,
  language
) => html`
  <nav id="${navId}" ${navStatus ? `class="open"` : ``}>
    <button
      id="closer"
      data-fn="${inlineStringify({
        name: `toggleNav`,
      })}"
    >
      ${svgTable.svgX}
    </button>
    <ul>
      ${await nav_ul_html(
        await nav_ul_json({ isDemo, viewName: navId }),
        language,
        navId,
        isDemo
      )}
    </ul>
    <img
      fetchpriority="high"
      src="${`/images/${mascotName}/${navId}.webp`}"
      alt="${{ fi: ``, sv: ``, en: `` }[language]}"
    />
    <div class="padding"></div>
  </nav>
  <!---------------------------------------------------------------------------------->
  <article id="${articleId}">
    <header>
      <div id="controls">
        <button data-fn="${inlineStringify({ name: `toggleNav` })}">
          ${svgTable["svgBars"]}
        </button>
        <button>${svgTable["svgP2P"]}</button>
      </div>
      <h1>
        ${await article_header_h1_html(
          await article_header_h1_json({ isDemo, viewName: articleId }),
          language,
          articleId
        )}
      </h1>
    </header>
    <main>
      ${await article_main_html(
        await article_main_json({ isDemo, viewName: articleId }),
        language,
        articleId
      )}
    </main>
    <footer>
      ${await article_footer_html(
        await article_footer_json({ isDemo, viewName: articleId }),
        language,
        articleId
      )}
    </footer>
    <dialog></dialog>
  </article>
`;
/////////////////////////////////////////////////////////////////////////////////////
const authenticationLayout = async (mascotName) => html` <form></form> `;

export default buildDocumentResponse;

import negotiateAuthenticationStatus from "../../Shared/Utilities/Negotiations/negotiateAuthenticationStatus";
import negotiateDemoStatus from "../../Shared/Utilities/Negotiations/negotiateDemoStatus";

import getLanguage from "../../Shared/Utilities/Getters/getLanguage";
import getNonce from "../../Shared/Utilities/Getters/getNonce";
import getAccentColor from "../../Shared/Utilities/Getters/getAccentColor";
import getBackgroundColor from "../../Shared/Utilities/Getters/getBackgroundColor";
import getContentColor from "../../Shared/Utilities/Getters/getContentColor";
import getContrastAmount from "../../Shared/Utilities/Getters/getContrastAmount";

import getMascotName from "../../Shared/Utilities/Getters/getMacotName";
import getNavId from "../../Shared/Utilities/Getters/getNavId";
import getNavStatus from "../../Shared/Utilities/Getters/getNavStatus";
import getArticleId from "../../Shared/Utilities/Getters/getArticleId";

import inlineStringify from "../../Shared/Utilities/inlineStringify";
import svgTable from "../../Shared/markup/svgTable";

import nav_ul_html from "../../Shared/HTMLConstructors/nav_ul_html";
import nav_ul_json from "../../Shared/JSONConstructors/nav_ul_json";
import article_main_html from "../../Shared/HTMLConstructors/article_main_html";
import article_main_json from "../../Shared/JSONConstructors/article_main_json";

import structStylesCss from "../../Styles/structStyles.css";
import article_header_h1_html from "../../Shared/HTMLConstructors/article_header_h1_html";
import article_header_h1_json from "../../Shared/JSONConstructors/article_header_h1_json";
import article_footer_html from "../../Shared/HTMLConstructors/article_footer_html";
import article_footer_json from "../../Shared/JSONConstructors/article_footer_json";
