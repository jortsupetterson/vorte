const buildDocumentResponse = async (ctx) => {
  const [
    nonce,
    language,
    accentColor,
    mascotName,
    viewName,
    /**/
    isDemo,
    isAuthenticated,
    cssText,
  ] = await Promise.all([
    getNonce(),
    getLanguage(),
    getAccentColor(),
    getMascotName(),
    getViewName(),
    /**/
    negotiateDemoStatus(ctx),
    negotiateAuthenticationStatus(),
    buildCssText(),
  ]);

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
            ${cssText}
          </style>
          <script nonce="${nonce}">
            ${mainScripts};
          </script>
        </head>
        <body
          ${isDemo || isAuthenticated
            ? `data-language="${language}" data-mascotName="${mascotName}"`
            : ``}
        >
          ${isDemo || isAuthenticated
            ? await dashboardLayout(isDemo, viewName, mascotName, language)
            : await authenticationLayout(viewName, mascotName)}
        </body>
      </html>
    `,
    {
      status: 200,
      headers: {
        "content-language": language,
        "content-type": "text/html; charset=utf-8",
      },
    }
  );
};
///////////////////////////////////////////////////////
const dashboardLayout = async (isDemo, viewName, mascotName, language) => html`
  <nav>
    <button
      data-fn="${inlineStringify({
        name: `toggleNav`,
      })}"
    >
      ${svgTable.svgX}
    </button>
    <ul>
      ${nav_ul_html(
        await nav_ul_json(isDemo, viewName),
        language,
        viewName,
        isDemo
      )}
    </ul>
    <img
      src="${`/images/${mascotName}/${viewName}`}"
      alt="${{ fi: ``, sv: ``, en: `` }[language]}"
    />
  </nav>

  <article>
    <header></header>
    <main></main>
    <footer></footer>
  </article>
`;
/////////////////////////////////////////////////////
const authenticationLayout = async (viewName, mascotName) =>
  html` <form></form> `;

export default buildDocumentResponse;

import negotiateAuthenticationStatus from "../../Shared/Utilities/negotiateAuthenticationStatus";
import negotiateDemoStatus from "../../Shared/Utilities/negotiateDemoStatus";

import getLanguage from "../../Shared/Utilities/getLanguage";
import getNonce from "../../Shared/Utilities/getNonce";
import getAccentColor from "../../Shared/Utilities/getAccentColor";
import getMascotName from "../../Shared/Utilities/getMacotName";
import getViewName from "../../Shared/Utilities/getViewName";

import buildCssText from "../components/markup/eagerStyles/style";
import inlineStringify from "../../Shared/Utilities/inlineStringify";
import svgTable from "../../Shared/markup/svgTable";
import nav_ul_html from "../../Shared/HTMLConstructors/nav_ul_html";
import nav_ul_json from "../../Shared/JSONConstructors/nav_ul_json";
