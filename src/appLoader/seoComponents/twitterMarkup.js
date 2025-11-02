const html = String.raw;
import content from "./content.json" assert { type: "json" };
const twitterMarkup = (lang) => {
  return html`
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${content.title[lang]}" />
    <meta name="twitter:description" content="${content.description[lang]}" />
    <meta name="twitter:url" content="https://vorte.app/${lang}" />
    <meta name="twitter:image" content="${content.social_sharing_image.url}" />
    <meta
      name="twitter:image:alt"
      content="${content.social_sharing_image.alt}"
    />
    <meta name="twitter:site" content="@vorteapp" />
    <meta name="twitter:creator" content="@vorteapp" />
  `;
};
export default twitterMarkup;
