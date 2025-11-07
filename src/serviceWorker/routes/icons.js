// /icons/{width}x{height} → PNG (accent-tausta, logo vektorina Path2D:llä; ei SVG-dekoodausta)
import getAccentColor from "../../../shared/utilities/getAccentColor.js";

const buildIconResponse = async (ctx) => {
  const sizeStr = (ctx.path?.[1] || "").toLowerCase();
  const [w, h] = sizeStr.split("x").map((n) => parseInt(n, 10));
  if (!Number.isFinite(w) || !Number.isFinite(h))
    return new Response("Bad size", { status: 400 });

  const bg = await getAccentColor();

  const canvas = new OffscreenCanvas(w, h);
  const g = canvas.getContext("2d", { alpha: false });

  // tausta
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);

  // logo-mitat (alkuperäinen viewBox 200x300 → 2:3)
  const logoH = Math.floor(Math.min(w, h) * 0.7);
  const logoW = Math.floor(logoH * (200 / 300));
  const offsetX = Math.floor((w - logoW) / 2);
  const offsetY = Math.floor((h - logoH) / 2);

  // keskitys + skaalaus
  g.save();
  g.translate(offsetX, offsetY);
  g.scale(logoW / 200, logoH / 300);

  // alkuperäisen <g> transformin vastaavuus
  g.translate(0, 30.597015);
  g.scale(1.066098, 1.066098);
  g.translate(-14.2, -149);

  g.fillStyle = "#fff";
  g.fill(
    new Path2D(
      "M108.35 343.6L167.85 181.2H201.8L126.55 373H89.45L14.2 181.2H48.5L108.35 343.6Z"
    )
  );
  g.fill(new Path2D("M108.5 275L87 199H130L108.5 275Z"));
  g.fill(new Path2D("M108.153 178H67.8632L51 149H167L150.592 178H108.153Z"));

  g.restore();

  const blob = await canvas.convertToBlob({ type: "image/png" });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  return new Response(bytes, {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
};

export default buildIconResponse;
