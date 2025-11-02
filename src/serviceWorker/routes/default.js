import negotiateAuthenticationStatus from "../utilities/negotiateAuthenticationStatus";
import getLanguage from "../utilities/getLanguage";
import getNonce from "../utilities/getNonce";
const buildHtmlResponse = async (ctx) => {
  const [nonce, language, accentColor, isAuthenticated] = await Promise.all([
    getNonce(),
    getLanguage(),
    getAccentColor(),
    negotiateDemoStatus(),
    negotiateAuthenticationStatus(cookieStore.get("bearer")),
  ]);

  return new Response(
    html`
      <!DOCTYPE html>
      <html lang="${language}">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Vorte</title>
          <meta name="application-name" content="Vorte" />
          <meta name="color-scheme" content="light dark" />
          <meta name="theme-color" content="${accentColor}" />
          <meta name="mobile-web-app-cabable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Vorte" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link
            rel="preconnect"
            href="https://static.cloudflareinsights.com"
            crossorigin
          />
          <link rel="dns-prefetch" href="//static.cloudflareinsights.com" />
          <link rel="icon" href="/images/favicons/3/favicon.ico" sizes="any" />
          <link
            rel="icon"
            type="image/svg+xml"
            href="/images/favicons/3/icon.svg"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicons/3/apple-touch-icon.png"
          />
          <link
            rel="mask-icon"
            href="/images/favicons/3/safari-pinned-tab.svg"
            color="${accentColor}"
          />
          <link
            rel="manifest"
            href="/images/favicons/3/site.webmanifest?v=1760367670748"
          />
          <style nonce="${nonce}"></style>
          <script nonce="${nonce}"></script>
        </head>
        <body>
          ${isDemo ? "" : isAuthenticated ? "" : ""}
        </body>
      </html>
    `,
    {
      status: 200,
      headers: {
        "content-language": "",
        "content-type": "text/html; utf-8",
      },
    }
  );
};

export default buildHtmlResponse;
