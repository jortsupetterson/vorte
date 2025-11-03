const SUPPORTED_LANGUAGES = ["fi", "sv", "en"];
const html = String.raw;

import { minify } from "html-minifier-terser";
const terserOptions = {
  minifyJS: { module: true, ecma: 2020 },
  minifyCSS: true,
  collapseWhitespace: true,
  collapseInlineTagWhitespace: true,
  html5: true,
  useShortDoctype: true,
  trimCustomFragments: true,
};

import { dirname } from "path";
import { mkdir, readFile, writeFile } from "fs/promises";
import alternateMarkup from "./seoComponents/alternateMarkup.js";
import ogMarkup from "./seoComponents/ogMarkup.js";
import twitterMarkup from "./seoComponents/twitterMarkup.js";
import basicMarkup from "./seoComponents/basicMarkup.js";

const jsText = await readFile("./src/appLoader/script.js");
const cssText = await readFile("./src/appLoader/style.css");

const buildMarkup = (language, cssText, jsText) => html` <!DOCTYPE html>
  <html lang="${language}">
    <head>
      ${basicMarkup(language)} ${alternateMarkup(language)}
      ${ogMarkup(language)} ${twitterMarkup(language)}
      <style>
        ${cssText}
      </style>
      <script type="module">
        ${jsText};
      </script>
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
  </html>`;

//perLanguage
for (const language in SUPPORTED_LANGUAGES) {
  const page = buildMarkup(SUPPORTED_LANGUAGES[language], cssText, jsText);
  const min = await minify(page, terserOptions);
  const filepath =
    "./dist/static/" + SUPPORTED_LANGUAGES[language] + "/index.html";
  await mkdir(dirname(filepath), { recursive: true });
  await writeFile(filepath, min);
}

//default
const page = buildMarkup("en", cssText, jsText);
const min = await minify(page, terserOptions);
const filepath = "./dist/static/index.html";
await mkdir(dirname(filepath), { recursive: true });
await writeFile(filepath, min);
