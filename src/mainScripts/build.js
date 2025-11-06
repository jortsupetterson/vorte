import { build } from "esbuild";
import contentMinifierPlugin from "../../scripts/plugins/contentMinifierPlugin.js";
await build({
  entryPoints: ["./src/mainScripts/script.js"],
  outfile: "./temp/main.js",
  minify: true,
  bundle: true,
  treeShaking: true,
  plugins: [contentMinifierPlugin()],
  define: {
    css: "String.raw",
    html: "String.raw",
  },
  inject: ["./src/mainScripts/app.js"],
});
