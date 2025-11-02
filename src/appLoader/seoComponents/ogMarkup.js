const html = String.raw;
import content from "./content.json" assert { type: "json" };
const ogMarkup = (lang) => {
  return html`
    <meta property="og:locale" content="${locale[lang]}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${name}" />
    <meta property="og:title" content="${title[lang]}" />
    <meta property="og:description" content="${description[lang]}" />
    <meta property="og:url" content="https://vorte.app/${lang}" />
    <meta property="og:image" content="${content.social_sharing_image.url}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
      property="og:image:alt"
      content="${content.social_sharing_image.alt}}"
    />
  `;
};
export default ogMarkup;
