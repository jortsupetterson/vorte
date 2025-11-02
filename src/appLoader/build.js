const SUPPORTED_LANGUAGES = ["fi", "sv", "en"];
const html = String.raw;
import { build } from "esbuild";
import { minify } from "html-minifier-terser";
import { readFile, writeFile } from "fs/promises";
import { write } from "fs";
import alternateMarkup from "./seoComponents/alternateMarkup";
import ogMarkup from "./seoComponents/ogMarkup";
import twitterMarkup from "./seoComponents/twitterMarkup";

for (const language in SUPPORTED_LANGUAGES) {
  const page = html`
    <!DOCTYPE html>
    <html lang="${language}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vorte</title>
        <link
          rel="preconnect"
          href="https://static.cloudflareinsights.com"
          crossorigin
        />
        <link rel="dns-prefetch" href="//static.cloudflareinsights.com" />
        ${alternateMarkup(language)} ${ogMarkup(language)}
        ${twitterMarkup(language)}
        <style></style>
        <script></script>
      </head>
      <body>
        <noscript>
          ${{
            fi: "Vorte vaatii JavaScriptin",
            sv: "Vorte kräver JavaScript",
            en: "Vorte requires JavaScript",
          }[language]}
        </noscript>
      </body>
    </html>
  `;
  const min = await minify(page, {
    minifyJS: { module: true, ecma: 2020 },
    minifyCSS: true,
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    html5: true,
    useShortDoctype: true,
    trimCustomFragments: true,
  });
  await writeFile("/" + language + "/index.html");
}
