import { build } from "esbuild";
await build({
  entryPoints: ["./src/serviceWorker/entrypoint.js"],
  outfile: "./dist/static/sw.js",
  bundle: true,
  minify: true,
  treeShaking: true,
  define: {
    html: "String.raw",
  },
});
