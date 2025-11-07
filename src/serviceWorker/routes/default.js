import negotiateAuthenticationStatus from "../utilities/negotiateAuthenticationStatus";
import negotiateDemoStatus from "../utilities/negotiateDemoStatus";
import getLanguage from "../utilities/getLanguage";
import getNonce from "../utilities/getNonce";
import getAccentColor from "../utilities/getAccentColor";
import buildAppleTouchStartupImages from "../components/markup/apple-touch-startup-image";
import buildCssText from "../components/markup/eagerStyles/style";
import svgX from "../../../shared/markup/svgX";
import MyVorteAppList from "../../../shared/json/MyVorteAppList.object";
const buildHtmlResponse = async (ctx) => {
  const [
    nonce,
    language,
    accentColor,
    isDemo,
    isAuthenticated,
    splashImages,
    cssText,
  ] = await Promise.all([
    getNonce(),
    getLanguage(),
    getAccentColor(),
    negotiateDemoStatus(ctx),
    negotiateAuthenticationStatus(),
    buildAppleTouchStartupImages(),
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
            const app = {
              language: ${language},
            };
            ${mainScripts};
          </script>
        </head>
        <body>
          ${isDemo
            ? dashboardLayout
            : isAuthenticated
            ? dashboardLayout
            : authenticationLayout}
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

const dashboardLayout = html`
  <navigation-menu>
    <header>
      <function-trigger class="i" data-fn="">${svgX}</function-trigger>
    </header>
    <main>
      <details open>
        <summary>MY VORTE</summary>
        <ul>
          ${(() => {
            let list = "";
            MyVorteAppList.forEach((listItem) => {
              list =
                list +
                html`<navigation-trigger data-url="${listItem.url}"
                  >${listItem.svg}${listItem.text[language]}</navigation-trigger
                >`;
            });
            return list;
          })()}
        </ul>
      </details>
      <details open>
        <summary>VORTEPRENEUR</summary>
        <navigation-button data-url="$1">
          ${{}[language]} ${svgPlus}
        </navigation-button>
      </details>
    </main>
    <footer></footer>
  </navigation-menu>

  <use-area> </use-area>
`;

const authenticationLayout = html` <form></form> `;

export default buildHtmlResponse;
