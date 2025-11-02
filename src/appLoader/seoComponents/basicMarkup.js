const html = String.raw;
import content from "./content";
const basicMarkup = (lang) => html`
  <meta charset="UTF-8" />
  <title>${content.title[lang]}</title>
  <meta name="author" content="${content.author}" />
  <meta name="description" content="${content.description[lang]}" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="icon" href="/images/logo.png" />
  <link
    rel="preconnect"
    href="https://static.cloudflareinsights.com"
    crossorigin
  />
  <link rel="dns-prefetch" href="//static.cloudflareinsights.com" />
`;
export default basicMarkup;
