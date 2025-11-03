import getAccentColor from "../../utilities/getAccentColor";

// Kaikki yleiset iPhone/iPad splash-koot → generoi sekä portrait että landscape
const DEVICES = [
  // iPhone
  { cssW: 320, cssH: 568, dpr: 2, pxW: 640, pxH: 1136 }, // SE (1st)
  { cssW: 375, cssH: 667, dpr: 2, pxW: 750, pxH: 1334 }, // 6/7/8/SE(2/3)
  { cssW: 414, cssH: 736, dpr: 3, pxW: 1242, pxH: 2208 }, // 6+/7+/8+
  { cssW: 375, cssH: 812, dpr: 3, pxW: 1125, pxH: 2436 }, // X/XS/11 Pro/12 mini
  { cssW: 390, cssH: 844, dpr: 3, pxW: 1170, pxH: 2532 }, // 12/13/14/15
  { cssW: 393, cssH: 852, dpr: 3, pxW: 1179, pxH: 2556 }, // 14 Pro/15 Pro/16 Pro
  { cssW: 414, cssH: 896, dpr: 2, pxW: 828, pxH: 1792 }, // 11/XR
  { cssW: 414, cssH: 896, dpr: 3, pxW: 1242, pxH: 2688 }, // XS Max/11 Pro Max
  { cssW: 428, cssH: 926, dpr: 3, pxW: 1284, pxH: 2778 }, // 12/13/14 Pro Max
  { cssW: 430, cssH: 932, dpr: 3, pxW: 1290, pxH: 2796 }, // 15/16 Pro Max
  // iPad
  { cssW: 768, cssH: 1024, dpr: 2, pxW: 1536, pxH: 2048 }, // iPad 9.7
  { cssW: 810, cssH: 1080, dpr: 2, pxW: 1620, pxH: 2160 }, // iPad 10.2/10.5 (var.)
  { cssW: 820, cssH: 1180, dpr: 2, pxW: 1640, pxH: 2360 }, // iPad 10th
  { cssW: 834, cssH: 1112, dpr: 2, pxW: 1668, pxH: 2224 }, // iPad Pro 10.5
  { cssW: 834, cssH: 1194, dpr: 2, pxW: 1668, pxH: 2388 }, // iPad Pro 11 / Air 10.9
  { cssW: 744, cssH: 1133, dpr: 2, pxW: 1488, pxH: 2266 }, // iPad mini 6
  { cssW: 1024, cssH: 1366, dpr: 2, pxW: 2048, pxH: 2732 }, // iPad Pro 12.9
];

const buildAppleTouchStartupImages = async () => {
  const accentColor = await getAccentColor();
  return html`
    ${DEVICES.map(
      ({ cssW, cssH, pxW, pxH }) => html`
        <link
          rel="apple-touch-startup-image"
          href="/icons/${pxW}x${pxH}?v=${accentColor}"
          media="(device-width: ${cssW}px) and (device-height: ${cssH}px) and (-webkit-device-pixel-ratio: 2), (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/${pxH}x${pxW}?v=${accentColor}"
          media="(device-width: ${cssW}px) and (device-height: ${cssH}px) and (-webkit-device-pixel-ratio: 2), (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
      `
    ).join("")}
  `;
};

export default buildAppleTouchStartupImages;
