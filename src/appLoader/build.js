const SUPPORTED_LANGUAGES = ["fi", "sv", "en"];
const html = String.raw;
import { build } from "esbuild";

const page = html`
  <!DOCTYPE html>
  <html lang="fi">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vorte</title>
      <style></style>
      <script></script>
    </head>
    <body>
      <canvas></canvas>
      <noscript> This page needs JavaScript </noscript>
    </body>
  </html>
`;
