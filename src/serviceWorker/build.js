import { build } from "esbuild";
import contentMinifierPlugin from "../../scripts/plugins/contentMinifierPlugin.js";
await build({
  entryPoints: ["./src/serviceWorker/entrypoint.js"],
  outfile: "./dist/static/sw.js",
  bundle: true,
  minify: true,
  treeShaking: true,
  define: {
    html: "String.raw",
  },
  plugins: [contentMinifierPlugin()],
});
