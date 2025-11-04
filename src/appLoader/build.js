import { SUPPORTED_LANGUAGES } from "../../shared/SUPPORTED_LANGUAGES.js";
const html = String.raw;

import { build } from "esbuild";
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
import { outputFile } from "fs-extra";

const jsTextRaw = await readFile("./src/appLoader/script.js", "utf-8");
const cssText = await readFile("./src/appLoader/style.css", "utf-8");

await build({
  entryPoints: ["./src/appLoader/script.js"],
  outdir: "./temp",
  bundle: true,
  minify: true,
  treeShaking: true,
  format: "esm",
});

const jsTextBundled = await readFile("./temp/script.js", "utf-8");

const buildMarkup = (language, cssText, jsTextBundled) => html` <!DOCTYPE html>
  <html lang="${language}">
    <head>
      ${basicMarkup(language)} ${alternateMarkup(language)}
      ${ogMarkup(language)} ${twitterMarkup(language)}
      <style>
        ${cssText}
      </style>
      <script type="module">
        ${jsTextBundled};
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
  const page = buildMarkup(
    SUPPORTED_LANGUAGES[language],
    cssText,
    jsTextBundled
  );
  const min = await minify(page, terserOptions);
  const filepath =
    "./dist/static/" + SUPPORTED_LANGUAGES[language] + "/index.html";
  await mkdir(dirname(filepath), { recursive: true });
  await writeFile(filepath, min);
}

//default
const page = buildMarkup("en", cssText, jsTextBundled);
const min = await minify(page, terserOptions);
const filepath = "./dist/static/index.html";
await mkdir(dirname(filepath), { recursive: true });
await writeFile(filepath, min);
