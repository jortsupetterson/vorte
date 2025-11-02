import getAccentColor from "../utilities/getAccentColor";
const buildWebmanifestResponse = async (ctx) => {
  const [accentColor] = await Promise.all([getAccentColor()]);
  return new Response(
    JSON.stringify({
      name: "Vorte",
      short_name: "Vorte",
      start_url: `/`,
      scope: "/",
      display: "standalone",
      orientation: "portrait",
      background_color: accentColor,
      theme_color: accentColor,
      description: "Digital Office with Assistants",
      icons: [
        { src: "favicon-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "favicon-512x512.png", sizes: "512x512", type: "image/png" },
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
