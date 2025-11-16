import { build } from "esbuild";
import { readFile } from "fs/promises";
import contentMinifierPlugin from "../../scripts/plugins/contentMinifierPlugin.js";
import { writeFile } from "fs/promises";

const buildReference = crypto.randomUUID();

await writeFile("./dist/static/version.txt", buildReference);

const mainScripts = await readFile("./temp/main.js", "utf-8");

await build({
  entryPoints: ["./src/serviceWorker/entrypoint.js"],
  outfile: "./dist/static/ServiceWorker",
  bundle: true,
  minify: true,
  treeShaking: true,
  define: {
    html: "String.raw",
    css: "String.raw",
    mainScripts: JSON.stringify(mainScripts),
    buildReference: JSON.stringify(buildReference),
  },
  plugins: [contentMinifierPlugin()],
});
