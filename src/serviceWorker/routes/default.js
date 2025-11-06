import negotiateAuthenticationStatus from "../utilities/negotiateAuthenticationStatus";
import negotiateDemoStatus from "../utilities/negotiateDemoStatus";
import getLanguage from "../utilities/getLanguage";
import getNonce from "../utilities/getNonce";
import getAccentColor from "../utilities/getAccentColor";
import buildAppleTouchStartupImages from "../components/markup/apple-touch-startup-image";
import buildCssText from "../components/markup/styles/style";
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

  if (!isDemo) return Response.redirect("https://why.vorte.app");

  return new Response(
    html`
      <!DOCTYPE html>
      <html lang="${language}">
        <head>
          <meta charset="UTF-8" />
          <style id="eager" nonce="${nonce}">
            ${cssText}
          </style>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <script nonce="${nonce}">
            performance.mark("start");
            ${mainScripts};
          </script>
          <title>Vorte</title>
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
          ${splashImages}
        </head>
        <body></body>
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

export default buildHtmlResponse;
