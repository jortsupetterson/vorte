import transformSvgToPngDataURL from "../utilities/transformSvgToPngDataURL";

const svg = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="300"
    viewBox="0 0 200 300"
    fill="none"
  >
    <g transform="translate(0,30.597015) scale(1.066098) translate(-14.2,-149)">
      <path
        d="M108.35 343.6L167.85 181.2H201.8L126.55 373H89.45L14.2 181.2H48.5L108.35 343.6Z"
        fill="white"
      />
      <path d="M108.5 275L87 199H130L108.5 275Z" fill="white" />
      <path
        d="M108.153 178H67.8632L51 149H167L150.592 178H108.153Z"
        fill="white"
      />
    </g>
  </svg>
`;

const SPLASH_DEVICES = [
  { cssW: 393, cssH: 852, dpr: 3, pxW: 1179, pxH: 2556 }, // iPhone 15 Pro
  { cssW: 430, cssH: 932, dpr: 3, pxW: 1290, pxH: 2796 }, // 15 Pro Max
  { cssW: 428, cssH: 926, dpr: 3, pxW: 1284, pxH: 2778 }, // 12/13/14 Pro Max
  { cssW: 390, cssH: 844, dpr: 3, pxW: 1170, pxH: 2532 }, // 12/13/14/15
  { cssW: 1024, cssH: 1366, dpr: 2, pxW: 2048, pxH: 2732 }, // iPad Pro 12.9
];

// Kaikki rasterit PEITTÄVINÄ (ei läpinäkyviä)
const RASTERS = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-192x192.png", size: 192 },
  { name: "favicon-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

const buildIconResponse = async () => {};
export default buildIconResponse;
