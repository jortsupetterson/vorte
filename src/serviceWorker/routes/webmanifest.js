import content from "../../appLoader/seoComponents/content";
import getAccentColor from "../utilities/getAccentColor";
import getLanguage from "../utilities/getLanguage";
const buildWebmanifestResponse = async (ctx) => {
  const [accentColor, language] = await Promise.all([
    getAccentColor(),
    getLanguage(),
  ]);
  return new Response(
    JSON.stringify({
      name: `Vorte`,
      short_name: "Vorte",
      description: content.description[language],
      start_url: ".",
      scope: "/",
      display: "standalone",
      orientation: "portrait",
      background_color: accentColor,
      theme_color: accentColor,
      icons: [
        {
          src: `/icons/192x192`,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: `/icons/512x512`,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/manifest+json",
      },
    }
  );
};
export default buildWebmanifestResponse;
