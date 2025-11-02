import verifyWithPublicKey from "../utilities/verifyWithPublicKey";
import getLanguage from "../utilities/getLanguage";
import getNonce from "../utilities/getNonce";
const buildHtmlResponse = async (ctx) => {
  const [nonce, language, isAuthenticated] = await Promise.all([
    getNonce(),
    getLanguage(),
    verifyWithPublicKey(cookieStore.get("bearer")),
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
          <meta name="mobile-web-app-cabable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Vorte" />
          <meta name="theme" />
          <style nonce="${nonce}"></style>
          <script nonce="${nonce}"></script>
        </head>
        <body>
          ${isAuthenticated ? "" : ""}
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
