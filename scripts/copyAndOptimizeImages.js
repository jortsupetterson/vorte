import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { optimize as optimizeSvg } from "svgo";

const IN_PATH = "./src/assetsManagement/images";
const OUT_PATH = "./dist/static/images";

const rasterExt = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const svgExt = [".svg"];

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function optimizeRaster(src, dst) {
  const ext = path.extname(src).toLowerCase();
  let img = sharp(src).resize({ width: 2560, height: 2560, fit: "inside" });
  if (ext === ".jpg" || ext === ".jpeg") img = img.jpeg({ quality: 82 });
  else if (ext === ".png") img = img.png({ compressionLevel: 9 });
  else if (ext === ".webp") img = img.webp({ quality: 82 });
  else if (ext === ".avif") img = img.avif({ quality: 82 });
  await ensureDir(dst);
  await img.toFile(dst);
}

async function optimizeSvgFile(src, dst) {
  const svgData = await fs.readFile(src, "utf8");
  const { data } = optimizeSvg(svgData, { multipass: true });
  await ensureDir(dst);
  await fs.writeFile(dst, data);
}

async function run() {
  console.time("optimize");
  for await (const file of walk(IN_PATH)) {
    const rel = path.relative(IN_PATH, file);
    const out = path.join(OUT_PATH, rel);
    const ext = path.extname(file).toLowerCase();
    if (rasterExt.includes(ext)) await optimizeRaster(file, out);
    else if (svgExt.includes(ext)) await optimizeSvgFile(file, out);
    else {
      await ensureDir(out);
      await fs.copyFile(file, out);
    }
    console.log("✔", rel);
  }
  console.timeEnd("optimize");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

console.log(`✓ Kuvat kopioitu ja optimoitu → ${OUT_PATH}`);
