const svgToPngDataURL = async (svgText, options = {}) => {
  const { width, height, scale = 1, background, mime = "image/png" } = options;
  const size = (() => {
    if (width && height) return { w: width, h: height };
    const wAttr = /(?:\s|^)width="([\d.]+)(px)?"/i.exec(svgText)?.[1];
    const hAttr = /(?:\s|^)height="([\d.]+)(px)?"/i.exec(svgText)?.[1];
    if (wAttr && hAttr) return { w: Number(wAttr), h: Number(hAttr) };
    const vb = /viewBox="([\d.\s-]+)"/i.exec(svgText)?.[1];
    if (vb) {
      const p = vb.trim().split(/\s+/).map(Number);
      if (p.length === 4) {
        if (width && !height)
          return { w: width, h: Math.round((width / p[2]) * p[3]) };
        if (height && !width)
          return { w: Math.round((height / p[3]) * p[2]), h: height };
        return { w: Math.round(p[2]), h: Math.round(p[3]) };
      }
    }
    if (width && !height) return { w: width, h: width };
    if (height && !width) return { w: height, h: height };
    return { w: 512, h: 512 };
  })();

  const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const bitmap = await createImageBitmap(svgBlob);
  const outW = Math.max(1, Math.round((size.w || bitmap.width || 512) * scale));
  const outH = Math.max(
    1,
    Math.round((size.h || bitmap.height || 512) * scale)
  );

  const canvas = new OffscreenCanvas(outW, outH);
  const ctx = canvas.getContext("2d");
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, outW, outH);
  }
  ctx.drawImage(bitmap, 0, 0, outW, outH);

  const pngBlob = await canvas.convertToBlob({ type: mime });
  const buffer = await pngBlob.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i]);
  return `data:${mime};base64,${btoa(binary)}`;
};
export default svgToPngDataURL;
